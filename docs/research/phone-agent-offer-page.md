# Phone-Agent Offer Page: Research, Pain Language, and Applied Principles

Status: working research document for the `feat/phone-agent-offer` branch.
Owner: Curtis (FlowAudit). Compiled 2026-10-07.

## Method & Provenance

- **Sources:**
  - Desktop demo video: `/Users/curtis/Desktop/pho/IMG_3206.MOV` · sha256 `a9b619e5b6a3291df80c3cf7a832bbd4b8a4bc58222f20995c176cdbaf72457e` · 20,227,958 bytes · 161.61 s · HEVC 1920x1038 + AAC stereo.
  - Build kit: `/Users/curtis/Desktop/pho/AI Phone Agent Build Kit.zip` + `/Users/curtis/Desktop/pho/AI Phone Agents - Build Guide.pdf`.
  - ICP leads + brief: `~/Library/Mobile Documents/com~apple~CloudDocs/Prompter/Icp /` (dental decision-maker list, 1,650 rows; research-agent brief).
  - Product engine: `~/Code/phone-agent-outreach` (one engine, four variants; receptionist, speed-to-lead, trainer, sales).
- **Inspected first-hand:** demo video probed (ffprobe), 9 frames extracted across the timeline, every frame OCR'd (tesseract), audio transcribed end-to-end (whisper.cpp base.en), volume verified; ICP CSV headers and first rows read directly; build kit extracted and read; engine README/SUITE_SPEC/offer.json read directly.
- **Commands used:**
  - `ffprobe -v error -show_entries stream=... ~/Desktop/pho/IMG_3206.MOV`
  - `ffmpeg -ss {2,20,40,60,80,100,120,140,158} -i IMG_3206.MOV -frames:v 1 f.jpg`
  - `tesseract f.jpg -`
  - `ffmpeg -i IMG_3206.MOV -vn -ac 1 -ar 16000 audio.wav` + `whisper-cli -m ggml-base.en.bin -f audio.wav -nt`
  - `shasum -a 256 ~/Desktop/pho/IMG_3206.MOV`
  - last30days v3.23.0 run: `python3.14 ~/.agents/skills/last30days/scripts/last30days.py "AI receptionist for dental practices" --subreddits=dentistry,dental,smallbusiness,Entrepreneur --plan <plan> --emit=compact` (raw: `~/Documents/Last30Days/ai-receptionist-for-dental-practices-raw-v3.md`)
  - WebSearch competitor scan: 12 dental AI-receptionist vendors (RingDental, NeverMissDental, Practice Systems AI, Dentiva, Kairos, AI Dental Desk, Intavia, Audiva, Vocca, DentalFrontDesk AI, Coredeluxe style, Dental Intelligence).
- **First-hand artifacts (on disk):**
  - Frames: `/var/folders/1l/b5kt0nlx1_98zzv0dg98c71w0000gn/T/opencode/pho-frames/f*.jpg`
  - Transcript: whisper output captured in this session (full scripted demo call; turns documented below).
  - last30days raw report: `~/Documents/Last30Days/ai-receptionist-for-dental-practices-raw-v3.md`
- **NOT inspected (explicit):** the video beyond 9 sampled frames (2, 20, 40, 60, 80, 100, 120, 140, 158 s) plus OCR; audio dynamics beyond volume stats (content verified via ASR). X/Twitter coverage for the topic returned no items in this window.
- **Method limits / perception gaps:** no built-in video vision; frame content was read via OCR plus an independent small vision pass; ASR may mis-transcribe names/numbers slightly.
- **Second-party material used:** competitor marketing pages were read as market evidence only, not as our claims; all figures attributed to a third party are labeled as such and are NOT used as FlowAudit promises.

## What the demo video actually is

A scripted inbound call to a demo dental practice ("Ace Dentists", agent "Liv"). A parent calls about a child ("Malachi Adams") with toothache. The agent: greets, runs a safety triage (swelling, bleeding, trauma, breathing), asks first-visit status, captures name + callback number, checks the live calendar, offers emergency slots with an emergency surcharge, books 9:30 pm, offers email capture (declined), reads back the booking, and closes warmly. The right panel shows the real booking landing in a Google Calendar with an "URGENT ASSESSMENT" event. On-screen pipeline telemetry shows Deepgram STT, OpenAI LLM, ElevenLabs TTS latency for each turn.

