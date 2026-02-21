import { chromium } from "playwright";
import { mkdirSync } from "fs";

const BASE = "https://flowaudit-platform.vercel.app";
const pages = [
  { name: "home", path: "/" },
  { name: "web-design", path: "/web-design" },
  { name: "careers", path: "/careers" },
  { name: "calculator", path: "/calculator" },
  { name: "about", path: "/about" },
  { name: "book", path: "/book" },
];

const viewports = [
  { name: "375", width: 375, height: 812 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1440", width: 1440, height: 900 },
];

const outDir = new URL("./", import.meta.url).pathname;

async function run() {
  const browser = await chromium.launch();

  for (const vp of viewports) {
    const dir = `${outDir}${vp.name}`;
    mkdirSync(dir, { recursive: true });
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    for (const pg of pages) {
      console.log(`📸 ${vp.name}px — ${pg.name}`);
      await page.goto(`${BASE}${pg.path}`, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: `${dir}/${pg.name}.png`,
        fullPage: true,
      });
    }

    await context.close();
  }

  await browser.close();
  console.log("✅ All screenshots taken");
}

run().catch(console.error);
