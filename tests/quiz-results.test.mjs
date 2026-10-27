import assert from 'node:assert/strict';
import { handle, validate, csvCell, notify, scheduled } from '../cloudflare/quiz-results/worker.mjs';
import quizzes from '../cloudflare/quiz-results/quizzes.mjs';

// Fictional data only. The fake binding exercises HTTP/auth/notification behaviour;
// schema constraints are checked separately with Python's real SQLite engine.
class FakeDB {
  rows = new Map();
  prepare(sql) {
    const db = this;
    return { args: [], bind(...args) { this.args = args; return this; },
      async run() {
        const a = this.args;
        if (sql.startsWith('INSERT')) {
          if (db.rows.has(a[0])) return { meta: { changes: 0 } };
          const fields = ['id','submitted_at','student_name','student_class','quiz_path','quiz_title','correct','attempted','total'];
          db.rows.set(a[0], { ...Object.fromEntries(fields.map((key,i) => [key,a[i]])), notified:0, notification_attempts:0 });
          return { meta: { changes: 1 } };
        }
        if (sql.startsWith('DELETE')) { for (const [key,row] of db.rows) if(row.submitted_at<a[0]) db.rows.delete(key); }
        else if (sql.includes('notification_attempts = notification_attempts + 1')) db.rows.get(a[0]).notification_attempts++;
        else if (sql.includes('SET notified = 1')) db.rows.get(a[0]).notified = 1;
        else throw Error('Unexpected SQL');
        return { meta:{ changes:1 } };
      },
      async first() { return db.rows.get(this.args[0]) || null; },
      async all() { return { results: [...db.rows.values()].filter(row => !sql.includes('notified = 0') || (!row.notified && row.notification_attempts<3)).slice(0,sql.includes('LIMIT 50')?50:undefined) }; }
    };
  }
}
export async function runTests() {
  let checks = 0;
  const ok = value => { assert.ok(value); checks++; };
  const origin = 'https://www.mr-d-maths.com';
  const [path, quiz] = Object.entries(quizzes)[0];
  const result = { id:'11111111-1111-4111-8111-111111111111', studentName:'Example Pupil', studentClass:'Test class',
    path, correct:2, total:quiz.total, attempted:quiz.total, turnstileToken:'fictional-token' };
  const env = { DB:new FakeDB(), ALLOWED_ORIGINS:origin, TURNSTILE_SECRET:'test-secret',
    ADMIN_TOKEN:'fictional-test-access-key-at-least-32-characters', SUBMISSION_LIMITER:{ limit:async()=>({success:true}) } };
  const pending=[];
  const ctx={waitUntil:promise=>pending.push(promise)};
  const verification=async()=>Response.json({success:true,hostname:'www.mr-d-maths.com',action:'quiz-result'});
  const post=(body=result,extra={})=>new Request('https://test.example/api/results',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json',...extra},body:JSON.stringify(body)});
  ok(validate(result).title === quiz.title);
  for(const bad of [{correct:-1},{correct:quiz.total+1},{attempted:0},{total:999},{studentName:' '},{studentName:'a\nb'},{studentClass:'x'.repeat(41)},{path:'/unknown'},{path:'__proto__',total:undefined,attempted:undefined},{id:'not-a-uuid'},{turnstileToken:''}]) {
    assert.throws(()=>validate({...result,...bad}));checks++;
  }
  ok((await handle(post(result,{Origin:'https://evil.example'}),env,ctx,verification)).status===403);
  ok((await handle(new Request('https://test.example/api/results',{method:'OPTIONS',headers:{Origin:origin}}),env,ctx)).status===204);
  ok((await handle(post({ ...result, correct:999 }),env,ctx,verification)).status===400);
  ok((await handle(post(),env,ctx,async()=>Response.json({success:false}))).status===400);
  ok((await handle(post(),env,ctx,async()=>Response.json({success:true,hostname:'evil.example',action:'quiz-result'}))).status===400);
  ok(env.DB.rows.size===0);
  const first=await handle(post(),env,ctx,verification);
  ok(first.status===200 && (await first.json()).saved===true);
  await Promise.all(pending);
  ok(env.DB.rows.size===1);
  ok((await handle(post(),env,ctx,verification)).status===200);
  ok(env.DB.rows.size===1);
  ok((await handle(post({...result,studentName:'Different pupil'}),env,ctx,verification)).status===409);
  const denied=await handle(new Request('https://test.example/api/export'),env,ctx);
  ok(denied.status===401 && !(await denied.text()).includes('Example Pupil'));
  ok((await handle(new Request('https://test.example/api/test-email',{method:'POST'}),env,ctx)).status===401);
  ok((await handle(new Request('https://test.example/api/export?token='+env.ADMIN_TOKEN),env,ctx)).status===401);
  const download=await handle(new Request('https://test.example/api/export',{headers:{Authorization:'Bearer '+env.ADMIN_TOKEN}}),env,ctx);
  ok(download.status===200 && (await download.text()).includes('Example Pupil'));
  ok(download.headers.get('Cache-Control')==='no-store');
  ok(download.headers.get('Access-Control-Allow-Origin')===null);
  ok(csvCell(' =HYPERLINK("x")').startsWith('"\''));
  ok(csvCell('A,"B"')==='"A,""B"""');
  const tooBig=await handle(post({...result,studentName:'x'.repeat(9000)}),env,ctx,verification);
  ok(tooBig.status===400);
  env.SUBMISSION_LIMITER.limit=async()=>({success:false});
  ok((await handle(post(),env,ctx,verification)).status===429);
  env.SUBMISSION_LIMITER.limit=async()=>({success:true});
  const row=env.DB.rows.get(result.id);
  env.NOTIFY_FROM='quiz@example.invalid';env.NOTIFY_TO='teacher@example.invalid';
  env.EMAIL={send:async()=>{throw Error('fictional delivery failure');}};
  await assert.rejects(()=>notify(env,row));checks++;
  ok(env.DB.rows.size===1 && row.notified===0 && row.notification_attempts===1);
  let message;
  env.EMAIL={send:async value=>{message=value;}};
  const emailTest=await handle(new Request('https://test.example/api/test-email',{method:'POST',headers:{Authorization:'Bearer '+env.ADMIN_TOKEN}}),env,ctx);
  ok(emailTest.status===200 && (await emailTest.json()).accepted===true);
  ok(message.subject.includes('notification test') && !message.text.includes('Example Pupil'));
  await scheduled({},env);
  ok(message.to==='teacher@example.invalid' && message.text.includes('Example Pupil'));
  ok(row.notified===1 && row.notification_attempts===2);
  row.submitted_at='2000-01-01T00:00:00.000Z';
  await scheduled({},env);
  ok(env.DB.rows.size===0);
  return { checks, status:'passed' };
}
