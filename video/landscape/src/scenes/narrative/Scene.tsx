import React from 'react';
import {useCurrentFrame,useVideoConfig,spring,interpolate} from 'remotion';
import {system as s} from '../../system/sceneSystem';
import {Stage} from '../../system/Stage';
import {defaults,NarrativeProps} from './schema';
export const Caption:React.FC<{text:string;top?:number}>=({text,top})=>text?<div style={{position:'absolute',left:s.stage.margin,right:s.stage.margin,top:top??s.layout.captionTop,height:s.layout.captionHeight,display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center',fontSize:s.type.caption,lineHeight:1.02,fontWeight:500,padding:s.layout.captionPadding,borderRadius:s.layout.captionRadius,background:s.paper,border:`1px solid ${s.line}`,boxSizing:'border-box'}}>{text}</div>:null;
export default function Narrative(input:Partial<NarrativeProps>){
 const p={...defaults,...input};const f=useCurrentFrame();const {fps}=useVideoConfig();
 const entry=(i:number)=>spring({frame:f-p.enterFrames-i*p.staggerFrames,fps,config:i?s.springs.pop:s.springs.settle});
 const box=(i:number):React.CSSProperties=>({opacity:entry(i),transform:`translateY(${(1-entry(i))*s.layout.entryDistance}px)`,background:s.paper,border:`1px solid ${s.line}`,borderRadius:s.radius.card,padding:p.mode==='value'?s.layout.valuePadding:s.layout.padding,boxSizing:'border-box'});
 return <Stage section={p.footer}>
 <div style={{position:'absolute',left:s.stage.margin,top:s.layout.eyebrowTop,fontSize:s.type.eyebrow,color:s.muted,letterSpacing:'0.08em'}}>{p.eyebrow}</div>
 <h1 style={{position:'absolute',left:s.stage.margin,width:s.layout.headlineWidth,top:s.layout.headlineTop,fontSize:s.type.headline,fontWeight:s.type.headlineWeight,fontFamily:s.fonts.serif,lineHeight:1.04,letterSpacing:'-0.025em',margin:0,opacity:entry(0),transform:`translateY(${(1-entry(0))*s.layout.entryDistance}px)`}}>{p.headline}</h1>
 <div style={{position:'absolute',left:s.layout.graphicLeft,width:s.layout.graphicWidth,top:p.graphicY,transform:`scale(${p.scale})`,transformOrigin:'top center'}}>
 {p.mode==='value'?<>
 <div style={{...box(1),fontSize:s.layout.smallSize,color:s.muted}}>Illustration only · Hypothetical inputs</div>
 <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:s.layout.gap,marginTop:s.layout.gap}}><div style={{...box(2),flex:1}}><div style={{fontSize:s.type.data,fontFamily:s.fonts.serif}}>{p.appointments}</div><div style={{fontSize:s.layout.smallSize}}>additional attended<br/>appointments</div></div><div style={{fontSize:s.type.brand}}>×</div><div style={{...box(3),flex:1}}><div style={{fontSize:s.layout.valueNumberSize,fontFamily:s.fonts.serif}}>${p.assumedValue}</div><div style={{fontSize:s.layout.smallSize}}>assumed gross value<br/>per appointment</div></div></div>
 <div style={{...box(4),marginTop:s.layout.gap,display:'flex',alignItems:'center',justifyContent:'space-between'}}><div><div style={{fontSize:s.layout.smallSize}}>Gross appointment value</div><div style={{fontSize:s.layout.smallSize,color:s.muted}}>Before costs · Not a forecast</div></div><div style={{fontFamily:s.fonts.serif,fontSize:s.layout.valueNumberSize}}>${Math.round(interpolate(f,[p.enterFrames+4*p.staggerFrames,p.enterFrames+4*p.staggerFrames+25],[0,p.appointments*p.assumedValue],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}))}</div></div>
 </>:p.mode==='cta'?<>
 <div style={{...box(1)}}><div style={{fontSize:s.layout.smallSize,color:s.muted}}>Bring the owner or purchasing decision-maker</div><div style={{fontSize:s.layout.ctaSize,marginTop:s.layout.gap,lineHeight:1.3}}>Requirements. Scope.<br/>Implementation. Investment.</div></div>
 <div style={{...box(2),marginTop:s.layout.gap,background:s.ink,color:s.paper,borderRadius:s.radius.pill,display:'flex',alignItems:'center',justifyContent:'space-between'}}><div style={{fontSize:s.layout.itemSize}}>Book a 15-minute walkthrough</div><span style={{fontSize:s.layout.ctaSize}}>↗</span></div><div style={{fontSize:s.type.brand,textAlign:'center',marginTop:s.layout.gap}}>{p.ctaUrl}</div>
 </>:<>
 {p.items.map((v,i)=><div key={i} style={{...box(i+1),padding:p.mode==='steps'?s.layout.stepPadding:s.layout.padding,marginBottom:p.mode==='steps'?s.layout.stepGap:s.layout.gap,display:'flex',alignItems:'center',gap:s.layout.gap}}><span style={{fontFamily:s.fonts.serif,fontSize:s.layout.cardNumberSize,color:s.muted}}>{String(i+1).padStart(2,'0')}</span><div style={{fontSize:s.layout.itemSize,lineHeight:1.2}}>{v}</div></div>)}
 </>}
 </div><Caption text={p.caption}/>
 </Stage>;
}
