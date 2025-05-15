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

