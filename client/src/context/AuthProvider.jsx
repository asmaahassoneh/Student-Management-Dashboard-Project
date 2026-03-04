import { useMemo, useState, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { authApi } from "../services/authApi";
import { setToken } from "../services/api";

const LS_CURRENT_USER = "student_portal_user_v2";
const LS_TOKEN = "student_portal_token_v1";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(LS_CURRENT_USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      localStorage.removeItem(LS_CURRENT_USER);
      return null;
    }
  });

  const [token, setTokenState] = useState(() => localStorage.getItem(LS_TOKEN));
  const register = useCallback(async ({ username, email, password }) => {
    const res = await authApi.register({ username, email, password });
    return res.data;
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const res = await authApi.login({ email, password });

    const nextToken = res.data?.token;
    const nextUser = res.data?.user;

    if (!nextToken || !nextUser) {
      throw new Error("Login response missing token or user");
    }

    setToken(nextToken);
    setTokenState(nextToken);

    setUser(nextUser);
    localStorage.setItem(LS_CURRENT_USER, JSON.stringify(nextUser));

    return nextUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(LS_CURRENT_USER);
    localStorage.removeItem(LS_TOKEN);
    setToken(null);
    setTokenState(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!user,
      register,
      login,
      logout,
    }),
    [user, token, register, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
