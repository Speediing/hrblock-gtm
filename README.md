# H&R Block x SpaceXAI

Private, passworded leave-behind for an H&R Block software evaluation.

## Page

The page keeps the supplied Grok Bot template and its interactive chat and computer demos. It presents three illustrative workflows:

1. Evaluation Scout prepares a scoped evaluation brief.
2. Brownfield Agent prepares a reviewable change packet.
3. Figma Builder prepares an implementation review.

Each workflow ends with an artifact for team review. Public product reactions keep their original source links.

## Local setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Set `SITE_PASSWORD` in `.env.local` before opening [http://localhost:3000](http://localhost:3000). The auth flow fails closed when the variable is missing or blank.

The lockup loads the official horizontal wordmark from H&R Block's first-party investor site. The H&R Block watercolor files are stored under `public/brand/`.

## Checks

```bash
npm run lint
npm run scan:residue
npm run scan:emdash
SITE_PASSWORD=your-local-value npm run build
```
