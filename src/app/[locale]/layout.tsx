import type { Metadata } from "next";
import { Archivo, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { getDictionary, Locale } from "../dictionaries";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export async function generateStaticParams() {
  return [
    { locale: "es" },
    { locale: "en" },
    { locale: "pt" },
    { locale: "zh" },
    { locale: "ko" },
    { locale: "ru" },
  ];
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
    title: `${dict.hero.name} ${dict.hero.lastName} — ${dict.hero.roles[0]} Developer`,
    description: dict.about.lead,
    openGraph: {
      title: `${dict.hero.name} ${dict.hero.lastName} — ${dict.hero.roles[0]} Developer`,
      description: dict.about.lead,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  return (
    <html lang={locale} className={`${archivo.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`} data-scroll-behavior="smooth">
      <body>
        {children}
      </body>
    </html>
  );
}
