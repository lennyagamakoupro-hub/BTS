# PRD — Maths Financières · Le Magazine

## Problem Statement (verbatim)
> je veux que tu améliore mes fiches de révision d'une manière plus intéractive avec des animations et de manière la plus moins IA possible /frontend-design /design shotgun /design consultation /design review /polish /animate /bolder /typeset /colorize /hyperframes

Source artifact: comic-style HTML revision sheet covering BTS Maths Financières (4 chapters).

## User Choices (Feb 2026)
- Output: **React app** interactive
- Art direction: **Editorial magazine** (large typography, asymmetric layout)
- Interactions: **all** — quiz/flashcards, calculators, scroll animations, animated graphs
- Content: free to enrich
- Scope: **4 existing chapters** only (no new chapters yet)

## Target Persona
BTS first-year students revising financial mathematics — needs memorable, beautiful, interactive content that doesn't feel AI-generated.

## Architecture
- Frontend-only React SPA (CRA), Tailwind, Framer Motion 12
- Backend template unused (no API calls)
- No auth, no DB persistence

## Design System (delivered)
- Brutalist editorial / Swiss high-contrast variant
- Typography: Schibsted Grotesk (display), Cormorant Garamond (serif italic), JetBrains Mono (technical)
- Palette: ink #1C1C1A on cream #F4F0EB paper + 4 chapter accent colors (#0055FF / #FF4400 / #FF00AA / #CCFF00)
- Paper-grain overlay, 1-2px solid brutalist borders, no rounded corners on widgets

## Implemented (Feb 19, 2026)
- **Cover spread**: masthead, hero typography "Maths financières", deck, CTAs, custom SVG composition (no AI imagery)
- **Sticky nav** with 4-chapter chips + scroll progress bar + active-section highlight
- **Editorial Marquee** between sections
- **Table of Contents** with hover-translate + accent numerals
- **4 chapter spreads** — each with:
  - Giant accent-color chapter number
  - Two-line bold/italic title
  - Editorial deck
  - Drop-cap narrative with marginalia (metaphor box)
  - Side illustration (halftone risograph PNG)
  - Black full-bleed pull quote
  - Typeset Formula card (sym + label + unit grid)
  - Cas d'école — step strip
  - Interactive **Calculator** (sliders / frequency buttons, live result)
  - Animated **SVG growth Graph** (linear vs exponential comparison)
  - Point clé (real-world application)
  - **Quiz** (3 questions, multi-choice, scored)
  - **FlashCards** (3D-flip with prev/next)
- **Colophon** footer with chapter recap
- All elements have `data-testid` attributes
- Testing agent: 100% frontend tests passing

## P1 / Backlog
- Persist quiz scores + progress per chapter (localStorage)
- Print/PDF stylesheet for impression
- Add more advanced exercises (annuity, present value)
- Audio narration of metaphors
- Share / export progress to friends
- Add more chapters (annuités, emprunts indivis, escompte commercial)
- Open Graph cards for social sharing

## P2
- Spaced repetition algorithm on flashcards
- Dark "night reading" theme
- Multi-language (English/Spanish)
