# EVNOVA

EVNOVA is a modern hackathon platform frontend built with React + TypeScript.
It supports organizer and participant workflows including discovery, registration, and dashboard views.

## Tech Stack

- Vite + React 18 + TypeScript
- React Router DOM (routing)
- Tailwind CSS + shadcn/ui (UI system)
- Framer Motion (animations)
- React Query (state/data utilities)
- Vitest + Testing Library (tests)

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run in development

```bash
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Scripts

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run build:dev` – development-mode build
- `npm run preview` – preview built app
- `npm run lint` – run ESLint
- `npm run test` – run tests once
- `npm run test:watch` – run tests in watch mode

## App Routes

- `/` – Landing page
- `/login` – Login
- `/signup` – Signup
- `/forgot-password` – Forgot password
- `/select-role` – Role selection
- `/organiser/dashboard` – Organizer dashboard
- `/organiser/create-hackathon` – Create hackathon
- `/hackathons` – Browse hackathons
- `/hackathons/:id` – Hackathon details
- `/hackathons/:id/register` – Register for hackathon
- `/participant/dashboard` – Participant dashboard

## Project Structure

```text
src/
	components/      # shared components + ui primitives
	contexts/        # auth and theme providers
	data/            # mock data
	hooks/           # reusable hooks
	lib/             # utilities
	pages/           # route pages
	test/            # test setup and specs
```

## Deployment

This project includes `vercel.json` and can be deployed to Vercel.

Typical deployment flow:

1. Push repository to GitHub
2. Import project in Vercel
3. Build command: `npm run build`
4. Output directory: `dist`

## Notes

- Current app uses mock/local data in `src/data`.
- Backend/API integration can be added later without changing route structure.