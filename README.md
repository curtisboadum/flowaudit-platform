# FlowAudit Platform

The Next.js web platform for [FlowAudit](https://flowaudit.co.uk), a service that helps established businesses decide where phone handling or workflow automation could improve their operations. The site takes a prospective customer from an overview to a recorded demo and a fit-assessment booking.

## Explore the customer journey

| Start here | What to look for |
| --- | --- |
| [Services](https://flowaudit.co.uk/services) | How phone handling, operations automation, revenue recovery, and websites are presented as separate offers. |
| [Recorded demos](https://flowaudit.co.uk/demos) | A sample dental booking call and the limits of what the recording demonstrates. |
| [Phone agent](https://flowaudit.co.uk/phone-agent) and [booking](https://flowaudit.co.uk/book) | The path from a product walkthrough to a scoped conversation about fit. |

This repository contains the web experience, including marketing pages and route handlers. The private phone-agent operations stack is outside its scope. The recordings are examples, not benchmarks or independently measured customer outcomes.

## Code tour

| Path | What it contains |
| --- | --- |
| [`src/app/`](src/app/) | Next.js App Router pages and route handlers. |
| [`src/components/marketing/`](src/components/marketing/) | Shared offer pages, demo and booking experiences. |
| [`tests/e2e/marketing.spec.ts`](tests/e2e/marketing.spec.ts) | Public-route smoke checks, metadata, and key navigation. |
| [`tests/e2e/vsl-journey.spec.ts`](tests/e2e/vsl-journey.spec.ts) | Browser checks for the video and booking flow across viewport sizes. |

## Run locally

Use Node.js 22 (see [`.nvmrc`](.nvmrc)). The app uses Next.js, React, and TypeScript.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Use [`.env.example`](.env.example) as the configuration reference for integrations you need. Configure test accounts where applicable, and never commit credentials.

## Verify changes

```sh
npm run typecheck
npm test
```

For the Playwright suite, use an installed Google Chrome and build the application first. The default Playwright configuration starts the built site on port 3016.

```sh
npm run build
npm run test:e2e
```