**Publish blockers found (must be edited before this video appears on the site):**
1. "KedoLabs" branding visible in the booking card ("Booked by KedoLabs voice agent", "Practice: KedoLabs Dental (demo)").
2. UK phone number `07942 766 304` visible on the booking card and spoken twice in the audio.
Both are removed/masked in the re-edit (see Workstream 3 of the plan).

## Market scan: how dental AI receptionists sell (and where the gaps are)

Common pattern across 12 vendors: lead with a revenue-loss number (missed calls percent x patient value), show a live demo line, claim 24/7 answering, PMS integration, HIPAA, SMS confirmations, human handoff.

Observed gaps FlowAudit can own:
1. **Proof over promises.** Several competitors publish unsourced revenue math and testimonial walls. FlowAudit can win on a single verifiable demonstration plus an honest claims policy.
2. **Emergency handling is the money moment.** High-value dental calls are urgent (pain, trauma, swelling). The demo video shows exactly this handled with triage questions and an emergency slot. Few competitors show the emergency path on video.
3. **Trust friction is the real objection.** Community voice (r/Entrepreneur, 42 comments): "nobody trusts AI content right now"; "the trust point is the real one". Also legal concern about recording consent. The page must convert trust, not hype: show the real call, state the guardrails, state what the agent never does.
4. **After-hours is the wedge.** The strongest cited number across sources: a large share of patient calls arrive outside business hours, and most voicemail leave no message. The wedge line is concrete: calls after close are the ones competitors never see.
5. **Commodity noise is high.** "A huge influx of new businesses popping up offering dental AI receptionists" (RevUp Dental, YouTube). Differentiation comes from the demonstration, not the category claim.

## Pain language lexicon (verbatim, sourced)

- "We were struggling with missed calls, long hold times, and front desk overload. Patients often had to wait for simple requests, especially after hours." - Yuliia Dudko, Front Desk Administrator, via RevenueWell case study.
- "I've lived that moment, drill in hand, while the phone rang unanswered." - Dr. Grant McAree, RoboReception, via Oral Health Group.
- "Some patients really liked it. They appreciated the quick answers and being able to reach us anytime." / "Some don't love it. They'd rather talk to a real person than a robot." - same case study.
- "If your website only shows a phone number and a contact form, that parent has two options: call tomorrow during your business hours while juggling work and kids, or find a practice that lets them book right now." - Oral Health Group, generational booking guide.
- "Nobody trusts AI content right now. At best it can be entertaining." - u/edkang99, r/Entrepreneur (8 upvotes).
- "How do you get across the legal obligation to inform that the call is being recorded? In my country it's illegal to record calls without the person's consent." - @boninoklm5235, YouTube comment (Brendan Jowett build video).
- "In one review, some clinics had more than 50% of incoming calls going to voicemail." - MGMA (practitioner review), used as the only external statistic considered for the page, with attribution.

## Objection map (from community + competitor FAQ patterns)

| Objection | Honest answer to put on the page |
| --- | --- |
| "It will sound robotic; patients will hate it" | The demo video is the answer. Same voice engine, full call shown unedited except privacy masking. |
| "What happens to complex or clinical questions?" | The agent handles the configured front-desk scope: booking, rescheduling, hours, services, urgent triage. Clinical or complex questions route to your team with a summary. |
| "Will it interfere with my team or my number?" | It works alongside your existing number and team. You choose when it answers: overflow, after hours, or 24/7. |
| "Is it compliant? Can it record calls?" | Recording and consent behavior follows the practice's policy and jurisdiction; disclose where required. The agent does not collect clinical detail beyond what the practice asks for. |
| "Will it invent availability or prices?" | No. It books only real slots from your calendar and never quotes prices or invents availability. |
| "How long does setup take?" | Stated as a process, not a promise: configuration, calendar connection, test calls, go live. |
| "What does it cost?" | Pricing is discussed on the call (site-wide pricing policy: no figures published). |

