"""Reuse the committed films' exact audio packets; no narration or music synthesis."""
from pathlib import Path
import json, subprocess
root=Path(__file__).resolve().parent
site=root.parents[1]
films={'MainVSL':'main','RoutineDemonstration':'routine','ExecutiveSummary':'summary','Teaser':'teaser'}
(root/'public/audio').mkdir(exist_ok=True)
for name,key in films.items():
 if not (site/'public/media'/f'{key}.mp4').exists() and (root/'public/audio'/f'{name}.m4a').exists():
  continue
 subprocess.run(['ffmpeg','-v','error','-y','-i',str(site/'public/media'/f'{key}.mp4'),'-map','0:a:0','-c:a','copy',str(root/'public/audio'/f'{name}.m4a')],check=True)
print('Prepared original audio packets from public/media. No audio generation.')
