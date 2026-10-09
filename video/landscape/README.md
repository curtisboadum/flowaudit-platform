# FlowAudit landscape reformat

The user corrected the website film requirement to true horizontal on 9 October 2026. This source reflows the established Remotion scenes to 1920×1080 at 30fps, preserving segment lengths, captions, narration, music, source dialogue and chapter timing. The original portrait exports remain in the separate approved production handoff. No voice/music generation, new source claims or fabricated UI.

Run `npm ci`, `python3 prepare.py`, then `npm run studio` here. `npm run render` renders the four public choices into `out/`, then remuxes their exact original audio packets. FFmpeg and Node are required. Preparation reads `../../public/media`; it creates ignored local audio files. Website media is never overwritten by this render script. The scene registry also exposes standalone scenes. The main timeline was checked with the established skill's `sync.py --beats beats.md --check` before rendering (12 beats, zero errors/warnings).

Layout/type/motion constants are in `src/system/sceneSystem.ts`. Narrative text/timing/scale remains in schemas and `productions.json`. `public/demo` contains the same approved source pixel regions arranged horizontally; neither demonstration panel contains the excluded burned source caption band. The main film has one baked source-derived caption layer. VTT/transcript downloads are unchanged. No player subtitle track is attached.

Routine panel provenance: selected OpenCode revision 5, SHA-256 `d0152e91bb74fa9aa5f06b5a20292e3f4d0a891ad75202f417a864d0909748a6`; real call region x0/y0/590×310, calendar/title region x700/y130/490×195, request region x700/y395/490×225. These are the previously approved portrait crops, rearranged into a 1920×580 canvas, with unchanged source timing. Privacy beeps and edited labels remain disclosed; redrawn attribution is not customer proof. Question footage retains the previously approved call panel and genuine complete question/answer, with no outcome or handoff claim.

The component library tool reported no configured external library roots. Existing project Narrative/Evidence/Stage components were reused. No generated image assets. Agent-reviewed sample and selected frames are distinct from a fresh human full-film listening approval or physical-device test. Encoded checks and audio-packet hashes are in `../../docs/redesign/evidence/customer-audit/landscape-media-checks.json`.


## 90-second primary overview · 9 October 2026

`Overview90` is a separate 1920×1080 / 30fps / 2700-frame composition. Original compositions, evidence pixels and approved exports are unchanged. `src/overview.json` holds the seven natural-speed voice starts, scene windows and 32 script-aligned caption cues. `beats-overview.md` records coverage. The original timeline is not rewritten.

Run `npm ci` and `npm run render:overview`. FFmpeg/FFprobe must be on PATH. Seven saved VoiceStudio Qwen3 Base takes and the approved original score are committed under `public/audio/overview/`; the ignored mix is rebuilt from those sources. Remotion renders the visuals, then FFmpeg muxes the new 48kHz AAC mix to exactly 90 seconds. No old MainVSL audio is used, no time stretching occurs, and no voice provider is contacted by rendering. Run `npm run studio` to edit; `OverviewScene` is also exposed standalone. Render outputs remain under ignored `out/`.

The saved The Explainer profile, original model/license records, request settings and take hashes are in `provenance/overview/`. Requests use speed 1.0, seed 42, the existing reference profile and local mlx-audio engine. No new generated images or generative video, no paid service and no new score. Model routing is reported by the runtime; no per-operation hardware trace is claimed.

Captions are baked once in a top band above the principal graphics. Manual mobile inspection found the original lower band overlapped native controls; the overview was re-rendered with the safe top band. VTT/SRT are sidecars, not a second visible player track. Film graphics retain the existing warm stage/type system.

The $50–$350 card is published US patient-cost context from CareCredit's 2023 study, not practice collections or FlowAudit results. Complete source research and the substantive coverage matrix are in `../../docs/redesign/phone-agent/`. The 31-second evidence/value sample was rendered and technically reviewed before the first full render; the delivered sample reflects the subsequent mobile-caption correction. Human end-to-end listening approval and physical-device testing are not claimed.
