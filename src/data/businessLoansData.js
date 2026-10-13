// Authoritative Business Loans data extracted verbatim from Products - RND Financials.docx

export const BUSINESS_LOANS_CATEGORY = {
  title: "Business",
  subtitle: "Loans",
  slug: "business-loans",
  description:
    "Tailored financing arrangements for eligible Australian enterprises seeking secured, unsecured, or small business lending.",
  icon: "TargetIcon",
};

export const BUSINESS_LOAN_PRODUCTS = [
  {
    name: "Secured Business Loans",
    slug: "secured-business-loans",
    index: "01",
    icon: "WorkspaceIcon",
    image: "/images/work/latent-router.jpg",
    summary:
      "Secured business loans provide financing for eligible businesses where acceptable property or other assets are offered as security for the borrowing, supporting working capital, expansion, and commercial growth.",
    paragraphs: [
      "Secured business loans provide financing for eligible businesses where acceptable property or other assets are offered as security for the borrowing.",
      "These loans may be used for legitimate business purposes, including working capital, expansion, business acquisitions, operational improvements and eligible commercial expenditure.",
      "The type and value of security offered, together with business financial performance and repayment capacity, can influence available borrowing amounts, interest rates and loan terms.",
      "At RND Financials, we assist business owners in exploring secured business finance options based on their funding requirements, available assets and financial circumstances.",
      "We help clients understand different lender requirements, repayment arrangements, security obligations and potential financing costs.",
    ],
    warning:
      "Providing security creates additional financial responsibilities, including the possibility of losing secured assets if the borrower fails to meet contractual obligations.",
  },
  {
    name: "Unsecured Business Loans",
    slug: "unsecured-business-loans",
    index: "02",
    icon: "ChartIcon",
    image: "/images/journal/article-2.jpg",
    summary:
      "Unsecured business loans may provide eligible businesses with access to funding without requiring a specific property or asset to be pledged as security, suited for stock purchases, cash flow, and operational expenditure.",
    paragraphs: [
      "Unsecured business loans may provide eligible businesses with access to funding without requiring a specific property or asset to be pledged as security.",
      "These arrangements can be used for approved commercial purposes such as working capital, business improvements, purchasing stock, marketing activities and operational expenditure.",
      "Lenders generally assess factors including trading history, business revenue, cash flow, existing financial commitments, credit history and the ability to meet repayments.",
      "RND Financials assists business owners with understanding unsecured business finance options and exploring suitable lending arrangements where available.",
      "We help explain documentation requirements, interest rates, fees, loan terms and repayment structures so business owners can make informed borrowing decisions.",
    ],
    warning:
      "Although specific asset security may not be required, lenders may still request personal guarantees or impose other contractual obligations.",
  },
  {
    name: "Small Business Loans",
    slug: "small-business-loans",
    index: "03",
    icon: "SlidersIcon",
    image: "/images/journal/article-3.jpg",
    summary:
      "Small business loans provide funding options for sole traders, partnerships, and companies seeking finance for daily operations, equipment purchases, inventory, and growth.",
    paragraphs: [
      "Small businesses often require finance to manage day-to-day operations, invest in equipment, purchase stock or pursue growth opportunities.",
      "Small business loans provide funding options for eligible businesses seeking finance for approved commercial purposes.",
      "Available lending structures may vary depending on business size, trading history, turnover, profitability, existing financial commitments and the purpose of borrowing.",
      "At RND Financials, we assist sole traders, partnerships and companies in exploring business lending options suited to their funding requirements.",
      "We help clients understand different financing structures, lender eligibility criteria, documentation requirements and repayment obligations.",
      "Whether you are maintaining business operations or planning your next stage of growth, we aim to support informed financing decisions while considering affordability, ongoing cash flow and the overall cost of borrowing.",
    ],
    warning:
      "Borrowers should carefully evaluate ongoing cash flow implications, overall borrowing costs and repayment affordability before entering into small business credit facilities.",
  },
];
