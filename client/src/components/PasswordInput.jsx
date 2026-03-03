import { useId, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordInput({
  name,
  register,
  value,
  onChange,
  placeholder = "Password",
  label,
  required = true,
  error,
  disabled = false,
  autoComplete,
}) {
  const inputId = useId();
  const [show, setShow] = useState(false);

  const hasError = !!error;

  const inputProps =
    typeof register === "function"
      ? { ...register(name) }
      : { name, value: value ?? "", onChange };

  return (
    <div style={{ display: "grid", gap: "6px" }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{ color: "rgba(255,255,255,0.85)", fontSize: 14 }}
        >
          {label}
        </label>
      )}

      <div className={`password-wrapper ${hasError ? "password-error" : ""}`}>
        <input
          id={inputId}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          {...inputProps}
        />

        <button
          type="button"
          className="eye-icon-btn"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          disabled={disabled}
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {hasError && <p className="field-error">{error.message}</p>}
    </div>
  );
}
