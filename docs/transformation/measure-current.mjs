import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'node:fs/promises';
const chrome=await chromeLauncher.launch({chromeFlags:['--headless','--no-sandbox'],chromePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const results=[];
try {
  for(const [name,path] of [['home','/'],['product','/phone-agent'],['demos','/demos']]) {
    const result=await lighthouse('http://localhost:3016'+path,{port:chrome.port,output:'json',onlyCategories:['performance','accessibility','best-practices','seo'],logLevel:'error'});
    await fs.writeFile(`docs/transformation/retirement-lighthouse-${name}.json`,result.report);
    const row={name,scores:Object.fromEntries(Object.entries(result.lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)])),metrics:Object.fromEntries(['largest-contentful-paint','cumulative-layout-shift','total-blocking-time'].map(k=>[k,result.lhr.audits[k].displayValue]))};
    results.push(row);console.log(JSON.stringify(row));
  }
} finally {await chrome.kill();}
await fs.writeFile('docs/transformation/retirement-performance-summary.json',JSON.stringify({checkpoint:'legacy-media-retirement-20261021',scope:'Single local Lighthouse mobile lab sample per route, not field CWV',results},null,2));
