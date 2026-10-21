import fs from 'node:fs';
import path from 'node:path';
const roots=['.next/static/chunks','.next/server/app','public'];
const patterns=[/[$£]\s*(?:\d{3,}|\d{1,3},\d{3}|\d+\.\d{2}|\d+[Kk])/g,/Every call answered/gi,/Every patient booked/gi,/Answer every patient call/gi,/hundred and fifty dollars/gi,/Revenue Protected/gi];
let failures=[];
function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,item.name);if(item.isDirectory())walk(f);else if(/\.(js|html|json|txt|vtt|srt)$/.test(f)&&!f.includes('/api/')){const s=fs.readFileSync(f,'utf8');for(const p of patterns){p.lastIndex=0;const m=p.exec(s);if(m)failures.push({file:f,match:m[0]});}}}}
for(const root of roots)walk(root);
fs.writeFileSync('docs/transformation/public-content-scan.json',JSON.stringify({roots,patterns:patterns.map(String),failures},null,2));
console.log(JSON.stringify({failures},null,2));if(failures.length)process.exitCode=1;
