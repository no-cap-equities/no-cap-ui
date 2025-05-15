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