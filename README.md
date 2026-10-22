# LASAL Foundation Website

Static multi-page site for the **Lateef Ajibade Salami (LASAL) Foundation** — scholarships, community, impact, donations, and student stories. Built for XAMPP, Apache, GitHub Pages, or any static host.

**Repository:** [github.com/Stevesomto/LASAL-FOUNDATION-WEBSITE](https://github.com/Stevesomto/LASAL-FOUNDATION-WEBSITE)

## Quick start

1. Clone or copy the project into your web root (e.g. `xampp/htdocs/lasal_foundation`).
2. Keep the `images/` folder with logos, hero photos, deck art, and leadership portraits.
3. Open `http://localhost/lasal_foundation/` (adjust the path to your setup).
4. Use **ES modules** — serve over HTTP (`http://`), not `file://`.

## Configuration (`js/config/site-config.js`)

| Setting | Purpose |
|--------|---------|
| `WHATSAPP_NUMBER` | WhatsApp in international format without `+` (default `2348135529645`). |
| `CONTACT_PHONES_DISPLAY` | Phones shown in header/footer (`0813 552 9645 · 0802 778 0305`). |
| `SOCIAL_URLS` | Facebook, Instagram, X. YouTube is commented out until a channel exists. |
| `DONATION_BANK` | Ecobank & Stanbic IBTC account numbers for bank transfer on Donate. |
| `DONATION_USD_TO_NGN` | Estimated rate for USD ↔ Naira hints on the Donate page (update as needed). |

Card/PayPal/Paystack paths are **commented out** in `donate.html` and `js/forms.js`; donations are **bank transfer + WhatsApp** only for now.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home: preloader, hero slider, impact stats (count-up), featured scholarships & stories |
| `about.html` | Mission, founder, beneficiaries, cycle of hope, leadership |
| `scholarships.html` / `scholarship-details.html` | Listings, filters, detail + quick apply |
| `apply.html` | Multi-step scholarship application wizard |
| `community.html` | Scholars & alumni grid with search/filters |
| `stories.html` | Alumni reviews, success stories, **video stories**, photo highlights |
| `story-details.html` | Full story text (`?id=` from `js/data/stories.js`) |
| `student-media.html` | Redirect to `stories.html#photos-videos` |
| `impact.html` | Impact metrics and deck content |
| `get-involved.html` | Partnerships, summit, volunteering |
| `contact.html` | Contact form → WhatsApp |
| `donate.html` | Bank details, amount presets, USD/NGN custom amount → WhatsApp |

`index2.html` is legacy — not linked in navigation.

## JavaScript

| Module | Role |
|--------|------|
| `js/main.js` | Bootstraps site: theme, motion, nav, hero, homepage grids, forms |
| `js/config/site-config.js` | Phones, social, bank, donation FX rate |
| `js/navigation.js` | Mobile menu, scroll lock, legacy nav cleanup |
| `js/theme-init.js` / `js/theme.js` | Light/dark mode (saved in `localStorage`) |
| `js/motion.js` | Preloader (home), scroll reveal |
| `js/interactive.js` | Count-up stats, back-to-top, header on scroll, smooth `#` links |
| `js/forms.js` | Contact, donate, scholarship quick-form → WhatsApp |
| `js/site-contact.js` | Applies config phones/social URLs to static HTML |
| `js/whatsapp.js` | Opens WhatsApp with pre-filled messages |
| `js/stories-page.js` | Loads video/photo grids on Stories |
| `js/media-stories.js` | Renders photos + YouTube click-to-play facades |
| `js/story-details.js` | Story detail page content |
| `js/data/stories.js` | Written stories & alumni reviews |
| `js/data/scholar-videos.js` | YouTube IDs for Stories video section |
| `js/data/media-stories.js` | Photo highlight cards |
| `js/data/scholarships.js`, `scholars.js`, `alumni.js` | Scholarships & community |
| Page scripts | `scholarships.js`, `community.js`, `application.js` |

Application references use the **`LAS-`** / **`LAS-APP-`** prefix.

## Stories, photos & videos

- **Nav:** single **Stories** item (no separate Photos & Videos menu).
- **Videos:** edit `js/data/scholar-videos.js` (`videoId`, `title`, `format: 'short'`).
- **Photos:** edit `js/data/media-stories.js` (`image`, `text`, optional `storyId`).
- **Long-form text:** edit `js/data/stories.js` and link with `story-details.html?id=...`.

For fewer personal-channel names before play, prefer a **LASAL-owned YouTube channel** or self-hosted MP4 later.

## Donations

1. User picks or enters amount (USD or Naira with estimated equivalent).
2. **Direct Bank Transfer** only — details from `DONATION_BANK` in config and on the page.
3. Submit opens **WhatsApp** so the donor can confirm after transfer.

To re-enable card/Paystack: uncomment blocks in `donate.html`, `js/forms.js`, and `PAYSTACK_PUBLIC_KEY` in `site-config.js`.

## SEO

- Per-page title, description, canonical, Open Graph, and Twitter tags.
- `robots.txt` and `sitemap.xml` at site root (canonical host `https://lasalfoundation.org`).
- Homepage JSON-LD (`NGO` schema).
- Regenerate meta from script: `python scripts/apply-seo.py` (uses UTF-8; fix encoding if a page fails to parse).

Optional: add `google-site-verification` in HTML after Search Console setup.

## Assets

- **Logos:** `images/lasal-foundation-logo.png`, `images/LOGO.jpg` — use **relative** paths so subfolder hosting works.
- **Deck images:** `images/deck/` (challenge, cycle of hope, impact, etc.).
- **Leadership:** `images/leadership/`.
- **Hero / community:** `images/IMAGE*.jpg`, scholar photos as referenced in data files.

## Client reference

Strategy deck: `docs/LASAL_Foundation_Strategy_Presentation_updated_v2.pdf`. Narrative and impact copy on About, Impact, and Stories align with that deck.

## Deploy checklist

- [ ] Update `DONATION_BANK` and `DONATION_USD_TO_NGN` if client rates/accounts change  
- [ ] Confirm `WHATSAPP_NUMBER` and `CONTACT_PHONES_DISPLAY`  
- [ ] Upload full `images/` tree  
- [ ] Point domain to site root; test `sitemap.xml` and HTTPS  
- [ ] Hard refresh after deploy (Ctrl+F5)

## Credits

© LASAL Foundation. Built by [Stephen Somtochukwu](https://stephen-somtochukwu.vercel.app).
