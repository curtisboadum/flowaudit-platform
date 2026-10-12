import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, cancelRender, continueRender, delayRender, spring, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {system} from '../../system/sceneSystem';
import data from '../../final-vsl.json';
import {AssetDefinitions, Caller, Clock, DeskPhone, PaperStack, Receptionist, ReceptionScreen, Request} from '../reception-studies/assets';
import {defaults, SceneProps} from './schema';

const P=system.reception.palette, T=system.finalVsl;
const cl={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const q=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...cl,easing:t=>t*t*(3-2*t)});
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
function Text({x=960,y=205,size=T.heading,fill=P.ink,anchor='middle',children,weight=550}:{x?:number;y?:number;size?:number;fill?:string;anchor?:'start'|'middle'|'end';children:React.ReactNode;weight?:number}){
 return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={fill} letterSpacing={size>65?-2:0}>{children}</text>;
}
function Check({x,y,r=30}:{x:number;y:number;r?:number}){return <g transform={`translate(${x} ${y})`}><circle r={r} fill={P.green}/><path d={`M${-r*.45} 0L${-r*.1} ${r*.35}L${r*.48} ${-r*.4}`} fill="none" stroke={P.ink} strokeWidth={r*.15} strokeLinecap="round" strokeLinejoin="round"/></g>}
function Holder({x,y,scale=1,card=1}:{x:number;y:number;scale?:number;card?:number}){
 return <g transform={`translate(${x} ${y}) scale(${scale})`}>
  <path d="M0 50Q0 32 18 32H74L90 48H213V213H0Z" fill={P.paper}/>
  <Request x={20} y={mix(-90,0,card)} second scale={1.12}/>
  <path d="M-7 131H78L96 149H225L218 216H0Z" fill={P.blue}/>
  <path d="M5 216H218" stroke={P.muted} strokeWidth="5"/>
  <circle cx="180" cy="179" r="25" fill={P.white}/><path d="M180 163V179L191 184" fill="none" stroke={P.ink} strokeWidth="3.5" strokeLinecap="round"/>
 </g>
}
function Counter({y=666}:{y?:number}){return <g><path d={`M105 ${y}H1785L1748 ${y+24}H145Z`} fill={P.paper}/><path d={`M145 ${y+24}H1748V${y+49}H145Z`} fill={P.muted} opacity=".46"/></g>}

