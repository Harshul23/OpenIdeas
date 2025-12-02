# OpenIdeas

**Turn Ideas Into Reality** — A builder ecosystem designed to turn raw thoughts into real, working products.

## What is OpenIdeas?

OpenIdeas removes friction from the creative process so ideas can move from **spark → structure → prototype → execution** quickly and cleanly. It provides a clear system to move any idea through six stages:

1. **Capture** — Collect the idea instantly
2. **Expand** — Break it down and explore it
3. **Validate** — Test if it makes sense in reality
4. **Prototype** — Form a structure or early design
5. **Build** — Create a working version
6. **Iterate** — Refine and improve it

## Philosophy

> "Ideas deserve execution-level respect."

Every idea is treated as a potential product. The system focuses on speed, clarity, usefulness, and disciplined creativity.

## Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: SQLite via Prisma ORM
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Harshul23/OpenIdeas.git
   cd OpenIdeas
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API endpoints
│   │   ├── ideas/         # Ideas CRUD + lifecycle stages
│   │   └── users/         # User management
│   ├── capture/           # Idea capture page
│   ├── ideas/             # Ideas listing and detail pages
│   └── page.tsx           # Home/Dashboard
├── components/            # React components
│   ├── ideas/            # Idea-specific components
│   ├── layout/           # Layout components (Header, Footer)
│   └── ui/               # Reusable UI components
├── lib/                   # Utilities and configurations
└── generated/             # Prisma generated client
prisma/
├── schema.prisma         # Database schema
└── migrations/           # Database migrations
```

## Features

### Implemented

- ✅ Full idea lifecycle management (Capture → Iterate)
- ✅ Ideas CRUD operations
- ✅ Stage-based progression tracking
- ✅ Expansion worksheets (breakdown, user stories, constraints)
- ✅ Validation tracking (feasibility, market fit, risks)
- ✅ Prototype documentation (wireframes, workflow, tech outline)
- ✅ Build tracking (repo URL, deployment, progress)
- ✅ Iteration history and versioning
- ✅ Tag-based categorization
- ✅ Responsive UI with TailwindCSS
- ✅ Dark mode support

### Upcoming

- [ ] User authentication (NextAuth.js)
- [ ] AI-powered idea expansion
- [ ] Collaboration features
- [ ] Export/Import ideas
- [ ] Analytics dashboard

## API Endpoints

### Ideas

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ideas` | List all ideas (with filters) |
| POST | `/api/ideas` | Create new idea |
| GET | `/api/ideas/[id]` | Get idea details |
| PATCH | `/api/ideas/[id]` | Update idea |
| DELETE | `/api/ideas/[id]` | Delete idea |
| POST | `/api/ideas/[id]/expand` | Add/update expansion data |
| POST | `/api/ideas/[id]/validate` | Add/update validation data |
| POST | `/api/ideas/[id]/prototype` | Add/update prototype data |
| POST | `/api/ideas/[id]/build` | Add/update build data |
| POST | `/api/ideas/[id]/iterate` | Add new iteration |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | List all users |
| POST | `/api/users` | Create new user |
| GET | `/api/users/[id]` | Get user details |
| PATCH | `/api/users/[id]` | Update user |
| DELETE | `/api/users/[id]` | Delete user |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

---

Built with ❤️ by the OpenIdeas community
