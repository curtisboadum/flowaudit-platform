import React, { useEffect, useState } from "react";
import { AbsoluteFill, cancelRender, continueRender, delayRender, staticFile } from "remotion";
import { system } from "../../system/sceneSystem";
import { AssetDefinitions, Caller, Clock, DeskPhone, PaperStack, Receptionist, ReceptionScreen, Request } from "./assets";
import { type ReceptionStudyProps } from "./schema";
const S = system.reception;
const P = S.palette;

function Caption({children}:{children:string}) {
  return <g><rect x="145" y={S.stage.captionTop} width="1630" height={S.stage.captionHeight} rx="18" fill={P.ink}/><text x="960" y={S.stage.captionTop+80} textAnchor="middle" fill={P.white} fontSize={S.type.caption} fontWeight="500">{children}</text></g>;
}
function Brand() {
  return <image href={staticFile("brand.svg")} x="100" y="66" width="250" height="75"/>;
}
function PhoneStudy() {
  return <>
    <text x="100" y="125" fontSize={S.type.eyebrow} letterSpacing="4" fill={P.shade}>FLOWAUDIT / OBJECT STUDY 01</text>
    <text x="100" y="244" fontSize="90" fontFamily={S.fonts.serif}>Recognisable before it moves.</text>
    <text x="104" y="298" fontSize={S.type.label} fill={P.shade}>A seated handset. A stable base. A restrained ring.</text>
    <DeskPhone x={170} y={442} scale={1.68}/>
    <path d="M1070 382V956" stroke={P.paper} strokeWidth="2"/>
    <text x="1150" y="393" fontSize={S.type.eyebrow} fill={P.shade}>SILHOUETTE</text>
    <DeskPhone x={1495} y={340} scale={0.45} silhouette/>
    <text x="1150" y="583" fontSize={S.type.eyebrow} fill={P.shade}>RING POSES</text>
    <DeskPhone x={1140} y={651} scale={0.65} angle={-S.phone.ringAngle} lift={S.phone.ringLift} ringing/>
    <DeskPhone x={1500} y={651} scale={0.65} angle={S.phone.ringAngle} lift={S.phone.ringLift} ringing/>
    <text x="1148" y="902" fontSize={S.type.note} fill={P.shade}>The receiver moves within the cradle.</text>
    <text x="1148" y="946" fontSize={S.type.note} fill={P.shade}>The phone body stays grounded.</text>
    <text x="100" y="1030" fontSize={S.type.note} fill={P.shade}>Original vector construction · three-quarter view · upper-left light</text>
  </>;
}
function OpeningStudy(props:ReceptionStudyProps) {
  return <>
    <Brand/>
    <g transform={S.stage.artTransform}>
    <text x="143" y="242" fontSize={S.type.title} fontWeight="550" letterSpacing="-2">Busy desk</text>
    <text x="1100" y="242" fontSize={S.type.title} fontWeight="550" letterSpacing="-2">After hours</text>
    <path d="M972 260V800" stroke={P.paper} strokeWidth="2"/>
    <path d="M102 784H909L866 811H149Z" fill={P.paper} opacity="0.6"/>
    <path d="M1066 784H1820L1777 811H1109Z" fill={P.paper} opacity="0.6"/>
    <ReceptionScreen {...props.screen} open={props.shutterOpen}/>
    <Clock x={1708} y={322} r={43}/>
    <Receptionist x={701} y={343} scale={0.92}/>
    <DeskPhone {...props.deskPhone} angle={props.handsetAngle} lift={props.handsetLift} ringing/>
    <DeskPhone {...props.nightPhone}/>
    <Caller {...props.firstCaller}/>
    <Caller {...props.secondCaller} second/>
    <PaperStack {...props.paper}/>
    <Request x={515} y={697} scale={0.71}/>
    </g>
    {props.showCaption && <Caption>The phone rings.</Caption>}
  </>;
}
function OutcomeStudy(props:ReceptionStudyProps) {
  return <>
    <Brand/>
    <g transform={S.stage.artTransform}>
    <text x="960" y="236" textAnchor="middle" fontSize={S.type.title} fontWeight="550" letterSpacing="-2">Agreed workflows</text>
    <ellipse cx="963" cy="796" rx="447" ry="31" fill={P.ink} opacity="0.12" filter="url(#ground-shadow)"/>
    <g transform={`translate(${props.station.x} ${props.station.y}) scale(${props.station.scale})`}>
      <path d="M25 0H674Q706 0 706 32V414L674 450H25Q0 450 0 424V30Q0 0 25 0Z" fill={P.shade}/>
      <rect width="686" height="429" rx="28" fill="url(#blue)"/>
      <rect x="35" y="37" width="616" height="233" rx="18" fill={P.ink}/>
      <rect x="35" y="37" width="616" height="73" rx="12" fill="url(#screen)"/>
      <path d="M44 70H642M44 97H642" stroke={P.muted} strokeWidth="2"/>
      <rect x="294" y="101" width="95" height="9" rx="4.5" fill={P.shade}/>
      <path d="M18 267H668L649 296H34Z" fill={P.paper}/><path d="M34 296H649V308H34Z" fill={P.muted}/>
      <rect x="15" y="174" width="47" height="54" rx="12" fill={P.white}/><rect x="25" y="186" width="28" height="15" rx="5" fill={P.blue}/>
      <Request x={309} y={141} resolved scale={1.05}/>
      <path d="M43 341H237Q257 341 257 360V410H43Z" fill={P.shade}/>
      <rect x="64" y="329" width="180" height="61" rx="8" fill={P.paper}/>
      <path d="M45 366H260V410H45Z" fill={P.white}/>
      <rect x="68" y="386" width="57" height="5" rx="2.5" fill={P.blue}/>
    </g>
    <Caller x={199} y={411} scale={1.21} status="resolved"/>
    <Caller x={1595} y={411} scale={1.21} second status="waiting"/>
    <DeskPhone x={337} y={672} scale={0.43}/>
    <DeskPhone x={1400} y={672} scale={0.43}/>
    <g transform="translate(1217 590) rotate(4)">
      <path d="M0 21Q0 4 18 4H74L89 21H199Q214 21 214 36V180H0Z" fill={P.paper}/>
      <Request x={21} y={6} second scale={1}/>
      <path d="M-7 91H72L89 107H214L207 183H0Z" fill={P.blue}/>
      <path d="M5 183H207" stroke={P.muted} strokeWidth="5"/>
      <circle cx="174" cy="143" r="24" fill={P.white}/><path d="M174 128V143L184 148" stroke={P.ink} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </g>
    </g>
    {props.showCaption && <Caption>Through agreed workflows.</Caption>}
  </>;
}
export default function ReceptionStudy(props:ReceptionStudyProps) {
  const [handle]=useState(()=>delayRender("Load supplied FlowAudit fonts"));
  useEffect(()=>{
    Promise.all([
      new FontFace(S.fonts.sans,`url(${staticFile("fonts/inter.woff2")})`,{weight:"100 900"}).load(),
      new FontFace(S.fonts.serif,`url(${staticFile("fonts/instrument-serif.woff2")})`).load(),
    ]).then(fonts=>{fonts.forEach(font=>document.fonts.add(font));continueRender(handle);}).catch(cancelRender);
  },[handle]);
  return <AbsoluteFill style={{background:P.white}}>
    <svg viewBox="0 0 1920 1080" width="1920" height="1080" xmlns="http://www.w3.org/2000/svg" style={{fontFamily:S.fonts.sans,color:P.ink}} fill={P.ink}>
      <AssetDefinitions/>
      <rect width="1920" height="1080" fill={P.white}/>
      {props.study === "phone" ? <PhoneStudy/> : props.study === "opening" ? <OpeningStudy {...props}/> : <OutcomeStudy {...props}/>}
    </svg>
  </AbsoluteFill>;
}
