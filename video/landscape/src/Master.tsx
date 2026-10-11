import React from 'react';import {Sequence,useCurrentFrame,Audio,staticFile} from 'remotion';
import Narrative from './scenes/narrative/Scene';import Evidence from './scenes/evidence/Scene';
import productions from './productions.json';import {timeline} from './timeline';
export type FilmName=keyof typeof productions;
export const Master:React.FC<{film?:FilmName}>=({film='MainVSL'})=>{const f=useCurrentFrame();const data=productions[film];const segments=film==='MainVSL'?timeline.map(t=>({...data.segments.find((s:any)=>s.from===t.from),from:t.from,duration:t.duration})):data.segments;return <>{segments.map((seg:any,i:number)=>{
 const cue=(data.captions as {from:number;to:number;text:string}[]).find((c:any)=>f>=c.from&&f<c.to);return <Sequence key={i} from={seg.from} durationInFrames={seg.duration}>
 {seg.kind==='narration'?<Narrative {...seg.visual} caption={cue?.text||''}/>:<Evidence {...seg.visual} sourceFrom={seg.sourceFrom} caption={cue?.text||''}/>}
 </Sequence>})}{data.audio?<Audio src={staticFile(data.audio)}/>:null}</>};
