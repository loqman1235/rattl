"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldLabel } from "@/components/ui/field";

type DateOfBirthInputProps = {
  value?: string; // Format: "YYYY-MM-DD"
  onChange: (date: string) => void;
  error?: string;
};

export const DateOfBirthInput = ({
  value,
  onChange,
  error,
}: DateOfBirthInputProps) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Parse initial value
  useEffect(() => {
    if (value && value.includes("-")) {
      const [y, m, d] = value.split("-");
      setYear(y);
      setMonth(m);
      setDay(d);
    }
  }, [value]);

  // Update parent when any field changes
  useEffect(() => {
    if (day && month && year) {
      onChange(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
    }
  }, [day, month, year, onChange]);

  // Generate arrays
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-2 w-full">
      <FieldLabel>Date of Birth</FieldLabel>
      <div className="grid grid-cols-[2fr_1fr_1.5fr] gap-2 w-full">
        {/* Month */}
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger
            className={`w-full py-4 ${error && !month ? "border-destructive" : ""}`}
          >
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Day */}
        <Select value={day} onValueChange={setDay}>
          <SelectTrigger
            className={`w-full ${error && !month ? "border-destructive" : ""}`}
          >
            <SelectValue placeholder="Day" />
          </SelectTrigger>
          <SelectContent>
            {days.map((d) => (
              <SelectItem key={d} value={d.toString()}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Year */}
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger
            className={`w-full ${error && !month ? "border-destructive" : ""}`}
          >
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
