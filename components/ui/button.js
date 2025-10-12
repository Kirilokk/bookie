export default function Button({ type, className, children, variant = "default", ...props }) {
    const base = "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium disabled:pointer-events-none disabled:opacity-50";

    const variants = {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    }

    const variantClass = variants[variant] || variants["default"];

    return <>
        <button
            type={type}
            className={`${className} ${base} ${variantClass} `}
            {...props}>
            {children}
        </button>
    </>
}