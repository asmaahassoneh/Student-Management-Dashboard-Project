export default function Alert({ children, variant = "default" }) {
  const v =
    variant === "error"
      ? "ds-alert ds-alert--error"
      : variant === "success"
        ? "ds-alert ds-alert--success"
        : variant === "warn"
          ? "ds-alert ds-alert--warn"
          : "ds-alert";

  return <div className={v}>{children}</div>;
}
