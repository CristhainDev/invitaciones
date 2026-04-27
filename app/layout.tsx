import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/*export const metadata: Metadata = {
  title: "Invitaciones",
  description: "Invitaciones web",
  icons: {
    icon: "/icon.webp",
  },
};*/

export const metadata: Metadata = {
  title: "Baby Shower Noah Gabriel",
  description:
    "Te invitamos a celebrar con nosotros este día tan especial 💙 Confirma tu asistencia aquí.",

  icons: {
    icon: "/icon.webp",
  },

  openGraph: {
    title: "Baby Shower Noah Gabriel",
    description:
      "Te invitamos a celebrar con nosotros este día tan especial 💙",
    url: "https://invitaciones-gamma.vercel.app/invitation",
    siteName: "Invitaciones Web",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Invitación Baby Shower Noah Gabriel",
      },
    ],
    locale: "es_MX",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Baby Shower Noah Gabriel",
    description:
      "Te invitamos a celebrar con nosotros este día tan especial 💙",
    images: ["/preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
