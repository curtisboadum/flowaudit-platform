import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderMedia,renderStill} from '@remotion/renderer';
import {existsSync,mkdirSync,readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(fileURLToPath(import.meta.url));
const dir=path.resolve(root,process.env.RENDER_OUT||'renders');mkdirSync(dir,{recursive:true});
const mac='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browserExecutable=process.env.REMOTION_BROWSER_EXECUTABLE||(existsSync(mac)?mac:undefined);
const data=JSON.parse(readFileSync(path.join(root,'src/final-vsl.json'),'utf8'));
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),publicDir:path.join(root,'public')});
const browser=await openBrowser('chrome',{browserExecutable,chromeMode:'chrome-for-testing',chromiumOptions:{gl:'swangle'},forceDeviceScaleFactor:1});
const composition=await selectComposition({serveUrl,id:process.env.COMPOSITION||'FlowAuditVSL',puppeteerInstance:browser});
const base={serveUrl,composition,puppeteerInstance:browser,disableSharedMemoryCapture:true,timeoutInMilliseconds:120000};
try {
 if(process.argv.includes('--stills')){
  for(const frame of (process.env.FRAMES||'35,278,460,553,612,704,1820,2150,2420,2820').split(',').map(Number)){
   await renderStill({...base,frame,output:path.join(dir,`${frame}.png`),imageFormat:'png'});console.log('frame',frame);
  }
 }else{
  let last=-1;
  if(!process.argv.includes('--finalize-existing')) await renderMedia({...base,outputLocation:path.join(dir,'flowaudit-vsl-render.mp4'),imageFormat:'png',codec:'h264',pixelFormat:'yuv420p',crf:18,audioBitrate:'192k',sampleRate:48000,concurrency:Number(process.env.REMOTION_CONCURRENCY||1),onProgress:p=>{const pct=Math.floor(p.progress*10)*10;if(pct!==last){console.log(`Render ${pct}%`);last=pct}}});
  const mastered=spawnSync('ffmpeg',['-v','error','-y','-i',path.join(dir,'flowaudit-vsl-render.mp4'),'-i',path.join(root,'public/audio/final/mix.wav'),'-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-af','volume=-0.4dB','-b:a','192k','-ar','48000','-t',String(data.durationInFrames/data.fps),'-movflags','+faststart',path.join(dir,'flowaudit-vsl.mp4')],{stdio:'inherit'});
  if(mastered.status!==0)throw new Error('Final audio encoding failed');
  const result=spawnSync('ffmpeg',['-v','error','-y','-i',path.join(dir,'flowaudit-vsl.mp4'),'-frames:v',String(data.openingDuration),'-t',String(data.openingDuration/data.fps),'-map','0:v:0','-map','0:a:0','-c:v','copy','-c:a','aac','-b:a','192k','-movflags','+faststart',path.join(dir,'flowaudit-opening.mp4')],{stdio:'inherit'});
  if(result.status!==0)throw new Error('Opening export failed');
 }
} finally {await browser.close({silent:true})}
