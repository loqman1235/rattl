import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Rattl.",
  description: "A social media website.",
};

export default function RootLayout({
  landing: landingSlot,
  app: appSlot,
  modal,
  children,
}: Readonly<{
  landing: React.ReactNode;
  app: React.ReactNode;
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  const session = {
    user: {
      username: "johndoe",
    },
  };

  // const session = null;

  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable}`}>
      <body className="antialiased">
        {session ? appSlot : landingSlot}
        {modal}
        {children}
      </body>
    </html>
  );
}
