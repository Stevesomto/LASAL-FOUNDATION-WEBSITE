# LASAL Foundation Website

Static multi-page website for the **Lateef Ajibade Salami (LASAL) Foundation**, a Lagos-based NGO (founded 2016) that awards scholarships and mentorship to indigent but brilliant students in Nigerian tertiary institutions.

Built with **HTML5, CSS3 and vanilla JavaScript (ES modules)**. No framework, no build step and no backend: forms hand their data to **WhatsApp**. Runs on XAMPP/Apache or any static host.

**Repository:** [github.com/Stevesomto/LASAL-FOUNDATION-WEBSITE](https://github.com/Stevesomto/LASAL-FOUNDATION-WEBSITE)

## Quick start

1. Clone or copy the project into your web root (e.g. `C:\xampp\htdocs\lasal_foundation`).
2. Start Apache in XAMPP.
3. Open `http://localhost/lasal_foundation/`.
4. Always serve over `http://`, not `file://`. The site uses ES modules, which browsers block on `file://`.

## Project structure

```
lasal_foundation/
├── *.html                  pages (see "Pages")
├── css/
│   ├── main.css            design tokens (colours, spacing), reset, dark mode, mobile breakpoints
│   └── components.css      header, footer, cards, sections, preloader, profiles, recognition card
├── js/
│   ├── main.js             runs on every page and starts everything else
│   ├── config/site-config.js   phones, WhatsApp, social links, bank details, FX rate
│   ├── data/               all editable content (scholars, alumni, leaders, stories, ...)
│   └── *.js                feature and page scripts (see "JavaScript")
├── images/                 logos, photos, images/deck/ (strategy deck art), images/leadership/
├── docs/                   client strategy deck (PDF) and extracted text
├── scripts/apply-seo.py    writes SEO meta tags into the main pages
├── sitemap.xml, robots.txt
└── .htaccess               browser caching rules for Apache
```

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home: preloader, hero slider, The Challenge, impact counters, UNIOSUN recognition, Why LASAL, featured scholarships and stories, newsletter |
| `about.html` | History, mission and vision, values, programmes, Cycle of Hope, Vision 2026–2029, code of conduct, Why Now, leadership and advisory board |
| `scholarships.html` | Open scholarships with filters (All, Undergraduate, Community Leadership) |
| `scholarship-details.html` | One scholarship (`?id=` from `js/data/scholarships.js`) with a quick-apply form |
| `apply.html` | Five-step application wizard → WhatsApp summary with a `LAS-APP-` reference |
| `community.html` | Current scholars and alumni grid with search, status and programme filters |
| `member-details.html` | Scholar/alumni profile (`?id=` from `js/data/scholars.js` / `alumni.js`), opened by **View Profile** |
| `leader-details.html` | Full leadership biography (`?id=` from `js/data/leaders.js`), opened by **Read More** on About Us |
| `impact.html` | Beneficiary statistics, states reached, UNIOSUN recognition, Cycle of Hope |
| `stories.html` | Alumni reviews, success stories, video stories, photo highlights |
| `story-details.html` | Full story (`?id=` from `js/data/stories.js`) |
| `get-involved.html` | Partnerships, LASAL Impact Summit, storytelling, consultant workstreams, staff needs |
| `contact.html` | Contact details and a message form → WhatsApp |
| `donate.html` | Amount presets, USD/NGN amounts, bank details → WhatsApp donation notice |
| `student-media.html` | Old address; redirects to `stories.html#photos-videos` (`noindex`) |
| `index2.html` | Legacy homepage kept for reference; not linked anywhere (`noindex`) |

Every page shares the same **top bar** (clickable phones and email, social icons), **header** (menu, light/dark toggle, mobile menu) and **footer**. They are copied into each HTML file, so **change all pages together** when editing them.

## Editing content

Most content lives in `js/data/`. Edit the file and refresh; the pages update automatically.

| File | Controls |
|------|----------|
| `scholars.js` | Current scholars on Our Community and their profile pages |
| `alumni.js` | Alumni on Our Community and their profile pages |
| `leaders.js` | Leadership cards on About Us and the leader profile pages |
| `scholarships.js` | Scholarship cards (homepage and Scholarships) and detail pages |
| `stories.js` | Homepage story cards and the full story pages |
| `media-stories.js` | Photo Highlights on Stories |
| `scholar-videos.js` | YouTube videos on Stories (`videoId`, `title`, `format: 'short'`) |

Example scholar entry:

```js
{
  id: "sch-009",
  name: "Anyanwu Stephen Somtochukwu",
  image: "images/stephen_somtochukwu.jpeg",
  program: "Computer and Robotics Education",
  institution: "University of Nigeria, Nsukka",
  level: "300 Level",
  location: "Enugu, Nigeria",
  scholarship: "STEM Scholarship Award",
  quote: "Thank you so much LASAL FOUNDATION for this great opportunity.",
  status: "current"
}
```

**Rules of thumb**

- `id` must be unique and must not change once published: it is part of the page address and is listed in `sitemap.xml`.
- Image fields:
  - `imagePosition` (e.g. `"center 30%"`) controls which part of a photo stays visible when it is cropped.
  - `imageFit: "contain"` shows the whole image without cropping. Use it for the LASAL logo while waiting for a real photo (leaders, stories, photo highlights). Remove it once a real photo is added.
- Only use real photos of the actual person. Do not use stock photos for named scholars or alumni.
- Compress photos before adding them (aim for under 200 KB; JPEG for photos).
- Scholarship amounts are in naira (`₦250,000 / year`) and CGPA requirements are on the 5.0 scale.
- When you add, remove or rename an `id`, update `sitemap.xml` too.

## Configuration (`js/config/site-config.js`)

| Setting | Purpose |
|--------|---------|
| `WHATSAPP_NUMBER` | Number that receives all form submissions, international format without `+` (`2348135529645`). |
| `CONTACT_PHONES_DISPLAY` | Phones shown in the top bar, footer and Contact page (`0805 700 1924 · `). `js/site-contact.js` turns each number into a `tel:` link automatically. |
| `SOCIAL_URLS` | Facebook, Instagram, X. YouTube is commented out until a channel exists. |
| `DONATION_BANK` | Ecobank and Stanbic IBTC accounts shown on Donate and in the WhatsApp message. |
| `DONATION_USD_TO_NGN` | Estimated rate for USD ↔ naira equivalents on Donate (update as needed). |

Donations are **bank transfer + WhatsApp** only. Card/PayPal/Paystack code is commented out in `donate.html` and `js/forms.js`; to re-enable it, uncomment those blocks and set `PAYSTACK_PUBLIC_KEY` in `site-config.js`.

## JavaScript

| Module | Role |
|--------|------|
| `js/main.js` | Runs on every page: theme toggle, motion, navigation, contact links, forms, hero slider, homepage scholarship and story cards, newsletter |
| `js/theme-init.js` | Runs in `<head>` before the page appears; applies the saved or system light/dark theme |
| `js/theme.js` | Adds the sun/moon button and switches `data-theme` on `<html>` (saved in `localStorage` as `lasal-theme`) |
| `js/motion.js` | Homepage preloader (shown at least 0.9 s, hidden after load or 4 s) and scroll-reveal animations |
| `js/interactive.js` | Count-up numbers, back-to-top button, header shadow on scroll, smooth `#` links |
| `js/navigation.js` | Mobile menu, scroll lock while open, current-page highlight |
| `js/site-contact.js` | Builds clickable phone links from config, fills the copyright year, applies social URLs |
| `js/forms.js` | Contact, donation and quick-apply forms → WhatsApp |
| `js/application.js` | Five-step application wizard (validation, review, `LAS-APP-` reference) |
| `js/whatsapp.js` | Builds and opens `wa.me` links with pre-filled messages |
| `js/scholarships.js` | Scholarship list, filters and detail page |
| `js/community.js` | Community grid, search and filters |
| `js/leadership.js` | About Us leadership cards |
| `js/leader-details.js`, `js/member-details.js` | Profile pages |
| `js/stories-page.js`, `js/media-stories.js` | Stories page videos (click-to-play YouTube) and photo highlights |
| `js/story-details.js` | Full story page |
| `js/seo-utils.js` | Updates title, description, canonical and share tags on profile, story and scholarship pages |

All animations are disabled for visitors who have **reduced motion** turned on in their device settings.

## Styling notes

- Colours and spacing are CSS variables in `:root` (`css/main.css`). Dark mode overrides them under `html[data-theme="dark"]`, so always use the variables (e.g. `var(--bg-main)`) instead of fixed colours.
- Main breakpoint is **768px**: below it the desktop top bar hides and the menu becomes a full-screen panel.
- Do not add `backdrop-filter` (or `transform`/`filter`) to `.site-header` on mobile. It makes the fixed mobile menu size itself to the header and clips it.
- Bulleted lists use `.belief-list` or `.code-of-conduct-list` (orange dots), because `ul, ol` have `list-style: none` globally.

## Caching and updates

- Stylesheet links carry a version number, e.g. `css/components.css?v=11`. **After editing CSS, bump the number on every page** so returning visitors get the new file.
- `.htaccess` sends `Cache-Control: no-cache` for HTML, CSS and JS on Apache, so browsers always check for newer files (unchanged files still load from cache). Other hosts ignore it.
- After deploying, hard refresh (Ctrl+F5) to check changes.

## SEO

- Every page has a unique title, description, canonical URL, robots tag, Open Graph and X/Twitter tags (`summary` card), `lang="en"` and a favicon.
- Profile, story and scholarship detail pages update their title, description, canonical and share tags for the item shown (`js/seo-utils.js`).
- `index.html` contains JSON-LD structured data (`NGO`: name, logo, founding date, contact, address, social profiles).
- `sitemap.xml` lists all 35 public URLs, including every scholarship, story, leader and member page. `robots.txt` allows all crawlers and points to the sitemap.
- `index2.html` and `student-media.html` are `noindex` so they don't compete with the real pages.
- `python scripts/apply-seo.py` rewrites the SEO block of the main pages from the `PAGES` list in the script. It does **not** cover `leader-details.html`, `member-details.html`, `index2.html` or `student-media.html`.

**After hosting**

1. The canonical domain is `https://lasalfoundation.org`. If the site is hosted on a different domain, update canonicals, `og:url`, `sitemap.xml`, `robots.txt`, `js/seo-utils.js` and the JSON-LD first.
2. Enable HTTPS.
3. In [Google Search Console](https://search.google.com/search-console): verify the domain (DNS, or paste the `google-site-verification` meta tag into `index.html`), submit `https://lasalfoundation.org/sitemap.xml`, and request indexing of the homepage.
4. Add the site to Bing Webmaster Tools and create a Google Business Profile for the Lagos office.
5. Link the website from LASAL's social profiles and ask UNIOSUN to link their listing to it.

## Assets

- **Logos:** `images/lasal-foundation-logo.png` (header, preloader, placeholders) and `images/LOGO.jpg` (footer, favicon, share image). Use **relative** paths so subfolder hosting works.
- **Deck images:** `images/deck/` (challenge, cycle of hope, impact, closing, etc.).
- **Leadership and story portraits:** `images/leadership/`.
- **Scholar and alumni photos:** `images/`, as referenced in the data files.

## Client reference

- Strategy deck: `docs/LASAL_Foundation_Strategy_Presentation_updated_v2.pdf`. Copy on About, Impact, Stories and Get Involved follows that deck.
- External recognition: LASAL is listed on [UNIOSUN's Financial Aid & Scholarships page](https://uniosun.edu.ng/financial-aid/) (shown on Home and Impact). Check the link occasionally.

## Pending content (needs the client)

- [x] STEM Excellence Scholarship marked **Closed – next intake coming soon** (`status: "closed"` in `js/data/scholarships.js`)
- [ ] New deadline for the next STEM Excellence intake (set `status: "open"` and update `deadline` to reopen)
- [ ] Photo and full biography for Mrs. Tokunbo Mumuney
- [x] Real photos of Saliu Akeem Olanrewaju and Abayomi Oyeleye
- [ ] More Leadership (staff) profiles, if any, besides the Programs Officer
- [ ] Photos and short bios for the Advisory Board (Chief Olaiya Orlando Ojo, Dr. Femi Oyetunji)
- [ ] Approval of the drafted quotes for Adegoke Lukumon Bidemi and Disu Qazim Opeyemi; a real quote for Ojuade Ololade
- [ ] First-person version of Abayomi Oyeleye's alumni quote (currently written about him, not by him)
- [ ] Confirm the office address (Lekki Phase 1 vs Victoria Island)
- [ ] Confirm the minimum CGPA (3.50 on a 5.0 scale) and the states count (impact counter says 13; the list names 14)

## Deploy checklist

- [ ] Confirm `WHATSAPP_NUMBER`, `CONTACT_PHONES_DISPLAY`, `DONATION_BANK` and `DONATION_USD_TO_NGN`
- [ ] Upload everything, including the full `images/` folder and `.htaccess`
- [ ] Point the domain to the site root and enable HTTPS
- [ ] Open `/sitemap.xml` and `/robots.txt` in the browser to confirm they load
- [ ] Submit the sitemap in Google Search Console
- [ ] Hard refresh (Ctrl+F5) and test the mobile menu, forms and WhatsApp links on a phone

## Credits

© LASAL Foundation. Built by [Stephen Somtochukwu](https://stephen-somtochukwu.vercel.app), a LASAL Scholar.
