import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const [showPass, setShowPass] = React.useState(false);

  return (
    <div className="relative">
      <input
        type={showPass ? "text" : type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-lg border bg-transparent px-3 py-3 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
        )}
        {...props}
      />

      {type === "password" && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              aria-label={showPass ? "Hide password" : "Show password"}
              aria-pressed={showPass}
              type="button"
              onClick={() => setShowPass((prev) => !prev)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground size-5 cursor-pointer "
            >
              {showPass ? (
                <EyeSlashIcon className="stroke-2" />
              ) : (
                <EyeIcon className="stroke-2" />
              )}
            </button>
          </TooltipTrigger>

          <TooltipContent side="bottom">
            {showPass ? <p>Hide password</p> : <p>Show password</p>}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

export { Input };
