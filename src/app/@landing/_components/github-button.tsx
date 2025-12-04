import { FaGithub } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

export const GithubButton = () => {
  return (
    <Button size="lg" variant="outline">
      <FaGithub className="size-5" />
      Sign up with Github
    </Button>
  );
};
