import "./globals.css";

import { Google_Sans_Flex, Google_Sans_Code } from "next/font/google";

import ClientLayout from "@/components/ClientLayout";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans-flex",
  subsets: ["latin"],
});

const googleSansCode = Google_Sans_Code({
  variable: "--font-google-sans-code",
  subsets: ["latin"],
});

export const metadata = {
  title: "RND Financials — Your Trusted Mortgage Broker",
  description: "Australian mortgage brokerage helping you secure the right home loan. Expert advice from application to settlement.",
  appleWebApp: {
    title: "RND Financials",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${googleSansFlex.variable} ${googleSansCode.variable}`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="RND Financials" />
      </head>
      <body>
        <ClientLayout>
          <Menu />
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
