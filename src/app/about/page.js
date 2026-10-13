import PageHeader from "@/components/PageHeader";
import StatementBanner from "@/components/StatementBanner";
import ResearchStatement from "@/components/ResearchStatement";
import ResearchAreas from "@/components/ResearchAreas";
import ResearchOutcomes from "@/components/ResearchOutcomes";

export const metadata = {
  title: "About Us — RND Financials",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About"
        subtitle="Us"
        description="Learn about our story, values, and commitment to helping Australians achieve their financial goals."
        icon="TensorIcon"
      />

      <StatementBanner
        showContent={false}
        src="/images/about/banner.jpg"
      />

      <ResearchStatement />

      <ResearchAreas />

      <ResearchOutcomes />
    </>
  );
}