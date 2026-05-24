const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export async function loginUser(username: string, password: string) {
  const res = await fetch(`${API}/accounts/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json(); // { access, refresh }
}

export async function getMe(token: string) {
  const res = await fetch(`${API}/accounts/me/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

export async function logoutUser(refresh: string, access: string) {
  await fetch(`${API}/accounts/logout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
    body: JSON.stringify({ refresh }),
  });
}