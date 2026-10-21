import {chromium} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
await page.goto('http://127.0.0.1:3016');
await page.screenshot({path:'docs/transformation/home-desktop.png',fullPage:true});
await browser.close();
