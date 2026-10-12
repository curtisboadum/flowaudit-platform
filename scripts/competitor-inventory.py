import urllib.request,xml.etree.ElementTree as ET,re,json,concurrent.futures
from pathlib import Path
urls=[]
for host in ['https://bosar.agency','https://leftclick.ai']:
 try:
  body=urllib.request.urlopen(host+'/sitemap.xml',timeout=20).read();tree=ET.fromstring(body)
  locs=[node.text for node in tree.iter() if node.tag.endswith('loc')]
  for loc in locs:
   if loc.endswith('.xml'):
    sub=ET.fromstring(urllib.request.urlopen(loc,timeout=20).read());urls.extend(node.text for node in sub.iter() if node.tag.endswith('loc'))
   else:urls.append(loc)
 except Exception as e:print(host,type(e).__name__)
def inspect(url):
 try:
  response=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'FlowAudit redesign research'}),timeout=20);html=response.read().decode(errors='replace')
  plain=lambda s:re.sub('<[^>]+>','',s).strip()
  return {'url':url,'status':response.status,'title':[plain(x) for x in re.findall(r'<title[^>]*>(.*?)</title>',html,re.S)],'headings':[plain(x) for x in re.findall(r'<h[12][^>]*>(.*?)</h[12]>',html,re.S)],'formCount':len(re.findall(r'<form\b',html)),'scripts':re.findall(r'<script[^>]+src=["\']([^"\']+)',html),'bytes':len(html)}
 except Exception as e:return {'url':url,'error':type(e).__name__}
rows=list(concurrent.futures.ThreadPoolExecutor(max_workers=4).map(inspect,dict.fromkeys(urls)))
Path('docs/redesign/competitor-inventory.json').write_text(json.dumps(rows,indent=2));print('Indexed URLs checked:',len(rows),'successful:',sum(r.get('status')==200 for r in rows))
