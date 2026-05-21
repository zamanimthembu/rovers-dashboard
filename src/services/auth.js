/**
 * Client-side stakeholder demo access layer.
 *
 * This is NOT production authentication. It provides stakeholder-specific
 * preview access while the frontend is hosted on Vercel's free tier, which
 * does not include server-side authentication. Real production security would
 * require server-side login, bcrypt-hashed passwords, protected API endpoints,
 * JWT tokens, and role-based access control enforced on the server.
 */

const SESSION_KEY = "rovers_user";

const STAKEHOLDER_ACCOUNTS = [
  {
    name: "Coach Derek",
    email: "derek@rovers.demo",
    role: "Head Coach",
    purpose: "Review team performance and coaching insights.",
    envKey: "VITE_COACH_DEREK_PASSWORD",
  },
  {
    name: "Zamani Mthembu",
    email: "zamani@rovers.demo",
    role: "Performance Analyst",
    purpose: "Code match events and maintain performance data.",
    envKey: "VITE_ZAMANI_PASSWORD",
  },
  {
    name: "Player Preview",
    email: "player@rovers.demo",
    role: "Player",
    purpose: "Review feedback and performance indicators.",
    envKey: "VITE_PLAYER_PASSWORD",
  },
  {
    name: "UCT Supervisor",
    email: "supervisor@uct.demo",
    role: "Academic Reviewer",
    purpose: "Review academic project progress and artefact alignment.",
    envKey: "VITE_UCT_SUPERVISOR_PASSWORD",
  },
  {
    name: "Club Management",
    email: "management@rovers.demo",
    role: "Project Sponsor",
    purpose: "Review organisational value and project progress.",
    envKey: "VITE_CLUB_MANAGEMENT_PASSWORD",
  },
];

export function login(email, password) {
  const account = STAKEHOLDER_ACCOUNTS.find(
    (a) => a.email.toLowerCase() === email.trim().toLowerCase()
  );
  if (!account) return false;

  const correct = import.meta.env[account.envKey];
  if (!correct) {
    console.warn(`${account.envKey} is not set in environment variables.`);
    return false;
  }
  if (password !== correct) return false;

  const { envKey: _removed, ...userToStore } = account;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(userToStore));
  return true;
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated() {
  return !!sessionStorage.getItem(SESSION_KEY);
}

export function getCurrentUser() {
  const raw = sessionStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}
