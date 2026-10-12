import React,{useEffect,useState} from 'react';
import {AbsoluteFill,staticFile,delayRender,continueRender} from 'remotion';
import {system as s} from './sceneSystem';
export const Stage:React.FC<{children:React.ReactNode;section?:string}>=({children,section})=>{
 const [handle]=useState(()=>delayRender('Loading local brand fonts'));
 useEffect(()=>{Promise.all([document.fonts.load('400 60px FlowSerif'),document.fonts.load('400 40px FlowInter'),document.fonts.load('600 40px FlowInter')]).then(()=>continueRender(handle));},[handle]);
 return <AbsoluteFill style={{background:s.bg,color:s.ink,fontFamily:s.fonts.sans}}>
 <style>{`@font-face{font-family:FlowInter;src:url('${staticFile('fonts/inter.woff2')}') format('woff2');font-weight:100 900;}@font-face{font-family:FlowSerif;src:url('${staticFile('fonts/instrument-serif.woff2')}') format('woff2');font-weight:400;}`}</style>
 <div style={{position:'absolute',zIndex:10,left:s.stage.margin,right:s.stage.margin,top:s.stage.top,display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:`1px solid ${s.line}`,paddingBottom:32}}>
 <div style={{fontFamily:s.fonts.serif,fontSize:s.type.brand}}>FlowAudit</div>
 <div style={{fontSize:26,color:s.muted}}>AI phone agent</div></div>
 {children}
 {section!==''?<div style={{position:'absolute',left:s.stage.margin,bottom:s.layout.footerBottom,fontSize:s.layout.footerSize,color:s.muted}}>{section||'Configured for your practice'}</div>:null}
 </AbsoluteFill>;
};
