# Overview  
No Cap is an interactive platform for equity management, designed to streamline the management of ownership, compliance, and transactions for companies and their stakeholders. The platform provides role-based experiences for founders, investors, and employees, creating tailored interfaces that address the specific needs of each user type while maintaining a unified data foundation.

The platform solves the complex problem of equity management by combining traditional cap table functionality with blockchain-enabled compliance automation, multi-party approvals, and visualization tools that make ownership structures intuitive and actionable. It serves three primary stakeholder groups:

1. **Founders/Admins** - Who need complete visibility and control over their company's ownership structure, compliance status, and governance processes
2. **Investors** - Who need portfolio management tools and voting capabilities
3. **Employees** - Who need to understand, track, and exercise their equity compensation

# Core Features  

## Role-Based UX
- **Multi-Role Landing & Authentication**: Directs users to personalized experiences based on their relationship with the platform (founder, investor, employee)
- **Tailored Dashboards**: Each user type gets a different dashboard view focused on their primary needs
- **Consistent Data Model**: Despite different UI experiences, all users interact with the same underlying data structures

## Real-Time Cap Table Visualization
- **Interactive Cap Table**: Allows for exploration, filtering, and manipulation of ownership data
- **Time-Machine Slider**: Visualizes equity evolution over time through an interactive timeline
- **Drag-to-Dilute Simulator**: Models potential funding rounds and shows their impact on ownership
- **Multi-View Representations**: Displays the same ownership data as pie charts, bar charts, tables, and other formats to facilitate different analysis needs

## Seamless Compliance Automation
- **Rules Engine Integration**: Determines whether transactions are compliant before execution
- **KYC Verification Flow**: Streamlines the verification process for all stakeholders
- **Compliance Dashboard**: Provides health metrics, upcoming deadlines, and action items
- **Regulatory Documentation**: Manages required filings and maintains document completeness

## Multi-Party Approval Workflow
- **Visual Approval Flow**: Shows the sequence of required approvers with status indicators
- **Delegation Capabilities**: Allows approvers to delegate their authority when needed
- **Integrated E-Signatures**: Captures legally binding approvals within the platform
- **Activity Tracking**: Maintains complete history of all approval actions and comments

## Smart-Contract-Driven Actions
- **Token Transfer & Rule Engine**: Enforces compliance rules during transfer attempts
- **Option Exercise Wizard**: Guides employees through the process of exercising stock options
- **Equity Issuance Wizard**: Streamlines the process of granting equity to new or existing stakeholders
- **On-Chain Proxy Voting**: Enables secure, transparent governance processes

## Financial Modeling & Analysis
- **Scenario Modeling Tool**: Projects future ownership structures under various funding scenarios
- **Tax Impact Calculations**: Estimates tax implications of equity transactions
- **Portfolio Performance Tracking**: Helps investors monitor the value of their holdings
- **Vesting Visualizations**: Shows the timeline of equity availability for employees

# User Experience  

## User Personas

### Founder/Admin
- Tech-savvy company executives who need a comprehensive view of ownership and compliance
- Focused on maintaining cap table accuracy, preparing for funding rounds, and ensuring regulatory compliance
- Values visual tools that help explain complex ownership structures to stakeholders
- Typically manages multiple legal/financial processes simultaneously

### Investor
- Professional or individual investors tracking multiple company investments
- Needs portfolio-wide analytics and company-specific details
- Values clear visualization of ownership position and return metrics
- Participates in governance through voting and document review

### Employee
- Range from tech-savvy to financially inexperienced individuals
- Primary focus on personal equity value and vesting schedule
- Needs guidance on complex decisions like option exercises
- Values educational content that explains equity concepts

## Key User Flows

### Founder/Admin Flows
1. **Cap Table Management**:
   - View comprehensive ownership structure
   - Track changes over time using time-machine slider
   - Model potential funding rounds
   - Issue new equity to stakeholders

2. **Compliance Management**:
   - Monitor overall compliance health
   - Review and complete required filings
   - Verify stakeholder KYC status
   - Configure and test compliance rules

3. **Governance Processes**:
   - Prepare for board meetings
   - Manage document approvals
   - Track voting results
   - Maintain corporate records

### Investor Flows
1. **Portfolio Management**:
   - View all investments in a unified interface
   - Track performance metrics
   - Receive alerts for important events
   - Analyze ownership changes over time

2. **Company-Specific Analysis**:
   - Drill down into individual company details
   - Review documents and valuations
   - Calculate pro-rata rights
   - Participate in governance

### Employee Flows
1. **Equity Understanding**:
   - View vesting schedule and current value
   - Learn about equity concepts
   - Track upcoming vesting events
   - Calculate potential future value

2. **Exercise Management**:
   - Determine when to exercise options
   - Calculate tax implications
   - Complete exercise process
   - Track post-exercise ownership

## UI/UX Considerations
- **Clean, Professional Aesthetic**: Establishes trust while handling financial information
- **Progressive Disclosure**: Reveals complexity gradually to avoid overwhelming users
- **Consistent Visualizations**: Uses the same visual language for ownership across the platform
- **Mobile-Responsive Design**: Ensures key functions work on various devices
- **Accessibility**: Includes proper semantic markup, screen reader support, and keyboard navigation
- **Contextual Guidance**: Provides help tooltips and educational content at the point of need

# Technical Architecture  

## System Components

### Frontend
- **Framework**: Next.js 15.3+ (App Router)
- **UI Kit**: shadcn/react components re-exported from @/components/ui/*
- **Styling**: 
  - Tailwind v4 utilities for layout/spacing only
  - Visual styling through CSS variables and atomic component files
- **State Management**:
  - Zustand for client context
  - React Query for API cache
- **Charts**: Recharts wrappers in @/components/charts/*
- **Authentication**: Alchemy Account Kit (wallet) + optional email/SSO stub

### Backend
- **API**: Next.js API routes for business logic
- **Mock API**: Cloud Functions to serve `/api/mock/*` endpoints
- **Blockchain Integration**: Smart contract interactions for on-chain actions
- **Rule Engine**: Business logic enforcing compliance constraints
- **Document Generation**: Dynamic PDF creation for compliance documents

## Data Models

### Core Entities
- **Company**: Basic metadata about the company (name, valuation, etc.)
- **CapTable**: Representation of ownership structure with historical tracking
- **Stakeholder**: Any entity that holds equity (founder, investor, employee, etc.)
- **Security**: Different classes of equity instruments (common, preferred, options, etc.)
- **Grant**: An issuance of equity to a stakeholder with specific terms
- **Transaction**: Any event that affects ownership (issuance, transfer, exercise, etc.)
- **Approval**: A record of multi-party authorization for equity actions
- **Compliance**: Rules and verification status for regulatory requirements

### Key Relationships
- Companies have many Stakeholders
- Stakeholders have many Grants across potentially multiple Companies
- Grants consist of specific Securities
- Transactions affect one or more Grants
- Approvals may be required for Transactions
- Compliance rules govern which Transactions are permitted

## APIs and Integrations

### Internal APIs
- **/api/cap-table**: CRUD operations for ownership data
- **/api/grants**: Manage equity issuances
- **/api/transactions**: Record and validate equity movements
- **/api/approvals**: Handle multi-party authorization flows
- **/api/compliance**: Check and enforce regulatory rules
- **/api/kyc**: Manage stakeholder verification
- **/api/models**: Run financial projections and scenarios

### External Integrations
- **Blockchain Networks**: For on-chain transactions
- **eSignature Services**: For legally binding approvals
- **Identity Verification**: For KYC processes
- **Financial Data Providers**: For valuation benchmarks
- **Document Storage**: For secure file management

## Infrastructure Requirements
- **Deployment**: Google Cloud Run service
- **Functions**: Cloud Functions for mock API endpoints
- **Database**: Structured data storage for equity records
- **Blockchain**: Connection to appropriate networks for on-chain actions
- **Authentication**: Secure identity management
- **File Storage**: Document repository for legal agreements
- **Encryption**: Data protection in transit and at rest

# Development Roadmap  

## Phase 1: MVP Foundation

### Core Infrastructure
- Set up Next.js project with App Router architecture
- Implement Tailwind styling system and design tokens
- Configure shadcn/ui component system
- Set up Zustand store and React Query hooks
- Create mock API endpoints for initial screens

### Authentication & Role Management
- Implement landing page with role selection
- Set up Alchemy Account Kit integration
- Create session management with role context
- Build permission system based on user role

### Basic Cap Table Functionality
- Develop cap table data model
- Create basic visualizations (pie chart, table view)
- Implement stakeholder management interface
- Build time-machine slider for historical view

### Essential Dashboards
- Create founder dashboard with key metrics
- Build employee dashboard showing vesting status
- Implement investor dashboard with holdings view
- Develop navigation system between views

## Phase 2: Core Visualization & Modeling

### Advanced Cap Table Visualization
- Enhance pie/bar chart visualizations with interactions
- Implement filtering and sorting capabilities
- Add drill-down functionality for ownership details
- Create export functionality (CSV, PDF)

### Scenario Modeling
- Build drag-to-dilute simulator interface
- Implement funding round modeling logic
- Create scenario saving and comparison features
- Develop visualization of scenario impacts

