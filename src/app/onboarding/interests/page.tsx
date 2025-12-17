"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { updateInterests } from "@/actions/onboarding";
import { Check } from "lucide-react";
import { INTERESTS } from "@/config/interests";

export default function InterestsPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const toggleInterest = (interest: string) => {
    setError("");
    setSelected((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((i) => i !== interest);
      }
      if (prev.length >= 10) {
        setError("You can select up to 10 interests");
        return prev;
      }
      return [...prev, interest];
    });
  };

  const handleSubmit = async () => {
    if (selected.length < 3) {
      setError("Please select at least 3 interests");
      return;
    }

    startTransition(async () => {
      try {
        await updateInterests(selected);
      } catch (error) {
        console.error(error);
        setError("Failed to save interests");
      }
    });
  };

  const handleSkip = async () => {
    await updateInterests([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">What are you interested in?</h1>
        <p className="text-muted-foreground mt-2">
          Select at least 3 topics to personalize your feed.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {INTERESTS.map((interest) => (
          <button
            key={interest}
            onClick={() => toggleInterest(interest)}
            type="button"
            disabled={isPending}
            className={`
              relative p-4 rounded-lg border-2 transition-all
              disabled:opacity-50 disabled:cursor-not-allowed
              ${
                selected.includes(interest)
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }
            `}
          >
            {selected.includes(interest) && (
              <Check className="absolute top-2 right-2 h-5 w-5 text-primary" />
            )}
            <span className="font-medium">{interest}</span>
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <p className="text-sm text-muted-foreground">
        Selected: {selected.length}/10 {selected.length < 3 && `(minimum 3)`}
      </p>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          size="lg"
          onClick={handleSkip}
          disabled={isPending}
        >
          Skip for now
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex-1"
          size="lg"
          disabled={selected.length < 3 || isPending}
        >
          {isPending ? "Saving..." : "Finish"}
        </Button>
      </div>
    </div>
  );
}
