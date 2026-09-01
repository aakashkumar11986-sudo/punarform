// ── Types ──────────────────────────────────────────────
export type LoanType = 'Personal Loan' | 'Credit Card' | 'Consumer Durable' | 'Auto Loan';
export type LoanStatus = 'Overdue' | 'Active' | 'In Resolution';
export type ResolutionStage = 'Requested' | 'Negotiating' | 'Agreed' | 'Closed';
export type PathwayType = 'Settlement' | 'Restructuring' | 'Foreclosure';

export interface Loan {
  id: string;
  lender: string;
  lenderInitial: string;
  lenderColor: string;
  type: LoanType;
  principal: number;
  overdueAmount: number;
  daysPastDue: number;
  status: LoanStatus;
  monthlyEMI: number;
}

export interface ResolutionProgress {
  loanId: string;
  lender: string;
  type: LoanType;
  stage: ResolutionStage;
  pathway: PathwayType;
  targetAmount: number;
  expectedClose: string;
}

export interface Pathway {
  type: PathwayType;
  icon: string;
  tagline: string;
  description: string;
  scoreImpact: string;
  scoreTrend: 'down' | 'neutral' | 'up';
  timeline: string;
  checklist: { title: string; items: string[] }[];
}

// ── Dummy Data ─────────────────────────────────────────
export const loans: Loan[] = [
  {
    id: 'L1',
    lender: 'HDFC Bank',
    lenderInitial: 'H',
    lenderColor: 'bg-brand-600',
    type: 'Personal Loan',
    principal: 450000,
    overdueAmount: 38000,
    daysPastDue: 42,
    status: 'Overdue',
    monthlyEMI: 9200,
  },
  {
    id: 'L2',
    lender: 'Bajaj Finserv',
    lenderInitial: 'B',
    lenderColor: 'bg-mint-600',
    type: 'Consumer Durable',
    principal: 85000,
    overdueAmount: 14500,
    daysPastDue: 28,
    status: 'Overdue',
    monthlyEMI: 3100,
  },
  {
    id: 'L3',
    lender: 'Axis Bank',
    lenderInitial: 'A',
    lenderColor: 'bg-sand-500',
    type: 'Credit Card',
    principal: 120000,
    overdueAmount: 0,
    daysPastDue: 0,
    status: 'Active',
    monthlyEMI: 6000,
  },
];

export const resolutionProgress: ResolutionProgress[] = [
  {
    loanId: 'L1',
    lender: 'HDFC Bank',
    type: 'Personal Loan',
    stage: 'Negotiating',
    pathway: 'Settlement',
    targetAmount: 228000,
    expectedClose: 'Oct 2026',
  },
  {
    loanId: 'L2',
    lender: 'Bajaj Finserv',
    type: 'Consumer Durable',
    stage: 'Agreed',
    pathway: 'Restructuring',
    targetAmount: 102000,
    expectedClose: 'Sep 2026',
  },
];

export const pathways: Pathway[] = [
  {
    type: 'Settlement',
    icon: 'handshake',
    tagline: 'Close the loan for less than you owe',
    description: 'Negotiate a one-time partial payment. The lender writes off the remaining balance and marks the account as settled.',
    scoreImpact: '−40 to −60 pts',
    scoreTrend: 'down',
    timeline: '30–90 days',
    checklist: [
      {
        title: 'Preparation',
        items: [
          'Gather last 6 months bank statements',
          'Note total outstanding & penalty breakdown',
          'Check hardship documentation (job loss, medical)',
        ],
      },
      {
        title: 'Negotiation Call',
        items: [
          'Request the settlement / write-off department',
          'Start at 40% of outstanding, aim for 50–55%',
          'Ask for waiver of penalty & interest charges',
          'Get the offer in writing before paying',
        ],
      },
      {
        title: 'Closure',
        items: [
          'Make single lump-sum payment only after written agreement',
          'Collect No Due Certificate (NDC)',
          'Confirm CIBIL status updates to "Settled" within 60 days',
        ],
      },
    ],
  },
  {
    type: 'Restructuring',
    icon: 'refresh',
    tagline: 'Lower EMIs by extending the term',
    description: 'The lender reworks your repayment schedule — longer tenure, reduced EMIs, or a temporary moratorium — so you can keep paying.',
    scoreImpact: '−10 to −20 pts',
    scoreTrend: 'down',
    timeline: '15–45 days',
    checklist: [
      {
        title: 'Eligibility Check',
        items: [
          'Confirm account is < 90 days past due',
          'Verify RBI restructuring circular applies',
          'Prepare income & expense statement',
        ],
      },
      {
        title: 'Proposal',
        items: [
          'Request tenure extension or moratorium',
          'Ask for EMI reduction to affordable level',
          'Negotiate waiver of penal interest',
        ],
      },
      {
        title: 'Agreement',
        items: [
          'Sign revised loan agreement',
          'Set up new auto-debit mandate',
          'Track that CIBIL shows "Restructured" flag',
        ],
      },
    ],
  },
  {
    type: 'Foreclosure',
    icon: 'lock-open',
    tagline: 'Pay off the full loan early',
    description: 'Close the entire outstanding balance in one payment. Best when you have funds and want a clean exit with minimal score impact.',
    scoreImpact: '+5 to +15 pts',
    scoreTrend: 'up',
    timeline: '7–15 days',
    checklist: [
      {
        title: 'Foreclosure Request',
        items: [
          'Request foreclosure statement from lender',
          'Check for foreclosure charges (usually 2–5%)',
          'Confirm final amount includes all charges',
        ],
      },
      {
        title: 'Payment & Closure',
        items: [
          'Pay full foreclosure amount via NEFT/RTGS',
          'Collect No Due Certificate (NDC)',
          'Ensure CIBIL updates to "Closed" within 45 days',
        ],
      },
    ],
  },
];

export const creditScoreTimeline = [
  { month: 'Now', score: 582, label: 'Current' },
  { month: 'Month 1', score: 595, label: 'Settlement done' },
  { month: 'Month 2', score: 610, label: 'First on-time EMI' },
  { month: 'Month 3', score: 628, label: 'Credit utilisation drops' },
  { month: 'Month 4', score: 645, label: 'Steady recovery' },
  { month: 'Month 5', score: 660, label: 'Secured card approved' },
  { month: 'Month 6', score: 678, label: 'Near "Good" band' },
];

export const rebuildTips = [
  {
    icon: 'credit-card',
    title: 'Get a secured credit card',
    detail: 'Deposit ₹15,000 as collateral. Use it for ₹2,000/month and pay in full. This rebuilds on-time payment history.',
  },
  {
    icon: 'percent',
    title: 'Keep credit utilisation under 30%',
    detail: 'If your limit is ₹50,000, never spend more than ₹15,000 in a billing cycle. High utilisation drags your score down.',
  },
  {
    icon: 'check-circle',
    title: 'Never miss an EMI again',
    detail: 'Set auto-pay for at least the minimum due. One missed payment can undo 3 months of score recovery.',
  },
];
