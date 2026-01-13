"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import Lineicons from "@lineiconshq/react-lineicons";
import {
  MonitorStroke,
  MoonHalfRight5Stroke,
  Sun1Stroke,
} from "@lineiconshq/free-icons";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col gap-1">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-9 w-full rounded-md" />
        ))}
      </div>
    );
  }

  const themes = [
    { value: "light", label: "Light", icon: Sun1Stroke },
    { value: "dark", label: "Dark", icon: MoonHalfRight5Stroke },
    { value: "system", label: "System", icon: MonitorStroke },
  ];
  return (
    <div className="flex flex-col gap-1">
      {themes.map((t) => {
        const Icon = t.icon;
        const isActive = theme === t.value;

        return (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-md
              transition-colors cursor-pointer text-left w-full
              ${isActive ? "bg-muted" : "hover:bg-muted/50"}
            `}
          >
            <Lineicons
              className="size-5"
              strokeWidth={2}
              icon={Icon}
              size={20}
            />
            <span className="text-sm">{t.label}</span>
            {isActive && (
              <span className="ml-auto text-xs text-primary">✓</span>
            )}
          </button>
        );
      })}
    </div>
  );
};
