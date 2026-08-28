# H&R Block x SpaceXAI

Private, passworded visual leave-behind for evaluating agent-assisted software work with H&R Block. The slug is `hrblock`.

The protected page presents Grok Bot as a fleet of software agents with their own computers. It includes an interactive six-agent selector, three illustrative scene sequences, a six-computer fleet view, and a grounded evaluation section. Every scene ends with a reviewable artifact instead of a claimed customer result.

## Local setup

1. Use Node 22 or newer.
2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env.local`.
4. Set `SITE_PASSWORD` in `.env.local` to a password you choose. Do not commit that file. Do not prefix the variable with `NEXT_PUBLIC_`.
5. Start the app:

```bash
npm run dev
```

6. Open `http://localhost:3000`, enter the password, and the root page will load.

The login cookie is HttpOnly, `SameSite=Lax`, `Path=/`, and lasts 7 days. In production it is also `Secure`. The cookie stores a derived token, never the raw password.

## Required environment

| Name | Where | Purpose |
| --- | --- | --- |
| `SITE_PASSWORD` | server only | Shared site password. If it is missing or empty, login returns 503 and the root page stays locked. |

## Checks

```bash
npm run lint
npm run typecheck
npm test
npm run scan:residue
npm run scan:emdash
npm run build
```

`scan:residue` looks for prior-customer names and inherited color tokens in source. `scan:emdash` checks customer-facing source for em dashes. Neither scan reads `.next/` or lockfiles.

## Wordmark

The official H&R Block horizontal wordmark could not be downloaded from `hrblock.com` in the environment that built this page. See `public/brand/MISSING_OFFICIAL_WORDMARK.md`. The SpaceXAI wordmark is local at `public/brand/spacexai.svg`.
