import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
  // const session = {
  //   user: {
  //     username: "johndoe",
  //   },
  // };

  const session = null;

  return (
    <html lang="en" className={`${libreFranklin.variable}`}>
      <body className="antialiased">
        {session ? appSlot : landingSlot}
        {modal}
        {children}
      </body>
    </html>
  );
}