### Investor Tools
- Create portfolio bubble map visualization
- Implement company detail drill-down view
- Build return calculation and performance metrics
- Add document management for investor materials

### Employee Experience
- Develop interactive vesting timeline
- Create option exercise calculator
- Implement tax estimation tools
- Build educational content system

## Phase 3: Workflow & Compliance

### Equity Issuance Wizard
- Create multi-step issuance flow
- Implement security type selection
- Build vesting schedule configuration
- Add compliance validation during issuance

### Approval System
- Develop approval flow visualization
- Implement sequential approval logic
- Create notification system for pending approvals
- Build delegation capabilities

### Compliance Automation
- Implement rules engine for transaction validation
- Create compliance dashboard with health metrics
- Build document management for regulatory filings
- Develop KYC verification flow

### Governance Tools
- Create board meeting preparation center
- Implement voting portal for governance
- Build resolution tracking system
- Develop e-signature integration

## Phase 4: Blockchain Integration & Advanced Features

### Smart Contract Actions
- Implement token transfer with rules engine
- Create on-chain record of equity transactions
- Build blockchain explorer integration
- Develop wallet connection for transactions

### Advanced Modeling
- Enhance scenario modeling with sensitivity analysis
- Implement exit planning tools
- Create tax optimization modeling
- Build multi-round projection capabilities

### Reporting & Analytics
- Develop comprehensive reporting system
- Create analytics dashboard for equity trends
- Implement custom report builder
- Add benchmark comparisons

### Enterprise Features
- Build multi-company management
- Implement role-based access controls
- Create audit logging system
- Develop API access for external systems

# Logical Dependency Chain

## Foundation Layer (Build First)
1. **Project Setup & Authentication**
   - Next.js framework with App Router
   - Styling system with Tailwind and design tokens
   - User authentication and role management
   - Session handling and permissions

2. **Data Models & API Scaffolding**
   - Cap table data structures
   - Stakeholder management
   - Mock API endpoints
   - State management setup

3. **Basic Visualization Components**
   - Chart library integration
   - Common data visualization patterns
   - Interactive component foundations
   - Responsive layout system

## Core Experience Layer
4. **Role-Based Dashboards**
   - Founder dashboard
   - Investor dashboard
   - Employee dashboard

5. **Cap Table Explorer**
   - Interactive table views
   - Time-machine slider
   - Ownership visualizations
   - Export functionality

6. **Stakeholder Management**
   - User profiles
   - Contact management
   - Role assignments
   - Communications system

## Workflow Layer
7. **Equity Issuance Wizard**
   - Multi-step process
   - Vesting configuration
   - Terms setup
   - Draft saving

8. **Approval System**
   - Sequential approval flows
   - Approval visualization
   - Notification system
   - Action tracking

9. **Document Management**
   - Template system
   - Document generation
   - E-signature integration
   - Storage and retrieval

## Compliance & Governance Layer
10. **Rules Engine**
    - Compliance rule definitions
    - Transaction validation
    - Override mechanisms
    - Audit trail

11. **KYC Verification**
    - Identity verification flow
    - Document upload and validation
    - Status tracking
    - Compliance integration

12. **Voting & Governance**
    - Proxy voting system
    - Resolution tracking
    - Board management tools
    - Meeting preparation

## Advanced Features Layer
13. **Blockchain Integration**
    - Wallet connections
    - On-chain transactions
    - Block explorer integration
    - Token management

14. **Advanced Modeling**
    - Scenario comparisons
    - Sensitivity analysis
    - Exit planning
    - Tax modeling

15. **Enterprise Features**
    - Multi-company management
    - Advanced reporting
    - API access
    - Custom integrations

# Risks and Mitigations  

## Technical Challenges

### Complex Visualization Performance
- **Risk**: Interactive visualizations with large datasets may impact performance, especially on mobile devices
- **Mitigation**: 
  - Implement data pagination and lazy loading
  - Use canvas-based rendering for complex charts
  - Optimize data structures for visualization
  - Add loading states and progressive enhancements

### Blockchain Integration Complexity
- **Risk**: Smart contract integration adds technical complexity and potential security concerns
- **Mitigation**:
  - Start with simplified blockchain features
  - Implement thorough testing of all on-chain actions
  - Provide fallback mechanisms for critical functions
  - Conduct security audits before production deployment

### Cross-Browser Compatibility
- **Risk**: Advanced visualizations and interactions may not work consistently across browsers
- **Mitigation**:
  - Establish browser support matrix early
  - Implement graceful degradation for complex features
  - Create automated testing across browser environments
  - Provide alternative views for incompatible browsers

## MVP Scoping Challenges

### Feature Prioritization
- **Risk**: Trying to build too many features simultaneously could delay minimum viable product
- **Mitigation**:
  - Focus first on core cap table functionality
  - Prioritize features by user value and technical dependency
  - Create clear acceptance criteria for MVP
  - Implement feature flags for gradual rollout

### Balancing Complexity vs. Usability
- **Risk**: Advanced equity features may overwhelm non-financial users
- **Mitigation**:
  - Implement progressive disclosure design patterns
  - Create role-appropriate interfaces with shared data models
  - Include contextual help and educational content
  - Conduct regular usability testing with different user types

### Data Model Flexibility
- **Risk**: Initial data model may not accommodate all future equity scenarios
- **Mitigation**:
  - Research diverse equity structures during design
  - Implement extensible data models with version control
  - Plan for migration paths as the system evolves
  - Design flexible rule engine that can adapt to new requirements

## Resource Constraints

### Development Complexity
- **Risk**: Speciality knowledge required for compliance and blockchain development
- **Mitigation**:
  - Identify skill gaps early and provide training
  - Consider external specialists for compliance logic
  - Use well-documented libraries for blockchain integration
  - Create comprehensive technical documentation

### Testing Coverage
- **Risk**: Complex equity scenarios require extensive testing to ensure accuracy
- **Mitigation**:
  - Develop comprehensive test suite with real-world scenarios
  - Implement automated testing for calculations and visualizations
  - Create sandbox environments for stakeholder testing
  - Establish clear quality assurance process for financial accuracy

### User Adoption
- **Risk**: Complex platform may face adoption challenges from non-technical users
- **Mitigation**:
  - Implement guided onboarding flows for each user type
  - Create educational content explaining key concepts
  - Establish customer success processes for enterprise clients
  - Collect and incorporate user feedback throughout development

# Appendix  

## Technical Specifications

### Supported Browsers
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### Mobile Support
- iOS Safari (latest 2 versions)
- Android Chrome (latest 2 versions)
- Responsive breakpoints: xs, sm, md, lg, xl

### Performance Targets
- Initial load: < 2 seconds
- Time to interactive: < 3 seconds
- Chart rendering: < 500ms
- Form submission: < 1 second

## Data Structure Examples

```json
// Example Cap Table Entry
{
  "company": "acme-inc",
  "asOf": "2025-05-15",
  "holders": [
    { "label": "Founders", "shares": 4500000, "pct": 45 },
    { "label": "Employees", "shares": 1500000, "pct": 15 },
    { "label": "Option Pool", "shares": 500000, "pct": 5 },
    { "label": "Seed Inv.", "shares": 2000000, "pct": 20 },
    { "label": "Series A", "shares": 1500000, "pct": 15 }
  ]
}

// Example Grant
{
  "grantId": "g-1001",
  "instrument": "OPT",
  "qty": 10000,
  "strikePrice": 25, 
  "vestStart": "2022-01-01",
  "cliff": "2023-01-01",
  "vestEnd": "2026-01-01",
  "vestedQty": 5000,
  "status": "active"
}
```

## Screen Inventory

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

## Research Findings

The No Cap platform addresses several key industry pain points identified in market research:

1. **Equity Management Complexity**: Traditional cap table management tools lack visualization capabilities that make ownership structures intuitive for non-financial users

2. **Compliance Burden**: Companies spend significant resources ensuring regulatory compliance for equity transactions, often leading to delays and errors

3. **Stakeholder Communication Gap**: Different stakeholders (founders, investors, employees) need different views of the same underlying equity data

4. **Governance Friction**: Multi-party approval processes are often manual and disconnected from the systems of record

5. **Technical Integration Challenges**: Most existing solutions don't bridge traditional equity management with blockchain capabilities for on-chain actions 

--------------------------------

# SCREEN ASTHETICS

# Mock Screens for EquiChain Equity Management Platform

## 1. Multi-Role Landing & Authentication
**Route:** `/`

**Layout Description:**
- Clean, minimalist hero section with a bold "EquiChain" logo and tagline ("Equity management for the digital age")
- Three prominent role-selection cards arranged horizontally:
  - Founder/Company Admin (with startup/executive imagery)
  - Investor (with portfolio/dashboard imagery)
  - Employee (with vesting/options imagery)
- Each card has brief role description and "Enter as [Role]" button
- Subtle animated background with flowing lines representing blockchain connections
- Authentication options appear after role selection (email/password, SSO, wallet connect)
- Footer with regulatory compliance badges and security certifications

