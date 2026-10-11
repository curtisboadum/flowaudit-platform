# Portable editable opening

Unzip `flowaudit-opening-editable-source.zip`. With Node.js 24:

```sh
npm ci
npm run typecheck
npx remotion render src/index.ts BoldOpening opening.mp4 --codec=h264 --crf=18 --concurrency=2
```

18 seconds, 1920×1080, 30fps; Remotion 4.0.534. No provider or model access is needed. Local fonts, licences, exact supplied mark, original B01–B03 audio and provenance are bundled. The render callback fallback from the existing engine is retained.

On this macOS host, a fresh bundled Headless Shell stalled at frame capture after loading the composition and font. The same pinned Remotion engine rendered successfully with installed Chrome. The tested fallback is:

```sh
npx remotion render src/index.ts BoldOpening opening.mp4 --codec=h264 --crf=18 --concurrency=1 --disable-shared-memory-capture --chrome-mode=chrome-for-testing --browser-executable="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

Use the equivalent installed Chrome executable on another operating system. This selects a browser for the same Remotion renderer; it does not invoke a rendering provider. See the official [browser executable option](https://www.remotion.dev/docs/options/browser-executable). The delivered proof was rendered with the existing Headless Shell before the capture stall occurred; the fresh portable Chrome render is a separate verification render. Browser rasterisation differs slightly, so byte identity is not claimed.

Edit src/scenes/bold-opening/schema.ts and src/bold-opening.json. Visual constants live in src/system/sceneSystem.ts. `OpeningProofNested` verifies the same scene nested through a Master composition. Portable Master is an opening-only wrapper; repository Master exposes an opt-in proof path and retains its existing film defaults.

`review/opening-review.html` plays the rendered MP4 beside the remote reference when served with adjacent delivery files. The actual website iframe requires the repository's running website and the session review proxy. Those are not bundled as a second website. No active website film is replaced by this package.

Visual/motion and listening approval remain outstanding. Genuine source recording excerpts are retained in the website repository; they are not needed to render this opening. Later assembly must preserve their original pixels and dialogue at 9.24–29.40s, 42.70–52.00s and 75.75–82.55s, and label the genuine 76.45s calendar frame as a still.
