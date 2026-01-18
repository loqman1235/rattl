"use client";

import { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldLabel } from "@/components/ui/field";

type DateOfBirthInputProps = {
  value?: string;
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

  // Track if component is initializing
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current && value && value.includes("-")) {
      const [y, m, d] = value.split("-");
      setYear(y);
      setMonth(parseInt(m, 10).toString());
      setDay(parseInt(d, 10).toString());
      isInitialized.current = true;
    }
  }, [value]);

  const handleDayChange = (newDay: string) => {
    setDay(newDay);
    if (month && year) {
      onChange(`${year}-${month.padStart(2, "0")}-${newDay.padStart(2, "0")}`);
    }
  };

  const handleMonthChange = (newMonth: string) => {
    setMonth(newMonth);
    if (day && year) {
      onChange(`${year}-${newMonth.padStart(2, "0")}-${day.padStart(2, "0")}`);
    }
  };

  const handleYearChange = (newYear: string) => {
    setYear(newYear);
    if (day && month) {
      onChange(`${newYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
    }
  };

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
    <div className="space-y-2">
      <FieldLabel>Date of Birth</FieldLabel>
      <div className="grid grid-cols-[2fr_1fr_1.5fr] gap-2">
        {/* Month */}
        <Select value={month} onValueChange={handleMonthChange}>
          <SelectTrigger
            className={error && !month ? "border-destructive" : ""}
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
        <Select value={day} onValueChange={handleDayChange}>
          <SelectTrigger className={error && !day ? "border-destructive" : ""}>
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
        <Select value={year} onValueChange={handleYearChange}>
          <SelectTrigger className={error && !year ? "border-destructive" : ""}>
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
