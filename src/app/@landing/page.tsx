// import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { GoogleButton } from "./_components/google-button";
import { GithubButton } from "./_components/github-button";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="max-w-5xl mx-auto min-h-screen flex md:flex-row flex-col items-center justify-center md:justify-between gap-10 p-10">
      {/* BRAND */}
      <Image
        className="w-[120px] md:w-[300px] pointer-events-none select-none"
        src="/logo_light.svg"
        width={300}
        height={300}
        alt="Rattl"
      />

      <div className="flex flex-col gap-10 max-w-sm text-center md:text-start">
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-bold">Join the Rattl community!</h2>
          <div className="flex flex-col gap-3">
            <GoogleButton />
            <GithubButton />
            {/* OR */}
            <div className="flex items-center gap-2">
              <div className="h-px w-full bg-border"></div>
              <span className="text-foreground">OR</span>
              <div className="h-px w-full bg-border"></div>
            </div>

            <Button size="lg">Create account</Button>
            <p className="text-xs text-muted-foreground">
              By signing up, you agree to the{" "}
              <Link className="underline" href="/tos">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className="underline" href="/privacy">
                Privacy Policy
              </Link>
              , including{" "}
              <Link className="underline" href="/cookies">
                Cookie Use.
              </Link>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="text-lg font-bold">Already have an account?</h3>

          <Button size="lg" variant="outline" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </div>

      {/* FOOTER */}
    </div>
  );
};
export default LandingPage;
