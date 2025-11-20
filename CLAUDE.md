# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Thailand 2025/2026 trip itinerary web application built with React 19, TypeScript, and Vite. It displays a timeline of trip legs (stays) with detailed information about accommodations, transportation, and activities. The app integrates with Google Gemini AI to provide personalized activity suggestions for each location.

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## Environment Setup

The application requires a Gemini API key:
- Set `VITE_API_KEY` in `.env.local` for local development
- The GitHub Actions workflow uses `API_KEY` secret for deployment

## Architecture

### Data Structure

Trip data is centralized in `constants.ts`:
- `ITINERARY_DATA`: Array of `TripLeg` objects containing all trip information
- `FLIGHT_HOME`: Final departure details
- Content constants (e.g., `LAMAI_CONTENT`, `KOH_TAO_CONTENT`) stored as template literals

### Component Organization

**Main Components:**
- `App.tsx`: Root component with countdown timer, timeline navigation, and scroll spy
- `LegDetail.tsx`: Renders individual trip legs with collapsible content sections
- `Timeline.tsx`: Horizontal timeline navigation in header (hidden on mobile)
- `TransportCard.tsx`: Displays transportation details between locations
- `GeminiActivities.tsx`: Fetches and displays AI-generated activity suggestions

**Stay Content Components (`components/stays/`):**
Each location has a dedicated component with JSX-rendered content:
- `LamaiContent.tsx`
- `KohTaoContent.tsx`
- `MaenamContent.tsx`
- `SilomContent.tsx`
- `PattayaContent.tsx`
- `BangkokAirportContent.tsx`

Content is rendered as pure JSX (not markdown) with Tailwind CSS classes for styling.

### Key Patterns

**Content Rendering:**
- `LegDetail` uses `getContentComponent()` to map leg IDs to their respective content components
- Content is collapsible by default (collapsed state)
- Each stay component returns JSX with consistent styling using Tailwind classes

**Responsive Design:**
- Timeline markers and connecting lines are hidden on mobile (`hidden md:flex`, `hidden md:block`)
- Mobile-first approach with responsive breakpoints using Tailwind

**State Management:**
- Local component state with React hooks
- Countdown timer updates every second via `useEffect` interval
- Scroll spy tracks active section for timeline highlighting

### Gemini AI Integration

`services/geminiService.ts` handles API communication:
- Uses `@google/genai` SDK
- Model: `gemini-2.5-flash`
- Structured output with JSON schema validation
- Returns activity suggestions in Slovak language
- Includes error handling with fallback messages

## Deployment

Deploys to GitHub Pages via GitHub Actions:
- Triggered on push to `main` branch
- Uses pnpm for dependency management
- Build output in `dist/` directory
- Base path: `/thailand_2025_2026/` (configured in `vite.config.ts`)

## Styling

- Tailwind CSS with custom theme colors (`thailand-*` color palette)
- Gradient backgrounds for accent sections
- Responsive design with mobile-first approach
- Sticky header with navigation timeline
- Dokumentácia a informácie ktoré sa zobrazujú na webe sú v zložke specs. Hlavný zdroj pravy je intinerar.txt