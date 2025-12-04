import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

export const GoogleButton = () => {
  return (
    <Button size="lg" variant="outline">
      <FcGoogle className="size-5" />
      Sign up with Google
    </Button>
  );
};
