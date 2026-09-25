# Mimansa Patle — Portfolio Website

## Overview

A personal portfolio website for Mimansa Patle, a Computer Science Engineering undergraduate and full-stack developer. It presents her profile, education, internships and training, certifications, skills, and projects across five pages, built with plain HTML5, CSS3, and vanilla JavaScript.

All content comes from her existing portfolio (`mimansapatle.vercel.app`), her resume, and the RAAHAT AI project card she supplied; no facts were added.

## Features

- Responsive multi-page portfolio (Home, About, Projects, Skills, Contact)
- Semantic HTML5 structure (`header`, `nav`, `main`, `section`, `article`, `footer`)
- Lotus-themed design: arched "petal" project cards, a rotating lotus drawn in SVG, serif display type on a soft pink canvas
- **Dark and light mode toggle** — remembered between pages and visits
- **Smooth scrolling** for in-page anchor links (such as the skip link)
- **Animated section reveals on scroll** (progressive enhancement — content is never hidden without JavaScript)
- **Project filtering by category** (All / Full-Stack / Web), with screen-reader announcements
- **Resume download** buttons in the header, on the home page, on the About page, and on the Contact page
- **Accessibility improvements**: skip link, visible focus states, keyboard-operable menu, theme toggle, and filters, labelled form fields, `prefers-reduced-motion` support
- Contact form with native validation; it opens the visitor's email app with the message ready to send (there is no server)
- "Copy" button for the email address (progressive enhancement)
- No third-party requests: fonts are self-hosted and there are no libraries or trackers

## Pages

- **Home** (`index.html`) — hero, education strip, selected projects, featured project, capabilities, toolbox, current focus, contact call-to-action
- **About** (`about.html`) — profile, education, experience (internships and vocational training), certifications, soft skills, languages
- **Projects** (`projects.html`) — five projects with descriptions, highlights, technologies, and GitHub links, filterable by category
- **Skills** (`skills.html`) — six skill groups: core CS fundamentals, databases, programming languages, frontend, backend, software and tools
- **Contact** (`contact.html`) — contact details, resume download, and a message form

## Projects

- **URL Shortener** — full-stack web application (Next.js, React, Tailwind CSS, MongoDB)
- **CivicWatch India** — civic issue reporting platform (React 19, Vite, Tailwind CSS, Node.js, Express.js, MongoDB, Leaflet, Cloudinary)
- **PrepAI** — AI interview preparation platform, currently in development (Next.js 16, React 19, Tailwind CSS, MongoDB, Auth.js, Gemini API, React PDF)
- **RAAHAT AI** — AI-assisted student support and early intervention platform, with a counsellor portal, built for Smart India Hackathon 2026 (React, TypeScript, Vite, Tailwind CSS, React Router, TanStack Query, REST APIs)
- **Personal Developer Portfolio** — her Next.js portfolio (Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Lucide React)

Each project links to its repository on her GitHub. Live demos are not listed because none are given.

## Tech Stack

- HTML5
- CSS3 (Flexbox, Grid, custom properties)
- Vanilla JavaScript — no frameworks, no build step, no dependencies
- Fonts are self-hosted (`assets/fonts/`)

## Design

Rose and berry on a soft pink canvas, with blush pink and gold as accents. Display type is Cormorant Garamond with Manrope for body text. The layout uses arched petal cards, a slowly rotating SVG lotus, pill-shaped navigation and buttons, and berry bands for emphasis. Dark mode keeps the same structure: the light surfaces turn to deep plum while the berry bands and the lotus stay recognisable. Motion is limited to the lotus, hover and focus states, and the scroll reveals — all switched off under `prefers-reduced-motion`.

## Accessibility

- Semantic HTML with a consistent heading hierarchy (one `h1` per page)
- Labelled form controls with native validation
- Skip-to-content link and visible keyboard focus states on every interactive element
- `aria-current="page"` on the active navigation link
- Mobile menu exposes its state via `aria-expanded` / `aria-controls`; Escape closes it and returns focus to the button
- The theme toggle and the project filters are real buttons that expose their state through `aria-pressed`
- Filter results are announced with a live region
- `prefers-reduced-motion` disables the lotus rotation, scroll reveals, and smooth scrolling
- External links are announced as opening in a new tab
- Text and interactive colours checked against WCAG AA contrast ratios in both the light and dark themes
- Decorative graphics (lotus, project visuals) are hidden from assistive technology; the portrait has alt text

## Responsive Design

Built mobile-first and checked at 320px, 375px, 430px (mobile), 768px, 834px (tablet), 981px, 1024px, 1280px, 1440px (desktop), and 1904px, 2560px (wide screens), with no horizontal overflow. The mobile menu appears below 981px. Sizes match the Lotus design at every width; on very wide screens the sections stay full-width with constant side padding.

## Project Structure

```
portfoilio-website-2/
├── index.html
├── about.html
├── projects.html
├── skills.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   └── theme-init.js
└── assets/
    ├── fonts/
    │   ├── cormorant-garamond-latin.woff2
    │   ├── cormorant-garamond-italic-latin.woff2
    │   └── manrope-variable-latin.woff2
    ├── images/
    │   └── mimansa-avatar.svg
    └── resume/
        └── Mimansa-Patle-Resume.pdf
```

## Running Locally

No build step or dependencies are required.

Simplest option — open the file directly in a browser:

```
index.html
```

Or serve it locally with Python's built-in server:

```
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Live Website

Live Demo: To be added after deployment

## Screenshots

Screenshots will be added to the repository after final browser and deployment verification.

## Credits

- Fonts: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) and [Manrope](https://fonts.google.com/specimen/Manrope), both licensed under the SIL Open Font License 1.1.
- Portrait illustration: "Lorelei" by Lisa Wischofsky, released under CC0 (public domain), the same illustration used on Mimansa's existing portfolio.
- Visual design: adapted from the "Lotus" concept.

## Author

**Mimansa Patle**
Email: mimansapatle@gmail.com
GitHub: https://github.com/MimansaPatle
LinkedIn: https://www.linkedin.com/in/mimansa-patle-b489a6309

## Guidelines

Structured to follow the WeIntern Week 1 portfolio guidelines: the required pages (Home, About, Projects, Contact) plus an optional Skills page, the mandatory sections (hero, about, skills, projects, contact with a form, footer with navigation and social links), semantic elements, Flexbox/Grid layouts, a consistent palette and type system, and a clean file structure.
#
