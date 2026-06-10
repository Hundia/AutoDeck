# The Enterprise Agentic SDLC Playbook — Start Frame Image Prompts
### 17 Slides · The Forge World · Google Stitch / Imagen 3 / Firefly
### Companion to: video_script_playbook.md

---

## How to Use This File

1. **Copy a prompt block** — paste into Stitch (Google) or Imagen 3 / Firefly
2. **Generate 4–8 variants** per slide; keep the best 2
3. **Verify bookends:** S1 and S17 must share the same overhead drafting table — generate both on the same session if possible and compare before keeping
4. **S10 is your hero shot** — marked with ★. Generate 6+ variants and pick the most ceremonial/complete-looking
5. **S4 is split** — two separate prompts (S4-LEFT and S4-RIGHT) composited vertically in post
6. **After generation:** run the QA checklist at the end of this file before signing off

---

## Shared Style Anchor

Every prompt below embeds this style reference. When adding prompts to a session, paste this first as the style anchor so all images share the same visual world.

> **Style anchor:**
> The Forge — a dark precision industrial workshop. The environment is deep dark steel and wood, with dramatic single-source overhead lighting. The color palette is dark near-black backgrounds (#232F3E), warm forge-orange industrial glow (#FF9900), architectural blueprint-blue (#1A73C0), precision-teal quality indicators (#0D8C7C), aged document-white (#FEF9F0), and certified emerald (#10B981). Every image is cinematic, controlled, and purposeful — not chaotic. This is a precision craft environment, not a dirty factory. Lighting is theatrical: objects are lit from above or from a precise internal source. The atmosphere is always dark enough that overlay text at 45% opacity will be readable. No human figures. No faces. No readable text, labels, or numbers anywhere in the image. No logos. Photo-realistic with subtle cinematic color grading. Square or 16:9 landscape format.

---

## The Forge Color Reference

| Name | Hex | Usage |
|------|-----|-------|
| Forge-orange | `#FF9900` | Active work, heat, execution, approval, signatures |
| Blueprint-blue | `#1A73C0` | Specifications, plans, governance docs |
| Teal | `#0D8C7C` | Verified work, QA complete, harness confirmed |
| Dark-forge | `#232F3E` | The environment: shop floor, void, night |
| Document-white | `#FEF9F0` | The page: spec, codex, truth on paper |
| Red-amber | `#EF4444` | Failing test, blocked gate, error state |
| Emerald | `#10B981` | Sprint summary sealed, QA 100%, production ready |
| Steel-grey | `#4B5563` | Unused tooling, cold/waiting state |

---

## Prompts by Slide

---

### S1 — TITLE: The Agentic SDLC Playbook *(Bookend Start)*
**Variations to generate: 4 (keep the one that best matches S17 camera angle)**

**Prompt:**

```
Overhead top-down view of a dark wooden architectural drafting table, perfectly centered and symmetrical. The table surface is dark aged wood with visible grain — authoritative and well-used. A large architectural blueprint is partially unrolled in the center: the unrolled section shows self-luminous white-blue precision lines forming abstract stage boxes and flow arrows — not readable words, just structured geometric diagrams. The paper is slightly curled at the edges where it was rolled.

In the center of the blueprint, a single glowing orange line traces the border of a rectangular frame — as if an invisible drafting tool is mid-trace. The orange trace is partially complete, active, still in progress. The light is forge-orange (#FF9900), clean and precise.

Around the edges of the table: the faint shadows and silhouettes of drafting instruments — a ruler, a compass, a set square — implied but not dominant, barely lit, existing as depth and context only.

The blueprint occupies the center third of the table. The top and bottom thirds of the table are clear dark wood — these are the text-safe zones for GSAP title overlay.

Lighting: a single dramatic overhead source illuminates the blueprint from directly above. The table edges fade to near-black.

Style: The Forge — dark precision industrial workshop, cinematic overhead composition, theatrical lighting, photo-realistic, deep dark background (#232F3E), no text, no people, no logos.
```

**Composition notes:** The overhead camera is perfectly perpendicular to the table — no angular drift. The blueprint must be centered, not off to one side. Dark clear zones top and bottom are critical.

---

### S2 — The Goal: Bolts, Not Sprints
**Variations to generate: 3**

**Prompt:**

```
Two pendulums hanging side by side in a dark forge-like industrial space, viewed from the side in a wide shot. Both pendulums are suspended from the same overhead structural beam in deep shadow.

LEFT pendulum: large, heavy, dark iron. Its bob is a substantial dark grey sphere. The arc it traces is wide — covering at least 120 degrees total — and it is caught mid-swing at the extremity of its arc, suggesting a slow, lumbering period. Its surface is dull iron-grey (#4B5563), no glow. The chain or rod is thick, industrial.

RIGHT pendulum: small, precise, lightweight steel. Its bob is a small polished sphere with a bright forge-orange glow (#FF9900) at its center. A brief orange light trail extends behind it, indicating fast recent movement. The arc of the right pendulum is narrow and tight — it covers a small, rapid angle. It is caught mid-swing at speed, clearly in the middle of a much faster cycle.

The contrast between the two is unmistakable: the left is heavy and slow, the right is light and fast.

In the far background: a faint deep red-orange forge glow — the workshop ambiance, barely visible.

The space between and around the pendulums is perfectly dark. The upper beam is in shadow.

Lighting: dramatic, only the pendulum bobs are well-lit. The left from a cool diffuse source, the right with its own warm glow from the orange tip.

Style: The Forge — dark precision industrial, cinematic side view, deep dark background, no text, no people. Photo-realistic, high contrast.
```

**Text zone:** Upper left (above left pendulum) and upper right (above right pendulum) — clear dark space required.

---

### S3 — The Three Pillars: The Creed
**Variations to generate: 3**

**Prompt:**

```
Three distinct objects arranged on a dark precision workbench in a forge workshop, each lit by its own individual overhead spotlight. The three spotlights create three isolated pools of light separated by deep shadow. The composition is symmetrical and balanced — objects equidistant, viewed from a straight-on frontal angle.

LEFT OBJECT: a thick formal document or codex lying flat, closed and sealed. Its cover is dark leather with a faint blue-white glow (#BFDBFE) emanating from within — as if the document itself is luminous. The cover has abstract geometric impressions suggesting a governed plan, no readable text.

CENTER OBJECT: a small precision-engineered structural framework — a mesh cage or lattice structure made of thin interconnected struts, glowing with a teal internal light (#0D8C7C). It is open on all sides, clearly designed to hold something within its structure. It suggests a constraint or harness — elegant, not crude.

RIGHT OBJECT: an empty chair. Simple, functional, dark wood or metal. A warm pool of forge-orange-gold light (#FDE68A) illuminates the seat from above — the chair is occupied by light alone, suggesting the implied presence of a human judge. The chair is set and waiting.

The workbench surface is dark, matte metal. Behind the objects: absolute darkness.

Lighting: three separate dramatic overhead spotlights, one per object. No ambient spill between the three light pools.

Style: The Forge — dark precision workshop, cinematic frontal symmetry, doctrinal and reverent. Photo-realistic. No text, no people, no logos.
```

**Text zone:** Below each object and top of frame — ensure dark clear space above the scene for a title.

---

### S4-LEFT — Not Vibe Coding (Left Half: Chaos)
**Variations to generate: 2**
*This is the left half of a split-screen composite. Generate separately, composite in post.*

**Prompt:**

```
The LEFT HALF of a split-screen composition showing a forge workbench in a state of chaotic improvisation. This image should be cropped or composed to fill the left half of a 16:9 frame — with the right edge clean and compositionally ready for a vertical split.

The workbench is dark wood and metal. On its surface: metal scraps and half-started pieces strewn without order — some tools lying at wrong angles, unfinished assemblies abandoned in place. No blueprint on the wall above the bench. No plan. Just improvisation in progress.

The lighting is chaotic amber (#F59E0B) — hot in some places, dark in others, with a slight reddish tint (#EF4444) in the warmest areas. The glow is uneven, suggesting heat without control. One area is too bright, another too dark.

The overall feeling is not dangerous — just undisciplined. The same raw materials as the right side, but without structure. Warm, uncontrolled, improvised.

The right edge of the image is a clean vertical dark line — the split boundary.

Style: The Forge — left side only, chaotic amber glow, improvised disorder. Photo-realistic. No text, no people, no readable labels.
```

---

### S4-RIGHT — Not Vibe Coding (Right Half: Governed)
**Variations to generate: 2**
*This is the right half of a split-screen composite. Generate separately, composite in post.*

**Prompt:**

```
The RIGHT HALF of a split-screen composition showing the same type of forge workbench — but this side is in a state of precise, governed order. This image should be cropped or composed to fill the right half of a 16:9 frame — with the left edge clean and compositionally ready for a vertical split.

The workbench is dark metal. On its surface: work in progress organized into distinct, purposeful stages. Each piece is positioned deliberately. Tools are in their designated places.

On the wall above the bench: a blueprint pinned neatly — white-blue lines showing the plan (#1A73C0). The blueprint is the same material and quality as the left side's absent blueprint — it IS the plan that the left side lacks.

The lighting is controlled: a clean blueprint-blue overhead light (#1A73C0 cool glow) illuminates the workspace. Forge-orange light (#FF9900) touches ONLY the single active piece being worked on right now — precise heat, applied precisely.

The left edge of the image is a clean vertical dark line — the split boundary.

Style: The Forge — right side only, blueprint-blue overhead, controlled forge-orange on active work only. Photo-realistic. No text, no people, no readable labels.
```

**Compositing note for S4:** Combine S4-LEFT and S4-RIGHT into a single 16:9 image with a 1-2px dark vertical divider at the center. The two images should have the same ambient lighting level in the far background so the composite reads as one scene, not two pasted screenshots.

---

### S5 — Stage 1: Intent & Discovery
**Variations to generate: 3**

**Prompt:**

```
A single sheet of formal document paper/parchment floating or resting upright in a dark forge-like space, lit from above by a narrow, precise blue-white beam of light (#93C5FD). The document is off-white with visible paper texture and weight — document-white (#FEF9F0). The document face is blank, clean — no readable text.

The blue-white beam traces across the document face in a reading-rhythm pattern: sweeping left to right in horizontal lines, as if writing or scanning. The beam is mid-trace, halfway down the document face — some lines above it have a faint residual blue-white glow, the lines below are dark and waiting.

At the lower-right corner of the document, a small mechanical gate mechanism is attached — an abstract lock or circuit-breaker element. This gate glows RED (#EF4444) — it is currently blocked. The red glow is small, deliberate, visible but not dominant.

The document is the most important element — centered, well-lit, authoritative.

Around the document: absolute dark. The document floats in the forge darkness.

Lighting: the narrow beam from above creates crisp edge shadows on the document. The document itself has a slight internal warmth from the paper texture.

Style: The Forge — isolated document in dark space, methodical and intentional, cinematic. No text, no people, no readable content on the document.
```

**Text zone:** Upper space above the document for stage label; the document face itself for GSAP spec text overlay.

---

### S6 — Stage 2: Alignment & Constraints
**Variations to generate: 3**

**Prompt:**

```
Overhead top-down view of a dark forge floor with heavy rectangular stone-like constraint blocks descending from above and locking into precise alignment. The blocks are mid-process: two or three have already settled into their final position on the floor, forming the beginning of a precise grid pattern. Several more are mid-descent at various heights — clearly in motion downward.

The settled blocks are dark stone-grey (#374151) with precision-cut edges. Where the edges meet the floor and other blocks, teal light (#0D8C7C) glows in the seams — the confirmation light of a block that has locked into its correct, permanent position.

The descending blocks have no glow yet — they are dark grey, heavy, not yet activated.

The floor is dark forge metal with faint grid lines showing where all blocks will eventually settle.

The overall composition is architectural and precise: the blocks are not falling chaotically — they are descending with purpose, each one designated for its exact grid position.

Camera is perfectly overhead, looking straight down. The grid pattern extends across the center of the frame.

Lighting: diffuse cool overhead industrial light. The teal seam glow provides the warmest points of interest.

Style: The Forge — overhead architectural, heavy and permanent, dark stone and teal light. No text, no people. Photo-realistic.
```

**Text zone:** Upper third of frame (the overhead view naturally leaves the upper area free of blocks for a title overlay).

---

### S7 — Stage 3: Design & Planning
**Variations to generate: 3**

**Prompt:**

```
An active architectural drafting table seen from a slightly elevated 3/4-angle — not quite overhead, but high enough to see the full table surface. The table is dark wood, lit by a precise overhead lamp that illuminates the work surface only.

On the table surface: a grid of small glowing rectangular blocks arranged in a precise dependency pattern, like a circuit diagram or a project dependency layout. The blocks are blueprint-blue (#1A73C0) — each one is a small illuminated rectangle about 1cm × 2cm in the image, with a tiny colored status-indicator light on its corner. Two or three blocks are slightly displaced — clearly mid-positioning, about to slide into their final grid slots.

Pinned to a vertical board or wall above the table: a larger architectural plan drawn in white-blue lines (#BFDBFE) — showing interconnected regions and flow arrows, abstract and geometric. This is the strategy document. It is three times the size of any individual task block.

The space between the table and the board/wall is dark. The table lamp creates a clean cone of light on the table surface, leaving the floor and surroundings dark.

The drafting table legs are barely visible in shadow.

Lighting: single overhead table lamp, tight cone of light. Blueprint on board: self-luminous lines against a dark mounting surface.

Style: The Forge — active workshop, analytical precision, dark atmosphere. No readable text, no numbers, no people. Photo-realistic.
```

---

### S8 — Stage 4: Execution — The Bolt
**Variations to generate: 4**

**Prompt:**

```
Looking directly into the opening of a forge furnace, straight-on frontal view. The furnace opening is a roughly rectangular or arched dark grey metal frame, occupying the center of the image. It acts as a framing device — a window into pure execution energy.

Inside the furnace chamber: brilliant forge-orange and white-orange fire at full, peak intensity (#FF9900 → white-orange at center). The fire is CONTROLLED and PRECISE — not wild or chaotic flames shooting in all directions, but a focused, intense, directed heat source. The fire shapes are abstract and dense. The center of the fire is nearly white-hot. The edges of the fire are deep orange-red.

The inside chamber walls are visible as dark grey metal with heat-glow on their inner surfaces — orange and red on the metal closest to the fire, dark beyond.

The furnace opening/frame is completely dark grey metal on the outside. No glow on the exterior face — the energy is contained within.

Surrounding the furnace opening: the dark forge workshop floor and walls, barely visible. The furnace is the dominant element, backlit from within.

Lighting: the fire is the only light source. The furnace frame is lit only by the fire glow from within. The surrounding workshop is deeply dark.

Style: The Forge — forge furnace at peak operation, controlled industrial power, cinematic. No text, no people, no readable symbols. Photo-realistic, high contrast.
```

**Text zone:** Top of frame above the furnace opening (dark wall space), and the two side columns outside the furnace frame.

---

### S9 — Stage 5: Testing & QA
**Variations to generate: 3**

**Prompt:**

```
A dark precision instrument panel in a forge workshop, mounted and lit by a focused overhead industrial light. The panel occupies the lower-center of the frame, with dark space above it.

The instrument panel features four circular analogue gauges arranged in a horizontal row (or 2×2 grid). Each gauge has:
— A dark face (#0F172A)
— Precision luminous scale markings (not readable, just fine white-gold tick marks around the arc)
— An orange needle (#FF9900) pointing to its measurement position
— An emerald-green arc (#10B981) marking the "healthy zone" from roughly 7 o'clock to 11 o'clock position

THREE of the gauges: needles are solidly within the emerald zone — each needle pointing slightly differently within the green arc. These gauges emit a faint emerald glow from their face.

ONE gauge: needle is positioned in the amber zone (#F59E0B arc) — hovering at approximately 2 o'clock, just outside the green arc. This gauge emits a faint amber glow instead of emerald.

The gauge housings are dark brushed metal (#1E293B). The panel itself is mounted on a dark metal surface. The ambient light outside the panel illumination is forge-dark.

Lighting: overhead spotlight illuminates the instrument panel from directly above. Clean, technical, quality-control aesthetic.

Style: The Forge — precision quality station, scientific instruments, dark metal, controlled atmosphere. No readable labels, no numbers, no people. Photo-realistic.
```

---

### S10 ★ — THE SPRINT SUMMARY: The Memory Sealed
**Variations to generate: 6 (this is the hero shot — generate maximum variants)**

**Primary Prompt:**

```
An open leather-bound codex or logbook lying flat on a dark wooden workbench, lit from directly above by a single narrow dramatic spotlight. The book is open to a double-page spread.

LEFT PAGE: off-white paper (#FEF9F0) with organized rows of small glowing icons. The icons are geometric and abstract:
— Top section: blueprint-blue glowing file/document shapes (#1A73C0) in 3–4 rows — these represent specifications
— Bottom section: teal glowing document shapes (#0D8C7C) in 2–3 rows — these represent documentation
— A small abstract architectural thumbnail sketch (blue-white lines) in the lower-left corner of the left page
All icons are evenly spaced, organized, authoritative. The page looks like a precise catalog.

RIGHT PAGE: off-white paper with organized rows of different icon types:
— Top section: forge-orange file/change icons (#FF9900) in 3 rows — files changed or created
— Center: a single large pure-white glowing symbol — a hash mark or circular seal shape (#FFFFFF) — the commit anchor, prominent
— Bottom section: emerald green checkmarks (#10B981) in 2 rows
— A circular arc in emerald at the bottom-right corner, nearly complete (coverage indicator)

THE SPINE of the book, between the two pages, has a faint emerald light running along it (#059669) — a subtle but unmistakable seal of completion.

THE BOOK COVER is visible at the top and bottom: dark aged leather (#1C1410) with a faint tooled border pattern — authoritative and permanent.

The workbench around the book is dark. Nothing else is on the workbench in the lit area.

Lighting: single overhead narrow beam illuminates the open pages dramatically. The pages are the brightest elements. The icons provide colored points of light.

Style: The Forge — ceremonial, authoritative, memory artifact. A notary's codex and a trophy simultaneously. Photo-realistic. No readable text, no numbers on the pages, no people.
```

**Variant 2 — Book nearly closed:**

```
Same leather codex on the same dark workbench, now in mid-close position: the right page is rising at a 30-degree angle as the book slowly closes. The left page is still visible lying flat. The closing right page casts a shadow across the left page.

The spine glows with an emerald light (#059669) — more visible now that the book is closing, the light emanating from the spine seam.

The right page face (now partially visible at an angle) shows the orange, white, and emerald icons catching the light at an oblique angle — they glow upward as the page rises.

The workbench in the immediate foreground is dark. The book cover (dark aged leather) is visible rising on the right side.

Lighting: overhead spotlight. The emerald spine light creates an additional bottom-up glow on the inside of the closing cover.

Style: The Forge — ceremonial book-closing moment, the emerald seal becoming visible, authoritative. Photo-realistic. No text, no people.
```

**Variant 3 — Book closed, spine prominent:**

```
A thick closed leather codex on a dark workbench, spine facing forward. The book is shut and sealed. The spine runs vertically through the center of the image.

Along the entire length of the spine, an emerald light (#059669 → #10B981) glows — a seal-stripe of verification. The light is clean and even, like a barcode scanner's path or a wax seal strip.

The cover (both front and back visible at angles) is dark aged leather (#1C1410) with subtle tooled patterns. The book is thick — 3–4 inches of compressed pages — clearly containing a comprehensive record.

A single overhead light illuminates the top edge of the closed book and the spine. The book's shadow falls behind it on the workbench.

Surround: the workbench is clear and dark. Nothing else present.

Style: The Forge — the sealed codex, maximum authority and permanence, emerald spine seal as the defining visual. Photo-realistic. No text, no people.
```

**Variant 4 — Wide angle, workbench in context:**

```
The open leather codex on the dark workbench, but now seen in wider context — the workbench occupies the lower half of the frame, and above it is the dark forge workshop interior. The overhead light forms a tight cone illuminating only the codex and the immediate workbench surface. The rest of the workshop is dark.

The book pages show the same organized icon arrays in blue/teal (left page) and orange/white/emerald (right page). The spine has the faint emerald glow.

This wider shot gives the book context: it is the final artifact of a process, sitting on the same workbench that has been used throughout the session. The workbench has the character of serious use — worn but precise.

In the very far background: a faint forge-orange glow — the ambient heat of the workshop, barely visible.

Style: The Forge — wide environmental context, the codex as the endpoint of a day's work, cinematic. Photo-realistic. No text, no people.
```

**Variant 5 — Book pages filling in sequence:**

```
An open leather codex on the dark workbench. Focus on the RIGHT PAGE, which is in a partially-filled state:

The top half of the right page shows forge-orange file icons (#FF9900) already placed — organized in clean rows, complete.
The center shows the large glowing white commit hash symbol (#FFFFFF) — placed, glowing.
The bottom half shows emerald checkmarks in progress — the first row is placed and glowing, the second row has only two checkmarks placed with space for more, the circular coverage arc at the bottom-right is two-thirds complete.

The effect is a page being filled in sequence — some entries complete and glowing, others still forming.

The LEFT PAGE (partially visible) shows complete blue and teal entries.

The spine has a partial emerald glow — building toward the complete seal.

Style: The Forge — mid-fill state of the codex, the entries populating one by one, ceremonial. Photo-realistic. No text, no people, no readable labels.
```

**Variant 6 — Close-up icons detail:**

```
Extreme close-up of the RIGHT PAGE of the open leather codex, filling the entire frame. The page is off-white document paper (#FEF9F0) with subtle paper grain.

Three distinct sections visible in the close-up:
TOP: Three forge-orange file-shaped icons (#FF9900) arranged in a neat row, each with a thin orange rectangular border. Each icon is abstract — representing files changed.
CENTER: A single large circular glowing symbol in pure white (#FFFFFF) — the commit anchor. It is roughly twice the size of the other icons, centered on the page. Around it, a subtle white halo.
BOTTOM: Four emerald checkmark shapes (#10B981) in a row, each crisp and precise. Below them, a partial circular arc (coverage meter) in emerald, reaching about 85% completion.

The page edge on the left shows the book spine with emerald glow (#059669).

Lighting: dramatic macro lighting from directly above the page surface, creating depth in the paper texture.

Style: The Forge — close-up document detail, the semantic color system as art, each color tells a story. Photo-realistic macro. No readable text, no people.
```

**Prioritization:** Variants 1 (open codex full spread) and 3 (sealed spine) are the most important. If only generating 3, use Variants 1, 3, and 5.

---

### S11 — Stage 6: Continuous Steering
**Variations to generate: 3**

**Prompt:**

```
A sleek dark monitoring display panel in a forge workshop, viewed straight on. The display occupies the center-to-lower portion of the frame. The display face is dark with a slight screen-glow.

On the display: multiple horizontal data streams flowing left to right as thin luminous lines (#06B6D4 cyan). The streams are even and parallel — 6–8 of them visible, flowing steadily. They are the color of healthy operation — cyan, crisp, clean.

In the lower-right area of the display: one of the data streams has a small upward spike — a sharp amber blip (#F59E0B) rising above the normal stream line. It is small but visible — an anomaly in the otherwise steady data.

Near the spike, a tiny white rectangular indicator light (like a tiny LED alert) is active — it is ON, a white dot of light marking the event.

Outside the display, slightly to the lower-right of the frame: an empty chair with a soft warm orange-gold light pool (#FDE68A) on its seat — barely visible in the dark, only suggested by the light. This is the human oversight presence.

The display is mounted in a dark industrial frame. The surrounding workshop is dark.

Lighting: the display is self-lit. The chair light is ambient and warm. The workshop surroundings are forge-dark.

Style: The Forge — operational monitoring station, confident automation, calm and precise. Photo-realistic. No readable text, no readable data labels, no numbers, no people.
```

---

### S12 — Role Evolution: The New Titles
**Variations to generate: 3**

**Prompt:**

```
Six precision-milled metal nameplates arranged in a row on a dark forge workbench, viewed from a slight overhead angle. The workbench is dark metal, lit from above.

Each nameplate is a rectangular metal plate, approximately 15cm × 5cm, with its long axis horizontal. The plates are evenly spaced across the frame.

Each plate has a different accent color on its edges and internal illumination:
— Plate 1 (leftmost): blue edge glow (#1A73C0)
— Plate 2: teal edge glow (#0D8C7C)
— Plate 3: forge-orange edge glow (#FF9900) — this plate is the ACTIVE one, mid-transformation
— Plate 4: violet edge glow (#7C3AED)
— Plate 5: green edge glow (#16A34A)
— Plate 6 (rightmost): red edge glow (#DC2626)

PLATE 3 (center-right) is in mid-transformation: its face surface shows a forge-orange engraving light tracing across it — like a laser engraver in motion, a thin bright orange line carving a new designation across the plate's dark metal surface. The orange trace has completed about 40% of its path.

The other plates: some are dimly glowing with their accent colors (already transformed), others are dark and waiting. No plate shows readable text — the effect is the transformation process itself.

Lighting: overhead precision spotlights. Each plate catches the light differently. The active plate (3) has the brightest point of interest.

Style: The Forge — sequential transformation, precision engraving, dark brushed metal. Photo-realistic. No readable text on any plate, no people.
```

---

### S13 — Tooling: Spec-Kit + Superpowers
**Variations to generate: 3**

**Prompt:**

```
Two industrial enforcement machines side by side on a dark forge floor, viewed straight-on from a slightly elevated angle. Both machines are dark industrial grey housing (#1E293B) with forge-orange accent lighting.

LEFT MACHINE (Spec-Kit — document processing station):
The machine is roughly refrigerator-sized. A glowing blueprint-blue document (#1A73C0) is mid-process inside the machine — partially visible through a slot opening, mid-feed. On the machine's face: a circular mechanical inspection element (like a camera lens or scanning aperture) is active. On the RIGHT side of this machine: a gate indicator glows RED (#EF4444) — the document is still being processed, gate is blocked.

RIGHT MACHINE (Superpowers — TDD enforcement station):
Similar dark industrial housing. The machine's face has a prominent RED STOP indicator light (#EF4444) glowing — the primary visual signal on this machine. There is a slot on its front where a document/test requirement would be inserted. The machine suggests a checkpoint: nothing passes without verification.

Both machines rest on the same dark forge floor. Between the machines: dark space. Above the machines: dark workshop ceiling, barely visible.

Lighting: overhead industrial lighting with forge-orange accent from each machine's internals. The RED gates/indicators are the warmest points on each machine.

Style: The Forge — industrial enforcement gates, mechanical certainty, dark precision. Photo-realistic. No readable text, no logos, no numbers, no people.
```

---

### S14 — Tooling: Jira + Confluence
**Variations to generate: 3**

**Prompt:**

```
A dark forge workshop floor with three interconnected glowing elements, viewed from a slightly elevated wide angle.

CENTER: a bright, compact hub of light — a repository core. It glows blue-white (#BFDBFE), intensely bright at the center, fading outward. It is the size of a small lantern and sits on the floor.

LEFT: a rack or shelf system with rows of abstract status badges/indicators visible on its face. One badge is mid-transition: its color is shifting from blueprint-blue (#1A73C0) to forge-orange (#FF9900) — showing a progress state change. The rack is dark metal with the badges as its only illumination.

RIGHT: a tall stack of glowing off-white pages (#FEF9F0), slowly accumulating. The stack is neat and organized. The pages glow from their edges with a warm document-white light. The stack suggests accumulated knowledge — many pages, dense with record.

Between the center hub and each side element: flowing streams of blue light (#1A73C0) — data pipelines connecting the repository to both systems. The streams are thin, clean lines of light, not wide beams.

The floor surrounding these elements is dark forge-floor. No human figures. No tool shown.

Lighting: each element is self-lit. The blue streams provide the connecting light. The space between is dark.

Style: The Forge — connected data infrastructure, automatic and effortless, dark industrial. Photo-realistic. No readable text, no logos, no people.
```

---

### S15 — Adoption Roadmap: Three Phases
**Variations to generate: 3**

**Prompt:**

```
Overhead top-down view of three parallel bridge spans being constructed across a dark gap, in a dark architectural space. The camera is perfectly overhead, looking straight down.

The gap runs horizontally across the lower third of the frame. The near edge is at the bottom, the far edge at the top. The three spans are being built toward the far edge, each at a different stage of completion.

LEFT SPAN (Foundation): bridge structure is approximately 40% of the way across the gap. The completed portion is blueprint-blue (#1A73C0) structural elements. At the leading construction edge: a small area of forge-orange (#FF9900) activity indicating active building. The incomplete portion of the span shows only the near edge of the gap.

CENTER SPAN (Expand): approximately 70% across the gap. The completed structure is teal (#0D8C7C). Forge-orange construction activity at the leading edge. The span is visibly further along than the left.

RIGHT SPAN (Optimize): fully complete. The span reaches entirely across the gap, connected to the far edge. It glows in full emerald (#10B981) — clean, complete, certified. No active construction — it is done.

The gap between spans (the dark space between the three bridge structures) is deep dark void.

The far side (top of frame) where Lane 3 connects: a solid dark platform, suggesting the destination.

Lighting: the spans are self-luminous. Overhead ambient darkness. Each span color provides its own light.

Style: The Forge — overhead architectural, three parallel progress states, clear path forward. Photo-realistic. No text, no people, no numbers.
```

---

### S16 — ROI Metrics: The Measurement Station
**Variations to generate: 3**

**Prompt:**

```
A precision measurement station in a dark workshop featuring four large analogue gauges arranged in a 2×2 grid, mounted on a dark metal panel. The panel is illuminated by a single dramatic overhead spotlight.

Each gauge:
— Dark face (#0F172A) with fine luminous tick marks around its arc (not readable as numbers, just precision graduation lines)
— A bright forge-orange needle (#FF9900) indicating measurement position
— An emerald-green arc (#10B981) marking the healthy operating zone (spanning roughly from 8 o'clock to 12 o'clock position on each gauge)

Gauge positions:
— TOP-LEFT: needle solidly in the green zone, pointing to about 10 o'clock. The green arc glows with satisfaction.
— TOP-RIGHT: needle in the LOWER end of the green zone, pointing to about 8 o'clock (this gauge measures defects — lower is better, the needle is at the low end of the green arc).
— BOTTOM-LEFT: needle sweeping visibly at mid-green zone, about 10:30 — there is a sense of motion in this needle.
— BOTTOM-RIGHT: needle solidly at the top of the green zone, about 11:30 — high and confident.

The gauge housings are precision dark brushed metal (#1E293B), high-quality scientific instruments. The four gauges are evenly arranged, separated by dark divider bars.

The station overall emits a calm, warm blue-white ambient light from the top of the panel.

Lighting: focused overhead spotlight, tight beam. The gauge faces are the primary illuminated area. Deep dark behind the panel.

Style: The Forge — precision scientific instrumentation, confident measurement, theatrical industrial. Photo-realistic. No readable labels, no numbers, no people.
```

---

### S17 — FINAL *(Bookend End)*
**Variations to generate: 4 (must visually match S1 — same drafting table, same overhead camera)**

**Prompt:**

```
Overhead top-down view of the same dark wooden architectural drafting table as in S1, perfectly centered and symmetrical (same camera angle, same framing). This is the closing image — the same table, the work complete.

The blueprint is now FULLY UNROLLED across the entire table surface. It is no longer partially unrolled — the paper extends edge to edge. The blueprint shows a complete, dense technical plan: six interconnected rectangular regions connected by flow arrows in precise geometric patterns, a small abstract book symbol in the center of the composition, and a fine lattice overlay suggesting a structural harness or constraint layer. All drawn in self-luminous white-blue lines (#BFDBFE). The lines are complete, dense, final.

In the LOWER-RIGHT CORNER of the blueprint: a forge-orange circular seal/stamp mark (#FF9900) is being drawn — about 70% complete, the orange trace still in progress. The seal is a clean circular shape, not a recognizable symbol, but clearly a final approval mark. Where the trace has passed: a glowing orange line. Ahead of the trace: dark paper.

The completed portions of the blueprint — most of it — glow with a warm orange-gold wash (#FDE68A) that builds outward from the signature mark. The outer edges of the blueprint have a cooler blue-white.

The table edges and legs are in shadow. The drafting tools from S1 (ruler, compass shadows) are still present at the edges — the same table, same session.

Lighting: the same single dramatic overhead source as S1, but now the blueprint is fully illuminated — the light hits the entire unrolled surface.

Style: The Forge — overhead architectural, the completed plan, the same table as the opening (bookend continuity critical). Photo-realistic. No text, no people, no readable content on the blueprint.
```

**Critical continuity requirement for S1↔S17 bookend:** Generate S1 and S17 in the same session. The SAME table angle, SAME camera height, SAME table surface characteristics, SAME tool-shadow positions. The only differences: S1 has a partially unrolled blueprint with the orange trace just beginning; S17 has a fully unrolled blueprint with the orange seal nearly complete. When placed side by side, an audience should immediately recognize: same table, work done.

---

## Post-Generation QA Checklist

Run this checklist after generating all 17 images.

### Mandatory Checks

| Check | What to verify |
|-------|---------------|
| **Dark text zone** | Every image has at least one region where GSAP text at 45% opacity will be readable — dark enough for white text with text-shadow |
| **S1 ↔ S17 bookend** | Same overhead angle, same table proportions, same tool shadows. Blueprint partially unrolled (S1) vs. fully unrolled (S17). Signature mark present only in S17. |
| **S4 composite ready** | S4-LEFT and S4-RIGHT have matching background ambient level. Vertical edge of each is compositionally clean for the split. |
| **S9 ↔ S16 gauge family** | Both slides feature analogue gauges with dark faces and orange needles. They should feel like instruments from the same manufacturer (same aesthetic, same gauge style). |
| **S8 furnace framing** | The furnace opening frames the fire — dark metal frame visible, fire inside. The forge-orange is brilliant and controlled. Not chaotic flame. |
| **S10 color semantics** | All five semantic colors are present and distinguishable: blue (specs), teal (docs), orange (files), white (commit), emerald (tests). The spine emerald seal is visible. |
| **No readable text** | Zoom in on every image. Any image that contains readable text (words, numbers, labels) must be regenerated. |
| **No faces or hands** | All images should be environment-only. No human elements present except the implied presence (S3 empty chair, S11 empty chair in background). |
| **Consistent Forge darkness** | All images have a deep dark background. No image should look "light" or "airy". The Forge is always a night shift. |
| **No cartoon style** | All images must be photo-realistic, not illustrated, not stylized illustration, not concept art illustration. Industrial photography aesthetic. |

### Bookend Comparison

Place S1 and S17 side by side before signing off:
- [ ] Same overhead camera angle
- [ ] Same table wood texture and color  
- [ ] S1: blueprint partially unrolled, orange trace just starting, no signature
- [ ] S17: blueprint fully unrolled, orange seal 70% complete in lower-right corner
- [ ] Both: same atmospheric dark mood, same overhead light quality

### Signature Shot Verification (S10)

From your 6+ S10 variants, select one where:
- [ ] Both left and right pages are clearly distinguished by color (blue/teal left, orange/white/emerald right)
- [ ] The emerald spine seal is visible and ceremonial — not just a thin line
- [ ] The book cover dark leather is visible and authoritative
- [ ] The icons on each page are organized and intentional-looking, not chaotic

---

## Generation Order (Recommended)

Run in this order to maintain visual consistency within a single Stitch session:

1. **S1** (set the table — establishes the whole visual world)
2. **S17** (immediately after S1, same session, same style anchor)
3. **S10** (hero shot, max variants, while style is warm in your session)
4. **S8** (most dramatic shot — forge furnace)
5. **S2** (pendulums — establish the two-object contrast language)
6. **S9 + S16** (gauge family — same session for consistency)
7. **S3** (three objects on workbench — establishes the three-pillar language)
8. **S4-LEFT + S4-RIGHT** (split composite — same session)
9. **S5 through S7** (pipeline stages 1–3 in sequence)
10. **S11 through S15** (remaining pipeline + team + roadmap)

---

*Image Prompts v1.0 — Playbook Edition · The Forge World · Companion to video_script_playbook.md*
