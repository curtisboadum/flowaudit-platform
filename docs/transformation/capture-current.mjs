import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const browser = await chromium.launch({channel:'chrome',headless:true});
const routes = [['home','/'],['product','/phone-agent'],['home-services','/industries/home-services'],['demos','/demos'],['booking','/book'],['dental','/industries/dental']];
const results=[];
for(const [device,width,height] of [['desktop',1440,1000],['mobile',390,844]]) {
  const context=await browser.newContext({viewport:{width,height}});
  await context.addInitScript(()=>localStorage.setItem('fa-analytics-consent','declined'));
  const page=await context.newPage();
  for(const [name,path] of routes){
    await page.goto('http://localhost:3016'+path,{waitUntil:'networkidle'});
    if(name==='booking') await page.locator('iframe').first().waitFor({state:'visible',timeout:15000}).catch(()=>{});
    await page.screenshot({path:`docs/transformation/owner-review/flowaudit-${name}-${device}.png`,fullPage:true});
    results.push({name,device,path,mainVideos:await page.locator('main video').count(),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
  }
  await context.close();
}
await browser.close();
await fs.writeFile('docs/transformation/owner-review/retirement-capture.json',JSON.stringify({checkpoint:'legacy-media-retirement-20261021',notes:'Local production build. Existing calendar viewed without selecting or submitting.',results},null,2));
console.log(JSON.stringify(results));
