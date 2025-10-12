export default function Badge({ children, className = "", variant = "default" }) {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  return (
    <div className={`${base} border-transparent hover:bg-primary/80 ${className}`}>
      {children}
    </div>
  );
}