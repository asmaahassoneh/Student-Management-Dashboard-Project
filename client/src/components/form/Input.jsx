import ErrorMessage from "./ErrorMessage";

export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  register,
  value,
  onChange,
  error,
  step,
  min,
  max,
  autoComplete,
  required,
}) {
  const hasError = !!error;

  const inputProps =
    typeof register === "function"
      ? { ...register(name) }
      : { name, value: value ?? "", onChange };

  return (
    <div className="field">
      {label && (
        <label className="field-label" htmlFor={name}>
          {label}
        </label>
      )}

      <input
        id={name}
        className={`authInput ${hasError ? "input-error" : ""}`}
        type={type}
        placeholder={placeholder}
        step={step}
        min={min}
        max={max}
        autoComplete={autoComplete}
        required={required}
        {...inputProps}
      />

      <ErrorMessage error={error} />
    </div>
  );
}
