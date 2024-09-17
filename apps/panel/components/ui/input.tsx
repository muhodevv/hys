import { InputHTMLAttributes, isValidElement, ReactElement, ReactNode } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { cn } from "@/lib/utils";

type InputProps<T extends FieldValues> =
  Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> & {
    name: Path<T>;
    label?: string;
    register: UseFormRegister<T>;
    error?: string;
    help?: string;
    suffix?: ReactNode;
    prefix?: ReactNode;
  };

export const Input = <T extends FieldValues>({
  label,
  register,
  error,
  name,
  help,
  suffix,
  prefix,
  ...rest
}: InputProps<T>) => (
  <div
    className={cn("n-field flex flex-col relative w-full", {
      "n-field--error": error,
    })}
  >
    <label className="n-field__label text-sm">{label}</label>
    <div className="n-field__input mt-2 mb-2 overflow-hidden flex items-center gap-x-2 border border-input bg-transparent focus-within:border-blue-500 focus-within:ring-blue-500 text-sm rounded-md bg-white">
      {isValidElement(prefix) && (
        <div className="text-black/60 pl-4 n-field__prefix">{prefix}</div>
      )}
      <input
        {...rest}
        className="flex h-9 w-full px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50"
        {...register(name)}
      />
      {suffix && (
        <div tabIndex={-1} className="text-black/60 pr-4 n-field__suffix">
          {suffix}
        </div>
      )}
      {error && (
        <div className="flex items-center pointer-events-none pr-3">
          <svg
            className="h-5 w-5 text-red-500"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
          </svg>
        </div>
      )}
    </div>
    {error && <p className="text-sm text-red-500">{error}</p>}
    {help && !error && <p className="text-sm text-slate-400">{help}</p>}
  </div>
);

Input.displayName = "Input";