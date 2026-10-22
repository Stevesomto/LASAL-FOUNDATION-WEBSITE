# LASAL Foundation Website

Static multi-page site for the **Lateef Ajibade Salami (LASAL) Foundation** — scholarships, community, impact, donations, and student stories. Built for hosting on XAMPP, Apache, or any static file server.

## SEO

Each public page includes unique **title**, **description**, **keywords**, **canonical URL**, **Open Graph**, and **Twitter** meta tags. The homepage also has **JSON-LD** (`NGO` schema).

- `robots.txt` and `sitemap.xml` live at the site root (update `https://lasalfoundation.org` if the domain differs).
- After Google Search Console setup, uncomment and set `google-site-verification` in any page `<head>`.
- Re-run `python scripts/apply-seo.py` after editing SEO copy in that script.
- `scholarship-details.html` and `story-details.html` update social meta in JavaScript when content loads.

## Quick start

1. Place the project under your web root (e.g. `xampp/htdocs/lasal_foundation`).
2. Ensure the `images/` folder is present with logos and hero/community photos.
3. Open `http://localhost/lasal_foundation/` (adjust path to match your setup).
4. Use **ES modules** — serve over HTTP (not `file://`).

## Configuration (`js/config/site-config.js`)

| Setting | Purpose |
|--------|---------|
| `WHATSAPP_NUMBER` | Business WhatsApp in international format (no `+`). Default: `2348135529645` (0813 552 9645). |
| `CONTACT_PHONES_DISPLAY` | Header/footer phone text. |
| `SOCIAL_URLS` | Facebook, X/Twitter, etc. |
| `DONATION_BANK` | Ecobank & Stanbic account numbers for the Donate page. |
| `DONATION_BANK` | Bank name, account name, and account number shown on the Donate page for transfers. **Update with the client’s live account details.** |
| `PAYSTACK_PUBLIC_KEY` | Optional Paystack public key for card donations on the Donate page. Leave empty to route card/PayPal intents through WhatsApp. |

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home with **hero slider**, stats, featured scholarships & stories |
| `about.html` | Mission, vision, values, leadership |
| `scholarships.html` / `scholarship-details.html` | Grant listings and detail + quick apply |
| `apply.html` | 5-step scholarship application wizard |
| `community.html` | Scholars & alumni grid with filters |
| `stories.html` | Written success stories |
| `stories.html` | **Stories, photos & video** (`js/data/stories.js`, `js/data/scholar-videos.js`, `js/stories-page.js`) |
| `student-media.html` | Redirects to `stories.html#photos-videos` |
| `story-details.html` | Full text for homepage featured stories |
| `impact.html` / `get-involved.html` / `contact.html` / `donate.html` | Impact, involvement, contact, donations |

`index2.html` is legacy — not used for production.

## JavaScript structure

- `js/main.js` — Navigation, hero slider, homepage grids, newsletter, shared form init
- `js/forms.js` — Contact (WhatsApp), donation, scholarship quick-form handlers
- `js/data/*.js` — Scholarships, stories, scholars, alumni, media stories
- Page-specific: `scholarships.js`, `community.js`, `application.js`, `media-stories.js`, `story-details.js`

Application reference IDs use the **`LAS-`** prefix (e.g. `LAS-APP-123456`).

## Adding student photos & videos

Edit `js/data/media-stories.js`:

- Set `image` to a path under `images/`.
- For video, set `videoUrl` to an embed URL (e.g. YouTube `https://www.youtube.com/embed/VIDEO_ID`).
- Leave `videoUrl` empty for photo + text only entries.

## Donations

- **Bank transfer:** User selects “Direct Bank Transfer” — account details appear; submit opens WhatsApp to notify the foundation.
- **Card / PayPal:** Opens WhatsApp with donation details until Paystack is configured.
- **Paystack:** Add `PAYSTACK_PUBLIC_KEY` in `site-config.js`; card option uses Paystack Inline JS.

## Contact

The contact form validates input and opens WhatsApp to `WHATSAPP_NUMBER` with a pre-filled message. No server-side mailer is required.

## Assets & logos

Keep `images/` in deploys (hero `IMAGE1–5.jpg`, logos, scholar/story photos).

**Logo paths use relative URLs** (`images/lasal-foundation-logo.png`, `images/LOGO.jpg`) so the site works under a subfolder such as `http://localhost/lasal_foundation/`. Avoid leading `/images/` in HTML except in full `https://lasalfoundation.org/...` social meta tags.

Header logo file: `images/lasal-foundation-logo.png` (copy of `LASAL FOUNDATION LOGO.png` without spaces in the filename).

## Client reference

Strategy deck (success stories, fields of study, 2026–2029 vision): `docs/LASAL_Foundation_Strategy_Presentation_updated_v2.pdf`. Alumni narratives from that deck are used on **Photos & Videos** (`js/data/media-stories.js`).

Update **`DONATION_BANK`** in `js/config/site-config.js` with the foundation’s official account when the client provides it (not the unrelated microfinance PDF if that was attached by mistake).

## Credits

© LASAL Foundation. Site built by [Stephen Somtochukwu](https://stephen-somtochukwu.vercel.app).
