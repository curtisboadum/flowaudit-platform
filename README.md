# FlowAudit Platform

FlowAudit is a project for understanding how a business works before recommending what to automate. This repository contains the Next.js web platform and its public-facing service, calculator and demo pages. It does not include the private phone-agent operations stack.

- **Product:** [flowaudit.co.uk](https://flowaudit.co.uk)
- **Built with:** Next.js, React and TypeScript
- **Checks in this repo:** Vitest for unit tests and Playwright for browser tests

## Run locally

Use the Node version in `.nvmrc`. Install the locked dependencies and start the development server:

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). See `.env.example` for configuration. Create a local environment file only for the integrations you need, and never commit credentials. Integrations that rely on external services require their own configuration.

```sh
npm run typecheck
npm test
npm run test:e2e
```

## Where to look

| Path | What it contains |
| --- | --- |
| `src/app/` | Web pages and route handlers |
| `src/components/` | Shared UI |
| `tests/` | Test coverage, including browser flows |
