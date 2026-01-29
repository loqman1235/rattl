import { LandingFooter } from "@/components/landing/landing-footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const LandingPage = async () => {
  return (
    <div className="w-full min-h-screen mx-auto  flex flex-col gap-5 items-center justify-center p-4">
      <div className="w-full max-w-[322px] flex-1 flex flex-col items-center justify-center gap-5">
        {/* BRAND */}
        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            className="block dark:hidden"
            src="/logo_dark.svg"
            width={200}
            height={200}
            alt="Rattl"
            priority
          />
          <Image
            className="hidden dark:block"
            src="/logo_light.svg"
            width={200}
            height={200}
            alt="Rattl"
            priority
          />
          <h3 className="font-light text-lg tracking-wide text-foreground">
            Connect. Share. Discover
          </h3>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 w-full">
          <Button size="lg" asChild>
            <Link href="/auth/signup">Create Account</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </div>

        {/* TERMS */}
        <p className="text-muted-foreground text-xs text-center leading-relaxed">
          By continuing you agree to our{" "}
          <Link className="underline" href="/tos">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link className="underline" href="/privacy">
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      <LandingFooter />
    </div>
  );
};
export default LandingPage;
