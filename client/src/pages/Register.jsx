import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation/registerSchema";

import Input from "../components/form/Input";
import PasswordInput from "../components/PasswordInput";

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: { username: "", email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      reset();
      navigate("/login", { replace: true });
    } catch (e) {
      setError("root", { message: e?.message || "Register failed" });
    }
  };

  return (
    <div className="authPage">
      <div className="authGlow" />
      <div className="authNoise" />

      <div className="authCard authCardEnter">
        <div className="authTop">
          <div className="authBadge">Create account</div>
          <h2 className="authTitle">Register</h2>
          <p className="authSub">Sign up to access the portal.</p>
        </div>

        <form className="authForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="field fieldEnter" style={{ animationDelay: "80ms" }}>
            <Input
              label="Username"
              name="username"
              placeholder="Username"
              register={register}
              error={errors.username}
            />
            <span className="fieldGlow" />
          </div>

          <div className="field fieldEnter" style={{ animationDelay: "140ms" }}>
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              register={register}
              error={errors.email}
            />
            <span className="fieldGlow" />
          </div>

          <div className="field fieldEnter" style={{ animationDelay: "200ms" }}>
            <div className="authPasswordWrap">
              <PasswordInput
                label="Password"
                name="password"
                placeholder="Password"
                autoComplete="new-password"
                register={register}
                error={errors.password}
              />
            </div>
            <span className="fieldGlow" />
          </div>

          <button
            className="authBtn authBtnEnter"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Register"}
          </button>

          {!!errors.root?.message && (
            <p className="authMsg authErr">❌ {errors.root.message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
