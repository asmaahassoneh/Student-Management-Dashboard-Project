import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import PasswordInput from "../components/PasswordInput";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const defaultPath = "/";
  const from = location.state?.from || defaultPath;

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      setLoading(true);
      await login(form);
      navigate(from, { replace: true });
    } catch (error) {
      setErr(error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authPage">
      <div className="authGlow" />
      <div className="authNoise" />

      <div className="authCard authCardEnter">
        <div className="authTop">
          <div className="authBadge">Welcome back</div>
          <h2 className="authTitle">Login</h2>
          <p className="authSub">Access your account securely.</p>
        </div>

        <form className="authForm" onSubmit={handleSubmit}>
          <div className="field fieldEnter" style={{ animationDelay: "80ms" }}>
            <input
              className="authInput"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <span className="fieldGlow" />
          </div>

          <div className="field fieldEnter" style={{ animationDelay: "140ms" }}>
            <div className="authPasswordWrap">
              <PasswordInput
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                autoComplete="current-password"
                required
              />
            </div>
            <span className="fieldGlow" />
          </div>

          <button
            className="authBtn authBtnEnter"
            type="submit"
            disabled={loading}
          >
            <span className="btnShine" />
            {loading ? "Signing in..." : "Login"}
          </button>

          {!!err && <p className="authMsg authErr">❌ {err}</p>}
        </form>
      </div>
    </div>
  );
}
