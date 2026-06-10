# The Governed Agent — Video Presentation Script
### Living Video Background System · 20 Loops · Veo2 Production

**Reviewed and refined by:** Master Storyteller · Motion/Loop Engineer · Cinematographer  
**Status:** Final pre-production script — ready for start-frame generation  
**Next step:** Generate start-frame images (Imagen 3 / Midjourney) → Veo2 image-to-video

---

## The Visual World

Every one of the 20 videos lives inside the same **Governance Void** — an infinite abstract space, dark, deep-field, volumetric. Not a server room. Not a factory. Not space. A *felt* space, like the inside of an intelligent system. The camera is always static, locked off. There is no real-world location, no architecture you could name, no street or building — only light, particles, structure, and the presence of governed or ungoverned forces.

**The visual through-line:** The same *substance* — drifting particles — appears in all 20 slides, but at different states of governance. This is what makes the 20 videos a single film rather than 20 stock clips.

| State | Description | Emotion |
|-------|-------------|---------|
| **Ungoverned** | Amber/sodium particles — turbulent, random, colliding, hot | Chaos, dread, fatigue |
| **Transitioning** | Violet/indigo — particles beginning to organize, tenuous | Uncertainty, possibility |
| **Governed** | Cyan particles on rails — precise, flowing, beautiful | Control, relief, confidence |
| **Verified** | Emerald pulses — confirming passage, rare and precious | Earned trust, safety |

---

## Color Semantic System
**These colors are reserved meanings, not decoration. Never break the code.**

| Color | Semantic meaning | Where it appears |
|-------|-----------------|-----------------|
| `Amber / sodium-orange` | Chaos, ungoverned risk, the hangover state | S2-S6, left side of comparisons. Never in a "safe" frame. |
| `Cyan` | Governance — the harness, control, the rails | Governed states, pipeline, harness. The cage that enables speed. |
| `Emerald` | Verified safety, passing state, trust restored | Only when something is proven. Scarce. Earns appearances. |
| `Violet / Navy` | The neutral substrate, the brand | Backgrounds, title connective tissue. The stage, never the actor. |
| `Pure White` | Truth, the spec, the manifesto | S7, S12, S19. White is authority. |
| `Dawn-Gold` | Healthy warmth, earned hope, sunrise | S18-S20 only. DISTINCT from sodium amber — peachy, not sickly. |

**The color arc of the film:**  
`Neutral violet (S1) → Amber crisis (S2-S6) → White pivot (S7) → Cyan governed (S8-S16) → Dawn-gold arrival (S18-S20)`

---

## Loop Mechanism Reference
*(Used in each slide spec below)*

| Code | Name | How it works | Use for |
|------|------|-------------|---------|
| **LM1** | Cyclical motion | Motion is inherently periodic — wave, breath, pulse, orbit | Pulsing lights, breathing particles, sine waves |
| **LM2** | Crossfade blend | Generate 10-12s clip; crossfade last 1.5s into first 1.5s in post (ffmpeg/AE) | Ambient drift, continuous flow, haze |
| **LM3** | Boomerang | Play forward then reverse. End=start by construction | Growth/decay, bridge building, vines retracting |
| **LM4** | Start=End anchor | Same image as start frame AND end frame (Veo2 hint, not guarantee) | Always back up with LM2 |

**Golden rule:** Video = mood bed. GSAP overlay = every chart, number, label, code line, word. Veo2 cannot render legible text or accurate numbers. Never try.

**Camera rule for all Veo2 prompts:** Always include: *"static locked-off shot, camera mounted on tripod, absolutely no camera movement whatsoever, no zoom, no pan, no dolly, no push-in, no handheld"* — repeat the negation, single mention is ignored.

**Darkness rule:** Prompt all videos "dark, low-key, moody, deep shadows, high contrast." Generate 1-1.5 stops darker than feels right. Apply CSS scrim in EasyDeck rather than baking in brightness — easier to tune per theme. Target ≤20% luminance in text zones against the brightest frame of the loop. Minimum 4.5:1 contrast for body text.

---

## Slide-by-Slide Script