**Justification:**
The landing page uses role-based entry to immediately personalize the experience, addressing a key project objective of "Role-Based UX Clarity." This approach ensures users identify their primary relationship with the platform before entering, allowing all subsequent screens to be contextually relevant. The clean, professional aesthetic with subtle blockchain visuals establishes trust while hinting at the underlying technology without overwhelming non-technical users.

## 2. Founder Dashboard (Company Overview)
**Route:** `/founder/dashboard`

**Layout Description:**
- Top header with company name, logo, and quick-action menu (issue equity, approvals queue, settings)
- Key metrics row showing:
  - Company valuation (with change indicator)
  - Total shares outstanding
  - Fully-diluted ownership percentage
  - Treasury balance
- Interactive cap table visualization taking center stage:
  - Dual visualization: pie chart alongside horizontal stacked bar chart
  - Color-coded by stakeholder type (founders, employees, investors, etc.)
  - Toggle between "current" and "fully diluted" views
  - Hover states revealing detailed breakdown of each segment
- Right sidebar with time-sensitive alerts:
  - Pending approvals requiring attention
  - Upcoming vest dates
  - Compliance deadlines
- Bottom half of screen split into:
  - Recent activity timeline (grants, exercises, transfers)
  - Quick-access cards for common actions (issue shares, run compliance check, board materials)

**Justification:**
The founder dashboard prioritizes high-level cap table visualization and time-sensitive actions, addressing founder needs to monitor ownership structure and take quick action. The dual visualization (pie + bar) provides complementary perspectives on the same data, while the toggle between current and fully-diluted views showcases the platform's ability to model different scenarios. The alerts sidebar ensures critical items aren't missed, directly supporting the "Multi-Party Approval Workflow" objective by surfacing pending items. This screen balances comprehensive data with actionable insights, serving as a true command center for company leaders.

## 3. Cap Table Explorer
**Route:** `/founder/cap-table`

**Layout Description:**
- Interactive timeline slider at top of page, allowing "time travel" through company history
- As slider moves, all visualizations update to reflect ownership at that point in time
- Main content area divided into:
  - Large, detailed cap table showing all security holders
  - Columns for holder name, security type, quantity, ownership %, fully-diluted %, date acquired
  - Expandable rows showing vesting details, restrictions, and document links
  - Advanced filtering options (by holder type, security class, date range)
- Right panel with "Drag-to-Dilute Simulator":
  - Input field for new funding amount
  - Valuation slider with visual pre/post indicators
  - Option selectors for round type and investor allocation
  - As values change, cap table animates to show dilution effects
  - "Save Scenario" button to bookmark this potential future state
- Export options in top-right (CSV, PDF, Board-Ready Report)

**Justification:**
This screen implements two of the highest "wow-factor" features identified in the requirements: the Time-Machine Cap-Table Slider and Drag-to-Dilute Simulator. These interactive elements transform static cap table data into a dynamic, explorable system that helps founders and investors understand historical changes and model future scenarios. The timeline slider creates a uniquely intuitive way to visualize equity evolution over time, while the dilution simulator provides instant visual feedback on potential funding impacts. These features showcase the platform's ability to not just store equity data, but to make it actionable and forward-looking.

## 4. Equity Issuance Wizard
**Route:** `/founder/issue-equity`

**Layout Description:**
- Multi-step process with progress indicator showing 5 steps:
  1. **Select Security Type**: 
     - Card-based selection of instrument types (common, preferred, options, RSUs, etc.)
     - Each card shows brief description and typical use case
  2. **Recipient Information**:
     - Search existing stakeholders or add new recipient
     - Role selection and contact details
     - KYC status indicator with one-click verification request
  3. **Terms & Conditions**:
     - Instrument-specific parameters (price, vesting schedule, special rights)
     - Interactive vesting timeline visualization
     - Preset templates for common scenarios (standard 4-year vest, etc.)
  4. **Compliance Check**:
     - Real-time validation against rule engine
     - Green checkmarks for passed rules
     - Warning indicators with explanations for potential issues
     - Links to relevant regulatory guidance
  5. **Review & Approve**:
     - Complete summary of grant details
     - Document preview with dynamic updating
     - Required approvers list with status indicators
     - "Submit for Approval" or "Approve & Issue" button (based on permissions)
- Side panel showing constantly updated cap table impact visualization
- Context-sensitive help tooltips throughout

**Justification:**
The equity issuance wizard breaks down a complex, compliance-sensitive process into logical steps, reducing cognitive load and error risk. The progressive disclosure approach reveals only relevant details at each stage, while the side panel provides constant context of how this issuance affects the overall cap table. The compliance check step directly showcases the Rules Engine integration, highlighting how technology automates regulatory adherence. This screen embodies the "Smart-Contract-Driven Actions" strategic objective by guiding users through a process that ultimately triggers on-chain transactions, while making the complexity invisible through thoughtful UX.

## 5. Multi-Party Approval Workflow
**Route:** `/approvals/[requestId]`

**Layout Description:**
- Header showing approval request title, creation date, and status
- Below header, visual approval flow diagram:
  - Circular avatars for each required approver in sequence
  - Connected by directional lines showing approval flow
  - Each avatar has status indicator (pending, approved, rejected)
  - Current stage highlighted with pulsing animation
  - Timestamp for each completed approval
- Main content area showing:
  - Detailed information about the equity action requiring approval
  - Before/after ownership visualization
  - Any supporting documents or notes
  - Terms and compliance details
- Action panel with context-sensitive buttons:
  - "Approve" (primary button)
  - "Reject" (with required reason field)
  - "Request Changes" (with comment field)
  - "Delegate Approval" (if permitted)
- Activity timeline showing all actions and comments
- Right sidebar showing "Next Up" if approved (who will receive request next)

**Justification:**
This screen directly addresses the "Multi-Party Approval Workflow" objective with a visually intuitive representation of the approval chain. The diagram approach transforms a potentially confusing multi-step process into a clear visual journey, helping all participants understand their role in the sequence. The context-sensitive action buttons ensure users can only take appropriate actions based on their role and the current state. The activity timeline provides transparency and accountability for the entire process. This design balances formal governance requirements with an engaging, frictionless user experience that encourages prompt responses.

## 6. Employee Stock Dashboard
**Route:** `/employee/dashboard`

**Layout Description:**
- Personal summary card at top:
  - Total equity value (calculated from latest 409A)
  - Ownership percentage (with context: "of total outstanding shares")
  - Next vesting event countdown
- Visual vesting timeline:
  - Horizontal timeline showing 4-year period
  - Colored sections indicating vested vs. unvested
  - Markers for cliff and milestone dates
  - Tooltip on hover showing shares and value at each point
- Grants table below timeline:
  - Each grant as a row with type, quantity, vest status
  - Expandable rows showing detailed vesting schedule
  - Exercise button for vested options with calculated costs
- Tax estimation calculator:
  - Inputs for exercise date, sale date, estimated FMV
  - Visual breakdown of tax implications (ordinary income vs. capital gains)
  - AMT calculator with warning threshold
- Right sidebar with educational content:
  - "Understanding Your Equity" quick links
  - Glossary of terms
  - FAQ specific to employee equity

**Justification:**
The employee view prioritizes personal relevance and education, recognizing that many employees have limited experience with equity compensation. The vesting timeline provides an intuitive visual representation of an otherwise abstract concept, helping employees understand when their equity becomes available. The tax estimation tool addresses a common pain point, helping employees make informed decisions about exercising options. This screen exemplifies the "Role-Based UX Clarity" objective by presenting equity information in terms meaningful to employees, focusing on personal value and key dates rather than cap table technicalities.

## 7. Investor Portfolio View
**Route:** `/investor/portfolio`

**Layout Description:**
- Top section with portfolio summary:
  - Total investments amount
  - Current portfolio value
  - Overall ROI percentage
  - Diversification breakdown by stage and sector
- Interactive portfolio map as central element:
  - Each company represented by a bubble sized by investment amount
  - Color-coded by performance (green=above projections, yellow=on target, red=below)
  - Arranged in quadrants by stage (early, growth, mature, exit)
  - Zoom and filter controls for exploring specific segments
- Holdings table below map:
  - Company name and logo
  - Investment details (date, amount, security type)
  - Current ownership percentage
  - Latest valuation
  - ROI with visual indicator
  - Action button for each company (view details)
- Right sidebar:
  - Upcoming liquidity events
  - Portfolio alerts (dilution events, valuation changes)
  - Action items (votes, document reviews)

**Justification:**
The investor view transforms equity data into portfolio insights, providing a distinctive experience tailored to investor needs. The bubble map visualization offers an intuitive overview of portfolio composition and performance, enabling quick identification of outliers and trends. This approach is much more engaging than a simple tabular view while conveying more information at a glance. The action-oriented sidebar ensures investors don't miss critical events that might affect their holdings. This screen demonstrates how the same underlying equity data can be presented in radically different ways for different stakeholders, reinforcing the "Role-Based UX Clarity" strategic objective.

## 8. Company Detail View (Investor Perspective)
**Route:** `/investor/companies/[companyId]`

**Layout Description:**
- Company header with:
  - Logo and name
  - Latest valuation and change indicator
  - Stage and sector tags
  - Quick-action menu (view documents, contact team)
