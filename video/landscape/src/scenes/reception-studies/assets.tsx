import React from "react";
import { system } from "../../system/sceneSystem";
const P = system.reception.palette;
const S = system.reception;

export function AssetDefinitions() {
  return <defs>
    <linearGradient id="body" x1="0" y1="0" x2="0.8" y2="1"><stop stopColor={P.shade}/><stop offset="1" stopColor={P.ink}/></linearGradient>
    <linearGradient id="receiver" x1="0" y1="0" x2="1" y2="0.5"><stop stopColor={P.shade}/><stop offset="0.65" stopColor={P.ink}/><stop offset="1" stopColor={P.shade}/></linearGradient>
    <linearGradient id="paper" x1="0" y1="0" x2="0.8" y2="1"><stop stopColor={P.white}/><stop offset="1" stopColor={P.paper}/></linearGradient>
    <linearGradient id="blue" x1="0" y1="0" x2="1" y2="1"><stop stopColor={P.blue}/><stop offset="1" stopColor={P.shade}/></linearGradient>
    <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1"><stop stopColor={P.paper}/><stop offset="1" stopColor={P.muted}/></linearGradient>
    <filter id="ground-shadow" x="-50%" y="-150%" width="200%" height="400%"><feGaussianBlur stdDeviation={S.surface.shadowBlur}/></filter>
    <filter id="soft-shadow" x="-30%" y="-30%" width="180%" height="180%"><feDropShadow dx="0" dy="9" stdDeviation="8" floodColor={P.ink} floodOpacity="0.14"/></filter>
  </defs>;
}

