export default function Button({
  children,
  variant = "default",
  className = "",
  ...props
}) {
  const v =
    variant === "primary"
      ? "ds-btn ds-btn--primary"
      : variant === "danger"
        ? "ds-btn ds-btn--danger"
        : "ds-btn";

  return (
    <button className={`${v} ${className}`} {...props}>
      {children}
    </button>
  );
}
