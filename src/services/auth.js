/**
 * Lightweight client-side access gate.
 *
 * This is NOT production authentication. It prevents casual public access
 * to the dashboard while the project is hosted on Vercel's free tier, which
 * does not include password protection. Real security would require
 * server-side authentication (JWT, OAuth, etc.).
 */

const SESSION_KEY = "rovers_auth";

export function isAuthenticated() {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}

export function login(password) {
  const correct = import.meta.env.VITE_DASHBOARD_PASSWORD;
  if (!correct) {
    console.warn("VITE_DASHBOARD_PASSWORD is not set.");
    return false;
  }
  if (password === correct) {
    sessionStorage.setItem(SESSION_KEY, "true");
    return true;
  }
  return false;
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}