const receiverPath = "M47 23Q42 19 42 10V-5Q42-17 54-19L95-20Q109-20 112-7L115 21Q116 34 104 39L96 42Q86 79 87 117L91 149Q109 150 112 166L115 193Q116 206 104 210L65 214Q50 214 47 201L42 176Q40 164 52 158L59 154Q62 98 55 46Z";
export function DeskPhone({ x = 0, y = 0, scale = 1, angle = 0, lift = 0, silhouette = false, ringing = false }: { x?: number; y?: number; scale?: number; angle?: number; lift?: number; silhouette?: boolean; ringing?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {!silhouette && <ellipse cx="210" cy="302" rx="210" ry="24" fill={P.ink} opacity={S.surface.shadowOpacity} filter="url(#ground-shadow)"/>}
    <g transform={S.phone.topPlane}>
      <path d="M12 238H373V269Q373 288 354 288H23Q4 288 4 269V240Z" fill={P.ink}/>
      <rect x="4" y="7" width="369" height="265" rx="25" fill={silhouette ? P.ink : "url(#body)"}/>
      {!silhouette && <>
        <path d="M29 8H347Q369 8 372 29" fill="none" stroke={P.muted} strokeOpacity="0.38" strokeWidth="2"/>
        <path d="M27 263H349" fill="none" stroke={P.shade} strokeWidth="3"/>
        <rect x="30" y="17" width="95" height="222" rx="28" fill={P.ink}/>
        <rect x="34" y="23" width="84" height="50" rx="15" fill={P.shade}/>
        <rect x="38" y="184" width="84" height="47" rx="15" fill={P.shade}/>
        <rect x="150" y="28" width="190" height="93" rx="11" fill={P.ink}/>
        <rect x="158" y="36" width="174" height="70" rx="6" fill={P.paper}/>
        <rect x="173" y="50" width="61" height="7" rx="3.5" fill={P.shade} opacity="0.55"/>
        <rect x="173" y="67" width="121" height="13" rx="6" fill={P.shade} opacity="0.82"/>
        <circle cx="317" cy="91" r="4" fill={ringing ? P.coral : P.blue}/>
        {[0,1,2,3].map(i=><rect key={i} x={166+i*42} y="114" width="28" height="7" rx="3.5" fill={P.muted} opacity="0.7"/>)}
        {[0,1,2,3].flatMap(row=>[0,1,2].map(col=><g key={`${row}-${col}`} transform={`translate(${153+col*44} ${142+row*26})`}><rect width="35" height="21" rx="5" fill={P.ink}/><rect width="35" height="18" rx="5" fill={P.shade}/><circle cx="17.5" cy="8" r="2" fill={P.white}/></g>))}
        <circle cx="313" cy="159" r="22" fill={P.ink}/><circle cx="313" cy="156" r="19" fill={P.shade}/><circle cx="313" cy="156" r="8" fill={P.muted}/>
        <rect x="291" y="194" width="45" height="17" rx="8" fill={P.blue}/><rect x="291" y="221" width="45" height="12" rx="6" fill={P.shade}/>
      </>}
      <g transform={`translate(0 ${-lift}) rotate(${angle} 79 110)`}>
        <path d={receiverPath} transform="translate(4 19)" fill={P.ink}/>
        <path d={receiverPath} transform="translate(0 10)" fill={silhouette ? P.ink : "url(#receiver)"}/>
        {!silhouette && <>
          <path d="M55 0L93-1Q99-1 100 6" fill="none" stroke={P.muted} strokeOpacity="0.5" strokeWidth="2"/>
          <path d="M61 61Q70 112 63 154" fill="none" stroke={P.muted} strokeOpacity="0.3" strokeWidth="2"/>
          <path d="M55 182L97 179" fill="none" stroke={P.shade} strokeWidth="5" strokeLinecap="round"/>
        </>}
      </g>
    </g>
    <path d="M40 206C-2 221-6 248 15 258C47 271 71 256 62 242C56 232 42 240 49 251C56 262 80 257 75 245C71 232 59 239 62 250C68 270 103 254 106 271C107 287 77 287 90 307" fill="none" stroke={P.ink} strokeWidth="5" strokeLinecap="round"/>
  </g>;
}

export function Caller({ x=0,y=0,scale=1,second=false,status="none", headTilt=0, gaze=0, blink=0, acknowledge=1 }: {x?:number;y?:number;scale?:number;second?:boolean;status?:"none"|"resolved"|"waiting";headTilt?:number;gaze?:number;blink?:number;acknowledge?:number}) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse cx="70" cy="278" rx="82" ry="14" fill={P.ink} opacity="0.1" filter="url(#ground-shadow)"/>
    <path d="M13 272L20 177Q23 157 52 151H91Q119 157 126 180L143 272Z" fill={second ? P.shade : P.blue}/>
    <path d="M25 181L42 271H12L20 203Z" fill={P.ink} opacity="0.15"/>
    <path d="M59 131H86V160Q73 176 53 155Z" fill={P.paper}/>
    <g transform={`rotate(${headTilt} 77 139)`}>
    <path d="M40 67Q38 35 71 30Q116 26 116 73V120Q110 146 80 145Q48 139 43 115Z" fill={P.paper}/>
    {second ? <><circle cx="74" cy="28" r="28" fill={P.ink}/><path d="M37 96Q25 50 50 37Q94 19 116 57L118 99L104 78L96 65Q69 75 42 65Z" fill={P.ink}/></> : <path d="M38 96Q20 52 51 36Q81 18 103 37L122 41L115 70Q84 76 62 61L45 73L47 99Z" fill={P.ink}/>}
    <path d="M96 93L104 113H92" fill="none" stroke={P.muted} strokeWidth="3" strokeLinecap="round"/>
    <g transform={`translate(${gaze} 0)`}><ellipse cx="66" cy="91" rx="3.5" ry={3.5*(1-blink)+.3} fill={P.ink}/><ellipse cx="100" cy="91" rx="3.5" ry={3.5*(1-blink)+.3} fill={P.ink}/></g>
    {second && <><rect x="49" y="81" width="30" height="22" rx="8" fill="none" stroke={P.ink} strokeWidth="3"/><rect x="89" y="81" width="26" height="22" rx="8" fill="none" stroke={P.ink} strokeWidth="3"/><path d="M79 89H89" stroke={P.ink} strokeWidth="3"/></>}
    <path d={status === "resolved" ? "M74 121Q83 130 94 119" : "M75 125H91"} fill="none" stroke={P.shade} strokeWidth="3" strokeLinecap="round"/>
    </g>
    <path d="M52 153L73 174L91 155" fill="none" stroke={P.white} strokeWidth="6" strokeLinejoin="round"/>
    <path d="M120 190L143 155L139 96" fill="none" stroke={second ? P.shade : P.blue} strokeWidth="25" strokeLinecap="round"/>
    <rect x="125" y="70" width="28" height="62" rx="7" transform="rotate(-7 139 100)" fill={P.ink}/>
    <path d="M145 126V107" stroke={P.paper} strokeWidth="13" strokeLinecap="round"/>
    <path d="M134 79H144" stroke={P.muted} strokeWidth="2" strokeLinecap="round"/>
    {status !== "none" && <g transform={`translate(114 -7) scale(${acknowledge})`}><circle r="32" fill={status === "resolved" ? P.green : P.paper}/>{status === "resolved" ? <path d="M-14 0L-4 10L15-12" stroke={P.ink} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/> : <><circle r="17" stroke={P.ink} strokeWidth="3" fill="none"/><path d="M0-10V0L8 5" stroke={P.ink} strokeWidth="3" fill="none" strokeLinecap="round"/></>}</g>}
  </g>;
}

export function Receptionist({x=0,y=0,scale=1,gesture=0,headTilt=0}: {x?:number;y?:number;scale?:number;gesture?:number;headTilt?:number}) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M5 212L16 150Q21 128 51 126H90Q119 129 130 153L150 211Z" fill={P.muted}/>
    <path d="M57 112H86V140L73 153L55 136Z" fill={P.paper}/>
    <g transform={`rotate(${headTilt} 73 130)`}>
    <rect x="38" y="36" width="72" height="94" rx="31" fill={P.paper}/>
    <path d="M34 88Q19 31 60 23Q105 12 121 50L108 76L99 52L74 66L45 59L46 89Z" fill={P.shade}/>
    <path d="M61 97H69M92 97H100M76 115H91" stroke={P.shade} strokeWidth="3" strokeLinecap="round"/>
    <path d="M30 90V65Q30 24 70 22Q107 22 116 58" fill="none" stroke={P.ink} strokeWidth="6"/>
    <rect x="25" y="73" width="14" height="30" rx="6" fill={P.ink}/>
    <path d="M33 101Q40 122 72 122" fill="none" stroke={P.ink} strokeWidth="4"/>
    <rect x="70" y="119" width="13" height="6" rx="3" fill={P.ink}/>
    </g>
    <g transform={`rotate(${-gesture} 128 155)`}>
    <path d="M128 155L147 188L181 171" fill="none" stroke={P.muted} strokeWidth="20" strokeLinecap="round"/>
    <path d="M177 173L190 169" stroke={P.paper} strokeWidth="13" strokeLinecap="round"/>
    </g>
    <path d="M63 141L72 154L87 140" fill="none" stroke={P.white} strokeWidth="5"/>
  </g>;
}

