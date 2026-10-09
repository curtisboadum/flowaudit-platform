"""Rebuild the approved natural-speed overview mix and render exactly 2700 frames.
Requires npm ci, ffmpeg, ffprobe, and the delivered public/audio/overview source folder.
No provider calls or generation costs. Existing film exports are untouched.
"""
from pathlib import Path
import json,subprocess
root=Path(__file__).resolve().parent
data=json.loads((root/'src/overview.json').read_text());audio=root/'public/audio/overview'
filters=[];cmd=['ffmpeg','-v','error','-y']
for i,seg in enumerate(data['segments']):
 source=audio/f'O{i+1:02}.wav'
 duration=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(source)]))
 end=seg['voiceFrom']+duration
 boundary=(data['segments'][i+1]['from']/30 if i+1<len(data['segments']) else 90)
 if end>boundary+0.01:raise RuntimeError(f'Voice take {i+1} overruns its scene: {end}>{boundary}')
 cmd+=['-i',str(source)];delay=round(seg['voiceFrom']*1000)
 filters.append(f'[{i}:a]aresample=48000,aformat=channel_layouts=stereo,loudnorm=I=-18:TP=-3:LRA=7,adelay={delay}|{delay},apad=whole_dur=90[a{i}]')
cmd+=['-stream_loop','-1','-i',str(audio/'original-score.wav')]
filters.append('[7:a]aresample=48000,volume=0.35,afade=t=in:d=2,afade=t=out:st=87:d=3,atrim=duration=90[m]')
filters.append(''.join(f'[a{i}]' for i in range(7))+'[m]amix=inputs=8:normalize=0:duration=longest,loudnorm=I=-16:TP=-1.5:LRA=7,atrim=duration=90[out]')
cmd+=['-filter_complex',';'.join(filters),'-map','[out]','-ar','48000','-c:a','pcm_s24le',str(audio/'mix.wav')]
subprocess.run(cmd,check=True)
subprocess.run(['npm','run','typecheck'],cwd=root,check=True)
(root/'out').mkdir(exist_ok=True)
subprocess.run(['npx','remotion','render','Overview90',str(root/'out/Overview90-render.mp4'),'--codec=h264','--crf=20','--concurrency=3'],cwd=root,check=True)

subprocess.run(['ffmpeg','-v','error','-y','-i',str(root/'out/Overview90-render.mp4'),'-i',str(audio/'mix.wav'),'-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-af','apad=whole_dur=90,atrim=duration=90','-ar','48000','-b:a','192k','-t','90','-movflags','+faststart',str(root/'out/Overview90.mp4')],check=True)
