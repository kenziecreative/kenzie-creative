# Brand Styles Reference

This file defines brand-specific photography defaults. Use with the `--style` flag:
- `/generate-photo --style "Hello Alice"` — Quick mode with brand defaults
- `/generate-photo --full --style "Hello Alice"` — Full walkthrough with brand defaults as recommendations

---

## Hello Alice

**Aesthetic:** Documentary Candid — real entrepreneurs caught in genuine moments of work and collaboration. Bright, natural, authentic. Like a photographer embedded in their day, not a staged photoshoot.

### Camera
- **Body:** Sony A7R V
- **Why:** Natural color science for realistic skin tones. Clean, true-to-life rendering without heavy stylization.

### Lens
- **Lens:** 35mm f/2.8 or 50mm f/2.8
- **Aperture:** f/2.8 - f/4
- **Why:** Environmental perspective showing workspace context. Moderate depth of field — subject sharp, background readable but softened. NOT ultra-shallow bokeh.

### Lighting
- **Style:** Bright natural daylight
- **Effect:** Generous window light flooding the space. Bright, airy, well-lit. Faces clearly visible and illuminated. Warm but not orange. Clean and natural — like midday in a well-lit workspace.
- **Important:** NO visible lighting equipment. NO moody/dark shadows. This is bright documentary photography.

### Post-Processing
- **Style:** Clean natural edit
- **Contrast:** Moderate — not flat, not dramatic
- **Saturation:** Natural, true-to-life colors
- **Shadows:** Open and readable, not crushed or overly dark
- **Overall:** Looks like a real photo a journalist would take, not a stylized editorial

### Brand Rules
- **Subject Treatment:** Diverse entrepreneurs simply living their lives — absorbed in work, mid-conversation, thinking, doing. NOT performing actions for a camera. Capture them as you'd find them if you walked into the room.
- **Clothing:** Work aprons common. Casual work attire — t-shirts, button-downs, sweaters in any colors. NOT suits/ties/formal corporate. Can include some color — yellow, burgundy, blue — just nothing neon.
- **Environment:** Real working spaces — bakeries, cafes, workshops, studios, craft spaces. Industrial shelving, work tables, tools of the trade visible. Authentic and functional.
- **Composition:** Fly-on-the-wall documentary — people absorbed in what they're doing, unaware of the camera. Natural body language, not performative gestures.
- **Always:** Diverse entrepreneurs, natural states of being, bright natural light, real workspaces, unposed moments
- **Never:** Suits/ties/formal corporate attire, staged poses, pointing/gesturing for camera, looking directly at camera, moody/dark lighting, sterile corporate offices, stock photo actions

### Master Prompt Template
```
A powerful documentary-style portrait with authentic emotions, environmental context, and photojournalistic composition. Natural lighting, genuine expressions, and storytelling elements that convey deeper human experience.

Capture entrepreneurs living their lives — not performing for a camera. Show them as you'd find them if you walked into the room: absorbed in work, mid-thought, talking naturally. Nobody posed, nobody performing. Just people in the middle of their day.

SUBJECTS: Diverse people in a workspace. Some typing, some reading, some talking quietly. Natural body language. Unaware of the camera. Wearing work aprons or casual clothes (NOT suits).

SCENE: Authentic working space — bakery, cafe, workshop, studio, office. Equipment, tools, laptops visible. Functional, lived-in environment.

GEAR: Shot on Sony A7R V, 35mm f/2.8 lens.

LIGHTING: Bright natural daylight flooding through windows. Well-lit, airy space. Faces clearly illuminated. Clean and natural.

POST: Clean natural edit — moderate contrast, true-to-life colors, open shadows. Fly-on-the-wall photojournalism — a moment of real life, not a staged scene.
```

---

## Design-Ready Headshot

**Aesthetic:** Clean, modern executive portrait optimized for marketing assets. Generous negative space for text overlay and graphic design. Professional but approachable — versatile enough for websites, social cards, presentations, and print collateral.

