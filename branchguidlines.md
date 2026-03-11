# Brand Guidelines

## Typography

- **Primary Font**: Inter (Weights: 400, 500, 600) - Used for body text and general UI elements.
- **Heading Font**: Space Grotesk (Weights: 400, 500, 600, 700) - Used for all headings (H1-H6).

## Colors

### Base Theme
- **Background**: `hsl(var(--background))`
  - Light: 240 20% 98%
  - Dark: 250 25% 6%
- **Foreground**: `hsl(var(--foreground))`
  - Light: 250 25% 10%
  - Dark: 240 10% 95%

### Brand Colors
- **Primary**: `hsl(var(--primary))`
  - Light: 262 83% 58% (Purple)
  - Dark: 262 83% 62%
- **Secondary**: `hsl(var(--secondary))`
  - Light: 220 70% 55%
  - Dark: 220 70% 60%
- **Accent**: `hsl(var(--accent))`
  - Light: 240 10% 20% (Dark Gray)
  - Dark: 240 10% 30%

### EVNova Distinctive Colors
- **Evnova Orange**: `hsl(var(--evnova-orange))`
  - Light: 25 95% 53%
  - Dark: 25 95% 58%
- **Purple Glow**: `hsl(var(--evnova-purple-glow))`
  - Light: 270 90% 65%
  - Dark: 270 90% 70%
- **Blue Glow**: `hsl(var(--evnova-blue-glow))`
  - Light: 210 100% 60%
  - Dark: 210 100% 65%

### Semantic Colors
- **Destructive**: `hsl(var(--destructive))`
  - Light: 0 84% 60% (Red)
  - Dark: 0 62% 30%
- **Muted**: `hsl(var(--muted))`
  - Light: 240 10% 93%
  - Dark: 250 15% 16%

### Borders & Inputs
- **Border**: `hsl(var(--border))`
  - Light: 240 12% 90%
  - Dark: 250 15% 18%
- **Input**: `hsl(var(--input))`
  - Light: 240 12% 90%
  - Dark: 250 15% 18%
- **Ring**: `hsl(var(--ring))`
  - Light: 262 83% 58%
  - Dark: 262 83% 62%

## Layout & Components

- **Border Radius**: 0.75rem (`var(--radius)`)
- **Card Backgrounds**: 
  - Light: White (`0 0% 100%`)
  - Dark: Dark Gray (`250 20% 10%`)

## Component Library (shadcn/ui based)
The project utilizes Tailwind CSS alongside a customized configuration of standard base layers and shadcn components. 
- Elements typically share border colors `border-border`.
- All standard headings (h1 through h6) will inherit the `Space Grotesk` font family.
- Typical body content utilizes the `Inter` font.
