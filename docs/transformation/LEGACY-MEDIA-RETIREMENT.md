# Legacy media retirement · 21 October 2026

The staged website now publishes only the existing privacy-edited routine dental booking recording in its dental page and labeled demo library. Its MP4, poster, captions and downloadable transcript are unchanged. It is a demonstration, not paying-customer evidence. Home and the general product page remain free of dental video; their static workflow illustration is explicitly labeled. Relevant home-services proof remains pending clearance and creative approval.

## What was retired and why

- `summary`: the executive sales film's 00:44.800–00:48.300 narration specifies initial payment before configuration. This is the exact source of the prohibited payment sequencing; an earlier checkpoint incorrectly attributed it to `overview`.
- `urgent`: the actual dental call mentions an emergency-callout surcharge at 01:39.700 and 02:16.560. It is held from the staged marketing surface under the strict no-pricing requirement. Its truthful original transcript was preserved, not rewritten to conceal the audio.
- `overview`: the current 100.1-second overview does not contain that payment sequence, but promises two full demonstrations below. That would become false after retiring the urgent call. The older `opening` and `teaser` marketing derivatives are retired with this superseded presentation.

All 22 associated public MP4, image, VTT, SRT and transcript files were removed from the staged deployment source only after byte-for-byte preservation and SHA-256 verification. Original source files and film metadata were also copied for rollback. The private local archive is `/Users/curtis/Documents/Codex/2026-10-21/task/private-retired-media/20261021/`; `manifest.json` records the preserved files and hashes. It is outside the site repository and is not served or uploaded. The GitHub repository is public, so no new private archive was committed. Existing Git history and historical production deployments were not rewritten; this retirement is not a retroactive removal from those locations.

## Implementation

The dental route now presents one complete routine call with native playback controls, an immediate booking link and collapsed evidence details. The runtime transcript module contains only the unchanged routine transcript. VideoObject references the retained routine MP4 and poster with ffprobe-verified duration `PT90.833333S`; its canonical dental URL is preserved. The unused legacy multi-film controls, chapter gates and time-gated CTA were removed. Genuine playback events still honor analytics consent; seeking does not count as watching.

The existing token-gated watch route retains its original primary demonstration and token validation, noindex and no-referrer controls. Its secondary retired overview was removed. No private recording, rejected new film or fresh publishing clearance was introduced. Historical analytics identifiers and financial/source records remain intact.

## Verification scope

Regression tests cover all 22 retired public asset URLs returning 404, retained video/captions/transcript endpoints, precise metadata, native and keyboard playback/disclosure/fullscreen behavior, immediate booking, error/slow recovery and no dental players on home or generic product. The generated-content scanner now checks initial-payment and surcharge phrases as well as currency figures and unsupported absolutes across build chunks, generated pages and public text assets.

Independent review also found a byte-identical copy of the urgent recording under `/assets/phone-agent/phone-agent-demo.mp4`, used by the legacy showcase. It and its poster are also archived and retired; showcase references now show an unavailable state rather than exposing the removed call. Existing noindex, no-referrer and link handling remain in place. These headers are indexing/referrer protections, not authentication. The routine VideoObject upload date is corrected to its verified 9 October repository publication history.

Final local validation: lint and TypeScript PASS; 65-route production build PASS; 51 unit tests PASS; 71 browser tests PASS, 1 intentional live-provider skip, 0 failures and 0 flaky tests (52.8s). The enhanced generated-content scan is clean. The first retirement browser run recorded68 passes/3 selector-scope failures/1skip; those test selectors were corrected and the complete suite rerun. Browser assertions verify all retired URLs, duplicate media, showcase hold states and retained routine schema/media. Remote CI and deployment results are attached to the exact resulting commit in PR32 and the local staging checkpoint. The earlier `d0c06b242cb111aadb1f865195784ea2f104a306` source passed all remote CI steps in run `39545141197` and has Ready protected preview `https://flowaudit-platform-98iqcnao4-curtisboadums-projects.vercel.app`. That preview precedes this retirement. Production and preview protection are unchanged. No bypass link, real test appointment, outbound email, paid service or new credential was used.

Current single-sample mobile Lighthouse: home98/product98/demos97 performance; all3accessibility/best-practices/SEO100, CLS0, total-blocking-time10ms. LCP displayed2.5s/2.5s/2.7s; demo remains above the2.5s target. These are local lab samples, not field Core Web Vitals. See retirement-performance-summary.json and the3rawreports.
