# Renew 360 Cleaning Company LLC landing page

A custom one-page Next.js landing page for Renew 360 Cleaning Company LLC.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quote form and Resend

The hero quote form posts to `app/api/quote/route.js` and sends two separate emails:

- Renew 360 notification: `renew360cleaning@gmail.com`
- Hometown Web Services lead copy: `altifygenerator@gmail.com`

The two messages are sent separately, so Renew 360 does not see the Hometown Web Services recipient.

Create `.env.local` from `.env.example` and add the live values:

```env
NEXT_PUBLIC_SITE_URL=https://www.renew360cleaning.com
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM_EMAIL=Renew 360 Website <quotes@hometownwebservicesar.cc>
RENEW360_EMAIL=renew360cleaning@gmail.com
HWS_LEAD_COPY_EMAIL=altifygenerator@gmail.com
```

The sender address must use a domain verified in Resend. The configured default sender uses `hometownwebservicesar.cc`.

## Production build

```bash
npm run build
npm start
```

## Main editable files

- `app/page.js` — page content and structured data
- `app/components/QuoteForm.js` — quote form UI
- `app/api/quote/route.js` — Resend email delivery route
- `app/globals.css` — full layout and styling
- `public/images/` — supplied Renew 360 imagery