- Investment summary cards:
  - Your investment (amount, date, security type)
  - Current equity (shares, percentage, fully-diluted value)
  - Return metrics (multiple, IRR, unrealized gains)
- Ownership evolution chart:
  - Line graph showing your ownership percentage over time
  - Overlay of company valuation
  - Markers for key events (funding rounds, your investment)
  - Toggle between absolute shares and percentage
- Cap table section:
  - Simplified view focused on investor-relevant information
  - Your position highlighted
  - Other major stakeholders shown (anonymized if private)
  - Pro-rata rights calculator for future rounds
- Documents and compliance section:
  - Organized tabs for different document types
  - Status indicators for required actions
  - E-signature functionality for pending items

**Justification:**
This screen provides investors with a focused view of a specific portfolio company, emphasizing their own position and potential returns. The ownership evolution chart tells the story of the investment over time, connecting ownership changes to valuation changes in a single visualization. The pro-rata calculator addresses a specific investor need, helping them plan for future rounds. By highlighting the investor's position within the cap table and emphasizing return metrics, this view transforms complex cap table data into actionable investment intelligence. This design supports the "Real-Time Cap-Table Visualizer" objective from the investor's unique perspective.

## 9. Compliance Dashboard
**Route:** `/founder/compliance`

**Layout Description:**
- Top section with compliance health metrics:
  - Overall compliance score (0-100)
  - Upcoming deadlines counter
  - Document completeness percentage
  - Regulatory status by jurisdiction (with map visualization)
- "IPO Readiness" gauge prominently displayed:
  - Semi-circular gauge showing 0-100%
  - Color-coded sections (red, yellow, green)
  - Breakdown of readiness categories
  - "Improve Score" button linking to action items
- Main content organized in tabs:
  - **Required Filings**: Calendar view of past and upcoming filings
  - **Stakeholder Compliance**: KYC/AML status for all equity holders
  - **Documents**: Required corporate and regulatory documents with status
  - **Rules Engine**: Configuration panel for compliance rules
- Each tab contains:
  - List of items with status indicators
  - Due dates and countdown timers for upcoming items
  - One-click action buttons to address issues
  - Sorting and filtering options
- Right sidebar with "AI Compliance Assistant" chat interface

**Justification:**
The compliance dashboard transforms complex regulatory requirements into a visual management system. The compliance score and IPO readiness gauge provide instant feedback on overall status, while the tabbed organization breaks compliance into manageable categories. The calendar view helps prevent missed deadlines, addressing a common challenge in regulatory compliance. The AI assistant concept provides contextual guidance without cluttering the main interface. This screen directly supports the "Seamless Compliance Automation" strategic objective by making compliance visible, measurable, and actionable, rather than an abstract legal concept.

## 10. KYC Verification Flow
**Route:** `/onboarding/kyc/[userId]`

**Layout Description:**
- Progress indicator at top showing 4 steps:
  1. **Personal Information**:
     - Form fields for name, DOB, nationality, etc.
     - Address verification with autocomplete
  2. **Identity Verification**:
     - ID document upload section with camera option
     - Selfie verification with liveness check
     - Real-time validation feedback
  3. **Accreditation Status** (for investors):
     - Selection of qualification criteria
     - Document upload for evidence
     - Alternative verification methods offered
  4. **Review & Submit**:
     - Summary of all provided information
     - Privacy policy acceptance
     - Submit button with loading state
- Side panel showing:
  - Verification status indicators for each step
  - Estimated completion time
  - Support contact options
  - Security assurances and compliance information
- Success state with animated checkmark and equity access activation

**Justification:**
The KYC flow exemplifies the "Seamless Compliance Automation" objective by transforming a traditionally friction-filled process into a streamlined, step-by-step experience. The clear progress indicators and real-time validation provide constant feedback, reducing abandonment. The mobile-friendly design with camera integration minimizes external dependencies (no need to scan and email documents separately). This screen is critical to the demo as it directly addresses the KYC block/unblock scenario highlighted in the strategic objectives - showing how verification instantly enables token transfers and transactions that would otherwise be blocked by compliance rules.

## 11. Token Transfer & Rule Engine Demo
**Route:** `/founder/transactions/transfer`

**Layout Description:**
- Split-screen layout:
  - Left: Transfer execution panel
  - Right: Rules Engine visualization
- Transfer panel includes:
  - Dropdown for security selection
  - From/To fields with address book integration
  - Quantity input with max button
  - Transfer reason field
  - "Check Compliance" button (before actual transfer)
  - "Execute Transfer" button (primary)
- Rules Engine visualization animates in real-time:
  - Flow diagram showing transfer request moving through rules
  - Each rule represented as a checkpoint in sequence
  - Green checkmarks or red X indicators as each rule is evaluated
  - Detailed explanation appears when rule fails
  - Final "Approved" or "Blocked" status with reason
- If transfer is blocked:
  - Clear explanation of which rule blocked it
  - Recommended action to resolve (e.g., "Recipient needs KYC verification")
  - One-click button to initiate resolution (e.g., "Send KYC Request")
- Successful transfer shows:
  - Animated completion indication
  - Transaction details with hash
  - Updated balances for sender and recipient

**Justification:**
This screen directly demonstrates the core "Seamless Compliance Automation" objective by making the Rules Engine visible and understandable. The split-screen approach creates a cause-and-effect relationship between the transfer attempt and compliance evaluation, helping users understand why transactions succeed or fail. The one-click resolution paths for blocked transfers showcase how compliance can be frictionless rather than a roadblock. The visualization transforms an otherwise invisible technical process into an engaging, educational experience that builds trust in the system's regulatory controls while emphasizing ease of use.

## 12. Option Exercise Wizard
**Route:** `/employee/exercise/[optionId]`

**Layout Description:**
- Header showing option grant details (grant date, expiration, strike price)
- Visual representation of available options:
  - Horizontal bar showing vested vs. unvested
  - Slider to select quantity to exercise
  - As slider moves, all calculations update dynamically
- Cost calculation panel:
  - Exercise cost (strike price × quantity)
  - Estimated taxes (based on current FMV)
  - Total funds required
  - Current FMV vs. strike price comparison
- Payment method selection:
  - Traditional wire/ACH details
  - USDC/stablecoin payment option
  - "Cash-less exercise" option if available
- Tax implications section:
  - Visual timeline showing tax events
  - Estimated AMT impact
  - Holding period visualization for qualifying disposition
- Final confirmation screen with:
  - Complete summary of exercise details
  - Digital signature field
  - "Exercise Now" button with loading/success states
  - Estimated processing time

**Justification:**
The exercise wizard transforms a complex financial transaction into a guided, visual process. The slider for selecting quantity provides immediate feedback on costs and implications, helping employees make informed decisions. The visualization of tax implications addresses a common point of confusion, showing how different holding periods affect tax treatment. The inclusion of both traditional and crypto payment options demonstrates the platform's bridge between conventional equity and blockchain innovations. This screen exemplifies the "Smart-Contract-Driven Actions" objective by guiding users through a process that triggers on-chain actions while abstracting away the technical complexity.

## 13. Board Meeting Preparation Center
**Route:** `/founder/governance/board`

**Layout Description:**
- Top section with upcoming meeting details:
  - Next meeting date/time with countdown
  - Attendee list with RSVP status
  - Agenda builder with drag-and-drop topics
- Interactive cap table summary designed for board presentation:
  - Key metrics and changes since last meeting
  - Option pool utilization
  - New grants issued
  - Visually highlighted changes
- Document preparation section:
  - Template options for board resolutions
  - Pre-populated fields based on recent company activity
  - Preview of generated documents
  - One-click board packet generation
- Voting and resolution tracker:
  - List of items requiring board approval
  - Voting status for each director
  - Electronic signature collection
  - Historical resolution archive
- Meeting notes and action items:
  - Collaborative note-taking area
  - Assignable action items with deadlines
  - Integration with calendar and task management

**Justification:**
This screen addresses the governance aspects of equity management, recognizing that board oversight is central to equity decisions in most companies. The board meeting preparation center streamlines what is typically a time-consuming, manual process for founders and executives. The presentation-ready visualizations ensure that complex equity information is board-appropriate, while the document automation features save significant preparation time. The electronic voting and signature collection directly supports the "Multi-Party Approval Workflow" objective in a governance context. This screen demonstrates how the platform extends beyond transaction management to support the full corporate governance lifecycle around equity.

## 14. Proxy Voting Portal
**Route:** `/investor/voting/[proposalId]`

**Layout Description:**
- Proposal header with:
  - Title and reference number
  - Issuing company details
  - Voting deadline countdown
  - Tags indicating proposal type
- Proposal details section:
  - Comprehensive description
  - Supporting documents with preview functionality
  - Company recommendation (if provided)
  - Impact analysis for this investor
- Interactive voting interface:
  - Large, clear voting options (For, Against, Abstain)
  - Voting power indicator showing shares eligible to vote
  - Partial voting capability with split allocation
  - "Cast Vote" button with confirmation dialog
- Real-time results visualization:
  - Bar chart showing current voting distribution
  - Percentage of total votes cast so far
  - Quorum status indicator
  - Your vote highlighted within results
- Voting history section showing past proposals and your votes

