const basePath=location.pathname.startsWith('/demo')?'/demo':'';
const queryLink=new URLSearchParams(location.search).get('link')||'';
const pathLink=location.pathname.match(/\/watch\/([a-f0-9]{32})(?:\/|$)/)?.[1]||null;
const linkId=/^[a-f0-9]{32}$/.test(queryLink)?queryLink:pathLink;
const videos=Array.from(document.querySelectorAll('video'));let ticket;let isDemoPreview=false;const sent=new Set();
const post=async(action,data)=>{const r=await fetch(basePath+'/api/'+action,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),keepalive:true});if(!r.ok){const error=Error('Tracking unavailable');error.status=r.status;throw error;}return r.json();};
const owner=fetch(basePath+'/api/session').then(r=>r.ok?r.json():{}).catch(()=>({}));
const ready=owner.then(session=>post('open',{link:linkId||'direct',preview:session.preview||new URLSearchParams(location.search).has('preview'),referrer:document.referrer})).then(r=>{ticket=r.ticket;isDemoPreview=!!r.preview;}).catch(()=>{const s=document.querySelector('#tracking-status');if(s)s.textContent='Activity tracking is currently unavailable. You can still watch the demo.';});
async function track(key,type,percent=0){await ready;if(!ticket)return;if(sent.has(key))return;sent.add(key);try{await post('event',{ticket,type,percent});}catch{sent.delete(key);}}
const formatTime=seconds=>{const n=Math.round(seconds);return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0');};
videos.forEach((video,index)=>{
video.addEventListener('play',()=>track(index+':play','play'));
video.addEventListener('timeupdate',()=>{const percent=video.currentTime/video.duration*100;if(percent>=25)track(index+':progress:'+Math.floor(percent/25)*25,'progress',Math.floor(percent/25)*25);});
video.addEventListener('ended',()=>track(index+':complete','complete',100));
video.addEventListener('loadedmetadata',()=>{if(Number.isFinite(video.duration)&&video.duration>0){const label=video.closest('.video-section')?.querySelector('.video-duration');if(label)label.textContent=formatTime(video.duration);}});
});
const cta=document.querySelector('#cta');if(cta)cta.addEventListener('click',()=>track('cta','cta'));
if(linkId){for(const a of document.querySelectorAll('a[data-carry-link]')){try{const u=new URL(a.getAttribute('href'),location.origin);u.searchParams.set('link',linkId);a.href=u.pathname+u.search;}catch{}}}
if(linkId)fetch(basePath+'/api/info?link='+encodeURIComponent(linkId)).then(r=>r.ok?r.json():null).then(info=>{if(info&&info.label){document.title=info.label+' Demo | FlowAudit';const company=document.querySelector('[data-company-name]');if(company)company.textContent=info.label;const eyebrow=document.querySelector('#company-eyebrow');if(eyebrow)eyebrow.textContent=info.label.toUpperCase();document.querySelectorAll('[data-personal]').forEach(el=>{el.hidden=false;});}}).catch(()=>{});
