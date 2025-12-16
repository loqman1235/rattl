import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { headers } from "next/headers";

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Rattl.",
  description: "A social media website.",
};

export default async function RootLayout({
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
  const session = await getSession();
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";

  console.log("🔍 Root Layout Check:", {
    pathname,
    hasSession: !!session,
    username: session?.user?.username,
  });

  if (
    session?.user &&
    !session.user.username &&
    !pathname.startsWith("/onboarding")
  ) {
    console.log("➡️ Redirecting to onboarding");
    redirect("/onboarding/username");
  }

  return (
    <html lang="en" className={`${libreFranklin.variable}`}>
      <body className="antialiased">
        {session?.user ? appSlot : landingSlot}
        {modal}
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
