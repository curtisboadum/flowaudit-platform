import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { writeFile } from "node:fs/promises";
const chrome = await chromeLauncher.launch({
  chromeFlags: ["--headless", "--no-sandbox"],
  chromePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
const scores = [];
for (const path of ["/", "/phone-agent", "/book?service=phone-agent"]) {
  const result = await lighthouse("http://localhost:3016" + path, {
    port: chrome.port,
    output: "json",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    logLevel: "error",
  });
  const name = path === "/" ? "home" : path.split("?")[0].replaceAll("/", "");
  await writeFile(`docs/redesign/evidence/lighthouse-${name}.json`, result.report);
  const row = {
    path,
    scores: Object.fromEntries(
      Object.entries(result.lhr.categories).map(([key, val]) => [key, Math.round(val.score * 100)]),
    ),
    metrics: Object.fromEntries(
      ["largest-contentful-paint", "cumulative-layout-shift", "total-blocking-time"].map((key) => [
        key,
        result.lhr.audits[key].displayValue,
      ]),
    ),
  };
  scores.push(row);
  console.log(JSON.stringify(row));
}
await chrome.kill();
await writeFile("docs/redesign/evidence/lighthouse-summary.json", JSON.stringify(scores, null, 2));
