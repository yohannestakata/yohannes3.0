# yohannes3.0

Personal portfolio website for **Yohannes Takata** - Creative Developer & Designer.

Built with an Awwwards-inspired aesthetic: bold typography, smooth scroll-driven animations, and an interactive 3D hero powered by React Three Fiber.

## Tech Stack

- **Framework** - [Next.js 16](https://nextjs.org/) (App Router)
- **Styling** - [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation** - [Motion](https://motion.dev/) (formerly Framer Motion)
- **3D** - [React Three Fiber](https://r3f.docs.pmnd.rs/) + [Drei](https://github.com/pmndrs/drei)
- **Smooth Scroll** - [Lenis](https://lenis.darkroom.engineering/)
- **Package Manager** - [Bun](https://bun.sh/)
- **Language** - TypeScript

## Getting Started

```bash
# Install dependencies
bun install

# Start the dev server
bun run dev

# Build for production
bun run build

# Start the production server
bun run start
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Tailwind theme & global styles
│   ├── layout.tsx         # Root layout with font & metadata
│   └── page.tsx           # Homepage orchestrator
└── components/
    ├── Preloader.tsx       # Animated loading screen
    ├── Navigation.tsx      # Fixed header with nav links
    ├── Hero.tsx            # Full-screen hero with 3D blob
    ├── Scene.tsx           # R3F canvas & distorted sphere
    ├── Marquee.tsx         # Infinite skill ticker
    ├── About.tsx           # Bio & stats section
    ├── Works.tsx           # Selected projects list
    ├── Contact.tsx         # CTA + socials
    ├── Footer.tsx          # Minimal footer
    ├── CustomCursor.tsx    # Spring-based custom cursor
    └── SmoothScroll.tsx    # Lenis scroll wrapper
```

## License

MIT
