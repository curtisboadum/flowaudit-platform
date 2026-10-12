# FlowAudit landscape reformat

The user corrected the website film requirement to true horizontal on 9 October 2026. This source reflows the established Remotion scenes to 1920×1080 at 30fps, preserving segment lengths, captions, narration, music, source dialogue and chapter timing. The original portrait exports remain in the separate approved production handoff. No voice/music generation, new source claims or fabricated UI.

Run `npm ci`, `python3 prepare.py`, then `npm run studio` here. `npm run render` renders the four public choices into `out/`, then remuxes their exact original audio packets. FFmpeg and Node are required. Preparation reads `../../public/media`; it creates ignored local audio files. Website media is never overwritten by this render script. The scene registry also exposes standalone scenes. The main timeline was checked with the established skill's `sync.py --beats beats.md --check` before rendering (12 beats, zero errors/warnings).

Layout/type/motion constants are in `src/system/sceneSystem.ts`. Narrative text/timing/scale remains in schemas and `productions.json`. `public/demo` contains the same approved source pixel regions arranged horizontally; neither demonstration panel contains the excluded burned source caption band. The main film has one baked source-derived caption layer. VTT/transcript downloads are unchanged. No player subtitle track is attached.

Routine panel provenance: selected OpenCode revision 5, SHA-256 `d0152e91bb74fa9aa5f06b5a20292e3f4d0a891ad75202f417a864d0909748a6`; real call region x0/y0/590×310, calendar/title region x700/y130/490×195, request region x700/y395/490×225. These are the previously approved portrait crops, rearranged into a 1920×580 canvas, with unchanged source timing. Privacy beeps and edited labels remain disclosed; redrawn attribution is not customer proof. Question footage retains the previously approved call panel and genuine complete question/answer, with no outcome or handoff claim.

The component library tool reported no configured external library roots. Existing project Narrative/Evidence/Stage components were reused. No generated image assets. Agent-reviewed sample and selected frames are distinct from a fresh human full-film listening approval or physical-device test. Encoded checks and audio-packet hashes are in `../../docs/redesign/evidence/customer-audit/landscape-media-checks.json`.


## Primary sales film — 90-second rebuild

`Overview90` is 1920×1080, 30fps, exactly 2700 frames and 90.000 seconds including the CTA. It introduces both an occupied front desk and calls after closing, explains agreed routing, includes genuine recorded enquiry/availability/confirmation audio, then addresses practical fit, setup and the next step. The fee benchmark is omitted from this new pitch; original films and their qualifications remain unchanged.

`src/overview.json` is the editable timing/content source: 14 performance-sized audio/visual segments and 45 shared phrase-caption cues. `beats-overview.md` records continuous coverage. `src/scenes/overview/Scene.tsx` exposes the shot treatments through its schema; new style values are in `system.sales`. `OverviewScene` also renders standalone in Studio. The older films’ production timelines are preserved.

Use Node 24, FFmpeg/FFprobe and Python3. Run `npm ci`, then `npm run render:overview`. Rendering prepares original audio from `../../public/media`, mixes the saved edited voice takes with genuine demo excerpts and the preserved original score, renders Remotion visuals and muxes the 48kHz AAC audio. Outputs are `out/Overview90.mp4`. `python3 render_overview.py --sample` renders the 18-second opening. Neither route contacts a generation provider. The source ZIP includes original audio packets as well as the website media needed for preparation.

The voice remains The Explainer, profile 185daf92, local MLX Qwen3 Base, seed 42 and speed 1.0. R03 reuses the earlier corrected company sentence. New changed blocks, raw and edited takes, verified reference, pinned hashes, requests, ASR, silence edits and provenance are under `public/audio/overview/rebuild/` and `provenance/overview/rebuild/`. Silence-only edits preserve speaking speed. The mixed WAV is generated locally and ignored. Original O01–O07, correction takes, score and source recordings are unchanged.

Moving demo excerpts retain genuine source pixels. The Google Calendar booking uses a labelled still captured at source-panel time 76.45s, with appointment labels revealed alongside the original call confirmation, so a source context menu cannot cover the booking. No fake UI or customer outcomes. The complete separate recording retains privacy beeps and edited-label disclosure. Independent source ASR corrected the new overview’s excerpt timing without changing the older recording/VTT.

One regular-weight Inter subtitle layer sits at the bottom. The website reserves 64px beneath the picture for native controls at 390px; VTT/SRT are matching downloadable sidecars. All original player identities, separate recording and optional walkthrough remain.

The actual mobile opening was inspected before the full render. Technical checks, ASR and unmuted playback do not establish listening approval: the agent cannot hear audio. Human review of delivery, joins and music balance remains outstanding. See `provenance/overview/rebuild/reference-usage.md` for the Money Channel references and skill applications.