## Applied principles (what each one changes on the page)

### Neuroscience
1. **Salience under time pressure (200 ms rule).** Above the fold, one concrete loss scene: a call that rings while the team is with a patient. No abstraction.
2. **Pattern interrupt (von Restorff).** The category default is a stock photo of a smiling patient plus a dashboard mockup. We break it with the actual call recording and calendar proof.
3. **Predictive coding / expectancy violation.** Open by naming the exact scene the owner has lived ("the phone rings during a filling"), then resolve it. The brain pays attention when reality mismatches expectation.
4. **Cognitive fluency.** Short sentences, common words, one idea per line. Fluency is processed as truth; jargon is friction.
5. **Loss aversion (Kahneman).** Frame the cost as something already happening (calls after close), not as upside. Losses loom roughly twice as large as gains.
6. **Narrative transportation (Green & Brock).** The demo call is a story with a patient, a problem, and a resolution. Transportation lowers counter-arguing.
7. **Peak-end rule.** End the page on the resolved scene (booked, confirmed, calm), and end the video at the confirmation.
8. **Specificity (identifiable detail).** "9:30 pm, emergency slot, surcharge disclosed" beats "24/7 coverage". Detail reads as real.

### Psychology
9. **Certainty and risk reversal.** State what the agent never does in plain terms. Named guardrails reduce perceived risk more than a guarantee would.
10. **Cialdini unity before persuasion.** Frame the reader as a practice owner who cares for patients, not as a lead to be captured. Shared identity: "your front desk, always on."
11. **Authority through demonstration.** Show the pipeline and the calendar, not badges. The video carries the authority.
12. **Commitment ladder.** Primary CTA is a low-commitment demonstration ("Watch the full call", then "Book a 15-minute walkthrough"). One primary action per screen.
13. **Processing ease for objections.** FAQ answers in the visitor's words, first line answers the question, second line adds the nuance.
14. **No fabricated social proof.** No invented testimonials, no logos of practices we have not served. The demonstration plus honest claims policy is the proof.
15. **Anchoring without prices.** The page never shows a number for our service (site policy). Value framing uses the patient's time and the practice's own calendar, not fake math.

### Identity and meaning (the metaphysical layer, grounded)
16. **Narrative identity (McAdams).** Owners do not buy software; they choose the kind of practice they run. The page frames the choice as "the practice that never misses a patient" versus "the practice that hopes the phone stops ringing."
17. **Self-concept and care.** The front desk identity is care work. The agent is positioned as protecting that care time, not replacing the person.
18. **Ritual and continuity.** Language of unbroken service ("every call, every hour") builds a sense of steadiness. Certainty is the emotional product.
19. **Meaning over features.** Every feature line ends in a human consequence: the parent gets an answer at 9 pm; the team stops apologizing for hold times.

## Page architecture (sections and the principle each serves)

1. Hero: scene + promise + dual CTA (watch demo / book walkthrough). Salience + loss aversion + unity.
2. The hidden leak: three concrete moments calls are lost (lunch, chairside, after close). Predictive coding + specificity.
3. What the agent handles: answers, triages, books, confirms, summarizes, escalates. Mechanism clarity.
4. Demo video: the actual call, with a short "what you are watching" caption. Narrative transportation + authority.
5. How it works: configure, connect calendar, test, go live. Fogg B=MAP (make the behavior easy).
6. What it never does: guardrails list. Risk reversal + honesty as differentiation.
7. Who it is for: dental specifics (single location, multi-location, DSO, ortho) plus market note (US/UK/Canada).
8. FAQ: objections above, in the visitor's words.
9. Final CTA: book the walkthrough, calm close. Peak-end.

## Claims policy for the page (binding)

- No invented testimonials, logos, client counts, or revenue promises.
- External statistics only with a named source and hedged wording; used once, not as the argument.
- No price figures anywhere on the site (client decision, 2026-10-07).
- No em dashes in any copy (EN or ES). Use commas, colons, or " - " sparingly.
- The agent's abilities described only as the engine implements them (see SUITE_SPEC and offer.json).