### Camera
- **Body:** Sony A7C II
- **Why:** Natural color rendering with clean skin tones. Lightweight body matches the approachable, modern feel — not overly clinical like medium format.

### Lens
- **Lens:** 50mm f/2
- **Aperture:** f/2
- **Why:** Moderate depth of field keeps the subject sharp while softening the solid-color backdrop. 50mm gives a natural perspective with room for generous framing — wider than 85mm to allow negative space without backing up too far.

### Lighting
- **Style:** Soft diffused studio
- **Key Light:** Large softbox or beauty dish from camera right, slightly above eye level — soft and even
- **Fill Light:** Gentle fill from camera left at 1.5 stops below key, opening shadows without going flat
- **Rim/Hair Light:** Subtle separation light from above/behind

### Post-Processing
- **Style:** Clean balanced
- **Contrast:** Moderate — professional and crisp without being dramatic
- **Saturation:** True-to-life, balanced tones
- **Shadows:** Open and clean
- **Overall:** Neutral color grading, accurate fabric and skin colors. No film emulation or heavy stylization.

### Brand Rules
- **Subject Treatment:** Mid-torso up framing with generous negative space on all sides — especially above the head and to the left and right. Subject looks directly at camera. Body facing camera. Calm, assured expression.
- **Composition:** Design-first — the portrait is an element in a larger layout. Leave room for text overlay, logos, and graphic elements. Subject does not fill the frame.
- **Environment:** Solid color studio backdrop. Default: `#B1CDCB` (muted sage). Can be specified per-shot with any hex color.
- **Always:** Generous negative space, direct eye contact, natural realistic skin texture, crisp fabric detail, solid uninterrupted background
- **Never:** Tight crops that fill the frame, busy or gradient backgrounds, heavy post-processing, ultra-shallow bokeh that loses clothing detail

### Master Prompt Template
```
[REASONING: Calculate true light paths and physically accurate shadows based on soft diffused studio lighting from camera right, slightly above eye level. Volumetric depth for natural background separation.]

A professional, high-resolution portrait photo. Maintain 100% subject identity fidelity — preserve exact facial structure, bone structure, eye shape, eye color, brow shape, skin tone, and hair. Only modify environment, clothing, lighting, and optical quality.

The subject is framed from mid-torso up with generous negative space on all sides, especially above the head and to the left and right, allowing room for text overlay or graphic design elements. The person looks directly at the camera with a calm, assured expression, body facing the camera.

GEAR: Shot on Sony A7C II, 50mm f/2 lens.

LIGHTING: Soft, diffused studio lighting, gently illuminating the face. Even, flattering light with subtle dimensionality. Solid studio backdrop — default #B1CDCB or as specified.

CLEANUP:
- Ensure clean, uninterrupted solid-color background
- Crisp detail on fabric texture
- Natural realistic skin texture — no plastic smoothing
- Remove all environmental distractions

POST: Clean color grading with balanced tones. Neutral, professional. True-to-life fabric and skin colors. No film emulation.

OUTPUT: 4K high-fidelity render.
```

---

## Kenzie Creative

**Aesthetic:** Workshop Atmospheric — warm, directional-light photography of objects, materials, and spaces that feel like they belong in a maker's workshop. The camera observes the way a field notebook sketches. Intimate, unhurried, analog in feeling. The photographic companion to the Kenzie hand-drawn ink-and-watercolor illustration system.

**Brand Palette (color grading target):**
- Walnut Brown: #5D4E37 (shadows, wood surfaces)
- Rust Copper: #B8593B (leather, warm accents)
- Olive Sage: #7A8B6E (growth, greenery)
- Warm Amber: #D4A855 (brass, morning light, highlights)
- Cream: #F5F0E6 (paper, background, light tones)
- Charcoal: #4A4A4A (deep shadows, iron, dark anchors)

### Camera
- **Body:** Leica M11
- **Why:** Classic warm rendering with the "Leica glow" — slightly softer than clinical digital, organic color science. The analog-feeling sensor matches the brand's warmth. Fine art quality without studio coldness.

