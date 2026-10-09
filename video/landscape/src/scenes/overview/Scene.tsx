import React from 'react';
import {spring,useCurrentFrame,useVideoConfig} from 'remotion';
import {system as s} from '../../system/sceneSystem';
import {Stage} from '../../system/Stage';
import {defaults,OverviewProps} from './schema';
export default function OverviewScene(input:Partial<OverviewProps>){
 const p={...defaults,...input}; const f=useCurrentFrame();const {fps}=useVideoConfig();const o=s.overview;
 const entry=(i:number)=>spring({frame:f-p.enterFrames-i*p.staggerFrames,fps,config:i?s.springs.pop:s.springs.settle});
 const box=(i:number):React.CSSProperties=>({opacity:entry(i),transform:`translateY(${(1-entry(i))*o.entryDistance}px)`,background:s.paper,border:`1px solid ${s.line}`,borderRadius:s.radius.card,padding:o.cardPadding,boxSizing:'border-box',marginBottom:o.cardGap});
 return <Stage section="">
 <div style={{position:'absolute',left:s.stage.margin,top:o.eyebrowTop,fontSize:s.type.eyebrow,color:s.muted,letterSpacing:'0.08em'}}>{p.eyebrow}</div>
 <h1 style={{position:'absolute',left:s.stage.margin,top:o.headlineTop,width:o.headlineWidth,fontFamily:s.fonts.serif,fontSize:o.headlineSize,fontWeight:s.type.headlineWeight,lineHeight:1.04,margin:0,opacity:entry(0),transform:`translateY(${(1-entry(0))*o.entryDistance}px)`}}>{p.headline}</h1>
 <div style={{position:'absolute',left:s.layout.graphicLeft,width:s.layout.graphicWidth,top:o.graphicTop}}>
 {p.benchmark?<div style={box(1)}><div style={{fontFamily:s.fonts.serif,fontSize:o.numberSize}}>$50–$350</div><div style={{fontSize:o.itemSize,lineHeight:1.2}}>Exam, cleaning &amp; X-rays</div><div style={{fontSize:o.noteSize,marginTop:o.cardGap,color:s.muted}}>Published US patient costs<br/>CareCredit · 2023 study</div></div>:p.items.map((item,i)=><div key={item} style={{...box(i+1),fontSize:o.itemSize,lineHeight:1.15,background:p.cta&&i===p.items.length-1?s.ink:s.paper,color:p.cta&&i===p.items.length-1?s.paper:s.ink}}>{item}</div>)}
 </div>
 <div style={{position:'absolute',left:s.stage.margin,right:s.stage.margin,top:o.noteTop,fontSize:o.noteSize,color:s.muted,lineHeight:1.25}}>{p.note}</div>
 {p.caption?<div style={{position:'absolute',left:(s.stage.width-p.captionWidth)/2,width:p.captionWidth,bottom:p.captionBottom,minHeight:o.captionHeight,display:'flex',alignItems:'flex-end',justifyContent:'center',textAlign:'center',fontSize:p.captionSize,lineHeight:o.captionLineHeight,fontWeight:o.captionWeight,whiteSpace:'pre-line',color:s.ink}}>{p.caption}</div>:null}
 </Stage>
}
