# FlowAudit opening — verification report

## Delivery and approval state

Revised 18-second opening proof, not an approved opening or completed full film. Motion Builder creative direction; existing Remotion 4.0.534 deterministic assembly. Explicit user visual/motion approval is outstanding. Human listening approval is outstanding. No approval is inferred from the implementation request.

Started from a clean `feat/premium-redesign` checkout at `e6d3eb59024b6ff13e46bcee422971c5e80df7af`. No applicable AGENTS.md was found in the repository or its ancestor directories. No reset or unrelated changes. PR #20 is attached as project context. This delivery is local; no push, CI run, preview deployment, merge or production release was performed. The local source commit is recorded in source-commit.txt.

## What changed

Both oversized situations remain visible together at the start. Circle and rounded-square callers have durable identities. Paper blocks the desk connection; the closing shutter blocks the after-hours connection. Desk casing/keys and after-hours handset/clock remain recognisable through assembly.

The actual paper and shutter stretch into the upper and lower boundaries. Their print and slats remain visible after opening. The shutter lifts before the waiting caller moves underneath it, then docks below the paper. One agreed corridor opens deliberately. The circular caller resolves and becomes green at arrival; the square caller remains waiting at the lower boundary. Final result holds from 16–18 seconds. One workflow label; no staff branch. Escalation remains in the later treatment.

The previous proof's mostly uniform gathering motion, collapsing desk casing and disappearing paper/shutter boundaries are replaced. Internal draft review also found a caller crossing the shutter and a clock/paper overlap; those paths were revised before the delivered playback checks.

## Actual reference assessment

The new gallery page and actual animation were accessible. The hosted clip is 10 seconds, not the longer duration described in the reproduced prompt. It was played at browser rate 1 before proposing changes and replayed completely beside the revised proof. The clip's own speed/BPM graphics are part of the artwork. comparison-playback-trace.json records independent 1× playback through both endings.

Sampled observations show oversized cut-paper typography, recurring pixel figures, dialogue/paper panels, changes in emphasis and a high-contrast closing title. FlowAudit translates scale, hierarchy, identity and change/hold rhythm into its existing geometric language. It does not copy character assets, typography or music. Its continuous mechanism is an authored explanatory transformation; the reference does not supply that exact mechanical action. Precise reference easing curves, anticipation, weight and settling cannot be established conclusively from sampled screenshots. No claim of continuous human perception or audio listening is made. See motion-sheet.md for the assessment and translation.

## Playback and visual review

The delivered MP4 was played uninterrupted from start to finish at 1× through the actual website player at 390×844, 768×1024 and 1440×1100 browser viewports. Captions are burned into the proof; native controls remained visible. Once-per-second traces show increasing media time, readyState 4 and no reported media error through completion. The browser did not expose decoded/dropped-frame quality counters, so no zero-drop claim is made.

Screenshots cover interruption, transformation, closed mechanism and result. At 390px, the actual video is 348px wide inside the page margins. Large object silhouettes and the circular/square distinction remain visible; captions occupy their separate band above the controls. Agent review consists of sampled images during uninterrupted playback, not human visual approval or physical-device testing.

Native seeking from the ending to 9.0025s, resume and pause passed. Complete replays passed at all three sizes. No chapter-after-18s or 30-second CTA behaviour is claimed from this short proof. The active 90-second film and existing chapter/transcript copy remain unchanged. The review page discloses that mismatch.

The old embedded player was initially observed unloaded with preload=none; the new review server and explicit native Play action loaded and played the proof successfully. The session server supports ordinary and ranged media requests. It substitutes the opening, poster and caption downloads only on localhost:8797. It rejects POST requests. Direct opening-review.html playback also works with adjacent delivery files; the website iframe needs the running site and proxy. The remote reference requires internet.

## Technical checks

| Check | Result |
|---|---|
| Site lint and typecheck | Pass |
| Existing unit suite | 30 tests pass |
| Remotion typecheck | Pass |
| Beats sync check against this landscape app | 1 scene, 3 beats, 0 errors/warnings |
| Source whitespace check | Pass |
| Complete delivered render | 540 frames, H.264, 1920×1080, 30fps |
| Out-of-order render | Frame 480 → 230 → 480; repeated frame 480 PNG hashes match |
| Nested Master proof | Frame 480 PNG matches standalone exactly |
| Fresh portable npm ci/typecheck | Pass |
| Fresh portable full render | Pass with documented installed-Chrome fallback; 540 frames |
| Portable/full comparison | Mean SSIM 0.996033, minimum frame SSIM 0.993239 across all 540 frames |
| Portable still comparison | Same dimensions; mean absolute RGB difference 0.08575 / 0.08084 / 0.06779 on a 0–255 scale at frame 480 |
| Narration/audio | Decoded audio matches previous proof and portable render exactly |
| Website preservation | All 166 baseline website source/media files unchanged |

The full website production build and browser suite were not rerun: website source and repository media are unchanged, and their previous delivery checks are historical evidence, not new claims. No live booking-provider interaction was performed.

The component-library search was attempted before implementation. No library roots are configured. Existing project SVG geometry was reused; no library installation or generation provider was added. The sync checker was invoked with this app path explicitly because the global skill configuration points to an older portrait project. Its current implementation checks coverage/folders/assets; separate render/playback checks cover settling and continuity.

## Portable limitation and recovery

Fresh npm ci succeeded, but the bundled Headless Shell stalled at frame capture on this host after loading the composition and local font. A later repository still also stalled, so this was not isolated to the portable scene. Disabling shared-memory capture alone did not resolve it. The same pinned Remotion engine completed a still and full 540-frame render using installed Chrome, concurrency 1 and shared-memory capture disabled. The exact tested command is in SOURCE-README.md. No dependency patch, provider or engine migration was made.

The portable render is not byte-identical or pixel-identical to the delivered headless render. Browser rasterisation and capture differ; the measured comparisons above are the evidence, rather than an assertion of exact equality. The source ZIP excludes node_modules and browser binaries and includes the lockfile, fonts/licences, exact mark, original takes/provenance and editable source. Standard Remotion browser provisioning requires internet on first use. Default Headless Shell portability on this host remains unverified; the installed-Chrome path is verified.

## Audio, preservation and future evidence

B01–B03 takes and their placements at frames 9, 183 and 329 are unchanged. Decoded audio MD5 is `844cb5a45c86e98fdca6e42b494f5ccc`, equal to the previous opening and the fresh portable render. No speech acceleration, new narration, music, SFX or listening approval.

The active website overview, source recordings, booking journey and all website source/media hashes checked are unchanged. Exact mark and font files are bundled without alteration. Genuine recording footage is not used in this proof. After explicit opening approval, preserve original pixels and dialogue at 9.24–29.40s, 42.70–52.00s and 75.75–82.55s; label the genuine 76.45s calendar frame “Still from recorded demonstration”. Those future obligations are not claimed complete.

Delivered MP4 SHA-256: `1e7da9fd3793adea44f57cd3fb9126de9b23146c86b0f0015b6f3c1a469f2a96`.

No spending, additional generation providers, external notifications, real booking, merge or release. Source remains on the existing branch; the remaining film is gated on explicit visual/motion approval.
