# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

No Cap is a Next.js application for visualizing and managing equity through a modern, user-friendly interface. The application implements multiple user roles (founder, investor, employee) and provides specialized screens for each role, focusing on equity management, cap tables, and compliance.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## Tech Stack

- **Framework**: Next.js 15.3+ (App Router)
- **UI Kit**: shadcn/ui components re-exported from @/components/ui/*
- **Styling**: 
  - Tailwind v4 for layout/spacing utilities
  - Visual styling through CSS variables and component files
- **State Management**: 
  - Zustand (client context)
  - React Query (API cache)
- **Charts**: Recharts wrappers in @/components/charts/* (to be implemented)
- **Auth**: Alchemy Account Kit for wallet authentication (to be implemented)
- **API Mocking**: API routes under /api/mock/* for storybook driven development

## Architecture

The project follows Next.js App Router architecture with the following key directories:

- `/app`: Page components and routes
- `/components`: Reusable UI components
  - `/ui`: shadcn/ui components
  - `/charts`: Chart components (to be implemented)
- `/lib`: Utility functions and shared code
- `/public`: Static assets
- `/docs`: Project documentation

The project's data flows follow these patterns:
1. Mock API routes provide deterministic data for development
2. Components access data through React Query hooks
3. Client state is managed through Zustand stores

## Design & UX Guidelines

The application implements 15 major screens covering various aspects of equity management:
1. Multi-Role Landing & Authentication (`/`)
2. Founder Dashboard (`/founder/dashboard`)
3. Cap Table Explorer (`/founder/cap-table`)
4. Equity Issuance Wizard (`/founder/issue-equity`)
5. Multi-Party Approval Workflow (`/approvals/[requestId]`)
6. Employee Stock Dashboard (`/employee/dashboard`)
7. Investor Portfolio View (`/investor/portfolio`)
8. Company Detail (Investor) (`/investor/companies/[id]`)
9. Compliance Dashboard (`/founder/compliance`)
10. KYC Verification Flow (`/onboarding/kyc/[id]`)
11. Token Transfer & Rule Engine Demo (`/founder/transactions/transfer`)
12. Option Exercise Wizard (`/employee/exercise/[id]`)
13. Board Meeting Prep Center (`/founder/governance/board`)
14. Proxy Voting Portal (`/investor/voting/[proposalId]`)
15. Scenario Modeling Tool (`/founder/modeling`)

Refer to `docs/SCREEN-DESIGN.md` for detailed specifications of each screen.

## Data Modeling

The application uses mock data structures defined in `docs/PRD.md`. Each screen has a corresponding mock data schema that should be implemented in the `/mock` directory as JSON files.

When adding new features, ensure they align with the existing data schemas. Refer to the data spec section in `docs/PRD.md` for the complete definition of expected data structures.