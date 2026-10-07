export function FormSuccessMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="status"
      className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800"
    >
      {children}
    </div>
  );
}

export function FormErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="text-sm text-red-600">
      {children}
    </p>
  );
}
