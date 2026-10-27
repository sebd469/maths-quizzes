import quizzes from './quizzes.mjs';
import teacherPage from './teacher.mjs';

const securityHeaders = {
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'X-Frame-Options': 'DENY'
};
const json = (value, status = 200, headers = {}) => new Response(JSON.stringify(value), {
  status, headers: { ...securityHeaders, 'Content-Type': 'application/json', ...headers }
});
export function validate(body) {
  if (!body || typeof body !== 'object') throw new Error('Invalid result');
  const quiz = typeof body.path === 'string' && Object.hasOwn(quizzes, body.path) ? quizzes[body.path] : null;
  const clean = (value, max) => {
    if (typeof value !== 'string') throw new Error('Missing name or class');
    value = value.trim();
    if (!value || value.length > max || /[\u0000-\u001f\u007f]/u.test(value)) throw new Error('Invalid name or class');
    return value;
  };
  const studentName = clean(body.studentName, 80);
  const studentClass = clean(body.studentClass, 40);
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(body.id || '')) throw new Error('Invalid attempt');
  if (!quiz || body.total !== quiz.total || body.attempted !== quiz.total ||
      !Number.isInteger(body.correct) || body.correct < 0 || body.correct > quiz.total) throw new Error('Invalid score');
  if (typeof body.turnstileToken !== 'string' || !body.turnstileToken || body.turnstileToken.length > 2048) throw new Error('Missing verification');
  return { id: body.id, studentName, studentClass, path: body.path, title: quiz.title,
    correct: body.correct, attempted: quiz.total, total: quiz.total };
}

export function csvCell(value) {
  let text = String(value ?? '');
  // Neutralise Excel formulas, including those hidden after whitespace.
  if (/^[\s\u0000-\u001f]*[=+@-]/u.test(text)) text = "'" + text;
  return '"' + text.replaceAll('"', '""') + '"';
}
export function csv(rows) {
  const fields = ['submitted_at', 'student_name', 'student_class', 'quiz_title', 'correct', 'attempted', 'total', 'quiz_path', 'notified'];
  return '\uFEFF' + [fields.join(','), ...rows.map(row => fields.map(field => csvCell(row[field])).join(','))].join('\r\n');
}
async function authorised(request, env) {
  const token = request.headers.get('Authorization') || '';
  if (!env.ADMIN_TOKEN || env.ADMIN_TOKEN.length < 32 || token.length > 512) return false;
  const digest = async value => new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
  const [a, b] = await Promise.all([digest(token), digest('Bearer ' + env.ADMIN_TOKEN)]);
  let difference = 0;
  for (let i = 0; i < a.length; i++) difference |= a[i] ^ b[i];
  return difference === 0;
}
async function readBody(request) {
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) throw new Error('Expected JSON');
  if (!request.body) throw new Error('Missing result');
  const reader = request.body.getReader();
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 8192) { await reader.cancel(); throw new Error('Result too large'); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder().decode(bytes));
}
export async function notify(env, row) {
  if (!env.EMAIL || !env.NOTIFY_FROM || !env.NOTIFY_TO) return;
  // Keep a bounded retry counter. No pupil data is written to application logs.
  await env.DB.prepare('UPDATE results SET notification_attempts = notification_attempts + 1 WHERE id = ?').bind(row.id).run();
  await env.EMAIL.send({
    from: env.NOTIFY_FROM, to: env.NOTIFY_TO,
    subject: 'Maths quiz result received',
    text: [
      'A student has chosen to send you a practice quiz result.',
      `Name: ${row.student_name}`, `Class: ${row.student_class}`,
      `Quiz: ${row.quiz_title}`, `Score: ${row.correct} / ${row.total}`,
      `Questions checked: ${row.attempted}`, `Submitted (UTC): ${row.submitted_at}`,
      `Reference: ${row.id}`, '',
      'Scores are reported by the browser; identities and marks are not independently verified.'
    ].join('\n')
  });
  await env.DB.prepare('UPDATE results SET notified = 1 WHERE id = ?').bind(row.id).run();
}

