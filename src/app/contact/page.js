import PageHeader from "@/components/PageHeader";
import ContactBanner from "@/components/ContactBanner";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "Contact — RND Financials",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get in"
        subtitle="Touch"
        description="Ready to discuss your loan? Get in touch for a free, no-obligation consultation."
        icon="SendIcon"
      />

      <ContactBanner />

      <FAQ />
    </>
  );
}
