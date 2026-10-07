import type { FieldValues, UseFormRegister } from "react-hook-form";

const baseInputClass =
  "w-full rounded-lg border border-kubi-gray-300 bg-kubi-white px-3.5 py-2.5 text-sm text-kubi-black placeholder:text-kubi-gray-300 focus:border-kubi-black focus:outline-none";

/** Forma mínima que todo erro de campo do react-hook-form tem (inclusive campos "merge"d de coerção numérica). */
type MinimalFieldError = { message?: string };

function ErrorText({ error }: { error?: MinimalFieldError }) {
  if (!error?.message) return null;
  return (
    <p className="mt-1 text-xs text-red-600" role="alert">
      {error.message}
    </p>
  );
}

type FieldWrapperProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: MinimalFieldError;
  children: React.ReactNode;
  hint?: string;
};

export function FieldWrapper({ label, htmlFor, required, error, children, hint }: FieldWrapperProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-kubi-black">
        {label}
        {required && <span aria-hidden="true" className="text-kubi-orange-dark"> *</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-kubi-gray">{hint}</p>}
      <ErrorText error={error} />
    </div>
  );
}

export const inputClassName = baseInputClass;

/** Campo honeypot: invisível para humanos, mas preenchido por bots de spam. */
export function HoneypotField<T extends FieldValues>({
  register,
}: {
  register: UseFormRegister<T>;
}) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
      <label htmlFor="website">Não preencha este campo</label>
      <input
        id="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...register("honeypot" as import("react-hook-form").Path<T>)}
      />
    </div>
  );
}
