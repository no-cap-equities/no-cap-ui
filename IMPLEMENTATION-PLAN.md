# No Cap UI Implementation Plan

This document outlines our approach to building the No Cap UI using Storybook-driven development and shadcn/ui components.

## Phase 1: Setup and Structure

### 1. Project Organization
- Create the following directory structure:
  ```
  components/
  ├── ui/            # Re-exported shadcn components
  ├── landing/       # Landing page components
  ├── founder/       # Founder dashboard components
  ├── employee/      # Employee dashboard components
  ├── investor/      # Investor dashboard components
  ├── common/        # Shared components across roles
  ├── charts/        # Chart components using Recharts
  ├── layouts/       # Layout components (dashboards, etc.)
  └── forms/         # Form components and wizards
  ```

- Set up mock data directory:
  ```
  mock/              # Mock data for all screens as described in PRD
  ```

### 2. Install Required shadcn Components
```bash
# UI Components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add table
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add input
npx shadcn-ui@latest add form
npx shadcn-ui@latest add select
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add radio-group
npx shadcn-ui@latest add slider
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add switch
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add tooltip
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add toast
```

### 3. Configure Storybook
- Update Storybook configuration to support:
  - Global CSS
  - Tailwind
  - Mock API data
  - Viewport for responsive stories

## Phase 2: Core Components

### 1. Create Base UI Components
Each component should include:
- Component file
- Story file with multiple variants
- Mock data

#### Priority Components to Build:
1. **Logo and Brand Elements**
   - `Logo.tsx` - Blue cap logo + "No Cap" wordmark
   - `PoweredBy.tsx` - "Powered by Forte" tag

2. **Layout Components**
   - `SidebarNav.tsx` - Collapsible sidebar
   - `TopBar.tsx` - Header with company selector and notifications
   - `PageLayout.tsx` - Base layout with sidebar, topbar, main content

3. **Chart Components**
   - `PieChart.tsx` - For cap table visualization
   - `BarChart.tsx` - For stacked equity representation
   - `LineChart.tsx` - For time-series data
   - `GaugeChart.tsx` - For compliance score

4. **Domain-Specific Components**
   - `RoleCard.tsx` - Role selection cards
   - `MetricCard.tsx` - KPI and metrics display
   - `ActivityTimeline.tsx` - Recent activity display
   - `VestingTimeline.tsx` - Visual vesting progress

## Phase 3: Screen Implementation

Implement screens in the following order, based on core functionality and component reuse:

### 1. Multi-Role Landing & Authentication (/)
- RoleCard (3 variants)
- AuthModal
- FooterLinks

### 2. Founder Dashboard (/founder/dashboard)
- CapTablePieChart
- TreasuryWidget
- ComplianceChecklist
- ActivityTimeline

### 3. Cap Table Explorer (/founder/cap-table)
- TimeMachineSlider
- CapTableTable
- DiluteSimulator

### 4. Employee Stock Dashboard (/employee/dashboard)
- MetricCard
- VestingTimeline
- GrantTable
- LearnSidebar

### 5. Investor Portfolio View (/investor/portfolio)
- PortfolioBubbleMap
- HoldingsTable
- AlertSidebar

### 6. Equity Issuance Wizard (/founder/issue-equity)
- Stepper
- InstrumentCard
- StakeholderLookup
- VestingConfigurator

Continue with remaining screens in order of complexity and component reuse.

## Phase 4: State Management & Integration

### 1. Set up State Management
- Implement Zustand stores for client state
- Create React Query hooks for data fetching

### 2. Mock API Routes
- Implement `/api/mock/*` routes matching the data specs in PRD.md
- Connect components to mock API

### 3. Form Validation
- Add validation to all forms using React Hook Form
- Connect validation to the compliance rules

## Phase 5: Next.js Pages/Routes

After all components are built and tested in Storybook:

1. Set up the App Router routes
2. Implement layouts for different sections
3. Connect components to pages
4. Add navigation between screens

## Development Workflow

For each component or screen:

1. **Define**: Create story with mock data based on PRD specs
2. **Build**: Implement component with Tailwind & shadcn/ui
3. **Test**: Validate in Storybook with various states and screen sizes
4. **Refine**: Improve based on feedback
5. **Document**: Add usage notes to story

## Engineering Standards

- Use TypeScript interfaces for all component props and data structures
- Follow shadcn/ui patterns for component composition
- Keep Tailwind usage focused on layout/spacing
- Use CSS variables for theming and visual styling
- Write accessible components (follow WAI-ARIA practices)
- Ensure all components are responsive