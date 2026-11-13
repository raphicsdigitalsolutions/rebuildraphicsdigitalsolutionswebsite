# Raphics Digital Solutions — Design Direction

## Purpose

Help prospective clients understand that Raphics brings visual design, digital development, and practical AI automation together, then make it easy to explore real work or start an inquiry.

## Visual system

- **Brand red:** `#D51F16`
- **Deep black:** `#080808`
- **Near-black surface:** `#0A0A0A`
- **White:** `#FFFFFF`
- **Muted copy:** `#999999`
- **Display and headings:** Space Grotesk
- **Body copy:** Plus Jakarta Sans
- **Labels and technical metadata:** system monospace

The color palette stays within the agency’s red, black, white, and neutral tones. Red is reserved for emphasis, links, and meaningful active states.

## Layout and typography

Use a quiet editorial frame: generous margins, readable measure, oversized but concise headings, and thin dividers that separate content without boxing every item in. Let project artwork and the 3D service scene carry the visual weight. On narrow screens, stack content in reading order and keep actions full-width only where it improves touch access.

## Signature

The visual signature is a restrained metallic 3D form in the hero, followed by a scroll-linked visual that moves through creative work, digital development, and AI automation. 3D scenes are decorative storytelling elements; they do not stand in for client work or interface screenshots.

## Motion

- Use motion for the hero entrance, service chapter changes, and short hover feedback.
- Keep page scrolling native and the Three.js scene secondary to the content.
- Respect `prefers-reduced-motion`; provide a CSS fallback when WebGL is unavailable.
- Avoid fabricated live metrics, fake product interfaces, and activity that runs only to decorate a section.

## Portfolio and trust

- Behance artwork must link to its original published project.
- Technical case studies must point to a public repository or a verified public demo.
- Mark private, in-progress, and unpublished work by its actual status; do not create a source link that visitors cannot access.
- Publish testimonials only when the original review, attribution, and source link can be verified.
- Do not claim project outcomes, agency ratings, performance figures, or production readiness without evidence.

## Contact and accessibility

Keep email, UK WhatsApp messaging, Pakistan WhatsApp and calls, location, and the three agency social accounts centralized in `src/config/brand.ts`. GitHub Pages uses an email draft fallback: the visitor reviews and sends it in their own email app; the site does not report that the message was sent.

Use semantic headings, keyboard-visible focus, accessible control names, descriptive artwork alt text, and contrast that keeps muted text readable. Inputs remain labelled and errors must explain the correction.

The contact form owns validation in the application and renders a form level alert. Its short, fixed service and budget choices use native selects so the browser and operating system own popup behavior and keyboard interaction.