**Justification:**
The proxy voting portal transforms a traditionally paper-based process into a digital, transparent system directly integrated with equity holdings. The real-time results visualization makes the voting process engaging and informative, while the voting power indicator creates a clear connection between equity ownership and governance rights. This screen demonstrates the "On-Chain Proxy Voting" high-impact feature from the requirements, showing how blockchain technology can improve traditional corporate governance. The design emphasizes clarity and informed decision-making, ensuring investors understand what they're voting on and the impact of their decision.

## 15. Scenario Modeling Tool
**Route:** `/founder/modeling`

**Layout Description:**
- Scenario selection panel at top:
  - Create new scenario button
  - Library of saved scenarios
  - Comparison toggle (to view multiple scenarios side-by-side)
- Interactive modeling controls:
  - Funding round parameters (amount, valuation, type)
  - Option pool adjustments
  - Founder/employee retention scenarios
  - Exit timing and valuation projections
- Central visualization area showing:
  - Multi-year projection chart with key milestones
  - Ownership breakdown at each milestone
  - Financial outcomes for key stakeholders
  - Toggle between percentage view and absolute value view
- Parameter sensitivity analysis:
  - Slider controls for key variables
  - Real-time updates to visualizations
  - Highlight of most impactful parameters
- Scenario comparison view:
  - Side-by-side visuals of different scenarios
  - Difference highlighting
  - Optimal path recommendations
- Export and share functionality for board presentations

**Justification:**
The scenario modeling tool extends the "Drag-to-Dilute Simulator" concept into a comprehensive planning platform, addressing the forward-looking needs of founders and investors. The interactive controls with real-time visualization updates create an engaging experience that encourages exploration of different scenarios. The sensitivity analysis helps users understand which factors have the greatest impact on outcomes, providing actionable insights beyond simple dilution calculations. The ability to save, compare, and share scenarios transforms equity planning from a one-time calculation into an ongoing strategy tool. This screen exemplifies how the platform provides value beyond record-keeping, positioning it as a strategic partner in equity management.

---

These 15 screens provide a comprehensive view of the EquiChain platform's capabilities, covering all major user flows and stakeholder perspectives. Each screen is designed with attention to both visual presentation and functional requirements, ensuring a coherent and intuitive user experience across the application while directly addressing the strategic objectives outlined in the requirements.

---------------------------------------------------

# SCREENS SPEC

# No Cap On Chain
We are setting up an interactive UI to demonstrate the No Cap protocol.

We are doing storybook-driven development. Everything gets setup as storybook components. Then we build more complex components and pages on top of the storybook components, all within storybook.

Once everything is working, we will use the pages and components in a real Next.js app.