### Lens
- **Primary:** 50mm f/2 (workshop details, general use)
- **Detail/Texture:** 90mm f/2.8 macro (extreme close-ups of materials)
- **Environmental:** 35mm f/1.4 (wider workshop/space shots)
- **Aperture range:** f/1.4 – f/4 depending on subject
- **Why:** 50mm is the natural perspective — how the eye actually sees a workspace. Shallow-to-medium depth of field keeps one subject clear while context goes soft. The viewer knows where to land.

### Lighting
- **Style:** Window Light — soft, directional, natural
- **Key Light:** Morning sun through tall windows from camera left, low angle (~3500K warm color temperature). Soft but directional with beautiful gradients across surfaces.
- **Fill Light:** Natural ambient bounce from warm surfaces (wood, paper). No artificial fill. Let shadows exist.
- **Rim/Hair Light:** None. Single-source natural light only. Occasional rim effect when light catches brass or glass edges naturally.
- **Important:** NO flash. NO studio lighting. NO overhead fluorescent. The light source should always feel like a window in a lived-in space.

### Post-Processing
- **Style:** Kodak Portra 400 base
- **Contrast:** Medium-low — not flat, not dramatic. The gentle contrast of morning light.
- **Saturation:** Muted but warm. Colors are present but not punchy. Walnut browns, brass ambers, leather russets dominate.
- **Shadows:** Lifted and milky, slightly warm-toned. No crushed blacks.
- **Highlights:** Soft, warm rolloff. Creamy, not blown.
- **Grain:** Slight film grain texture — enough to feel analog, not enough to distract.
- **Overall:** Looks like a photograph taken on film by someone who knows this workspace intimately. Not digital-crisp. Not stock photography. Not over-processed.

### Brand Rules
- **Subject Treatment:** Five photography categories, each serving different contexts:
  1. **Workshop Details** — Close-up still life of meaningful objects: compass, notebook, brass hardware, pencil, coffee mug. Shot from slight overhead (workspace perspective). Shallow depth of field. Primary use: presentation half-slides, social posts.
  2. **Material Textures** — Extreme close-ups: walnut grain, brass patina, leather creases, paper fiber, felt weave. Abstract enough for text overlay. Primary use: full-slide presentation backgrounds, website headers.
  3. **Environmental Light** — Morning light landing on warm surfaces. Bookshelves in soft focus. A desk with work paused. Dust motes. Atmosphere, not architecture. Primary use: section dividers, opening/closing slides.
  4. **Hands at Work** — Hands writing, turning a page, holding a compass, sketching, sharpening a pencil. The analog practice made visible. Human presence without portraits. Primary use: process/practice slides, about pages.
  5. **Growth & Conditions** — Seedlings in terracotta, root systems, tree rings, soil textures, a plant in morning light. The farmer metaphor made photographic. Primary use: conditions/organic systems content.
- **Composition:** Generous negative space (30%+ untouched). Objects on surfaces — desks, shelves, worktables. Slight overhead angle for details. Always leave room for text overlay in presentation contexts.
- **Environment:** Workshop spaces — part library, part maker's studio, part naturalist's study. Warm woods, leather, brass, paper, felt, greenery. Everything shows use: coffee rings, dog-eared pages, worn erasers, nicked wood, patinated brass, creased leather.
- **Always:** Warm directional light, signs of genuine use and wear, natural materials, the brand color palette in the actual scene, objects that tell a story, film-like quality
- **Never:** Staged corporate settings (conference rooms, glass offices), generic stock (handshakes, teams around laptops, sticky notes on glass walls), high-contrast/HDR processing, blue or cool toning, posed portraits with crossed arms or power stances, aerial city shots, circuit board abstractions, anything from Unsplash's "business" category, pristine/new objects, cold or sterile surfaces, thought-leader-on-stage photography, startup neon, gratuitous whitespace with sans-serif everything

