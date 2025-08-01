// utils/auth.ts
export function isAdmin() {
  const token = localStorage.getItem("auth_token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return token && user?.role === "admin";
}