export function PaperStack({x=0,y=0,scale=1}: {x?:number;y?:number;scale?:number}) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse cx="100" cy="226" rx="118" ry="19" fill={P.ink} opacity="0.12" filter="url(#ground-shadow)"/>
    <path d="M-10 193L137 176L196 194L41 220Z" fill={P.muted}/><path d="M-10 183L137 166L196 184L41 210Z" fill={P.paper}/>
    <g transform="rotate(-7 90 100)" filter="url(#soft-shadow)"><rect width="163" height="204" rx="8" fill="url(#paper)"/><rect x="20" y="24" width="60" height="9" rx="4" fill={P.blue}/>{[0,1,2,3,4].map(i=><rect key={i} x="20" y={57+i*22} width={i===4?78:123} height="5" rx="2.5" fill={P.muted}/>)}<rect x="20" y="170" width="35" height="14" rx="4" fill={P.coral}/><path d="M129 0V27H163" fill={P.paper}/></g>
  </g>;
}

export function ReceptionScreen({x=0,y=0,width=650,height=430,open=0.2}: {x?:number;y?:number;width?:number;height?:number;open?:number}) {
  const inner=height-40; const shutter=inner*(1-open);
  return <g transform={`translate(${x} ${y})`}>
    <rect x="10" y="11" width={width} height={height} rx="24" fill={P.muted}/>
    <rect width={width} height={height} rx="24" fill="url(#paper)"/>
    <rect x="20" y="20" width={width-40} height={inner} rx="10" fill={P.ink}/>
    <rect x="20" y="20" width={width-40} height={shutter} rx="8" fill="url(#screen)"/>
    {Array.from({length:Math.floor(shutter/38)},(_,i)=><path key={i} d={`M25 ${54+i*38}H${width-25}`} stroke={P.muted} strokeWidth="2"/>)}
    <rect x={width/2-47} y={shutter-1} width="94" height="10" rx="5" fill={P.shade}/>
    <path d={`M-17 ${height}H${width+26}L${width+9} ${height+23}H-3Z`} fill={P.white}/><path d={`M-3 ${height+23}H${width+9}V${height+34}H-3Z`} fill={P.paper}/>
  </g>;
}

export function Clock({x,y,r=45}: {x:number;y:number;r?:number}) {
  return <g transform={`translate(${x} ${y})`}><circle cx="3" cy="5" r={r} fill={P.muted}/><circle r={r} fill={P.white}/>{[0,1,2,3].map(i=><path key={i} transform={`rotate(${i*90})`} d={`M0 ${-r+9}V${-r+15}`} stroke={P.muted} strokeWidth="3"/>)}<path d={`M0 ${-r*.56}V0H${r*.42}`} stroke={P.ink} strokeWidth="5" fill="none" strokeLinecap="round"/><circle r="5" fill={P.blue}/></g>;
}

export function Request({x,y,second=false,resolved=false,scale=1}: {x:number;y:number;second?:boolean;resolved?:boolean;scale?:number}) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} filter="url(#soft-shadow)"><rect width="165" height="112" rx="17" fill={P.white}/><rect width="9" x="0" y="16" height="80" rx="4" fill={second?P.shade:P.blue}/><circle cx="46" cy="43" r="17" fill={P.paper}/>{second ? <><circle cx="45" cy="23" r="9" fill={P.ink}/><path d="M29 42Q23 25 42 24Q65 24 64 42L54 34L32 35Z" fill={P.ink}/></> : <path d="M28 42Q22 26 40 24L61 26L62 35L44 35L33 31Z" fill={P.ink}/>}<path d="M29 67Q46 49 63 67V78H29Z" fill={second?P.shade:P.blue}/>{second && <path d="M34 40H44V47H34ZM49 40H59V47H49ZM44 43H49" fill="none" stroke={P.ink} strokeWidth="2"/>}<rect x="80" y="30" width="59" height="6" rx="3" fill={P.shade}/><rect x="80" y="47" width="43" height="5" rx="2.5" fill={P.muted}/>{resolved ? <g transform="translate(128 83)"><circle r="20" fill={P.green}/><path d="M-9 0L-2 7L10-8" fill="none" stroke={P.ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></g> : <rect x="80" y="78" width="45" height="5" rx="2.5" fill={P.muted}/>}</g>;
}
