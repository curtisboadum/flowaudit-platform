# FlowAudit design system

## Mission
Make an established service-business buyer understand the offer, examine evidence and choose a useful next conversation. Dental leads the product demonstration; the agency remains broad.

## Brand and voice
FlowAudit is a practical implementation partner. Say what the system does, what has been demonstrated and what remains to be assessed. Make approvals visible. Avoid AI futurism, invented results, generic superlatives and ambiguous “try free” language. Demonstrations are labelled as demonstrations.

## Foundations
Paper `#F7F5F3`; ink `#37322F`; secondary text `#605A57`; bronze `#79593E`; warm surface `#EFEAE5`. Inter for body, controls and labels; Instrument Serif for expressive headings and the wordmark. No gradient or glass system. Bronze accents signal emphasis rather than status. Actual team photographs and actual recording stills provide the imagery.

Container width 1280px, desktop gutters 48px, tablet 32px, mobile 20px. Editorial sections use generous spacing, ruled boundaries, numbered labels and unequal column widths. Service rows function as clear links. Small labels remain legible. Body text uses comfortable line height and restrained measure. Main CTAs are dark rectangular controls, secondary actions are text links with a directional icon.

## Components
- Header: wordmark, four navigation links, language switch, booking action; mobile disclosure with Escape support.
- Hero: clear business proposition plus a real recorded example. No invented dashboard or chat simulation.
- Service row: number, name, concise scope and direction.
- Evidence panel: recorded enquiry → availability → confirmation, explicit integration boundary.
- Media player: native controls, preload none, poster, no autoplay, full transcripts, caption downloads, keyboard film tabs and failure fallback. Burned captions are already present.
- Workflow explorer: accessible tabs explaining recorded behaviour; never represents a live product interaction.
- Process: fit, scope, test/approve, activate. Distinct phone and website commercial sequences.
- Booking: contextual optional qualification, low-friction calendar bypass, official Cal inline embed, reserved space, delayed-load message and external fallback.
- FAQ: native details; answers distinguish verified behaviour from possible scope.
- Consent: optional analytics defaults off; equal available accept/decline controls and footer preference reopening.
- Legal and editorial layouts: long-form reading widths and bilingual content.
- Client access: availability-aware path with a support fallback.

## Interaction and accessibility
Focus is visible; controls use sufficient target size. Native semantics take priority over decorative interaction. Tab patterns support arrows/Home/End. Menu supports Escape. AI chat, when configured, uses Radix Dialog focus management and an honest knowledge prompt. Reduced-motion rules suppress nonessential animation. Films remain user-initiated. Use an unobstructed booking CTA throughout.

## Quality gates
Review 360/390/768/1024/1440/1920 and 200% reflow equivalent. Run axe on all public layouts, keyboard checks on menu/tabs/forms, link and route checks, production build, unit tests and mobile Lighthouse. Automated accessibility passing is evidence, not a claim of universal accessibility certification. Field Core Web Vitals require actual deployed traffic. Test tracking with QA campaign tags and exclude those from reporting.