export function OpeningScene(props:SceneProps){
 const f=props.frame,E=props.events;
 const nod=q(f,E.complete,E.complete+9)*(1-q(f,E.complete+9,E.complete+22));
 const retainedNod=q(f,E.retain,E.retain+9)*(1-q(f,E.retain+9,E.retain+24));
 const blink=(at:number)=>q(f,at,at+2)*(1-q(f,at+2,at+5));
 const organise=q(f,E.organise+8,E.organise+65), tidy=q(f,E.organise+70,E.organise+118);
 const release=q(f,E.openRequest,E.openRequest+23), complete=q(f,E.complete,E.complete+12), retain=q(f,E.retain,E.retain+18);
 const close=q(f,E.closeup,E.closeup+17)*(1-q(f,E.returnWide,E.returnWide+23));
 const z=mix(1,props.closeScale,close); // a motivated close-up of the retained identity, then a full outcome hold
 const cx=mix(960,1454,close),cy=mix(449,520,close);
 const leftRing=f<E.night?Math.sin(f*.34)*props.handsetAngle*q(f,7,19)*(1-q(f,80,95)):0;
 const rightRing=f>=E.night+64&&f<E.night+104?Math.sin((f-E.night-64)*.34)*props.handsetAngle*q(f,E.night+64,E.night+70)*(1-q(f,E.night+88,E.night+104)):0;
 const screenX=mix(1090,props.stationX,organise), screenY=mix(282,props.stationY,organise);
 const shut=mix(1-q(f,E.night+7,E.night+49),.10,organise);
 const open=mix(shut,.67,release);
 const paper=q(f,98,132)*(1-tidy);
 return <>
  {organise<1&&<g opacity={1-q(f,E.organise,E.organise+22)}>
   <Text x={470} y={215} size={T.heading}>Busy desk</Text><Text x={1440} y={215} size={T.heading}>After hours</Text>
  </g>}
  {organise>0&&<g opacity={q(f,E.organise+80,E.organise+100)*Math.max(1-q(f,E.closeup-8,E.closeup),q(f,E.returnWide+23,E.settled))}><Text y={208}>An agreed next step.</Text></g>}
  <g transform={`translate(960 449) scale(${z}) translate(${-cx} ${-cy})`}>
   <g opacity={1-organise}><path d="M970 265V688" stroke={P.paper} strokeWidth="2"/></g>
   <Counter/>
   <g opacity={1-organise}><Receptionist x={700} y={348} scale={.94} gesture={props.staffGesture*q(f,98,132)} headTilt={props.reactionTilt*q(f,98,132)}/></g>
   <g opacity={organise}><rect x={props.stationX-12} y={props.stationY-12} width={props.stationWidth+32} height={props.stationHeight+31} rx="30" fill="url(#blue)"/></g>
   <ReceptionScreen x={screenX} y={screenY} width={props.stationWidth} height={props.stationHeight} open={open}/>
   <g opacity={1-organise}><Clock x={1683} y={296} r={40}/></g>
   <DeskPhone x={mix(343,327,organise)} y={mix(384,586,organise)} scale={mix(props.phoneScale,.39,organise)} angle={leftRing} lift={Math.abs(leftRing)*props.handsetLift} ringing={f<E.night}/>
   <DeskPhone x={mix(1218,1465,organise)} y={mix(449,586,organise)} scale={mix(.70,.39,organise)} angle={rightRing} lift={Math.abs(rightRing)*props.handsetLift} ringing={f>=E.night&&f<E.organise}/>
   <Caller x={mix(163,157,organise)} y={386} scale={props.callerScale} headTilt={-props.reactionTilt*nod} gaze={props.gazeOffset*q(f,E.organise,E.organise+30)} blink={blink(162)+blink(473)} acknowledge={spring({frame:f-E.complete,fps:30,config:T.motion.paper})} status={complete===1?'resolved':'none'}/>
   <Caller x={mix(1604,1613,organise)} y={386} scale={props.callerScale} second headTilt={props.reactionTilt*retainedNod} gaze={-props.gazeOffset*q(f,E.organise+35,E.organise+60)} blink={blink(305)+blink(543)} acknowledge={spring({frame:f-E.retain,fps:30,config:T.motion.paper})} status={retain===1?'waiting':'none'}/>
   <g opacity={1-tidy} transform={`translate(${tidy*465} ${-tidy*105}) rotate(${tidy*12} 803 518)`}>
    <PaperStack x={mix(749,490,paper)} y={mix(473,464,paper)} scale={.69}/>
   </g>
   {f>E.organise+64&&<g opacity={q(f,E.organise+64,E.organise+78)}>
    <Request x={mix(496,778,q(f,E.openRequest+24,E.complete))} y={mix(531,411,q(f,E.openRequest+24,E.complete))} scale={1.16} resolved={complete===1}/>
   </g>}
   {tidy>0&&<g opacity={tidy} transform={`translate(0 ${mix(65,0,tidy)})`}><Holder x={1326} y={454} scale={1.07} card={retain}/></g>}
  </g>

 </>;
}

