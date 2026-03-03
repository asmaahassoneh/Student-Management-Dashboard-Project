import axios from "axios";
 
const LS_TOKEN = "student_portal_token_v1";
const LS_CURRENT_USER = "student_portal_user_v2";

const PRIMARY = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";
const FALLBACK =
  import.meta.env.VITE_FALLBACK_API_BASE_URL ?? "http://localhost:3001";

function getToken() {
  return localStorage.getItem(LS_TOKEN);
}

export function setToken(token) {
  if (!token) localStorage.removeItem(LS_TOKEN);
  else localStorage.setItem(LS_TOKEN, token);
}

export function clearAuthStorage() {
  localStorage.removeItem(LS_TOKEN);
  localStorage.removeItem(LS_CURRENT_USER);
}

export const api = axios.create({
  baseURL: PRIMARY,
  timeout: 15000,
});

export const fallbackApi = axios.create({
  baseURL: FALLBACK,
  timeout: 15000,
});

function attachAuthInterceptor(client) {
  client.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  client.interceptors.response.use(
    (res) => res,
    (error) => {
      const status = error?.response?.status;

      if (status === 401) {
        clearAuthStorage();
        window.location.href = "/login";
      }
      return Promise.reject(error);
    },
  );
}

attachAuthInterceptor(api);
attachAuthInterceptor(fallbackApi);

export async function requestWithFallback(fnPrimary, fnFallback) {
  try {
    return await fnPrimary(api);
  } catch (e) {
    const isNetwork =
      !e?.response &&
      (e?.code === "ECONNABORTED" || e?.message?.includes("Network"));
    if (!isNetwork) throw e;
    return await fnFallback(fallbackApi);
  }
}
