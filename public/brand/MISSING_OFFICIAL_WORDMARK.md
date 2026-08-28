# Missing official H&R Block wordmark

The official horizontal wordmark could not be retrieved from hrblock.com in this environment. TLS to `www.hrblock.com` failed (`SSL_ERROR_SYSCALL`), so no file was downloaded and no substitute mark was drawn.

## Required file

Place the official horizontal wordmark, unmodified, at:

`public/brand/hrblock-wordmark.svg`

Then set `leaveBehind.brand.wordmark.available` to `true` in `src/content/hrblock.ts`.

## Provenance

- Official media kit page that publishes "H&R Block logo (horizontal)":
  `https://www.hrblock.com/tax-center/media-kit/hr-block-media-kit/`
- Homepage header mark (inspect the header image or inline SVG on):
  `https://www.hrblock.com/`

Record the exact `hrblock.com` file URL in `leaveBehind.brand.wordmark.sourceUrl` and in an XML comment inside the SVG once the binary is obtained. Do not use Simple Icons, Wikimedia, or any redrawn mark.

## Color

`--brand-green` is currently `#14aa40`. After the official SVG is vendored, derive the green token from that file and update `src/app/globals.css` if the fill differs.