function ControlScene({frame,start,duration}:{frame:number;start:number;duration:number}){
 const f=frame-start, person=q(f,106,138);
 const accept=spring({frame:f-112,fps:30,config:T.motion.entry});
 return <>
  <Text y={207}>Your practice sets the limits.</Text>
  <Counter/>
  <g transform={`translate(${mix(0,-170,person)} 0)`}>
   <Caller x={195} y={365} scale={1.13} second/>
   <ReceptionScreen x={635} y={313} width={560} height={319} open={.52}/>
   <Request x={mix(690,835,accept)} y={mix(493,481,accept)} second scale={1.2}/>

   <DeskPhone x={370} y={586} scale={.38}/>
  </g>
  <Receptionist x={mix(1390,1310,person)} y={666-mix(1.45,1.60,person)*212} scale={mix(1.45,1.60,person)} gesture={defaults.staffGesture*accept} headTilt={-defaults.reactionTilt*person}/>
  {person>0&&<g opacity={person}><Text x={1050} y={695} size={T.label}>Clinical judgement stays with your team.</Text></g>}
 </>;
}
function FitScene({frame,start,duration}:{frame:number;start:number;duration:number}){
 const f=frame-start;const step=f<duration*.56?0:f<duration*.80?1:2;
 const headings=['Check the fit.','Configure and test.','Your approval.'];
 const sub=[['Scheduling. Forwarding.','Patient-data requirements.'],['With your team.','Against your agreed workflow.'],['Then activate.','Within the agreed scope.']];
 const enter=spring({frame:f,fps:30,config:T.motion.entry});
 const stepStart=step===0?0:step===1?duration*.56:duration*.80;
 const titleEnter=spring({frame:f-stepStart,fps:30,config:T.motion.entry});
 return <>
  <g transform={`translate(0 ${18*(1-titleEnter)})`}>
  <Text x={125} y={282} anchor="start" size={88}>{headings[step]}</Text>
  <Text x={130} y={375} anchor="start" size={T.label} weight={450}>{sub[step][0]}</Text>
  <Text x={130} y={444} anchor="start" size={T.label} weight={450}>{sub[step][1]}</Text>
  </g>
  <g transform={`translate(${(1-enter)*55} 0)`} opacity={enter}>
   <ReceptionScreen x={1100} y={283} width={630} height={354} open={mix(.44,.70,q(f,duration*.80,duration*.80+24))}/>
   <Receptionist x={1465} y={341} scale={.85}/>
   <DeskPhone x={1065} y={563} scale={.43}/>
   <Request x={1300} y={478} scale={1.33} resolved={step===2}/>
   <path d="M1055 671H1780L1745 695H1090Z" fill={P.paper}/>
  </g>
  <g transform="translate(133 577)">
   {[0,1,2].map(i=><g key={i} transform={`translate(${i*196} 0)`}><circle r="27" fill={i===step?P.blue:P.paper}/><text y="10" textAnchor="middle" fontSize="29" fill={i===step?P.white:P.shade}>{i+1}</text>{i<2&&<path d="M43 0H151" stroke={P.paper} strokeWidth="4"/>}</g>)}
  </g>
 </>;
}
function InvitationScene({frame,start}:{frame:number;start:number}){
 const f=frame-start, reveal=spring({frame:f-8,fps:30,config:T.motion.entry});
 return <>
  <Text x={125} y={267} anchor="start" size={91}>A clearer next step.</Text>
  <Text x={125} y={363} anchor="start" size={91}>For your practice.</Text>
  <g opacity={reveal} transform={`translate(0 ${24*(1-reveal)})`}>
   <rect x="128" y="439" width="920" height="128" rx="20" fill={P.blue}/>
   <Text x={588} y={520} size={56} fill={P.white}>Book a demo &amp; fit assessment</Text>
   <Text x={133} y={626} anchor="start" size={T.label} weight={450}>15 minutes · Your questions · A clear next step</Text>
  </g>
  <g><path d="M1180 710H1830L1800 730H1200Z" fill={P.paper}/></g>
  <Caller x={1265} y={371} scale={1.24} status="resolved" headTilt={-defaults.reactionTilt*q(f,12,25)*(1-q(f,25,42))}/>
  <Caller x={1575} y={371} scale={1.24} second status="waiting"/>
  <Holder x={1530} y={572} scale={.60}/>
  <DeskPhone x={1212} y={604} scale={.36}/>
 </>;
}
function IntroDemo(){return <>
 <Text x={135} y={285} anchor="start" size={85}>A new patient.</Text><Text x={135} y={382} anchor="start" size={85}>A real conversation.</Text>
 <Caller x={1350} y={278} scale={1.50}/><DeskPhone x={1090} y={469} scale={.66}/>
 <Text x={137} y={600} anchor="start" size={T.label} weight={450}>Recorded demonstration · Google Calendar</Text>
 </>}