export async function handle(request, env, ctx, verifyFetch = fetch) {
  const url = new URL(request.url);
  const origin = request.headers.get('Origin');
  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(x => x.trim()).filter(Boolean);
  const cors = allowed.includes(origin) ? { 'Access-Control-Allow-Origin': origin, 'Vary': 'Origin' } : {};
  if (url.pathname === '/teacher' && request.method === 'GET') {
    return new Response(teacherPage, { headers: { ...securityHeaders,
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy': "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
    } });
  }
  if (url.pathname === '/api/export' && request.method === 'GET') {
    if (!await authorised(request, env)) return json({ error: 'Unauthorised' }, 401);
    const { results } = await env.DB.prepare('SELECT * FROM results ORDER BY submitted_at DESC').all();
    return new Response(csv(results), { headers: { ...securityHeaders,
      'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="mr-d-quiz-results.csv"'
    } });
  }
  if (url.pathname === '/api/test-email' && request.method === 'POST') {
    if (!await authorised(request, env)) return json({ error: 'Unauthorised' }, 401);
    if (!env.EMAIL || !env.NOTIFY_FROM || !env.NOTIFY_TO) return json({ error: 'Email is not configured' }, 503);
    try {
      await env.EMAIL.send({ from: env.NOTIFY_FROM, to: env.NOTIFY_TO,
        subject: 'Mr D maths quizzes — notification test',
        text: 'This is a setup test for optional quiz result notifications. No student data is included.\n\nIf you received this email, your notification address is working.' });
      return json({ accepted: true });
    } catch (error) {
      const code = /^[A-Z0-9_]{1,60}$/.test(error.code || '') ? error.code : 'UNAVAILABLE';
      return json({ error: 'Test email could not be sent', code }, 503);
    }
  }
  if (url.pathname !== '/api/results') return json({ error: 'Not found' }, 404);
  if (!allowed.includes(origin)) return json({ error: 'Origin not allowed' }, 403);
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: {
    ...securityHeaders, ...cors, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'
  } });
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, cors);
  if (!env.DB || !env.SUBMISSION_LIMITER || !env.TURNSTILE_SECRET) return json({ error: 'Service not configured' }, 503, cors);
  const limited = await env.SUBMISSION_LIMITER.limit({ key: request.headers.get('CF-Connecting-IP') || 'unknown' });
  if (!limited.success) return json({ error: 'Please try again later' }, 429, cors);
  let raw, result;
  try { raw = await readBody(request); result = validate(raw); }
  catch { return json({ error: 'Invalid or incomplete result' }, 400, cors); }
  const verification = await verifyFetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: env.TURNSTILE_SECRET, response: raw.turnstileToken,
      remoteip: request.headers.get('CF-Connecting-IP') }), signal: AbortSignal.timeout(10000)
  });
  const check = await verification.json();
  if (!check.success || check.hostname !== new URL(origin).hostname || check.action !== 'quiz-result') {
    return json({ error: 'Please retry verification' }, 400, cors);
  }
  const inserted = await env.DB.prepare(`INSERT INTO results
    (id, submitted_at, student_name, student_class, quiz_path, quiz_title, correct, attempted, total)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING`)
    .bind(result.id, new Date().toISOString(), result.studentName, result.studentClass,
      result.path, result.title, result.correct, result.attempted, result.total).run();
  const row = await env.DB.prepare('SELECT * FROM results WHERE id = ?').bind(result.id).first();
  if (!row || row.quiz_path !== result.path || row.student_name !== result.studentName ||
      row.student_class !== result.studentClass || row.correct !== result.correct) {
    return json({ error: 'Attempt already submitted with different details' }, 409, cors);
  }
  if (inserted.meta.changes) ctx.waitUntil(notify(env, row).catch(() => {
    console.error('Quiz notification failed; retained for retry.');
  }));
  return json({ saved: true }, 200, cors);
}

export async function scheduled(_event, env) {
  // Delete only records in this new results service; never touch historical files.
  const cutoff = new Date(Date.now() - 90 * 86400000).toISOString();
  await env.DB.prepare('DELETE FROM results WHERE submitted_at < ?').bind(cutoff).run();
  const { results } = await env.DB.prepare('SELECT * FROM results WHERE notified = 0 AND notification_attempts < 3 ORDER BY submitted_at LIMIT 50').all();
  for (const row of results) {
    try { await notify(env, row); }
    catch { console.error('Quiz notification retry failed.'); }
  }
}
export default {
  async fetch(request, env, ctx) {
    try { return await handle(request, env, ctx); }
    catch {
      const origin = request.headers.get('Origin');
      const cors = (env.ALLOWED_ORIGINS || '').split(',').map(x => x.trim()).includes(origin)
        ? { 'Access-Control-Allow-Origin': origin, 'Vary': 'Origin' } : {};
      return json({ error: 'Service temporarily unavailable; please retry' }, 503, cors);
    }
  },
  scheduled
};
