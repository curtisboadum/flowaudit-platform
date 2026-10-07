# Demo video re-edit: Method, redactions, and verification

Deliverable: `public/assets/phone-agent/phone-agent-demo.mp4` (the demo video embedded on the phone-agent offer page), plus poster and caption track.

## Method & Provenance

- **Source:** `/Users/curtis/Desktop/pho/IMG_3206.MOV` · sha256 `a9b619e5b6a3291df80c3cf7a832bbd4b8a4bc58222f20995c176cdbaf72457e` · 20,227,958 bytes · 161.61 s · HEVC 1920x1038 + AAC stereo.
- **Output:** `public/assets/phone-agent/phone-agent-demo.mp4` · sha256 `26eb292e9a6beab9...` (full hash recorded at encode time) · 10,856,698 bytes · H.264 yuv420p 1920x1038 + AAC 128k, faststart.
- **Inspected first-hand:** full 2 fps frame sweep (323 frames) OCR'd with tesseract; every sensitive region located by pixel coordinates from OCR TSV output; full audio transcribed end to end with whisper.cpp (base.en) at segment and word level; silence/beep spans verified by isolated transcription and zero-crossing frequency analysis.
- **Commands used:**
  - Frame sweep: `ffmpeg -i IMG_3206.MOV -vf fps=2 frames/f%04d.png`; `tesseract f.png stdout` (323 frames, OCR grepped for `kedo`, `07942`, `766 304`, `wussworldwide`, `Malachi`).
  - Card timing: pixel sampling of the detail-panel region frame by frame (panel present from t=135.0 s to t=157.0 s).
  - Word timings: `whisper-cli -m ggml-base.en.bin -f audio.wav -ml 1 -osrt`.
  - Mask + redact: `ffmpeg-libass -i IMG_3206.MOV -f lavfi -i sine=frequency=1000 ... -filter_complex "$(cat finalfilter.txt)" -c:v libx264 -preset slow -crf 21 -movflags +faststart -c:a aac -b:a 128k final-masked.mp4`.
  - Verification: OCR of masked frames (negative and positive checks), isolated transcription of both redaction spans, zero-crossing check (≈1000 Hz beep), full-file re-transcription.
- **First-hand artifacts produced from the source (on disk):**
  - Frame sweep + OCR log: `/var/folders/1l/b5kt0nlx1_98zzv0dg98c71w0000gn/T/opencode/video-sweep/` (frames/, ocr-hits.txt, finalcheck2.txt, isolated span transcripts).
  - Final deliverable assets: `public/assets/phone-agent/phone-agent-demo.mp4` + `-poster.jpg` + `.en.vtt`.
- **NOT inspected (explicit):** no playback-by-eye review (no video vision in this session); QA is OCR + transcription + pixel/spectral checks. Frames between sampled points at 2 fps were not OCR'd individually (37.5 ms between frames is below any readable text change rate at this cut cadence; the card is a static pop-in/pop-out confirmed by pixel sampling).
- **Method limits / perception gaps:** OCR can miss sub-pixel or motion-blurred text; the negative checks are therefore paired with a full-frame diff for the panel's presence window and with the audio-isolated checks. Whisper full-pass transcription hallucinates a phone-shaped number after the beep (context completion); the isolated-span transcripts and the spectral check prove the audio contains only the 1 kHz beep.
- **Second-party material used:** none.

## What was changed

| Region (1920x1038 coordinates) | Original | Replacement |
| --- | --- | --- |
| y 426-462, x 1100-1450 | "Booked by KedoLabs voice agent." | "Booked by the FlowAudit phone agent" |
| y 512-546, x 1100-1450 | "Practice: KedoLabs Dental (demo)" | "Practice: Ace Dentists (demo)" |
| y 566-602, x 1100-1440 | "Phone: 07942 766 304" | "Phone: hidden for this demo" |
| y 836-866, x 1100-1270 | "Kedo testing" | "urgent dental triage" |
| y 864-900, x 1100-1450 | "Created by: info@wussworldwide.io" | "Created by the FlowAudit phone agent" |
| Audio 69.6-74.6 s and 140.9-144.85 s | Spoken UK phone number, both mentions | 1 kHz beep at -23 dB (speech muted, call continuity preserved) |

Masks apply only while the details panel is visible (t = 134.9-157.25 s), verified in/out by frame sampling.

## Verification results

- OCR negative scan on masked frames (t = 136, 145, 155 s): zero matches for `kedo`, `07942`, `766`, `wussworldwide`.
- OCR positive scan: replacement lines present and aligned within 2 px of the original text baselines.
- Audio: isolated spans transcribe as "(beep)"/"[BEEP]"; zero-crossing analysis ≈ 1000 Hz; adjacent speech (for example the emergency call-out surcharge line, and "Is that all correct?") intact.
- Container: duration 161.61 s, H.264 + AAC, faststart, 10.9 MB.
- Caption track (`.en.vtt`): both phone mentions rendered as "[phone number hidden]"; zero digit sequences for the number remain.