```txt
Framework  : Next.js 15.3+  (App Router)
UI Kit     : shadcn/react  – components re-exported from @/components/ui/*
Styling    : Tailwind v4 utilities for layout/spacing only.  
             Visual skin (colors, typography, radii) lives in global CSS variables  
             and inside atomic component files.
State      : Zustand (client context) + React Query (API cache).
Charts     : Recharts wrappers in @/components/charts/*
Auth       : Alchemy Account Kit (wallet) + optional email/SSO stub.
Deploy     : Google Cloud Run service, Cloud Functions serve `/api/mock/*`.
Brand      : **No Cap** – blue-cap emoji logo.  “Not lying” slang stays subtle; UI prioritizes clarity & genius-feel design.
```

# App Screens

## 1 · Multi-Role Landing & Authentication (`/`)

| Section                      | Details                                                                                                                                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Purpose**                  | Funnel every visitor into a role-scoped UX while establishing brand trust.                                                                                                                                         |
| **Layout Blueprint**         | 1) **Header** (left — blue-cap logo + “No Cap” word-mark; right — small “Powered by Forte”). 2) **Hero** (centered 3-card grid). 3) **Auth Modal** (hidden until a card click). 4) **Footer** (compliance badges). |
| **Key Components**           | `Logo`, `RoleCard`, `AuthProviderModal` (re-usable across app), `FooterLinks`.                                                                                                                                     |
| **Primary Interactions**     | *Click RoleCard →* set `role` in Zustand, open `AuthProviderModal`.  *Auth success →* route to `/choose-role` fallback or direct dashboard.                                                                        |
| **Styling & Responsiveness** | Desktop: 3-column grid (`grid-cols-3` w/ gap-8). Mobile: stack cards (`flex-col`). Limit Tailwind to grid & spacing utilities; role-card visuals handled inside component CSS module.                              |
| **Accessibility**            | Cards are `<button>` elements with `aria-pressed` on select; Auth modal traps focus, esc-to-close.                                                                                                                 |

---

## 2 · Founder Dashboard (`/founder/dashboard`)

| Section                      | Details                                                                                                                                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                  | Give founders a cockpit view of ownership, money, and urgent tasks.                                                                                                                                           |
| **Layout Blueprint**         | 1) **SidebarNav** (collapsible). 2) **TopBar** (company select + notifications). 3) **MainGrid** (CapTablePie 6 / TreasuryWidget 3 / ComplianceChecklist 3). 4) **BottomRow** (RecentActivityTimeline 100 %). |
| **Key Components**           | `SidebarNav`, `CapTablePieChart`, `StackedBarToggle`, `TreasuryWidget`, `ChecklistCard`, `ActivityItem`.                                                                                                      |
| **Primary Interactions**     | Pie hover → emit `selectHolder` event (shared via context). “Drag-to-Dilute” CTA navigates to `/founder/simulator`. Checklist item click → scroll to Compliance tab later.                                    |
| **Styling & Responsiveness** | MainGrid uses `grid-cols-[3fr_1fr]` desktop, collapses to vertical on tablets. Charts pull palette from CSS vars (`--founder-pie-*`).                                                                         |
| **Accessibility**            | Pie slices are `<button>` w/ `aria-label="Founders 45 percent"`. Activity timeline uses `<ol>` semantic list.                                                                                                 |

---

## 3 · Cap Table Explorer (`/founder/cap-table`)

| Section                      | Details                                                                                                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                  | Deep-dive, audit, and simulate equity changes across time.                                                                                           |
| **Layout Blueprint**         | **TopBar** (Time-Machine slider + toolbar). **Two-Pane** flex: Left 70 % (CapTableTable + toggle chart); Right 30 % (Drag-to-Dilute Simulator).      |
| **Key Components**           | `TimeMachineSlider`, `CapTableTable`, `PieToBarToggle`, `DiluteSimulatorPanel`, `ScenarioSaveChip`.                                                  |
| **Primary Interactions**     | Slider change triggers `fetch('/api/mock/cap-table?date=...')` → animate diff. Simulator inputs debounce 300 ms → update cap table via same context. |
| **Styling & Responsiveness** | Keep simulator fixed on right until `lg:` breakpoint; below that it accordion-collapses under table.                                                 |
| **Accessibility**            | Slider label updates via `aria-valuetext="March 2024"`. Table rows have `aria-expanded` on detail toggle.                                            |

---

## 4 · Equity Issuance Wizard (`/founder/issue-equity`)

| Section                      | Details                                                                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Purpose**                  | Step-by-step issuance with live compliance validation.                                                                                           |
| **Layout Blueprint**         | `WizardShell` with inline `Stepper`. Each step full-width form section; side drawer (right) shows CapTableImpact mini-chart.                     |
| **Key Components**           | `Stepper`, `InstrumentCard`, `StakeholderLookup`, `VestingTimeline`, `RuleValidationList`, `SummaryCard`.                                        |
| **Primary Interactions**     | Step n “Next” → run local validation, then `POST` to `/api/draft-grant` on Review. On Review, “Submit for Approval” → route to `/approvals/:id`. |
| **Styling & Responsiveness** | Use global form classes (`form-input`, `form-label`) defined once; avoid inline width utils.                                                     |
| **Accessibility**            | Stepper links expose `role="tablist"`. Validation errors announced with `aria-live="assertive"`.                                                 |

---

## 5 · Multi-Party Approval Workflow (`/approvals/[requestId]`)

| Section                      | Details                                                                                                                                                    |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                  | Visualize approval chain & enable sign-off / rejection.                                                                                                    |
| **Layout Blueprint**         | **Header** (title, status chip). **FlowDiagram** top (avatars w/ lines). **DetailTabs** center (Overview / Docs / History). **ActionPanel** sticky bottom. |
| **Key Components**           | `AvatarFlow`, `ApprovalDocViewer`, `DiffOwnershipChart`, `ActionButtons`, `HistoryTimeline`.                                                               |
| **Primary Interactions**     | “Approve” → optimistic UI, PATCH `/api/approvals/:id`. On success: toast + push SSE to other viewers. Delegation opens `UserPickerModal`.                  |
| **Styling & Responsiveness** | Flow diagram uses `flex` with `gap-4` & CSS arrow connectors.                                                                                              |
| **Accessibility**            | Flow diagram also rendered as visually hidden ordered list for screen readers.                                                                             |

---

## 6 · Employee Stock Dashboard (`/employee/dashboard`)

| Section                      | Details                                                                                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                  | Help employees understand, track, and leverage their equity.                                                                             |
| **Layout Blueprint**         | **TopCard** summary. **VestingTimeline** graphic. **GrantsTable** with accordion. **TaxCalculator** collapsible. Right **LearnSidebar**. |
| **Key Components**           | `MetricCard`, `LinearVestingBar`, `GrantRow`, `TaxCalcWidget`, `FAQAccordion`.                                                           |
| **Primary Interactions**     | VestingBar milestone reached? trigger confetti (`useConfetti()` hook). “Exercise” button → `/employee/exercise/:grantId`.                |
| **Styling & Responsiveness** | Mobile first column-stack; LearnSidebar becomes bottom accordion under 768 px.                                                           |
| **Accessibility**            | Timeline described via `aria-describedby` list; confetti animation respects prefers-reduced-motion.                                      |

---

## 7 · Investor Portfolio View (`/investor/portfolio`)

| Section                      | Details                                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Purpose**                  | Provide investors a high-level overview and actionable alerts.                                            |
| **Layout Blueprint**         | **SummaryBar** (totals). **BubblePortfolioMap** central. **HoldingsTable** below. Right **AlertSidebar**. |
| **Key Components**           | `BubbleMap`, `HoldingsRow`, `LiquidityEventCard`, `ThemeToggle`.                                          |
| **Primary Interactions**     | Bubble hover → tooltip; click → `/investor/companies/:id`. Banner “Vote Now” CTA opens voting modal.      |
| **Styling & Responsiveness** | BubbleMap uses d3 in contained div; on mobile hide map and default to table.                              |
| **Accessibility**            | Provide hidden `<table>` behind SVG bubble map for data parity.                                           |

---

## 8 · Company Detail (Investor) (`/investor/companies/[id]`)

| Section                      | Details                                                                                                              |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                  | Drill-down into a single investment’s performance.                                                                   |
| **Layout Blueprint**         | **HeaderBar** (logo, valuation). **MetricCardsRow**. **OwnershipEvolutionChart**. **CapTableSection**. **DocsTabs**. |
| **Key Components**           | `LineChartDualAxis`, `InvestorMetricCard`, `CapMiniTable`, `ProRataCalcModal`.                                       |
| **Primary Interactions**     | Toggle shares vs % updates chart. Pro-rata calc opens modal; changes saved as scenario.                              |
| **Styling & Responsiveness** | Maintain 12-column grid; chart spans 8, table 4.                                                                     |
| **Accessibility**            | Charts accompanied by data tables toggled via “Show Data” link.                                                      |

---

## 9 · Compliance Dashboard (`/founder/compliance`)

| Section                      | Details                                                                                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                  | Surface compliance posture and guide remediation.                                                                                            |
| **Layout Blueprint**         | **ScorePanel** (gauge). **TabGroup** (Filings / Stakeholders / Docs / Rules). Each tab houses lists & actions. Right **CopilotDrawer** icon. |
| **Key Components**           | `GaugeChart`, `CalendarGrid`, `KycStatusTable`, `DocUploadRow`, `RuleEditor`.                                                                |
| **Primary Interactions**     | File upload triggers PUT `/api/docs` → progress bar. CopilotDrawer uses GPT proxy for contextual Q\&A.                                       |
| **Styling & Responsiveness** | Gauge 200 px fixed; calendar auto-wrap.                                                                                                      |
| **Accessibility**            | Announce score changes via `aria-live`. Calendar grid uses proper `<table>` semantics.                                                       |

---

## 10 · KYC Verification Flow (`/onboarding/kyc/[id]`)

| Section                      | Details                                                                                                        |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Purpose**                  | Verify identity & accreditation with minimal friction.                                                         |
| **Layout Blueprint**         | **ProgressStepper** top. **StepForm** center. **SideInfoPanel** right (status + help).                         |
| **Key Components**           | `AddressAutoComplete`, `DocUploadField`, `SelfieCapture`, `AccreditationForm`, `ReviewSummary`.                |
| **Primary Interactions**     | Each step on `Next` validates & PATCHes draft KYC record. Selfie step uses WebRTC capture → preview → confirm. |
| **Styling & Responsiveness** | Stepper keeps 4 items visible horizontally; stacks vertically on xs screens.                                   |
| **Accessibility**            | File inputs labelled; live capture announces countdown (toggle off for reduced-motion).                        |

---

## 11 · Token Transfer & Rule Engine Demo (`/founder/transactions/transfer`)

| Section                      | Details                                                                                                                    |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                  | Showcase real-time rule evaluation gating a transfer.                                                                      |
| **Layout Blueprint**         | **SplitView** (TransferForm left 40 %, RulesFlow right 60 %).                                                              |
| **Key Components**           | `SecuritySelect`, `AddressPicker`, `RuleFlowGraph`, `ResultToast`.                                                         |
| **Primary Interactions**     | “Check Compliance” → GET `/api/rules/preview` visualize path. Fail? show fix CTA. Execute transfer → POST `/api/transfer`. |
| **Styling & Responsiveness** | RulesFlow uses CSS grid with SVG arrows. On mobile becomes step list below form.                                           |
| **Accessibility**            | Provide text log alternative to animated flow for screen readers.                                                          |

---

## 12 · Option Exercise Wizard (`/employee/exercise/[id]`)

| Section                      | Details                                                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                  | Guide employees through cost, tax, and payment for exercising options.                                                           |
| **Layout Blueprint**         | **Header** grant meta. **DualPane** (Slider + Chart left; CostPanel right). **PaymentTabs**. **TaxTimeline**. **ConfirmScreen**. |
| **Key Components**           | `QuantitySlider`, `CostBreakdown`, `PaymentOptionCard`, `TaxImpactGraph`, `ESignField`.                                          |
| **Primary Interactions**     | Slider emits `updateCosts`. “Cash-less” option toggles payout calculation. Confirm → PUT `/api/exercise`.                        |
| **Styling & Responsiveness** | Sticky cost panel until bottom of page.                                                                                          |
| **Accessibility**            | Slider provides numeric input fallback.                                                                                          |

---

## 13 · Board Meeting Prep Center (`/founder/governance/board`)

| Section                      | Details                                                                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                  | Streamline board packet creation, agenda, and voting.                                                                              |
| **Layout Blueprint**         | **MeetingCard** top. **AgendaBuilder** drag list. **CapHighlights** section. **DocsGenPanel**. **VotingTracker**. **NotesEditor**. |
| **Key Components**           | `DragTopicItem`, `CapMetricHighlight`, `DocTemplateSelector`, `ESignCollector`, `CollabNotes`.                                     |
| **Primary Interactions**     | Drag agenda item to reorder (persist PATCH). Generate packet → call `/api/board/packet`. Votes update via SSE.                     |
| **Styling & Responsiveness** | Agenda uses `react-beautiful-dnd`; fallback buttons for keyboard move.                                                             |
| **Accessibility**            | Drag handles annotated with `aria-grabbed`, provide move-up/down buttons.                                                          |

---

## 14 · Proxy Voting Portal (`/investor/voting/[proposalId]`)

| Section                      | Details                                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                  | Allow investors to review & cast votes with instant feedback.                                                       |
| **Layout Blueprint**         | **Header** details. **DocPreviewAccordion**. **VoteInterface** (big buttons). **LiveResultsBar**. **HistoryTable**. |
| **Key Components**           | `ProposalDocViewer`, `VotePowerChip`, `LiveResultsChart`, `SplitVoteForm`.                                          |
| **Primary Interactions**     | Vote button → POST `/api/votes` → optimistic update results. SSE stream updates chart.                              |
| **Styling & Responsiveness** | Buttons min-height 56 px; results bar animated width transitions.                                                   |
| **Accessibility**            | Buttons have descriptive labels; results bar includes off-screen percentage text.                                   |

---

## 15 · Scenario Modeling Tool (`/founder/modeling`)

| Section                      | Details                                                                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                  | Let founders sandbox multiple funding/exit scenarios.                                                                     |
| **Layout Blueprint**         | **ScenarioHeader** (save/compare). **ParameterPanel** (left). **ProjectionChart** center. **SensitivitySliders** bottom.  |
| **Key Components**           | `ScenarioCard`, `FundingInputs`, `OptionPoolAdjuster`, `ProjectionMultiChart`, `DeltaHighlight`, `ExportButton`.          |
| **Primary Interactions**     | Changing any parameter recalculates projection via `/api/model`. Compare toggle splits chart view. Export → generate PDF. |
| **Styling & Responsiveness** | Parameter panel collapses to accordion on small screens.                                                                  |
| **Accessibility**            | Charts accompanied by CSV download alternate.                                                                             |

---

### Global Tech & Design Notes

* **Framework:** Next.js 15.3+ **App Router**.
* **UI Kit:** shadcn/react components.
* **Styles:** Tailwind v4 utility *only* for layout & spacing; thematic colors, typography, and component chrome live in global CSS variables + component modules.
* **State:** Zustand for client context; React Query for API cache.
* **Charts:** Recharts or D3 wrapped in `@/components/charts/*`.
* **Deploy:** Google Cloud Run service + Cloud Functions for mock API.

---

# Data Spec

# No Cap — Mock Data Specification v2

**Purpose:** Power Storybook stories *and* **Next.js API endpoints** (`/api/mock/**`) with deterministic, richly populated datasets for **all 15 screens**. Each JSON sample is representative—feel free to enlarge arrays or tweak values as long as schema integrity is preserved.

---

## Conventions

| Type                 | Convention                                                                                                |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| **Currency / token** | Integers in smallest units (`cents`, `wei`). A companion `display` field can hold human-friendly strings. |
| **Dates & times**    | ISO 8601 (`2025-05-15T10:12:00-04:00`).                                                                   |
| **IDs**              | UUID-v4 or EVM tx hashes (`0x…`).                                                                         |
| **URLs**             | Fake S3 or IPFS gateways (`https://mock-bucket.s3/…`).                                                    |
| **Addresses**        | Checksummed 0x addresses shortened here for readability.                                                  |

```ts
// Typical import
import founderDashboard from "@/mock/founder-dashboard.json";
```

---

## 1 · Multi-Role Landing & Authentication (`/api/mock/landing`)

### Components & Data

| Component      | Data Keys               |
| -------------- | ----------------------- |
| `Header`       | `siteName`, `poweredBy` |
| `HeroCards`    | `roles[]`               |
| `FeatureIcons` | `features[]`            |
| `Footer`       | `links[]`, `certs[]`    |

```jsonc
{
  "siteName": "No Cap",
  "poweredBy": "Forte",
  "roles": [
    { "id": "founder",   "title": "Founder / Admin",  "img": "/img/role-founder.png",   "cta": "Enter as Founder" },
    { "id": "investor",  "title": "Investor",        "img": "/img/role-investor.png",  "cta": "Enter as Investor" },
    { "id": "employee",  "title": "Employee",        "img": "/img/role-employee.png",  "cta": "Enter as Employee" }
  ],
  "features": [
    { "icon": "ShieldCheck", "label": "Seamless Compliance" },
    { "icon": "PieChart",    "label": "Real-Time Cap Table" },
    { "icon": "Zap",         "label": "On-Chain Actions" }
  ],
  "links": [
    { "label": "Docs",   "href": "https://docs.nocap.dev" },
    { "label": "GitHub", "href": "https://github.com/nocap-hq" }
  ],
  "certs": [
    { "img": "/img/soc2.svg", "alt": "SOC 2 Type II" },
    { "img": "/img/iso27001.svg", "alt": "ISO 27001" }
  ]
}
```

---

## 2 · Founder Dashboard (`/api/mock/founder-dashboard`)

### Components & Data

| Component                | Data Keys            |
| ------------------------ | -------------------- |
| `CapTablePieChart`       | `capTable.holders[]` |
| `TreasuryWidget`         | `treasury`           |
| `ComplianceChecklist`    | `checklist.items[]`  |
| `RecentActivityTimeline` | `activity[]`         |

```jsonc
{
  "company": {
    "id": "acme-inc",
    "name": "Acme Robotics",
    "logo": "/img/acme.svg",
    "valuationUsd": 850000000,          // cents
    "valuationDisplay": "$8.5 M"
  },
  "capTable": {
    "asOf": "2025-05-15",
    "holders": [
      { "label": "Founders",   "shares": 4500000, "pct": 45 },
      { "label": "Employees",  "shares": 1500000, "pct": 15 },
      { "label": "Option Pool","shares":  500000, "pct": 5 },
      { "label": "Seed Inv.",  "shares": 2000000, "pct": 20 },
      { "label": "Series A",   "shares": 1500000, "pct": 15 }
    ]
  },
  "treasury": {
    "usdCents": 220000000,       // $2.2 M
    "stablecoins": [
      { "symbol": "USDC", "amount": 125000000 }, // wei truncated
      { "symbol": "DAI",  "amount": 95000000 }
    ],
    "runwayDays": 270
  },
  "checklist": {
    "items": [
      { "id": "form-d",      "label": "Form D Filed",           "status": "complete" },
      { "id": "409a",        "label": "409A Valuation",         "status": "due-soon", "dueDate": "2025-07-01" },
      { "id": "iso-cap",     "label": "ISO 100k Limit Check",   "status": "warning" },
      { "id": "board-cons",  "label": "Board Consents",         "status": "pending" }
    ]
  },
  "activity": [
    {
      "id": "tx-01",
      "type": "GRANT_ISSUED",
      "actor": "0xC0FFEE",
      "message": "10 000 options granted to Jane D.",
      "timestamp": "2025-05-14T14:12:00-04:00"
    },
    {
      "id": "tx-02",
      "type": "TRANSFER",
      "actor": "0xBEEF",
      "message": "1 500 shares transferred to Series A SPV",
      "timestamp": "2025-05-13T09:00:00-04:00",
      "txHash": "0xabc123…"
    }
  ]
}
```

---

## 3 · Cap Table Explorer (`/api/mock/cap-table?date=YYYY-MM-DD`)

*(API should accept `date` param; below is full 10-year slice for demo time-machine.)*

```jsonc
{
  "history": [
    { "date": "2021-01-01", "shares": 1000000, "founders": 1000000, "employees": 0, "investors": 0 },
    { "date": "2022-06-01", "shares": 1500000, "founders": 1000000, "employees": 250000, "investors": 250000 },
    { "date": "2023-09-01", "shares": 3000000, "founders": 1000000, "employees": 450000, "investors": 1550000, "optionPool": 0 },
    { "date": "2024-12-01", "shares": 4500000, "founders": 1000000, "employees": 700000, "investors": 2300000, "optionPool": 500000 },
    { "date": "2025-05-15", "shares": 5000000, "founders": 1000000, "employees": 750000, "investors": 2750000, "optionPool": 500000 }
  ]
}
```

**Drag-to-Dilute Simulator Defaults** (`/api/mock/simulator/base`)

```json
{
  "preMoneyValuationUsd": 850000000,
  "raiseAmountUsd": 2000000,
  "newOptionPoolPct": 3
}
```

---

## 4 · Equity Issuance Wizard (`/api/mock/employees`, `/api/mock/instruments`, `/api/mock/vesting-templates`)

```jsonc
// /employees
[
  { "id": "emp-001", "name": "Jane Doe",  "email": "jane@acme.io",  "kycStatus": "verified" },
  { "id": "emp-002", "name": "Ali Wong",  "email": "ali@acme.io",   "kycStatus": "pending" },
  { "id": "emp-003", "name": "Sam O'Neil","email": "sam@acme.io",   "kycStatus": "verified" }
]

// /instruments
[
  { "id": "COMMON",   "label": "Common Shares",    "defaultPrice": 0.01 },
  { "id": "OPT",      "label": "Options",          "defaultPrice": 0.25 },
  { "id": "RSU",      "label": "RSUs",             "defaultPrice": 0 },
  { "id": "SAFE",     "label": "SAFE",             "defaultPrice": 1.00 }
]

// /vesting-templates
[
  { "id": "std-4yr", "label": "Standard 4-Year", "cliffMonths": 12, "durationMonths": 48 },
  { "id": "advisory","label": "Advisor 2-Year",  "cliffMonths": 6,  "durationMonths": 24 }
]
```

---

## 5 · Approval Detail (`/api/mock/approvals/:id`)

```jsonc
{
  "id": "appr-789",
  "type": "GRANT_ISSUANCE",
  "status": "awaiting_cfo",
  "created": "2025-05-15T09:20:00-04:00",
  "approvers": [
    { "seq": 1, "role": "CFO", "name": "Maria Li", "status": "pending" },
    { "seq": 2, "role": "CEO", "name": "Neil Patel", "status": "waiting" }
  ],
  "before": { "employeeOptions": 500000 },   // simplified diff
  "after":  { "employeeOptions": 510000 },
  "documents": [
    { "name": "Option Grant Agreement.pdf", "url": "https://mock-bucket.s3/opt-grant-jane.pdf" }
  ],
  "history": [
    { "ts": "2025-05-15T09:21:00-04:00", "actor": "System", "msg": "Request created" }
  ]
}
```

---

## 6 · Employee Stock Dashboard (`/api/mock/employee-grants?user=emp-001`)

```jsonc
{
  "user": "emp-001",
  "409aPrice": 250, // cents
  "grants": [
    {
      "grantId": "g-1001",
      "instrument": "OPT",
      "qty": 10000,
      "strikePrice": 25, // cents
      "vestStart": "2022-01-01",
      "cliff": "2023-01-01",
      "vestEnd": "2026-01-01",
      "vestedQty": 5000,
      "status": "active"
    },
    {
      "grantId": "g-1002",
      "instrument": "RSU",
      "qty": 2000,
      "vestStart": "2024-04-01",
      "cliff": "2025-04-01",
      "vestEnd": "2027-04-01",
      "vestedQty": 0,
      "status": "active"
    }
  ],
  "upcoming": [
    { "date": "2025-06-01", "event": "Option Vest", "qty": 625 },
    { "date": "2025-07-15", "event": "Board Vote",  "title": "Increase ESOP" }
  ]
}
```

---

## 7 · Investor Portfolio View (`/api/mock/investor-holdings?investor=0xBEEF`)

```jsonc
{
  "investor": "0xBEEF",
  "summary": {
    "totalInvestedUsd": 150000000,  // $1.5 M
    "currentValueUsd": 375000000,   // $3.75 M
    "roiPct": 150
  },
  "holdings": [
    {
      "companyId": "acme-inc",
      "companyName": "Acme Robotics",
      "logo": "/img/acme.svg",
      "security": "Series A",
      "shares": 750000,
      "ownershipPct": 7.5,
      "costBasis": 100000000,
      "currentValue": 225000000,
      "lastValuationDate": "2025-04-30"
    },
    {
      "companyId": "zen-bio",
      "companyName": "Zen Biotech",
      "logo": "/img/zen.svg",
      "security": "Seed",
      "shares": 520000,
      "ownershipPct": 5.2,
      "costBasis": 50000000,
      "currentValue": 150000000
    }
  ],
  "alerts": [
    { "type": "liquidity", "companyId": "zen-bio", "msg": "Series A round opens in 2 weeks" },
    { "type": "vote",      "proposalId": "prop-42", "companyId": "acme-inc", "msg": "Vote on strike option pool increase" }
  ]
}
```

---

## 8 · Company Detail (Investor) (`/api/mock/company/:id?investor=0xBEEF`)

```jsonc
{
  "company": {
    "id": "acme-inc",
    "name": "Acme Robotics",
    "logo": "/img/acme.svg",
    "stage": "Series A",
    "sector": "Robotics",
    "valuation": 850000000
  },
  "investorPosition": {
    "firstInvested": "2023-10-01",
    "shares": 750000,
    "security": "Series A Preferred",
    "costBasis": 100000000,
    "ownershipPct": 7.5
  },
  "valuationHistory": [
    { "date": "2022-01-01", "valuation": 150000000 },
    { "date": "2023-10-01", "valuation": 550000000 },
    { "date": "2025-04-30", "valuation": 850000000 }
  ],
  "capTableSnapshot": [
    { "holder": "Founders",  "pct": 45 },
    { "holder": "Employees", "pct": 15 },
    { "holder": "Investors", "pct": 40 }
  ],
  "documents": [
    { "name": "Series A SA", "url": "https://mock-bucket.s3/series-a-sa.pdf" },
    { "name": "Board Deck",  "url": "https://mock-bucket.s3/board-may25.pdf" }
  ]
}
```

---

## 9 · Compliance Dashboard (`/api/mock/compliance`)

```jsonc
{
  "score": 78,
  "ipoReadiness": 62,
  "jurisdictions": [
    { "code": "US-DE", "status": "green" },
    { "code": "CA-ON", "status": "yellow" },
    { "code": "UK",    "status": "red" }
  ],
  "filings": [
    { "name": "Form D", "due": "2025-06-10", "status": "pending" },
    { "name": "409A",   "due": "2025-07-01", "status": "due-soon" }
  ],
  "stakeholderKyc": [
    { "name": "Jane Doe", "role": "Employee", "status": "verified" },
    { "name": "Zen Biotech SPV", "role": "Investor", "status": "pending" }
  ],
  "ruleLog": [
    { "ts": "2025-05-15T09:00:00-04:00", "rule": "ISO 100k", "result": "warning" },
    { "ts": "2025-05-14T18:00:00-04:00", "rule": "Accredited Check", "result": "passed" }
  ]
}
```

---

## 10 · KYC Verification Flow (`/api/mock/kyc/:userId`)

```jsonc
{
  "userId": "invest-123",
  "steps": {
    "personal": { "status": "complete" },
    "identity": { "status": "pending", "reason": null },
    "accreditation": { "status": "not_started" },
    "review": { "status": "locked" }
  },
  "personal": {
    "firstName": "Alex",
    "lastName": "Rowe",
    "dob": "1985-02-12",
    "nationality": "US",
    "address": {
      "street": "123 Market St", "city": "San Francisco", "state": "CA", "zip": "94105"
    }
  },
  "identity": {
    "docType": "passport",
    "docUrl": "https://mock-bucket.s3/passport.jpg",
    "selfieUrl": null
  }
}
```

---

## 11 · Token Transfer & Rule Engine Demo (`/api/mock/rules/preview`, `/api/mock/transfer`)

```jsonc
// POST /rules/preview  (request: {from,to,security,qty})
{
  "flow": [
    { "rule": "Sender KYC",  "passed": true },
    { "rule": "Recipient KYC", "passed": false, "message": "Recipient not verified" },
    { "rule": "Transfer Window", "passed": true }
  ],
  "final": "blocked"
}
```

---

## 12 · Option Exercise Wizard (`/api/mock/exercise/:grantId/quote`)

```jsonc
{
  "grantId": "g-1001",
  "sliderMax": 10000,
  "quote": {
    "quantity": 5000,
    "exerciseCostCents": 1250000,
    "estTaxCents": 250000,
    "totalCents": 1500000,
    "fmvCents": 250,
    "strikeCents": 25
  },
  "paymentOptions": [
    { "method": "wire",  "label": "USD Wire" },
    { "method": "usdc",  "label": "USDC (Polygon)" },
    { "method": "cashless", "label": "Cash-less Exercise" }
  ]
}
```

---

## 13 · Board Meeting Prep Center (`/api/mock/board/next`)

```jsonc
{
  "meeting": {
    "id": "board-2025-Q2",
    "dateTime": "2025-06-20T11:00:00-04:00",
    "countdownMins": 5040,
    "attendees": [
      { "id": "dir-01", "name": "Neil Patel",  "rsvp": "yes" },
      { "id": "dir-02", "name": "Maria Li",    "rsvp": "yes" },
      { "id": "dir-03", "name": "Dr Khan",     "rsvp": "pending" }
    ]
  },
  "agenda": [
    { "id": "a-01", "title": "Approve Stock Option Grants", "owner": "CFO",   "durationMin": 10 },
    { "id": "a-02", "title": "Q2 Financials",               "owner": "CEO",   "durationMin": 20 },
    { "id": "a-03", "title": "Series B Planning",           "owner": "Chair", "durationMin": 15 }
  ],
  "resolutions": [
    { "id": "res-99", "title": "Increase ESOP by 2 %", "status": "pending", "votes": [] }
  ],
  "packetTemplates": [
    { "id": "std-deck", "name": "Standard Board Deck" },
    { "id": "esop-inc", "name": "ESOP Increase Resolution" }
  ]
}
```

---

## 14 · Proxy Voting Portal (`/api/mock/proposals/:id`)

```jsonc
{
  "proposal": {
    "id": "prop-42",
    "title": "Proposal 42 — Increase Option Pool",
    "company": "Acme Robotics",
    "deadline": "2025-06-01T23:59:00-04:00",
    "type": "Ordinary Resolution",
    "recommendation": "FOR"
  },
  "docs": [
    { "name": "Board Letter.pdf", "url": "https://mock-bucket.s3/board_letter.pdf" },
    { "name": "Cap-Impact.xls",  "url": "https://mock-bucket.s3/cap_impact.xlsx" }
  ],
  "impact": {
    "yourShares": 750000,
    "dilutionPct": 0.8
  },
  "liveResults": {
    "for": 62.5,
    "against": 12.0,
    "abstain": 0.5,
    "quorum": 40.0,
    "totalVoted": 75.0
  }
}
```

---

## 15 · Scenario Modeling Tool (`/api/mock/model/scenario/:id`)

```jsonc
{
  "scenario": {
    "id": "sc-opt-raise-10m",
    "name": "Raise $10 M Series B",
    "created": "2025-05-15T08:00:00-04:00"
  },
  "parameters": {
    "round": {
      "raiseUsd": 1000000000,    // $10 M
      "preMoneyUsd": 9000000000,
      "security": "Series B Preferred"
    },
    "optionPoolIncreasePct": 2,
    "exit": {
      "year": 2028,
      "valuationUsd": 60000000000
    }
  },
  "projection": [
    { "year": 2025, "foundersPct": 38, "employeePct": 18, "investorPct": 44 },
    { "year": 2026, "foundersPct": 36, "employeePct": 18, "investorPct": 46 },
    { "year": 2027, "foundersPct": 34, "employeePct": 19, "investorPct": 47 },
    { "year": 2028, "foundersPct": 32, "employeePct": 20, "investorPct": 48 }
  ],
  "sensitivity": {
    "preMoneyRange": [8000000000, 12000000000],
    "raiseRange": [500000000, 1500000000]
  }
}
```

---

### Directory Stub (to place these files)

```
/mock
  ├─ landing.json
  ├─ founder-dashboard.json
  ├─ cap-table.json
  ├─ simulator-base.json
  ├─ employees.json
  ├─ instruments.json
  ├─ vesting-templates.json
  ├─ approvals-appr-789.json
  ├─ employee-grants-emp-001.json
  ├─ investor-holdings-0xBEEF.json
  ├─ company-acme-inc.json
  ├─ compliance.json
  ├─ kyc-invest-123.json
  ├─ rule-preview-blocked.json
  ├─ exercise-g-1001-quote.json
  ├─ board-next.json
  ├─ proposal-42.json
  └─ model-sc-opt-raise-10m.json
```

All datasets are now ready for Next.js API stubs **or** direct Storybook import. If you need pagination samples, deeper edge-cases (e.g., rejected KYC, multi-currency treasury), or additional mock endpoints, just ping me!

