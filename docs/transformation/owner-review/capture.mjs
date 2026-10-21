import {chromium} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext();
await context.addInitScript(()=>localStorage.setItem('fa-analytics-consent','declined'));
await context.route('**/*',route=>['GET','HEAD'].includes(route.request().method())?route.continue():route.abort());
const page=await context.newPage();
for(const [name,path] of [['home','/'],['product','/phone-agent'],['home-services','/industries/home-services'],['demos','/demos'],['booking','/book?service=phone-agent']]) for(const [device,width,height] of [['desktop',1440,1000],['mobile',390,844]]) {
 await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:3016'+path);await page.locator('h1').waitFor();
 if(name==='booking'){try{await page.frameLocator('iframe').getByRole('heading',{name:'FlowAudit Call',exact:true}).waitFor({timeout:15000});}catch{console.log('Cal calendar unavailable; showing actual fallback state');}}
 await page.screenshot({path:`docs/transformation/owner-review/flowaudit-${name}-${device}.png`,fullPage:true});
}
await browser.close();
