import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { headers } from "next/headers";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Rattl.",
  description: "A social media website.",
};

export default async function RootLayout({
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

  if (
    session?.user &&
    !session.user.onboardingCompleted &&
    !pathname.startsWith("/onboarding")
  ) {
    console.log("➡️ Redirecting to onboarding");
    redirect("/onboarding/username");
  }

  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {modal}
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
