import PageHeader from "@/components/PageHeader";
import StatementBanner from "@/components/StatementBanner";
import JournalArticles from "@/components/JournalArticles";

export const metadata = {
  title: "Resources — RND Financials",
};

export default function JournalPage() {
  return (
    <>
      <PageHeader
        title="Finance"
        subtitle="Resources"
        description="Guides, tips, and insights to help you navigate the Australian mortgage landscape."
        icon="BookIcon"
      />

      <StatementBanner
        showContent={false}
        src="/images/journal/banner.jpg"
      />

      <JournalArticles />
    </>
  );
}
