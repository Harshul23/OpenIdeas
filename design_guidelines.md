# OpenIdeas Landing Page — Design Guidelines

## Design Approach
**Reference-Based**: Drawing from Linear's directness, Notion's builder-focus, and Stripe's confident minimalism. This landing page emphasizes clarity, structure, and execution over flashy visuals—matching OpenIdeas' no-nonsense philosophy.

## Typography System
- **Primary Font**: Inter or IBM Plex Sans (Google Fonts) for clean, technical feel
- **Headline Hierarchy**:
  - Hero: text-6xl to text-7xl, font-bold, tracking-tight
  - Section Headers: text-4xl to text-5xl, font-semibold
  - Subheadings: text-xl to text-2xl, font-medium
  - Body: text-base to text-lg, leading-relaxed
- **Emphasis**: Use font-mono for technical terms (like "Capture → Expand → Validate")

## Layout System
**Spacing Primitives**: Use Tailwind units of 4, 8, 12, 16, and 24 for consistent rhythm
- Section padding: py-16 md:py-24
- Container: max-w-7xl with px-6 md:px-8
- Component spacing: gap-8 to gap-16
- Tight groupings: gap-4

## Page Structure (7-8 Sections)

### 1. Hero Section
- Height: min-h-[85vh] with natural content flow
- Layout: Asymmetric two-column (60/40 split on desktop)
- Left: Bold headline "Turn thoughts into products" + tagline emphasizing "spark → structure → execution" + primary CTA
- Right: Large hero image showing builder workspace/dashboard mockup
- Include subtle metric ("10,000+ ideas captured") below CTA

### 2. Six-Stage Lifecycle Visualization
- Full-width section with centered max-w-6xl
- Horizontal timeline/flow diagram using grid-cols-2 md:grid-cols-3 lg:grid-cols-6
- Each stage as card: icon, stage name, one-line description
- Connect stages with arrow symbols (→) between cards

### 3. Core Pillars (4 Columns Desktop)
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Each pillar: Icon, Title (Capture/Expand/Execute/Ecosystem), 2-3 line description
- Equal height cards with subtle borders

### 4. Philosophy Section
- Single column, max-w-4xl centered
- Large pull quote: "Ideas deserve execution-level respect."
- Supporting text about builder-first mindset in 2-column layout
- No image—let typography breathe

### 5. Identity/Values Grid
- 3-column grid on desktop (grid-cols-1 md:grid-cols-3)
- Showcase: Practical Innovation, Open-Source Culture, Privacy-First, Fast Execution
- Use icon + title + description pattern
- 6 total values displayed

### 6. Target Audience
- Split 2-column: "Built for" section
- Three segments: Students, Makers, Founders
- Each with tailored messaging + icon

### 7. CTA Section
- Full-width with background treatment (gradient or subtle pattern)
- Centered content: Headline "Start Building Today" + dual CTAs ("Get Started" + "View Documentation")
- Include GitHub link and "100% Open Source" badge

### 8. Footer
- 3-column layout on desktop
- Column 1: OpenIdeas logo + mission statement
- Column 2: Quick links (Documentation, GitHub, Community)
- Column 3: Newsletter signup ("Join the Builder Movement") + social links
- Bottom bar: Copyright + Privacy Policy + Open Source notice

## Component Library

### Buttons
- Primary: Solid with rounded-lg, px-6 py-3, text-base font-semibold
- Secondary: Outline style with border-2
- On hero image: Add backdrop-blur-sm bg-white/90 treatment

### Cards
- Rounded-xl with border or subtle shadow
- Padding: p-6 to p-8
- Hover: Subtle scale transform (hover:scale-105 transition)

### Icons
- Use Heroicons via CDN
- Size: w-8 h-8 for cards, w-12 h-12 for larger sections
- Stroke-width: 1.5 for consistency

### Workflow Arrows
- Use → symbol or Heroicons arrow-right
- Between lifecycle stages, subtle opacity

## Images

### Hero Image (Right Side)
- Clean screenshot or illustration of OpenIdeas dashboard/interface
- Shows idea cards, workflow stages, or builder workspace
- Professional, minimal, high-contrast
- Aspect ratio: 16:10 or 4:3

### Optional Supporting Images
- Workflow diagram visualization (can be SVG illustration)
- Community/team photo if applicable to "Builder Movement" section

## Accessibility & Interactions
- Maintain min-touch-target of 44x44px for all interactive elements
- Use aria-labels for icon-only buttons
- Ensure keyboard navigation throughout
- Minimal animations: Only subtle hover states (scale, opacity)
- No parallax or scroll-triggered animations—keep it fast and direct

## Grid & Spacing Strategy
- Desktop: Utilize 2-4 column grids strategically in Pillars, Values, and Lifecycle sections
- Mobile: Always stack to single column
- Avoid forcing 100vh on content sections—let content breathe naturally
- Consistent vertical rhythm with py-16 md:py-24 between major sections

**Design Principle**: Bold, confident, and execution-focused. Every element serves the builder's journey from idea to product.