function Caption({text}:{text:string}){
 return <foreignObject x={100} y={T.caption.top} width={1720} height={T.caption.height}>
  <div style={{display:'flex',justifyContent:'center',width:'100%'}}>
   <div data-caption-plate style={{width:'max-content',maxWidth:T.caption.width,boxSizing:'border-box',padding:`${T.caption.padY}px ${T.caption.padX}px`,borderRadius:T.caption.radius,background:P.ink,color:P.white,fontFamily:system.reception.fonts.sans,fontSize:T.caption.size,fontWeight:450,lineHeight:`${T.caption.lineHeight}px`,textAlign:'center',textWrap:'balance'}}>{text}</div>
  </div>
 </foreignObject>;
}
function DemoHint({frame,start}:{frame:number;start:number}) {
 const enter=spring({frame:frame-start,fps:30,config:T.motion.entry});
 return <g transform={`translate(0 ${22*(1-enter)})`}>
  <Text y={290}>See the whole conversation.</Text>
  <Text y={390} size={T.label} weight={450}>Both full demonstrations are on this page.</Text>
  <DeskPhone x={520} y={485} scale={.52}/><DeskPhone x={1150} y={485} scale={.52}/>
  <Text x={635} y={725} size={T.note}>New-patient booking</Text><Text x={1265} y={725} size={T.note}>A second recorded call</Text>
 </g>;
}
function Fonts(){const [h]=useState(()=>delayRender('Local FlowAudit fonts'));useEffect(()=>{Promise.all([new FontFace(system.reception.fonts.sans,`url(${staticFile('fonts/inter.woff2')})`,{weight:'100 900'}).load(),new FontFace(system.reception.fonts.serif,`url(${staticFile('fonts/instrument-serif.woff2')})`).load()]).then(fs=>{fs.forEach(f=>document.fonts.add(f));continueRender(h)}).catch(cancelRender)},[h]);return null;}
export function FilmPicture({frame,openingOnly=false}:{frame:number;openingOnly?:boolean}){
 const seg=data.segments.find(s=>frame>=s.from&&frame<s.from+s.duration)??data.segments[data.segments.length-1];
 const cap=data.captions.find(c=>frame>=c.from&&frame<c.to);
 const demo=seg.id.startsWith('D'),still=seg.id==='D03'||seg.id==='N06';
 return <AbsoluteFill style={{background:P.white,fontFamily:system.reception.fonts.sans}}>
  <Fonts/>
  {(demo||still)&&<AbsoluteFill>
   {still?<Img src={staticFile('demo/final-calendar-detail.png')} style={{position:'absolute',left:100,top:253,width:1720,height:496}}/>:
   <Sequence from={seg.from} durationInFrames={seg.duration} layout="none"><OffthreadVideo src={staticFile('demo/routine-landscape-panels.mp4')} startFrom={Math.round(seg.audioStart*30)} muted style={{position:'absolute',left:T.source.left,top:T.source.top,width:T.source.width,height:T.source.height}}/></Sequence>}
  </AbsoluteFill>}
  <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position:'absolute',inset:0,fontFamily:system.reception.fonts.sans}} fill={P.ink}>
   <AssetDefinitions/>
   {!demo&&!still&&<Text x={1820} y={98} anchor="end" size={T.note} weight={450} fill={P.shade}>Illustration</Text>}
   {frame<data.openingDuration?<OpeningScene {...defaults} frame={frame}/>:
    seg.id==='N05'?<IntroDemo/>:
    demo||still?<><Text y={195} size={still?57:66}>{still?'Still from recorded demonstration':seg.id==='D01'?'A new-patient enquiry.':'Appointment choices, in the original call.'}</Text><Text x={1800} y={99} anchor="end" size={T.note} weight={450}>Recorded demo · not a customer result</Text></>:
    seg.id==='N10'?<DemoHint frame={frame} start={seg.from}/>: 
    seg.id==='N07'?<ControlScene frame={frame} start={seg.from} duration={seg.duration}/>:
    seg.id==='N08'?<FitScene frame={frame} start={seg.from} duration={seg.duration}/>:
    <InvitationScene frame={frame} start={seg.from}/>}
   <image href={staticFile('brand.svg')} {...T.brand}/>
   {cap&&<Caption text={cap.text}/>}
  </svg>
 </AbsoluteFill>
}
export default function FinalVSL({openingOnly=false,nested=false}:{openingOnly?:boolean;nested?:boolean}){
 const frame=useCurrentFrame();
 return <>{nested?<Sequence from={0} durationInFrames={data.openingDuration}><FilmPicture frame={frame} openingOnly/></Sequence>:<FilmPicture frame={frame} openingOnly={openingOnly}/>}
 <Audio src={staticFile(data.audio)}/></>;
}
