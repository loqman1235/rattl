import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const steps = [
  { id: 1, name: "Username", path: "/onboarding/username" },
  { id: 2, name: "Profile", path: "/onboarding/profile" },
  { id: 3, name: "Interests", path: "/onboarding/interests" },
];

export default async function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  // Must be authenticated
  if (!session?.user) {
    redirect("/");
  }

  if (session.user.username) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center max-w-xl">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="size-10 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
                    {step.id}
                  </div>
                  <span className="text-xs mt-2 text-muted-foreground">
                    {step.name}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div className="h-[2px] bg-border w-16 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-card rounded-lg border p-8">{children}</div>
      </div>
    </div>
  );
}
