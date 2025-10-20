
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { loadContent } from "@/lib/content-loader";

const content = loadContent();
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.your-domain.com';

export const metadata: Metadata = {
  title: "Vieira & Martins Advogados | Segurança Jurídica em Manoel Viana",
  description: "Escritório de advocacia em Manoel Viana-RS. Especialistas em direito cível, família, trabalhista e consumidor. Atendimento personalizado e compromisso com a justiça.",
  keywords: ["advogado em manoel viana", "escritório de advocacia", "direito cível", "direito de família", "direito trabalhista", "advocacia", "Manoel Viana RS"],
  authors: [{ name: "Vieira & Martins Advogados" }],
  creator: "Firebase Studio",
  publisher: "Vieira & Martins Advogados",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Vieira & Martins Advogados | Segurança Jurídica em Manoel Viana",
    description: "Escritório de advocacia em Manoel Viana-RS. Compromisso, ética e atendimento personalizado para defender seus direitos.",
    url: siteUrl,
    siteName: "Vieira & Martins Advogados",
    images: [
      {
        url: `${siteUrl}/logo-og.jpg`, // Caminho para uma imagem de Open Graph
        width: 1200,
        height: 630,
        alt: "Logo Vieira & Martins Advogados",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vieira & Martins Advogados | Segurança Jurídica em Manoel Viana",
    description: "Advocacia especializada em Manoel Viana-RS. Encontre a solução jurídica para suas necessidades.",
    images: [`${siteUrl}/logo-og.jpg`],
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Attorney",
  "name": "Vieira & Martins Advogados",
  "description": "Escritório de advocacia especializado em Manoel Viana-RS, oferecendo serviços em direito cível, família, trabalhista e do consumidor.",
  "url": siteUrl,
  "logo": `${siteUrl}/logo-vieiraemartinsadvogado.jpeg`,
  "image": `${siteUrl}/logo-og.jpg`,
  "telephone": `+${content.contactInfo.whatsapp}`,
  "email": content.contactInfo.email,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "R. Franklin Bastos de Carvalho, 754",
    "addressLocality": "Manoel Viana",
    "addressRegion": "RS",
    "postalCode": "97640-000",
    "addressCountry": "BR"
  },
  "openingHours": "Mo-Fr 09:00-12:00,14:00-18:00",
  "hasMap": "https://www.google.com/maps/place/R.+Franklin+Bastos+de+Carvalho,+754+-+Centro,+Manoel+Viana+-+RS,+97640-000",
  "sameAs": [
    content.contactInfo.instagramUrl,
    content.contactInfo.facebookUrl
  ],
  "priceRange": "$$",
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Manoel Viana"
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="!scroll-smooth dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Playfair+Display:wght@400;700&family=Roboto:wght@400;700&family=Lora:wght@400;700&family=Montserrat:wght@400;700&family=Open+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn("font-body antialiased")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
