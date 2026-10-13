import PageHeader from "@/components/PageHeader";
import StatementBanner from "@/components/StatementBanner";
import ResearchStatement from "@/components/ResearchStatement";
import ResearchAreas from "@/components/ResearchAreas";
import ResearchOutcomes from "@/components/ResearchOutcomes";

export const metadata = {
  title: "Loan Solutions — RND Financials",
};

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        title="Loan"
        subtitle="Solutions"
        description="Home loans, refinancing, asset finance, business funding, and more—tailored to your financial goals."
        icon="TensorIcon"
      />

      <StatementBanner
        showContent={false}
        src="/images/research/banner.jpg"
      />

      <ResearchStatement />

      <ResearchAreas />

      <ResearchOutcomes />
    </>
  );
}
