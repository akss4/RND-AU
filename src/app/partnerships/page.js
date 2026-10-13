import PageHeader from "@/components/PageHeader";
import StatementBanner from "@/components/StatementBanner";
import PartnersSection from "@/components/PartnersSection";

export const metadata = {
  title: "Get Started — RND Financials",
};

export default function PartnershipsPage() {
  return (
    <>
      <PageHeader
        title="Get"
        subtitle="Started"
        description="Ready to secure your loan? Book a free consultation and let's find the right solution for your goals."
        icon="UserIcon"
      />

      <StatementBanner
        showContent={false}
        src="/images/partnerships/banner.jpg"
      />

      <PartnersSection />
    </>
  );
}
