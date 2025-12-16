/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Controller,
  Control,
  FieldError as RHFFieldError,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

interface FormFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

export function FormField({
  control,
  name,
  label,
  type = "text",
  placeholder,
}: FormFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Input
            {...field}
            id={name}
            type={type}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder || label}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
