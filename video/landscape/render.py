"""Render the landscape layouts and retain exact approved audio packets."""
from pathlib import Path
import subprocess
root=Path(__file__).resolve().parent
subprocess.run(['python3','prepare.py'],cwd=root,check=True)
subprocess.run(['npm','run','typecheck'],cwd=root,check=True)
(root/'out').mkdir(exist_ok=True)
for name in ['MainVSL','RoutineDemonstration','ExecutiveSummary','Teaser']:
 raw=root/'out'/f'{name}-render.mp4'
 subprocess.run(['npx','remotion','render',name,str(raw),'--codec=h264','--crf=20','--concurrency=4'],cwd=root,check=True)
 subprocess.run(['ffmpeg','-v','error','-y','-i',str(raw),'-i',str(root/'public/audio'/f'{name}.m4a'),'-map','0:v:0','-map','1:a:0','-c','copy','-movflags','+faststart',str(root/'out'/f'{name}.mp4')],check=True)
