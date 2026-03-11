# Universal Background Glow Effect Prompt

> Copy-paste this into any AI conversation. Fill in the `[BRAND_COLOR]` placeholders with your project's accent color.

---

## PROMPT

```
Add a premium animated background glow effect to the hero section of my website.

EFFECT:
- 3 large blurred circular blobs that slowly orbit/drift around the section
- The blobs should move in different directions and at different speeds so they never sync up
- Each blob breathes (pulses opacity and scale) while it moves
- The overall feel should be like a living aurora behind the content

TECHNICAL REQUIREMENTS:
- Use Framer Motion for the animations
- Container: `absolute inset-0 overflow-hidden pointer-events-none` (so it sits behind content)
- Each blob: `absolute rounded-full blur-[100px]` to `blur-[150px]`
- Blob sizes: 400px–600px width/height
- Blob color: `bg-[BRAND_COLOR]` at 10%–20% opacity (e.g., `bg-[BRAND_COLOR]/15`)
- Animation: use `animate` prop with keyframe arrays for x, y, scale, opacity
- Duration: 15–25 seconds per blob, `repeat: Infinity`, `ease: "easeInOut"`
- Stagger the blobs so they start at different positions

BLOB CONFIGURATION:

Blob 1 (clockwise drift):
- Size: 500px
- Opacity: 15%
- Path: drifts from top-left → right → bottom-right → center → top-left
- Duration: 20s

Blob 2 (counter drift):
- Size: 400px
- Opacity: 20%
- Path: drifts from bottom-right → left → top → right → bottom-right
- Duration: 25s

Blob 3 (center anchor):
- Size: 600px
- Opacity: 10%
- Position: centered (left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2)
- Only pulses scale and opacity, does NOT move
- Duration: 8s

WHAT NOT TO DO:
- Don't use CSS @keyframes — use Framer Motion animate prop
- Don't make the blobs visible/sharp — they should be heavily blurred (120px+)
- Don't make movement fast — it should feel slow and ambient
- Don't let blobs overflow — the container must clip them

Replace [BRAND_COLOR] with your project's primary/accent color class.
```

---

## EXAMPLE USAGE

For a **green** brand (`primary`):
```
bg-primary/15, bg-primary/20, bg-primary/10
```

For a **blue** brand:
```
bg-blue-500/15, bg-blue-500/20, bg-blue-500/10
```

For a **purple** brand:
```
bg-purple-500/15, bg-purple-500/20, bg-purple-500/10
```

Just replace `[BRAND_COLOR]` in the prompt with your actual color and paste it into any AI chat.
