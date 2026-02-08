import type { Metadata } from "next";
import { assistant, heebo } from "@/lib/fonts";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "הנוטעים | אדריכלות נוף וגינון",
    template: "%s | הנוטעים",
  },
  description: "הנוטעים – עיצוב גינות פרטיות, גגות ירוקים ותכנון נוף מקצועי",
  keywords: ["אדריכלות נוף", "עיצוב גינות", "גגות ירוקים", "תכנון נוף", "גינון"],
  openGraph: {
    title: "הנוטעים | אדריכלות נוף וגינון",
    description: "הנוטעים – עיצוב גינות פרטיות, גגות ירוקים ותכנון נוף מקצועי",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${assistant.variable} ${heebo.variable} antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
