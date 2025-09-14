
const readline=require('readline');
const rl=readline.createInterface({input:process.stdin,output:process.stdout});
const API=process.env.OPENAI_API_KEY;
if(!API) throw new Error('Set OPENAI_API_KEY');
const messages=[{role:"system",content:"You are a helpful assistant."}];
async function ask(u){
  messages.push({role:"user",content:u});
  const r=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',
    headers:{'Content-Type':'application/json','Authorization':`Bearer ${API}`},
    body:JSON.stringify({model:'gpt-3.5-turbo',messages})});
  const j=await r.json(); const a=j.choices?.[0]?.message?.content||'No response';
  messages.push({role:'assistant',content:a}); console.log('\nAI:',a,'\n');
}
console.log('Type a message, ctrl+c to exit.');
rl.on('line',l=>ask(l.trim()));
