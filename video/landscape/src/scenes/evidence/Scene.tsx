import React from 'react';
import {OffthreadVideo,staticFile} from 'remotion';
import {Stage} from '../../system/Stage';
import {system as s} from '../../system/sceneSystem';
import {defaults,EvidenceProps} from './schema';
import {Caption} from '../narrative/Scene';
export default function Evidence(input:Partial<EvidenceProps>){const p={...defaults,...input};return <Stage section="">
 <div style={{position:'absolute',left:0,top:s.layout.sourceTop,width:'100%',height:s.layout.sourceHeight,overflow:'hidden'}}><OffthreadVideo src={staticFile(p.source)} startFrom={Math.round(p.sourceFrom*30)} muted style={{width:'100%',height:'100%',objectFit:'contain'}}/></div>
 <div style={{position:'absolute',left:s.stage.margin,right:s.stage.margin,top:s.layout.sourceTitleTop,fontFamily:s.fonts.serif,fontSize:s.layout.sourceTitleSize}}>{p.headline}</div>
 <div style={{position:'absolute',left:s.stage.margin,width:p.kind==='routine'?s.layout.callWidth:s.layout.questionNoteWidth,top:p.kind==='routine'?s.layout.disclosureTop:s.layout.questionNoteTop,fontSize:s.type.disclosure,color:s.muted,lineHeight:1.2,whiteSpace:'pre-line'}}>{p.disclosure}</div>
 <Caption text={p.caption}/>
 </Stage>;}
