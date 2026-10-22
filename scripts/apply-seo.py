# One-off helper: regenerate SEO blocks (run manually if pages change).
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://lasalfoundation.org"
OG_IMAGE = f"{ORIGIN}/images/LOGO.jpg"

PAGES = {
    "index.html": {
        "title": "LASAL Foundation | Giving Hope through Education",
        "description": "LASAL Foundation promotes social mobility through scholarships, mentorship, and financial support for indigent students across Nigeria.",
        "keywords": "LASAL Foundation, scholarship Nigeria, education charity, social mobility, mentorship, Lagos nonprofit",
        "path": "/",
        "json_ld": True,
    },
    "about.html": {
        "title": "About Us | LASAL Foundation",
        "description": "Mission, vision, and leadership of LASAL Foundation—supporting indigent Nigerian students through scholarships and mentorship since 2015.",
        "keywords": "about LASAL Foundation, Lateef Ajibade Salami, education NGO Nigeria, mission vision",
        "path": "/about.html",
    },
    "scholarships.html": {
        "title": "Scholarship Opportunities | LASAL Foundation",
        "description": "Browse LASAL Foundation scholarships for medicine, law, engineering, computer science, and other employable fields of study in Nigeria.",
        "keywords": "LASAL scholarships, undergraduate grants Nigeria, STEM scholarship, apply scholarship",
        "path": "/scholarships.html",
    },
    "scholarship-details.html": {
        "title": "Scholarship Details & Application | LASAL Foundation",
        "description": "View eligibility, award details, and apply for a LASAL Foundation scholarship grant online.",
        "keywords": "scholarship details, LASAL grant application, student financial aid Nigeria",
        "path": "/scholarship-details.html",
    },
    "apply.html": {
        "title": "Scholarship Application Portal | LASAL Foundation",
        "description": "Complete the secure multi-step LASAL Foundation scholarship application: personal info, education, documents, and review.",
        "keywords": "scholarship application form, LASAL apply online, student application Nigeria",
        "path": "/apply.html",
    },
    "community.html": {
        "title": "Our Community | LASAL Foundation",
        "description": "Meet LASAL Foundation scholars and alumni—current students and graduates making impact in Nigeria and worldwide.",
        "keywords": "LASAL scholars, alumni network, beneficiary stories, student community",
        "path": "/community.html",
    },
    "impact.html": {
        "title": "Our Impact | LASAL Foundation",
        "description": "See how LASAL Foundation scholarships, mentorship, and community projects improve graduation outcomes and social mobility.",
        "keywords": "LASAL impact, education outcomes Nigeria, scholarship results, nonprofit impact",
        "path": "/impact.html",
    },
    "stories.html": {
        "title": "Stories, Photos & Videos | LASAL Foundation",
        "description": "Alumni reviews, success stories, photo highlights, and video updates from LASAL Foundation scholars and graduates.",
        "keywords": "scholar success stories, LASAL alumni reviews, student videos Nigeria, education transformation",
        "path": "/stories.html",
    },
    "story-details.html": {
        "title": "Scholar Story | LASAL Foundation",
        "description": "Full success story from a LASAL Foundation scholar or alum—education, mentorship, and career impact.",
        "keywords": "LASAL story, scholar profile, alumni feature",
        "path": "/story-details.html",
    },
    "get-involved.html": {
        "title": "Get Involved | LASAL Foundation",
        "description": "Partner, volunteer, or mentor with LASAL Foundation. Help fund scholarships and guide the next generation of Nigerian leaders.",
        "keywords": "volunteer LASAL, partner nonprofit Nigeria, mentor students, donate time",
        "path": "/get-involved.html",
    },
    "contact.html": {
        "title": "Contact Us | LASAL Foundation",
        "description": "Contact LASAL Foundation in Lagos for scholarship inquiries, partnerships, and donations. Phone, email, and message form.",
        "keywords": "contact LASAL Foundation, scholarship inquiry, Lekki Lagos office",
        "path": "/contact.html",
    },
    "donate.html": {
        "title": "Donate | LASAL Foundation",
        "description": "Support LASAL Foundation scholars with a secure donation. Bank transfer or card—100% directed to education and student support.",
        "keywords": "donate LASAL, scholarship donation Nigeria, support students, charity giving",
        "path": "/donate.html",
    },
}


