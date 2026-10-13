import PageHeader from "@/components/PageHeader";
import FirmIntro from "@/components/FirmIntro";
import Team from "@/components/Team";
import OpenPositions from "@/components/OpenPositions";
import StatementBanner from "@/components/StatementBanner";

export const metadata = {
  title: "Inside the Firm — RND Financials",
};

export default function FirmPage() {
  return (
    <>
      <PageHeader
        title="About"
        subtitle="RND Financials"
        description="Melbourne-based mortgage brokers helping Australians secure smarter loans and build stronger financial futures."
        icon="OrbitIcon"
      />

      <FirmIntro />

      <Team />

      <OpenPositions />

      <StatementBanner
        src="/images/firm/banner.jpg"
        copyTopLeft={`Finance built on trust, not complexity.`}
        copyBottomRight={`We put your goals first, every time.`}
      />
    </>
  );
}
