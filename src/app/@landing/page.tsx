import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-between gap-5">
      {/* BRAND */}
      <Link href="/">
        <Image src="/logo_light.svg" width={300} height={300} alt="Rattl" />
      </Link>

      {/* AUTH BUTTONS */}
      <div>
        <h2 className="text-3xl font-bold">Join the Rattl community</h2>

        <Button size="lg">
          <Link href="/i/flow/signin">Create an account</Link>
        </Button>
      </div>
    </div>
  );
};
export default LandingPage;