Each entry includes:
- **Scene** — what the camera sees
- **Motion** — what moves and how  
- **Loop** — mechanism + duration  
- **Palette** — specific colors in play  
- **Text zone** — where GSAP content lives  
- **Mood** — emotional temperature at this moment in the arc  
- **Start frame seed** — detailed description for image generation (not a Veo2 prompt — that's the next step)

---

### S1 — TITLE: "The Governed Agent"
**Narrative role:** The opening frame. Before the storm. Neutral.

**Scene:**  
An infinite dark void — deep slate-black, nearly liquid in its stillness. Scattered across the field: thousands of tiny amber-golden particles drifting slowly with no pattern, no direction, like ancient dust in still air. No structure. No purpose. But very slowly — so slowly it is subliminal — a single shaft of structured blue-white light begins to form in the center-background. The particles nearest to it begin to orient, infinitesimally, toward it. Like iron filings just awakening to a magnet. The alignment is barely perceptible — it is a *promise*, not a fulfillment.

**Motion:**  
- Particles: slow random Brownian drift (LM2 crossfade)  
- The shaft of blue-white light: fades in slowly, holds briefly, fades out and returns (LM1 — 10s period)  
- Particle orientation: particles nearest the shaft orient slightly during its presence; drift back when it fades

**Loop:** LM1 (light shaft pulse, ~10s period) + LM2 crossfade on particle drift  
**Duration:** 10–12s

**Palette:**  
- Void: deep navy-black (#080B14)  
- Particles: warm amber-gold (#D4892A at 60% opacity, varied)  
- Light shaft: pure blue-white (#B8D4FF), very narrow beam  

**Text zone:** Upper third (above particle concentration), lower third  

**Mood:** Poised. Mysterious. Calm before the storm. Not ominous — the light is hopeful.

**Start frame seed:**  
*An infinite dark void, deep navy-black, filled with thousands of tiny amber-gold glowing particles drifting at random. Very slightly out of focus. In the far background, a faint blue-white shaft of structured light just beginning to form. The particles have no order, no pattern — pure Brownian motion. Cinematic, volumetric atmosphere, slight haze. Dark and moody. Minimal. Vast.*

---

### S2 — STATS: The AI Productivity Paradox
**Narrative role:** The thesis of the paradox — something is climbing, something is falling. Unsettling.

**Scene:**  
The same void. Two arcs of flowing particles trace paths that cross in the center of the frame. The left arc flows upward and to the right — cool blue particles, climbing (adoption). The right arc flows downward and to the left — amber particles, falling (trust). Where the arcs intersect, a visible interference zone: the particles don't destroy each other, they pass through, but the crossing creates a subtle tension shimmer. Both arcs are continuous streams — new particles appear at each origin, old ones fade at each endpoint. The meeting in the center is the paradox made visible.

**Motion:**  
- Blue arc: continuous upward flow (LM2 steady-state — always flowing, particles generated at bottom-left, fade at top-right)  
- Amber arc: continuous downward flow (LM2 steady-state — particles generated at top-left, fade at bottom-right)  
- Interference zone: subtle shimmer where arcs cross (LM1 periodic shimmer)

**Loop:** LM2 steady-state both arcs (continuous generation/fade). No start/end state to match — always flowing.  
**Duration:** 8s

**Palette:**  
- Void: deep navy  
- Rising arc: cool blue (#3B82F6) particles, flowing upward  
- Falling arc: amber (#F59E0B) particles, flowing downward  
- Intersection: violet shimmer (#8B5CF6) where paths cross  

**Text zone:** Upper left and lower right (flanking the crossing), center is the visual focus  

**Mood:** Unsettling. Something is wrong and the image proves it before a word is read.

**Start frame seed:**  
*An infinite dark void, two arcs of glowing particles crossing in the center. Left arc: cool blue particles flowing upward-right. Right arc: warm amber particles flowing downward-left. Where they cross, a subtle violet interference shimmer. Dark, atmospheric, cinematic. The arcs are the only light source.*

---

### S3 — THE SIGNATURE SHOT: AI is an Amplifier
**Narrative role:** The thesis made irrefutable. Both beautiful and alarming. The image people remember.

**Scene:**  
Two oscilloscope displays fill the frame — left and right, separated by a dark vertical gap. Each has authentic CRT properties: slight screen curvature, faint scanlines, glass bloom on corners, phosphor persistence/decay trails.

**Left oscilloscope:** A perfect, clean, breathing sine wave traces across the phosphor screen in green-white. The wave enters a small glowing blue amplifier node at the left edge and exits the right edge as a *larger*, *cleaner*, *more powerful* version of itself. It is beautiful. Mathematical. The kind of sine wave you'd see in a textbook if textbooks were art.

**Right oscilloscope:** A jagged, complex, irregular signal — chaotic, aperiodic, contradicting itself — enters an *identical* amplifier node. What exits is *alarming*: the trace explodes to the top and bottom of the screen, clips hard, distorts with visible visual buzz, peaks flaring orange-red at their maximum. The chaos has been amplified into something that feels like damage.

The dark gap between the two screens is where understanding lives.

**Motion:**  
- Left wave: continuous perfect sine oscillation (LM1 — wave period divides evenly into clip length)  
- Right chaos: aperiodic amplified output with occasional extra spike for variation (LM1 base cycle)  
- Phosphor trails: natural persistence/decay on both traces  
- Amplifier nodes: pulse blue when signal passes through (LM1 with signal)

**Loop:** LM1 — both waves are periodic oscillations. Perfect natural loop.  
**Duration:** 6–8s (make the sine wave period obvious and legible)

**Palette:**  
- Black CRT backgrounds  
- Left trace: phosphor green-white (#A8FF78)  
- Left amplifier: cool blue (#3B82F6)  
- Right trace base: amber-white (#FEF3C7)  
- Right amplified peaks: alarming orange-red (#EF4444) where clipping  
- Amplifier node right: same blue (the amplifier is neutral — the input determines the output)  
- Screen borders/body: dark slate hardware  

**Text zone:** The dark gap between the two screens. Below each screen label.  

**Mood:** Left side is gorgeous. Right side makes the audience physically uncomfortable. That asymmetry is the entire presentation in one image.

**Production details that make it cinematic:**  
- CRT screen curvature at edges — slight fisheye distortion  
- Faint scanlines, horizontal, at about 2% opacity  
- Phosphor *persistence* — each trace leaves a faint ghost for ~50ms  
- The chaotic right output should *clip* with visible saturation distortion — the peaks should feel violent  
- Slight lens bloom on the brightest parts of both traces  
- The right trace's amplified output must reach and slightly overflow the top and bottom of the screen — this is essential to the alarm  

**Start frame seed:**  
*Two CRT oscilloscope screens side by side, separated by a dark gap, in a dark room. Left screen: a perfect luminous sine wave in green-white, passing through a glowing blue amplifier node, emerging larger and cleaner. Right screen: a chaotic, jagged, irregular signal passing through an identical blue node, emerging as an alarming, clipped, distorted waveform with red-orange peaks that blow past the screen boundaries. Authentic CRT details: screen curvature, faint scanlines, phosphor persistence. Cinematic, macro depth-of-field, dramatic lighting.*

---

### S4 — SCROLLABLE: The Three Eras and the Drift
**Narrative role:** History accelerating toward collapse. Drift must stick — no reset, no salvation.  
**Technical note:** 60+ second dwell. Steady-state ambient. No directional narrative in video — all progression is in the GSAP text overlay.

**Scene:**  
A horizontal landscape in the void. Three bands of light-texture stretch left to right across the full frame — corresponding to the three eras. The camera is static and eye-level. This is not a diagram — it is the emotional quality of each era, rendered as particle texture.

**Left band (Traditional Era):** Warm amber-gold particles, moving very slowly in gentle organized columns — like pages being turned, like people walking in measured procession. Warm but heavy. Predictable.

**Middle band (Assistant Era):** Cooler, blue-tinted particles, moving faster — the same particles but with more urgency. Still organized, still flowing in one direction, but accelerating. The warmth has been replaced by efficiency.

**Right band (Agentic Era):** This is where the drift lives. The particles that had been organized are now spinning, orbiting each other, occasionally colliding. The temperature has shifted back to amber — but a hotter, more unstable amber than the left band's warm gold. The structure is visibly absent. And crucially: the scene does *not* reset. This is the held state of drift — not accumulating, not recovering, just *held in dysfunction*.

The bands don't have hard borders — they bleed into each other, particularly the boundary between middle and right, where you can see organized blue particles entering the chaos zone and losing their direction.

**Motion:**  
- Left band: slow, organized particle columns (LM1 — gentle column cycle)  
- Middle band: faster organized flow (LM1 — faster cycle)  
- Right band: turbulent orbital chaos (LM1 — chaotic orbit cycles)  
- Each band's motion is its own LM1 cycle — steady-state, no direction, always looping

**Loop:** LM1 all three bands, LM2 crossfade at clip transition. **12–15s** — longest dwell.  

**Palette:**  
- Left: warm amber-gold (#D97706) particles, very slow, organized  
- Middle: cool blue (#60A5FA) particles, faster, organized  
- Right: hot amber-orange (#F97316) particles, fast, turbulent  
- Band boundaries: natural gradient bleed  

**Text zone:** Top full width (large text headings), content overlays against the dark sky above each band  

**Mood:** Creeping dread. The right side looks *sick*. The degeneration is not dramatic — it is the quiet horror of watching something subtly and irreversibly wrong.

**Start frame seed:**  
*A horizontal dark void with three distinct bands of glowing particle texture stretching left to right. Left band: slow warm amber-gold organized particle columns. Middle band: faster cool blue flowing particles. Right band: hot amber-orange turbulent chaotic particles spinning and colliding. Bands bleed gently into each other. The right side is visibly hotter and more disordered. Cinematic, atmospheric, wide frame.*

---

### S5 — STATS: The Vibe Coding Hangover
**Narrative role:** The aftermath. A human was here. They are gone. What remains is the evidence.

**Scene:**  
An empty workstation in the void — but now the void has gone sodium-amber. The ambient particles have turned that sickly fluorescent-warm color of dying infrastructure. The workstation chair is empty. There is a human-shaped absence here — the most unsettling kind of presence.

The monitors glow amber with the state of failure: dozens of frozen notification rectangles (no readable text — just amber glowing blocks, the geometry of errors). On the main screen: a single cursor blinks at mid-sentence. The sentence was never finished. A cold beverage sits nearby, condensation glinting blue-cold in the warm light. One fan spins slowly, decelerating through the clip, as if winding down at the end of a long session.

The scene is aftermath. Not theater — aftermath.

**Motion:**  
- Sodium-amber particles: slow ambient drift (LM2 crossfade)  
- Cursor: blinks on regular interval (LM1 — 1s period, very reliable loop)  
- Error notification rectangles: very gentle pulse, like dying neon (LM1 — slow, 4s period)  
- Fan: decelerating very slightly over the clip, but slowly enough that the loop doesn't show the jump (LM2 crossfade helps mask)  
- Condensation on beverage: very subtle light refraction shift (LM1 imperceptible)

**Loop:** LM1 cursor blink + LM1 notification pulse + LM2 ambient drift. **8–10s.**

**Palette:**  
- Ambient: sodium-amber (#F59E0B at low intensity, diffuse)  
- Error blocks: amber-orange (#FB923C) frosted rectangles  
- Cursor: blue-white (#BFDBFE) — the only cool note in the frame  
- Fan and hardware: dark slate  
- Beverage condensation: cold blue-white (#E0F2FE)  

**Text zone:** Upper half is clear (workstation occupies lower frame). Side regions are open.  

**Mood:** Bleak. Exhausted. The morning after. Not sad-sack melodrama — the quiet horror of abandoned work. The cursor blink is the heartbeat of a project that isn't dead but wishes it were.

**Production details:**  
- The sodium light should have a *barely-visible flicker* — dying fluorescent energy, not clean LED  
- The empty chair should have a slight indentation — someone was here  
- No human visible anywhere — their absence is the subject  
- The cursor is the last living thing in the frame. It blinks because nothing told it to stop.

**Start frame seed:**  
*An empty desk and chair in dim sodium-amber light, in a dark room. Multiple monitors showing amber-tinted error states — glowing rectangles, no readable text. A cursor blinking mid-sentence on the main screen. A cold beverage with condensation. One fan on the desk. Dark, moody, cinematic. The chair is empty. The scene is aftermath. Sodium-amber atmospheric light, slight haze.*

---

### S6 — CONTENT: Agentic Tech Debt Taxonomy
**Narrative role:** The debt accumulates. It is geometric, not organic. And it leaves scars.

**Scene:**  
A pristine architectural blueprint — glowing white-blue lines on deep black, a perfectly designed structure rendered as clean geometric precision. This is the spec, beautiful in its completeness.

Then: amber-bronze geometric chunks begin to accrete onto the blueprint — hard-edged, crystalline, snapping into place with mechanical weight. Not smooth growth, not organic vines — geometric debt, like crystallized amber accreting in discrete commits. Each chunk is a decision that bypassed the spec. The blueprint becomes heavier, uglier, partially obscured.

Then (LM3 boomerang): the debt begins to retract in the reverse sequence. The chunks fall away, the blueprint reveals. But — and this is the crucial detail — when the blueprint is "clear" again, faint amber ghost-scars remain on the lines. A memory of the debt, encoded in the structure itself. The cycle begins again.

**Motion:**  
- Debt accretes in discrete geometric chunks (forward, ~6s)  
- Reverse: chunks fall away in reverse order (reverse, ~6s)  
- Ghost-scars: remain visible throughout both phases (never fully clean)  
- LM3 boomerang = seamless start=end by construction

**Loop:** LM3 boomerang. Generate 6s forward, reverse = 12s effective.  
**Duration:** 12s effective loop

**Palette:**  
- Blueprint lines: white-blue (#BFDBFE)  
- Debt geometry: amber-bronze (#92400E / #D97706)  
- Ghost-scars: faint amber trace (#FEF3C7 at 30%) on the blueprint lines  
- Void: deep black  

**Text zone:** The upper portion of the frame (blueprint typically occupies center-lower). Side margins.  

**Mood:** Suffocating accretion. The scars are the emotional detail — the audience understands on a gut level that "paid off" tech debt is not the same as "never having the debt."

**Start frame seed:**  
*A glowing architectural blueprint — white-blue geometric lines on pure black — being partially covered by angular, crystalline amber-bronze geometry chunks. The chunks are hard-edged, like solidified resin or amber crystal, accreted onto the blueprint structure. Where chunks have been removed, faint amber ghost-marks remain on the lines. Cinematic, dark, precise. The blueprint is partially obscured by the debt-geometry.*

---

### S7 — QUOTE: The Manifesto Pivot
**Narrative role:** The turning point of the film. Silence and reverence. After four slides of crisis, this is the breath.

**Scene:**  
A single sheet of paper in absolute darkness — rendered with material honesty: actual paper texture, fibers visible, the subtle translucency of paper held to light. A shaft of pure white light falls from above in a precise column onto the document, illuminating it in the center of the void.

The light traces the imaginary text lines — not real letters, but the *rhythm* of reading: left to right, line by line, pause at the end of a sentence, next line. The light follows this reading rhythm as if someone is reading the words aloud. Between the passages of light, faint blue energy — the energy of truth — pulses through the paper's fibers from within.

Nothing else is in the frame. The surrounding void is absolute black.

**Motion:**  
- Light reads across the document in reading-rhythm lines (LM1 — 8s period, 3 "lines" per cycle)  
- Blue fiber energy: pulses gently between light passes (LM1)  
- Paper fibers: very subtle living texture (LM1 micro-movement)

**Loop:** LM1 — reading cycle and energy pulse. **8s.**

**Palette:**  
- Void: absolute black (#000000)  
- Paper: warm off-white (#FEF9F0), with fiber texture  
- Light: pure white (#FFFFFF), narrow column  
- Energy pulses: cool blue (#93C5FD) tracing through fibers  

**Text zone:** The document surface itself — the GSAP quote text lives exactly where the light traces, as if the light is revealing it. The surrounding black is completely text-safe.  

**Mood:** Reverent. The room should feel like it takes a breath. After four slides of amber heat, this pure white in absolute darkness is a spiritual reset. The turning point.

**Start frame seed:**  
*A single sheet of paper with visible fiber texture, illuminated by a narrow column of pure white light from directly above, in absolute darkness. The paper glows with an inner blue energy visible through its fibers. Nothing else in the frame. The paper occupies the center of the image. Macro lens, paper texture visible. Deep black surrounds. Cinematic, contemplative, sacred.*

---

### S8 — COMPARISON: Vibe Coding vs. The Governed SDLC
**Narrative role:** Relief begins. The right side is the first clean breath since Slide 2.  
**Technical note:** Generate as TWO separate videos, composite 50/50 in EasyDeck.

**Scene:**  
A perfect vertical split across the center of the frame. Both halves contain the SAME particle substance — this is not "two different rooms," it is *one substance in two governance states*.

**Left half (Vibe Coding):** The particles from slides 4-6 — amber, turbulent, colliding, hot, spiraling. Brief near-formations that dissolve. Occasional flare-ups of orange. No pattern survives more than a moment.

**Right half (Governed SDLC):** Identical particles — but now flowing on invisible cyan rails with beautiful order. They pulse as they pass through invisible checkpoints. The temperature is cool, the motion is satisfying. The same substance has been given structure.

The boundary between halves is a clean, sharp vertical line — no bleed. The contrast is the argument.

**Motion:**  
- Left: turbulent LM1 orbital chaos cycle  
- Right: smooth channel-flow LM1 cycle  
- Both loops independently, composited side-by-side  

**Loop:** LM1 both halves. LM2 crossfade for transitions. **8–10s.**  
**Generation:** Two separate Veo2 videos, composited.

**Palette:**  
- Left: amber (#F97316), hot-orange (#EF4444) at flares, turbulent  
- Right: cyan (#06B6D4) rails, particles (#A5F3FC), flowing  
- Boundary: clean vertical line, no gradient bleed  

**Text zone:** Upper portion of each half, with the dividing line as a structural element  

**Mood:** The first slide where relief is felt. The right side is physically calming after the amber crisis act.

**Start frame seed (left half):**  
*The left half of a split frame: amber and hot-orange glowing particles in turbulent, chaotic motion — spiraling, colliding, forming brief patterns that immediately dissolve. No structure. Pure chaos. Dark background. High-contrast, cinematic.*

**Start frame seed (right half):**  
*The right half of a split frame: the same particles but now flowing in organized cyan streams along invisible channels. Cool, precise, flowing. Particles pulse as they pass through invisible checkpoints. Dark background. Beautiful, ordered, calming.*

---

### S9 — CONTENT: The Three Principles
**Narrative role:** Grounded. Solid. These three things together hold the structure.

**Scene:**  
In the void: three nodes of energy arranged in a triangular formation — the geometry of stable load-bearing structure (a tensegrity). Each node has its reserved semantic color.

**Blue node (The Spec — Truth):** Lower-left. Solid, authoritative. Emits organized beam-lines.  
**Cyan node (The Harness — Guardrail):** Lower-right. Latticed, structured. The cage that enables.  
**Emerald node (The Human — Judge):** Top-center, elevated. The only human-bright warmth in the frame.

Between the nodes, *tension cables* of luminous light run taut — the connections are visibly under load, maintaining the structure. Amber particles orbit the triangle, slowly being captured by the structure and added to it — crystallizing into the lattice. The structure holds. It sways almost imperceptibly — the micro-vibration of a load-bearing system at rest.

**Motion:**  
- Orbital particle capture: ambient particles slowly crystallize onto the structure (LM1 gentle cycle, ~10s)  
- Tension cables: very subtle brightness breathing (LM1, ~4s period, each cable slightly offset phase)  
- Node cores: each breathes slightly independently (LM1, different phase offsets — organic, not mechanical)

**Loop:** LM1 all elements. **8–10s.**

**Palette:**  
- Void: deep black  
- Blue node: #3B82F6 (Spec)  
- Cyan node: #06B6D4 (Harness)  
- Emerald node: #10B981 (Human) — first substantial use of emerald  
- Tension cables: white-blue (#BFDBFE), under visible tension  
- Ambient particles being captured: transitioning amber→cyan as they're absorbed  

**Text zone:** Three natural anchor points around the triangle (one per node), plus upper space for title  

**Mood:** Grounded. Trustworthy. This is not "inspiring uplift" — it is the quiet confidence of something structurally correct. The emerald node is the warmest element since the crisis; it's earned.

**Start frame seed:**  
*Three glowing nodes arranged in a stable triangle in a dark void: lower-left is blue, lower-right is cyan, top-center is emerald-green. Between them, luminous white-blue tension cables run taut. Amber glowing particles orbit the structure, some crystallizing onto the cables. The structure sways very slightly under invisible load. Cinematic, dark, structural. Like a tensegrity sculpture made of light.*

---

### S10 — SCROLLABLE: The 6-Stage Governed SDLC Pipeline
**Narrative role:** The climax. The full governed lifecycle in one continuous journey.  
**Technical note:** 60+ second dwell. Steady-state ambient. 12–15s loop. The pipeline structure is in the GSAP overlay — the video provides the *feeling* of governed flow.

**Scene:**  
Eye-level perspective down a long corridor of GATES — six arched portals of light stretching from near to far, receding into the depth of the void. Each gate is a different shade of the cyan-to-emerald spectrum (progressively warmer as you move deeper — governance leading toward verification).

Particles flow down the corridor from far to near — cyan, organized, precise. Before each gate, the flow *pauses slightly* — a brief queue of particles building up, then the gate *passes* them and they surge through with renewed speed. Each gate-pass is a small, satisfying click of rightness. Between gates the particles flow in perfect organized streams.

The floor and ceiling of the corridor are implied by light falloff — the gates themselves provide the structure. The space between is void.

**Motion:**  
- Particles: continuous steady-state flow (LM2 — always flowing, no directional progression to reset)  
- Gate pulses: LM1 — each gate brightens as a batch of particles passes through (staggered timing)  
- Queue-and-surge: visible at each gate (the brief accumulation and release)  
- Particle velocity: slightly faster immediately after each gate (the surge of approval)

**Loop:** LM2 steady-state flow + LM1 gate pulses. **12–15s** (minimize loop frequency, maximize loop invisibility).

**Palette:**  
- Void corridor: deep navy-black  
- Gate 1 (Intent): cyan-blue (#3B82F6)  
- Gate 2 (Constraints): blue-violet (#6366F1)  
- Gate 3 (Planning): cyan (#06B6D4)  
- Gate 4 (Execution): teal (#0D9488)  
- Gate 5 (Testing): emerald (#10B981)  
- Gate 6 (Steering): full emerald (#059669)  
- Particles: cyan-white (#E0FFFE)  

**Text zone:** Top two-thirds of the frame (the pipeline runs in the lower third). Wide open space above.

**Mood:** Controlled, satisfying. The queue-and-surge at each gate is the emotional core — each pause is a checkpoint, each surge is approved progress. Governance is not slowdown; it's *earned acceleration*.

**Start frame seed:**  
*Eye-level perspective down a long dark corridor with six glowing arched portals/gates receding into the distance. Each gate glows in a different shade from cyan-blue to emerald, progressively warmer deeper in. Cyan-white particles flow through the corridor, briefly queuing before each gate then surging through. The floor and ceiling are dark void — only the gates provide structure. Cinematic, atmospheric, deep perspective.*

---

### S11 — DIAGRAM: The Harness Architecture
**Narrative role:** The harness made visible. Empowering, not clinical. Governance ≠ perfect; governed = handled.

**Scene:**  
Floating in the void: a three-dimensional network of glowing nodes connected by luminous rails. The harness is a beautiful, purposeful structure — not a generic "blockchain network," but a *directed* system with clear flow: spec and constitution at origin, harness at center, agent in middle, human checkpoint glowing brightest, production at end.

Cyan data packets travel along the rails. Most flow smoothly, pulsing through each node as they pass. But occasionally — and this is the detail that makes it real — one packet *slows*, *bounces back slightly* (a retry), then recalibrates and passes successfully. The harness caught something. That's the point.

The human checkpoint node (emerald) is the largest and most luminous — everything flows toward it eventually, and its approval sends packets onward to the final production node.

**Motion:**  
- Data packets: continuous steady-state flow (LM2 — always flowing)  
- Node pulse on packet arrival: LM1 (each node brightens when packet passes)  
- Occasional retry: organic, unscheduled — a packet slows, slight backward jitter, then proceeds  
- Harness structure: very subtle breathing (LM1 — the whole harness breathes slightly, alive)

**Loop:** LM2 steady-state flow + LM1 node pulses. **8–10s.**

**Palette:**  
- Void: deep black  
- Spec node: blue (#3B82F6)  
- Constitution node: violet (#7C3AED)  
- Harness node: cyan (#06B6D4)  
- Agent node: amber (#F59E0B)  
- HITL node: emerald (#10B981), largest and brightest  
- Production node: slate (#475569)  
- Rails: cyan-white (#CFFAFE)  
- Packets: cyan (#67E8F9) glowing spheres  

**Text zone:** Outside the network boundary — the network occupies center, text lives in the margins  

**Mood:** Empowering structure. The retry detail is everything — it tells the audience that the harness *works*, that it catches things, that this is a real system not a diagram.

**Start frame seed:**  
*A three-dimensional network of six glowing nodes floating in a dark void, connected by luminous cyan-white rails. Nodes in different colors (blue, violet, cyan, amber, bright emerald, slate), with the emerald node largest and most luminous. Cyan glowing data packets travel along the rails, pulsing as they pass through nodes. One packet near the amber node appears slightly hesitant, as if retrying. Cinematic, volumetric, precise.*

---

### S12 — CODE: The Spec as Persistent Memory
**Narrative role:** The artifact. The terminal that has been running forever and knows everything.

**Scene:**  
A glowing terminal surface floating in the void — a black rectangle with a defined border, like a window into pure information. On the screen, abstract code-glyphs cascade downward in organized, governed flow — not the chaotic Matrix rain, but *precision code rain*: slower, deliberate, with certain lines highlighting in blue as they pass (the equivalent of the spec's critical constraint lines). The terminal has been running for years. It will run forever. It is the persistent memory.

The terminal border pulses very slightly — it is *alive*, authoritative. The code-glyphs are not English or any language; they are pure information aesthetic — the gestural quality of code without requiring Veo2 to render readable text.

**Motion:**  
- Code-glyph cascade: continuous downward flow (LM2 steady-state)  
- Highlighted constraint lines: pass at regular intervals (LM1 — one every ~2s)  
- Terminal border pulse: very subtle brightness cycle (LM1 — 6s period)  
- Cursor: visible at the "current line," blinking (LM1)

**Loop:** LM2 steady-state cascade + LM1 highlights/cursor. **8s.**

**Palette:**  
- Terminal background: near-black (#0D1117)  
- Code glyphs: green-white (#ECFDF5 at 60%), cascading  
- Highlighted lines: blue (#BFDBFE), brighter as they pass  
- Terminal border: cyan (#22D3EE), softly pulsing  
- Void: deep black  

**Text zone:** The actual spec content (the real readable spec.md) is in the GSAP overlay, appearing to "type itself" over the video background. The video provides the atmosphere; GSAP provides the legibility.  

**Mood:** Precise, confident. This terminal has the answers. This is what memory looks like when it's given the right form.

**Start frame seed:**  
*A glowing terminal screen floating in a dark void — a crisp rectangle of near-black with a subtle cyan border. Abstract code-glyphs cascade downward in organized streams, like precision code rain. Every few lines, one line highlights in blue as it passes. A blinking cursor visible near the top. The terminal glows with authority. Dark, cinematic, slightly warm glow from the screen in the surrounding void.*

---

### S13 — COMPARISON: The Role Evolution
**Narrative role:** The same energy, two configurations. Transformation made abstract.  
**Technical note:** No human figures — abstract both sides as energy states.  
**Generation:** Two separate videos, composited.

**Scene:**  
A vertical split. Both sides contain the same "energy" — multiple streams of colored light. The governance state determines the configuration.

**Left half (The Old Role):** Many thin, individual, brightly-colored streams — each a different color (the different tasks: one cyan stream, one amber, one violet, one blue, one green) — all tangling around a single convergence point. The streams are fighting for the same space. Some braid together chaotically, some spiral, some simply pile. The single point at the center is overwhelmed.

**Right half (The Governed Role):** The same colored streams — but now gathered, organized, and flowing *outward* from a single conducting point in organized rays. The same streams that were tangling are now radiating with controlled power. Each stream has its lane. The center is not overwhelmed — it is the source.

**Motion:**  
- Left: tangling/braiding stream chaos (LM1 — orbital tangle cycle)  
- Right: radiating organized streams (LM1 — radial expansion cycle, more stable than left)

**Loop:** LM1 both sides. LM2 crossfade. **8–10s.**

**Palette:**  
- Both sides: same set of stream colors (cyan, amber, violet, blue, emerald)  
- Left: streams tangling, colors mixing, hot at the center  
- Right: streams organized in lanes, each color clear and distinct  

**Text zone:** Upper portions of each half, plus the split boundary as a visual anchor  

**Mood:** Calm mastery on the right. The left communicates exhaustion without melodrama.

**Start frame seed:**  
*A vertical split. Left half: multiple thin colored light streams (cyan, amber, violet, blue, emerald) tangling and spiraling chaotically around a single central point, some braiding together, overwhelming the center. Right half: the same colored streams now radiating outward in organized lanes from a calm central point, each color distinct and purposeful. Dark background. Abstract, energetic, cinematic.*

---

### S14 — DIAGRAM: The Orchestrator Pattern
**Narrative role:** Command with grace. Sequenced, not simultaneous. The cue before the action.

**Scene:**  
A single point of intense violet-white light at the exact center of the void — the Orchestrator. From it, light arcs radiate outward to three amber-tinted nodes positioned at equal angles (the three agents). But the arcs are *sequenced* — not simultaneous. First arc extends to node A, node A lights up and responds (cyan return-flow pulses back to center). Then arc to node B. Then node C. Then all three return-flows converge at the center in a brief synthesis pulse. Then the cycle begins again.

The half-beat of anticipation before each arc — the brief darkness just before the light extends — gives the sequence gravity and intention.

**Motion:**  
- Orchestration sequence: center→A→A-responds→center→B→B-responds→center→C→C-responds→synthesis-pulse (LM1 — full sequence is the period)  
- Arc extension: the light arc extends rapidly then the return flow follows more slowly  
- Synthesis pulse: when all three return-flows arrive, the center brightens briefly — *this is the moment of governance realized*

**Loop:** LM1 — the orchestration sequence is a natural period. **10s.**

**Palette:**  
- Central node (Opus): violet-white (#EDE9FE / #FFFFFF), intense  
- Agent nodes: amber (#FCD34D) for A, amber-orange (#FB923C) for B, amber (#F59E0B) for C  
- Outbound arcs: violet (#7C3AED)  
- Return flows: cyan (#06B6D4) — the governed response  
- Synthesis pulse: white burst, brief  

**Text zone:** Center-frame text lives above the central node; agent labels near their nodes  

**Mood:** Commanding, in-control. The half-beat of anticipation gives it gravity. This is not frantic — it is *deliberate*.

**Start frame seed:**  
*A single intense violet-white light point at the center of a dark void. Three amber-tinted glowing nodes positioned at equal distances and angles around it. A luminous arc of violet light extends from the center toward one node, which lights up amber and sends a cyan return flow back to center. The other two nodes wait. Dark, dramatic, with deep void. The sequencing creates a sense of intentional command.*

---

### S15 — CONTENT: Tooling the Governed SDLC
**Narrative role:** The governed act's most practical moment. Equipped and precise.

**Scene:**  
An elegant array of glowing modular units mounted on a precision rail system — the governed toolkit as architecture. Each module is a geometric form, distinct, with its own color signature (one blue, one cyan, one teal, one emerald — no amber anywhere on this slide). The modules are mounted precisely, each in its designated bay on the rail.

The rail occasionally slides a module into the "active position" at center — a smooth mechanical movement, like a bolt-action: click into place, a moment of engagement (the module brightens at its peak), then slides back to its bay as the next one engages. The whole system is ordered, purposeful, entirely in the cyan/emerald register — we have left the amber crisis completely.

**Motion:**  
- Rail slide: LM3 boomerang — module slides out, brief engagement, slides back. Cycles through each module.  
- Module engagement glow: LM1 (brightens at engagement peak)  
- Ambient light across all modules: very gentle breathing (LM1)

**Loop:** LM1 + LM3 rail slide cycle. **8–10s.**

**Palette:**  
- Rail structure: dark slate (#1E293B), precision geometry  
- Module 1 (Spec-Kit): blue (#3B82F6)  
- Module 2 (Harness): cyan (#06B6D4)  
- Module 3 (Context Hub): teal (#0D9488)  
- Module 4 (Agent HQ): emerald (#10B981)  
- No amber, no orange — fully in the governed register  

**Text zone:** Above the rail system, and label anchors near each module  

**Mood:** Precise, equipped. This is a professional's workshop — every tool has its place.

**Start frame seed:**  
*A horizontal rail system in a dark void with four distinct geometric glowing modules mounted in precision bays — blue, cyan, teal, and emerald. One module is sliding out to an active position at center and glowing brightly at its peak. The others wait in their bays, quietly lit. Clean, precise, architectural. No amber tones — only cool blues and greens. Cinematic, dark, professionally lit.*

---

### S16 — STATS: The Business Case
**Narrative role:** The ROI visible as reconstruction. The Slide 6 blueprint, now healing.  
*(This is the narrative payoff of Slide 6 — the same world, in recovery.)*

**Scene:**  
The Slide 6 blueprint — but now the amber debt-geometry is retracting. In a visual reversal of the earlier slide, the crystallized amber chunks fall away from the blueprint in reverse sequence. As they clear, the underlying blueprint lines are revealed brighter and stronger than before. And as the reconstruction completes, the *structure rises taller* — the governed spec has not just cleaned up the debt, it has rebuilt the system to 2.3× its original height. Scars slowly fade to clean lines. Emerald verification pulses appear at the foundations.

The audience who remembers Slide 6 feels this as narrative resolution.

**Motion:**  
- Debt chunks retract in reverse-sequence (LM3 boomerang — the blueprint "heals")  
- Structure rises taller as debt clears (also in the LM3 forward direction)  
- Emerald verification pulses at foundations (LM1 — appears as structure completes)  
- LM3 overall: forward (healing + rising) then slowly reverse begins the gentle re-accumulation

**Loop:** LM3 boomerang. **10–12s effective.** Generate ~6s of healing/rising, reverse gives 12s ping-pong.

**Palette:**  
- Blueprint (revealed): white-blue (#BFDBFE) brighter than S6  
- Debt retracting: amber-bronze (#D97706) falling away  
- New structure height: pure white (#FFFFFF) at peak  
- Verification pulses: emerald (#10B981)  
- Scars fading: from faint amber to clean white-blue  

**Text zone:** Above the blueprint — the ROI numbers (230% etc.) are GSAP overlay, not in the video  

**Mood:** Confident momentum. The Slide 6 audience recognizes this is the same blueprint, healed. That recognition is emotional without being sentimental.

**Start frame seed:**  
*An architectural blueprint in white-blue lines on deep black, with amber-bronze geometric chunks of "debt" visibly falling away from it in reverse. The underlying lines are revealed bright and clean as the chunks clear. The structure is taller and more complete than the debt implied. Emerald glowing pulses appear at the foundation lines. The scene is reconstruction, restoration, recovery. Cinematic, precise, cathartic.*

---

### S17 — TIMELINE: The Adoption Roadmap
**Narrative role:** Forward, deliberate. Infrastructure, not moonshot.

**Scene:**  
A bridge in the void — architectural, minimal, precise. Seen from the side, spanning a gap of pure black. The near-side foundation is complete and glowing warm-neutral. The bridge span reaches forward across the gap.

**Phase 1 state** (the baseline loop): The span reaches approximately 40% across the gap. The construction edge is the active zone — glowing cyan elements clicking into place at the frontier.

**Phase 2 state** (forward motion): The span extends to ~70%, new cyan segments clicking into place. Each segment engages with a satisfying mechanical click (visual — the segment snaps into alignment, a brief brightness pulse).

**Phase 3 state** (completion): The span reaches the far cliff, makes contact, and the entire bridge lights up in full emerald — verified, complete, connected. It holds for a moment.

**Then** (loop transition): LM2 crossfade back to Phase 1 state.

**Motion:**  
- Phase 1→2→3: forward construction (bridge extends)  
- Emerald completion glow: LM1 pulse at the connection moment  
- LM2 crossfade: from Phase 3 back to Phase 1  
- Segment clicks: each new segment has a brief brightness snap (LM1)

**Loop:** LM1 + LM2. **12–15s** (phases need time to read distinctly).

**Palette:**  
- Near foundation: warm neutral (#F3F4F6 structure, lit warmly)  
- Construction elements: cyan (#06B6D4) clicking into place  
- Gap: pure black  
- Completion glow: emerald (#10B981) full-bridge  
- Far cliff: dark slate, receiving the span  

**Text zone:** Upper third (wide open above the bridge arc). Phase labels alongside their corresponding bridge sections.  

**Mood:** Forward, deliberate. A bridge is infrastructure — governance is how you get across the gap. This is not rocket-launch excitement; it is the quiet satisfaction of engineering.

**Start frame seed:**  
*A bridge being constructed across a gap of pure black in an abstract dark void, viewed from the side. The near foundation glows neutral-warm. The bridge span extends approximately halfway across the gap, with the construction frontier glowing cyan as new segments click into place. The far cliff waits in darkness. Cinematic, architectural, precision geometry. Dark and atmospheric.*

---

### S18 — CONTENT: The 2027 Horizon
**Narrative role:** The world bifurcating. The amber is losing. Dawn is winning.

**Scene:**  
The Governance Void — but the full substance of the presentation is here, resolving. The amber particles from the crisis act still drift on the left side of the frame, but they are thinner, less energetic, clearly diminishing. From the right side, dawn-gold light is spreading — clean, peachy, warm-healthy (NOT the sickly sodium amber of the crisis; this is sunrise gold: warm, clear, earned).

Where the dawn-gold touches the amber chaos particles, it transforms them: they slow, organize, take on cyan character, join the governed flow. Where it hasn't reached yet, the amber remnants continue their tired orbit. The transformation is visible, incremental, and moving left.

**Motion:**  
- Dawn-gold spreading from right to left (LM3 boomerang — spreads, holds at peak, retreats)  
- Amber particles diminishing where touched (color transformation, LM3 in sync)  
- Emerging organized flow where dawn touches (cyan streams forming)  
- Peak: approximately 60% of the frame has been transformed  
- Retreat: the dawn recedes slightly (suggesting it must be *maintained*, not assumed permanent)

**Loop:** LM3 boomerang. **12–15s.** The peak moment of transformation is the emotional high.

**Palette:**  
- Residual amber: (#F97316) diminishing, left side  
- Dawn-gold: (#FDE68A / #FCD34D) — peach-gold, NOT sodium. Clean warmth.  
- Transformed particles: transitioning to cyan (#67E8F9)  
- Far right: nearly fully ordered, emerald-tinted  

**Text zone:** Upper two-thirds, with particle field in lower half  

**Mood:** Dawning optimism. The dawn-gold has been paid for by 17 slides. It is earned.

**Start frame seed:**  
*An infinite dark void with amber glowing particles on the left side slowly diminishing, and warm dawn-gold light spreading from the right side. Where the gold touches, particles transform and organize into cyan streams. The boundary between amber-chaos and gold-order is visible and moving left. The right side is nearly fully organized and glowing with warm peach-gold. Cinematic, atmospheric, a world bifurcating.*

---

### S19 — QUOTE: The Final Manifesto
**Narrative role:** Intimate resolve. Not triumph — commitment.

**Scene:**  
A torch burns in absolute darkness. The flame is honest — warm golden-white with real physics: it leans slightly in an unseen air current, flickers with the aperiodic rhythm of real combustion, not CG cycles. The flame underscores the cornerstone of the completed structure from below — a carved stone block, the foundation of everything the presentation has built.

The light from the torch falls on the cornerstone's face, where the manifesto's three lines are implied by the three grooves carved into the stone — not readable text, but the geometry of engraved meaning. The torchlight traces the grooves as the flame moves.

Sparks drift upward from the flame and fade before reaching the darkness. The surrounding void is the most absolute black of the entire film.

**Motion:**  
- Flame: aperiodic flicker (LM1 with natural variation — use reference fire footage to get this right)  
- Sparks: continuous generation and upward drift, fading before they leave frame (LM2 steady-state)  
- Cornerstone light: changes with flame movement (organic, LM1)

**Loop:** LM1 flame + LM2 sparks. **8–10s.** This is Veo2's strongest category — fire in darkness.

**Palette:**  
- Void: absolute black (#000000) — the deepest black of the entire film  
- Flame: golden-white core (#FEF9F0 to #F59E0B to #EF4444 at tips)  
- Cornerstone: warm grey (#374151), lit from below  
- Sparks: (#FDE68A), fading to (#F59E0B), to nothing  
- Zero cyan, zero amber-chaos — only the honest warmth of fire  

**Text zone:** The light that falls on the cornerstone is where the GSAP quote text lives. The flame provides the illumination for the text — as if the text is being revealed by the commitment to keep the fire burning.  

**Mood:** Intimate resolve. This is not triumph — it is the quietest, most committed moment in the film. The room should feel like a vow.

**Production detail:** The single most important shot in the deck. If the flame physics are wrong, it reads as CG and the moment dies. Source real fire reference if possible. The cornerstone must feel like actual carved stone — not CG geometry. One grain of realness here is worth more than all the technical precision in the other 19 slides.

**Start frame seed:**  
*A single torch with a real, honest flame — golden-white with authentic flicker — burning in absolute darkness. Below and behind the torch, a carved stone cornerstone with three shallow engraved grooves lit by the torch's warm light from below. Sparks drift upward from the flame and fade. The surrounding void is total black. Cinematic, intimate, a very slight warm haze in the flame light. The cornerstone looks ancient and real, not CG.*

---

### S20 — FINAL: "The Governed Agent"
**Narrative role:** Bookend to Slide 1. The same particles, governed. Serene arrival, not loud triumph.

**Scene:**  
The exact composition of Slide 1 — the same infinite dark void, the same camera angle, the same infinite depth. But the amber particles that were drifting at random are now flowing in organized, beautiful streams of cyan-emerald along rails of structured light. The shaft of blue-white light from Slide 1 that was barely forming is now the spine of the entire organized system — streams flow along it like a river with banks.

The dawn-gold warmth from Slides 18-19 is present as a very subtle ambient warmth — this void is slightly, imperceptibly warmer than the void in Slide 1.

And: one or two particles are still drifting slightly off their rails — not errors, just stragglers finding their place. This is the detail that keeps it human rather than utopian. Perfection with a pulse.

**Motion:**  
- Organized particle flows: steady-state (LM2 — always flowing)  
- Dawn warmth breathing: very subtle (LM1 — 12s period, barely perceptible)  
- Straggler particles: occasional, organic — drifting toward their rail and joining the flow  
- Structured light spine: pulses very gently (LM1)

**Loop:** LM2 steady-state main flow + LM1 warmth breathing. **10–12s.**

**Palette:**  
- Void: deep navy with the faintest warmth (#0C1220 vs Slide 1's #080B14 — imperceptibly warmer)  
- Particle flows: cyan (#67E8F9) to emerald (#6EE7B7) — warmer than the pure cyan of the governed act  
- Light spine: white-blue (#BFDBFE) — the same shaft from Slide 1, now fully formed  
- Dawn warmth: peach-gold (#FDE68A) at ≤10% opacity, very subtle  
- Straggler particles: amber transitioning to cyan as they find their rail — the last amber becoming governed  

**Text zone:** Same as Slide 1 — upper and lower thirds  

**Mood:** Serene arrival. This is not the conclusion of a sales pitch — it is the completion of a journey. Quiet, confident, earned. Anyone who remembers Slide 1 will recognize this void. The recognition is the payoff.

**THE BOOKEND:** Slide 1 opens on scattered amber particles and a barely-forming light. Slide 20 closes on those same particles, governed, flowing on the same light — now fully realized. The presentation is the journey between these two states. If the audience feels the recognition, the film has done its job.

**Start frame seed:**  
*The exact visual composition of an earlier scene — infinite dark void — but now filled with organized, beautiful cyan-to-emerald particle streams flowing along invisible rails of structured light. A luminous white-blue spine runs through the center, and particles flow alongside it like a river. The void has a very faint, barely-perceptible warmth compared to its beginning state. One or two particles drift slightly off their rails, gently finding their way back. Cinematic, serene, organized. Dawn warmth implied but not dominant.*

---

## Production Summary

### Slide Classification

| # | Slide | Duration | Loop Mechanism | Veo2 Feasibility | Notes |
|---|-------|----------|---------------|-----------------|-------|
| 1 | Title | 10–12s | LM1 + LM2 | ★★★★★ | Opening tone-setter |
| 2 | Paradox | 8s | LM2 steady-state | ★★★★☆ | Two arcs, no charts |
| 3 | Amplifier | 6–8s | LM1 | ★★★★★ | SIGNATURE SHOT 1 |
| 4 | Three Eras | 12–15s | LM1 + LM2 | ★★★★☆ | Scrollable — steady-state |
| 5 | Hangover | 8–10s | LM1 + LM2 | ★★★★☆ | No humans |
| 6 | Tech Debt | 12s | LM3 boomerang | ★★★☆☆ | Boomerang careful execution |
| 7 | Manifesto Pivot | 8s | LM1 | ★★★★★ | Transition point |
| 8 | Comparison | 8–10s | LM1 + LM2 | ★★★★☆ | Two separate videos |
| 9 | Three Principles | 8–10s | LM1 | ★★★★☆ | First emerald appearance |
| 10 | Pipeline | 12–15s | LM2 steady-state | ★★★★☆ | Scrollable — steady-state |
| 11 | Harness | 8–10s | LM2 + LM1 | ★★★★☆ | Retry detail is critical |
| 12 | Spec/Code | 8s | LM2 + LM1 | ★★★★☆ | GSAP carries all real text |
| 13 | Role Evolution | 8–10s | LM1 + LM2 | ★★★★☆ | Two separate videos |
| 14 | Orchestrator | 10s | LM1 | ★★★★☆ | Sequenced arcs |
| 15 | Tooling | 8–10s | LM1 + LM3 | ★★★★☆ | Rail slide mechanism |
| 16 | Business Case | 10–12s | LM3 boomerang | ★★★☆☆ | S6 payoff |
| 17 | Roadmap | 12–15s | LM1 + LM2 | ★★★☆☆ | Bridge phases |
| 18 | 2027 Horizon | 12–15s | LM3 boomerang | ★★★★☆ | Dawn spread |
| 19 | Torch/Manifesto | 8–10s | LM1 + LM2 | ★★★★★ | MUST be real fire |
| 20 | Final | 10–12s | LM2 + LM1 | ★★★★★ | BOOKEND — must echo S1 |

### Generation Workflow

```
1. Generate start-frame IMAGE (Imagen 3 / Midjourney / Flux)
   → Use start-frame seed descriptions in this document
   → Make it 1-1.5 stops darker than feels right
   → Verify text-safe zone is clear and dark

2. Image-to-video (Veo2)
   → Fixed prompt structure: [static camera lock] + [subject + motion] + [loop intent] + [mood] + [negatives]
   → Generate 3-5 takes per slide, pick cleanest camera lock
   → Target 10-15% longer than needed (leave LM2 crossfade headroom)

3. Post-process (ffmpeg / After Effects)
   → LM2 slides: crossfade final 1.5s into first 1.5s
   → LM3 slides: reverse and concatenate
   → QA: play x10 in a row — if you spot the seam by loop 3, redo
   → Export: H.264 MP4 (primary) + VP9 WebM (fallback), target <4MB at 1080p

4. EasyDeck integration
   → Video as full-screen background layer
   → CSS scrim: linear-gradient(rgba(8,11,20,0.55), rgba(8,11,20,0.70)) over video
   → text-shadow: 0 2px 12px rgba(0,0,0,0.8) on all overlay text
   → GSAP carries all charts, numbers, labels, spec content
```

### The Two Signature Shots
These two frames should receive the most production care. They are the images the audience will quote.

**S3 — The Oscilloscope Amplifier:** The thesis of the entire presentation in a single frame. Left: clean in, clean amplified. Right: chaos in, alarming amplified chaos. Phosphor CRT with real persistence. The right side's chaos must *alarm* — it should make the audience physically uncomfortable. Protect this shot with silence.

**S1↔S20 — The Bookend:** Slide 1 is the opening question; Slide 20 is the answer. Anyone who recognizes the void they opened on will feel the journey has completed. This recognition is the emotional payoff of the entire film. These two shots must be composed identically — same depth, same angle, same ambient field — differing only in the state of the particles and the warmth of the light.

---

*Script Version 1.0 — Expert-reviewed · Ready for start-frame generation*  
*Next step: Veo2 prompts (start frame prompt + video generation prompt) for each of the 20 slides*