def build_seo_block(page: dict) -> str:
    url = ORIGIN + page["path"]
    title = page["title"]
    desc = page["description"]
    kw = page["keywords"]
    lines = [
        f"  <title>{title}</title>",
        "",
        f'  <meta name="description" content="{desc}">',
        f'  <meta name="keywords" content="{kw}">',
        '  <meta name="author" content="LASAL Foundation">',
        '  <meta name="robots" content="index, follow, max-image-preview:large">',
        '  <meta name="theme-color" content="#DF7434">',
        '  <meta name="format-detection" content="telephone=no">',
        "  <!-- Optional: <meta name=\"google-site-verification\" content=\"YOUR_CODE\"> -->",
        f'  <link rel="canonical" href="{url}">',
        "",
        "  <!-- Open Graph -->",
        '  <meta property="og:type" content="website">',
        '  <meta property="og:locale" content="en_NG">',
        '  <meta property="og:site_name" content="LASAL Foundation">',
        f'  <meta property="og:title" content="{title}">',
        f'  <meta property="og:description" content="{desc}">',
        f'  <meta property="og:url" content="{url}">',
        f'  <meta property="og:image" content="{OG_IMAGE}">',
        '  <meta property="og:image:alt" content="LASAL Foundation logo">',
        "",
        "  <!-- Twitter / X -->",
        '  <meta name="twitter:card" content="summary_large_image">',
        f'  <meta name="twitter:title" content="{title}">',
        f'  <meta name="twitter:description" content="{desc}">',
        f'  <meta name="twitter:image" content="{OG_IMAGE}">',
    ]
    if page.get("json_ld"):
        org = (
            '  <script type="application/ld+json">\n'
            "  {\n"
            '    "@context": "https://schema.org",\n'
            '    "@type": "NGO",\n'
            '    "name": "LASAL Foundation",\n'
            '    "alternateName": "Lateef Ajibade Salami Foundation",\n'
            f'    "url": "{ORIGIN}/",\n'
            f'    "logo": "{OG_IMAGE}",\n'
            '    "description": "Promoting social mobility through scholarships and mentorship for indigent students in Nigeria.",\n'
            '    "email": "info@lasalfoundation.org",\n'
            '    "telephone": "+234-813-552-9645",\n'
            '    "address": {\n'
            '      "@type": "PostalAddress",\n'
            '      "streetAddress": "Suite 3, Canaan Plaza, Plot 2 Block 105 Lekki Phase 1",\n'
            '      "addressLocality": "Lagos",\n'
            '      "addressCountry": "NG"\n'
            "    },\n"
            '    "sameAs": []\n'
            "  }\n"
            "  </script>"
        )
        lines.extend(["", org])
    return "\n".join(lines)


def main():
    pattern = re.compile(
        r"<title>.*?</title>.*?(?=\n\s*(?:<!--\s*(?:Stylesheets|STYLESHEETS)|<link rel=\"stylesheet\"))",
        re.DOTALL | re.IGNORECASE,
    )
    for filename, data in PAGES.items():
        path = ROOT / filename
        if not path.exists():
            print("skip", filename)
            continue
        html = path.read_text(encoding="utf-8")
        block = build_seo_block(data)
        new_html, n = pattern.subn(block, html, count=1)
        if n != 1:
            print("WARN pattern miss", filename)
            continue
        path.write_text(new_html, encoding="utf-8")
        print("OK", filename)


if __name__ == "__main__":
    main()
