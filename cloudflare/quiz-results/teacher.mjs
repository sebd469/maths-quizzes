export default `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Mr D — Private quiz results</title>
<style>body{font:18px system-ui;margin:3rem auto;padding:1rem;max-width:38rem;color:#172033}label{display:block}input,button{font:inherit;padding:.7rem;margin:.6rem 0;box-sizing:border-box}input{width:100%}button{background:#1d4ed8;color:white;border:0;border-radius:6px;cursor:pointer}:focus-visible{outline:3px solid #b45309;outline-offset:3px}</style></head>
<body><h1>Private quiz results</h1>
<p>Download submitted practice results as a CSV file for Excel. Results in this service are kept for 90 days.</p>
<form><label for="key">Teacher access key</label><input id="key" type="password" required autocomplete="off">
<button>Download results CSV</button></form>
<button type="button" id="test-email">Send a test notification</button><p role="status" aria-live="polite"></p>
<p>Student identities and scores are reported by their browsers. Keep downloaded files private.</p>
<script>
document.querySelector('form').addEventListener('submit',async event=>{
 event.preventDefault();
 const key=document.getElementById('key');
 const status=document.querySelector('[role="status"]');
 const button=document.querySelector('button');
 const token=key.value.trim(); key.value=''; button.disabled=true;
 status.textContent='Preparing download…';
 try{
  const response=await fetch('/api/export',{headers:{Authorization:'Bearer '+token},cache:'no-store',credentials:'omit'});
  if(!response.ok)throw new Error(response.status===401?'Access key not recognised.':'Download failed. Please try again.');
  const url=URL.createObjectURL(await response.blob());
  const link=document.createElement('a');link.href=url;link.download='mr-d-quiz-results.csv';link.click();
  setTimeout(()=>URL.revokeObjectURL(url),10000);
  status.textContent='Your results file has been downloaded.';
 }catch(error){status.textContent=error.message;}
 finally{button.disabled=false;}
});
document.getElementById('test-email').addEventListener('click',async()=>{
 const key=document.getElementById('key');
 if(!key.reportValidity())return;
 const token=key.value.trim();key.value='';
 const button=document.getElementById('test-email');button.disabled=true;
 const status=document.querySelector('[role="status"]');status.textContent='Sending test notification…';
 try{
  const response=await fetch('/api/test-email',{method:'POST',headers:{Authorization:'Bearer '+token},credentials:'omit'});
  const result=await response.json();
  if(!response.ok||!result.accepted)throw Error(result.error||'Test email failed.');
  status.textContent='The email service accepted your test notification. Please check your inbox and spam folder.';
 }catch(error){status.textContent=error.message;}
 finally{button.disabled=false;}
});
</script></body></html>`;
