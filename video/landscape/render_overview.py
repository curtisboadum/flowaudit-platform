"""Render the saved natural-speed overview; makes no generation/provider calls.
Use --sample for the internal 18-second opening gate. Source recordings stay unchanged.
"""
from pathlib import Path
import json, subprocess, argparse
root=Path(__file__).resolve().parent
ap=argparse.ArgumentParser();ap.add_argument('--sample',action='store_true');args=ap.parse_args()
subprocess.run(['python3',str(root/'prepare.py')],check=True)
data=json.loads((root/'src/overview.json').read_text()); segments=data['segments']
cmd=['ffmpeg','-v','error','-y'];filters=[]
for i,seg in enumerate(segments):
 source=root/'public'/seg['audioFile'];cmd+=['-i',str(source)]
 boundary=(seg['from']+seg['duration'])/data['fps'];end=seg['voiceFrom']+seg['audioDuration']
 if end>boundary+0.001:raise RuntimeError(f"Audio {seg['id']} overruns {end}>{boundary}")
 delay=round(seg['voiceFrom']*1000)
 filters.append(f"[{i}:a]atrim=start={seg['audioStart']}:duration={seg['audioDuration']},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,loudnorm=I=-18:TP=-3:LRA=7,adelay={delay}|{delay},apad=whole_dur=90[a{i}]")
cmd+=['-stream_loop','-1','-i',str(root/'public/audio/overview/original-score.wav')]
quiet='+'.join(f"between(t,{s['voiceFrom']-.05},{s['voiceFrom']+s['audioDuration']+.1})" for s in segments if s['id'].startswith('D'))
filters.append(f"[{len(segments)}:a]aresample=48000,volume='if({quiet},0,0.24)':eval=frame,afade=t=in:d=0.6,afade=t=out:st=88.8:d=1.2,atrim=duration=90[m]")
filters.append(''.join(f'[a{i}]' for i in range(len(segments)))+f'[m]amix=inputs={len(segments)+1}:normalize=0:duration=longest,loudnorm=I=-16:TP=-1.5:LRA=7,atrim=duration=90[out]')
cmd+=['-filter_complex',';'.join(filters),'-map','[out]','-ar','48000','-c:a','pcm_s24le',str(root/'public'/data['audio'])];subprocess.run(cmd,check=True)
subprocess.run(['npm','run','typecheck'],cwd=root,check=True)
(root/'out').mkdir(exist_ok=True);stem='Overview-opening' if args.sample else 'Overview90';seconds=18 if args.sample else 90
cmd=['npx','remotion','render','Overview90',str(root/f'out/{stem}-render.mp4'),'--codec=h264','--crf=20','--concurrency=3']
if args.sample:cmd+=['--frames=0-539']
subprocess.run(cmd,cwd=root,check=True)
subprocess.run(['ffmpeg','-v','error','-y','-i',str(root/f'out/{stem}-render.mp4'),'-i',str(root/'public'/data['audio']),'-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-af',f'apad=whole_dur={seconds},atrim=duration={seconds}','-ar','48000','-b:a','192k','-t',str(seconds),'-movflags','+faststart',str(root/f'out/{stem}.mp4')],check=True)