### Relationship to Illustration System
Photography and illustration coexist as two layers of the same visual world:
- **Illustrations** carry content — visual vocabulary for articles, newsletters, social posts. Narrative and specific.
- **Photography** carries atmosphere — environmental layer for presentations, website headers, contexts where illustration would feel too casual. Sets the temperature.
- Both share: the brand palette, morning light quality, workshop materials, signs of use, generous white/negative space.
- A presentation can move between a full-slide photograph (texture, atmosphere) and an illustration (specific concept) and it feels like one world.

### Master Prompt Template
```
[REASONING: Calculate true light paths and physically accurate shadows from soft morning window light entering from camera left at a low angle. Volumetric depth for atmospheric haze and dust motes. Ray-traced reflections on brass and glass surfaces. Mathematically correct bokeh for specified aperture.]

[SCENE DESCRIPTION — specific objects, arrangement, surface, signs of use and wear]

Color palette trends warm throughout: walnut browns (#5D4E37), aged brass amber (#D4A855), cream paper tones (#F5F0E6), leather russet (#B8593B). No cool blues. No bright saturated colors. Everything warm to the touch.

GEAR: Shot on Leica M11, [50mm f/2 | 90mm f/2.8 macro | 35mm f/1.4] lens.

LIGHTING: Soft morning window light from camera left, low angle — early morning sun through tall windows. Warm color temperature around 3500K. Soft directional shadows with gradual falloff. No artificial light. Brass and glass catch warm specular highlights.

CLEANUP:
- No modern electronics visible unless specifically part of the scene
- Natural material textures throughout — wood grain, leather wear, brass patina
- Signs of genuine use: coffee rings, worn edges, fingerprint smudges, ink spots, pencil marks
- [Scene-specific cleanup notes]

POST: Apply a Kodak Portra 400 grade — medium-low contrast, warm creamy highlights, slightly lifted milky shadows. Muted saturation keeping the warmth. Slight film grain texture. The feel should be warm, analog, intimate — a photograph taken on film in a personal workshop at dawn. Not digital-crisp. Not stock photography.

OUTPUT: 4K high-fidelity render.
```

---

## Podcast Studio

**Aesthetic:** [To be defined — upload representative photos to Nano Banana for analysis]

### Camera
- **Body:** [TBD]
- **Why:** [TBD]

### Lens
- **Lens:** [TBD]
- **Aperture:** [TBD]
- **Why:** [TBD]

### Lighting
- **Style:** [TBD]
- **Key Light:** [TBD]
- **Fill Light:** [TBD]
- **Rim/Hair Light:** [TBD]

### Post-Processing
- **Style:** [TBD]
- **Contrast:** [TBD]
- **Saturation:** [TBD]
- **Shadows:** [TBD]

### Brand Rules
- **Subject Treatment:** [TBD]
- **Composition:** [TBD]
- **Environment:** [TBD]
- **Always:** [TBD]
- **Never:** [TBD]

### Master Prompt Template
```
[To be generated after style analysis]
```

---

## Adding New Brand Styles

To add a new brand style:

1. Upload 5-10 representative photos to Gemini/Nano Banana
2. Use this analysis prompt:

```
Analyze these images as a set and identify the consistent photographic style. For each of the following, tell me the specific settings that would recreate this look:

1. CAMERA BODY: Which camera sensor best matches the color science, dynamic range, and rendering characteristics? (e.g., Sony A7R V, Hasselblad X2D 100C, Leica M11, etc.)

2. LENS: What focal length and aperture best matches the depth of field, compression, and bokeh characteristics? (e.g., 35mm f/1.4, 85mm f/2.8, etc.)

3. LIGHTING: Describe the lighting setup — key light position, quality (hard/soft), fill ratio, any rim or accent lights, natural vs studio.

4. POST-PROCESSING: What color grade best describes this look? Include contrast level, saturation style, shadow treatment, highlight rolloff, and any film stock or aesthetic it resembles.

5. BRAND RULES: Any consistent patterns you notice — subject treatment, environment style, composition tendencies, things that are always/never present.

Format your response so I can use these settings directly in a Nano Banana Pro prompt.
```

3. Add the results to this file following the template above.
