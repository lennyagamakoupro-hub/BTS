# Fidelity audit · `BTS_PI_Lenny_Revision.pptx` · 2026-06-05

Source: `python-pptx` export, 29 slides, 16:9 canvas (13.333 × 7.5″), 564 text runs.
Ground truth extracted from the actual file (`pptx_dump.json`), not the export script's intent.

## Audit table

| Slide | Issue | Severity | Status |
|---|---|---|---|
| **all 29** | Design-system fonts never specified — export wrote generic fallbacks (Newsreader→**Georgia**, IBM Plex Sans→**Calibri**, IBM Plex Mono→**Trebuchet MS** + **Courier New**). Every glyph in the wrong family. | 🔴 | ✅ fixed |
| 13 ratios | Two cells bleed past the right edge (`≈3` → 13.50″, `Acquéreurs / vente` → 13.40″ > 13.333″) | 🟠 | ✅ fixed |
| 27 prêt | Variable table sits in bottom margin — last rows bottom 7.38″ (no footer breathing room) | 🟠 | ✅ fixed |
| 13 ratios | ⚠ objective note bottom 7.28″ | 🟠 | ✅ fixed |
| 11 prospection | Channel note bottom 7.30″ | 🟠 | ✅ fixed |
| 23 mandats | RÈGLE note bottom 7.20″ | 🟠 | ✅ fixed |
| 24 dossier | Cadastre / Loi Hamon notes bottom 7.14–7.16″ | 🟠 | ✅ fixed |
| 8 statuts | AMANDA note bottom 7.10″ | 🟠 | ✅ fixed |
| 18 découverte | Découverte note bottom 6.98″ | 🟠 | ✅ fixed |
| 4 SONCAS | DIVAS list last row bottom 6.99″ | 🟡 | ✅ fixed |
| 10 prospection | List last row bottom 6.96″ | 🟡 | ✅ fixed |
| — | Italic / `<em>` runs | 🟢 | ✓ already preserved (26 runs, Latin, real italic) |
| — | Off-canvas (bottom > 7.5″) | — | ✓ none — nothing cropped |

## Root causes

1. **No design-system font mapping (font-discipline Layer 1 & 4).** The export pinned every run to a generic stand-in family. This is the dominant, deck-wide fidelity failure — the typography read as a default Office deck, not the editorial Newsreader/IBM Plex system.
2. **No content rail enforced (layout-discipline §1–2).** Blocks were placed at hand-picked y-coordinates with no `CONTENT_MAX_Y` invariant, so on 9 over-full slides the last block crosses 6.70″ into the bottom margin (worst 7.38″). Nothing exceeds the 7.5″ canvas, so nothing is *cropped* — but there is zero footer breathing room.
3. **Right-edge bleed (slide 13).** Two cells were sized/placed past the 13.333″ canvas width.

## Fix list

- **Font remap (all 29 slides + theme):** `Georgia → Newsreader`, `Calibri → IBM Plex Sans`, `Trebuchet MS → IBM Plex Mono`, `Courier New → IBM Plex Mono`. Italic attributes left intact (IBM Plex Sans has a true italic; deck is all-Latin so no fake-slant risk).
- **Slide 13 horizontal:** both overhanging cells shifted left to right ≤ 13.27″.
- **Vertical rail (10 slides): fixed via uniform proportional compression.** Each over-full slide's content (boxes + decorative cards + font sizes) is scaled together around the header anchor by a single factor (0.88–0.94), so everything fits above the 6.55″ rail. Because the transform is affine and order-preserving, **no new text collisions are possible** — verified 0 regressions. (An earlier nudge-up approach was rejected: it crammed notes into the content above on 8 slides.)

## Verification (re-exported file: `BTS_PI_Lenny_Revision_FIXED.pptx`)

- ✅ Valid OOXML — 151 entries, 0 XML parse errors, opens as a 29-slide deck
- ✅ Fonts: only `Newsreader` · `IBM Plex Sans` · `IBM Plex Mono` — 0 generic-fallback residue
- ✅ Horizontal overflow: 0 (both slide-13 cells inside canvas)
- ✅ Off-canvas: 0 (no shape bottom > 7.5″)
- ✅ Content rail: **0 violations** — all 10 over-full slides compressed to fit above 6.55″
- ✅ Text collisions: **0** — uniform scaling preserves all relative spacing
- ✅ Smallest font anywhere: 8.4 pt (dense study-sheet slides reduced 6–12 %)
- **Result: 0 rail violations across 29 slides.**

## Layer-2 caveat (font presence)

The file now *names* the correct families. For them to render, **Newsreader, IBM Plex Sans, and IBM Plex Mono must be installed** on the presenting machine (all free on Google Fonts), or the fonts must be embedded into the PPTX (File ▸ Options ▸ Save ▸ Embed fonts, in PowerPoint on Windows). Without that, PowerPoint will fall back again per Layer 2 — geometry verification cannot see this.
