"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

type User = { id: number; username: string; email: string; birth_date: string | null };

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) { router.push("/login"); return; }

    fetch(`${API}/accounts/me/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => { if (!r.ok) throw new Error("Unauthorized"); return r.json(); })
      .then(setUser)
      .catch(() => { router.push("/login"); });
  }, [router]);

  async function handleLogout() {
    const access  = localStorage.getItem("access_token")  ?? "";
    const refresh = localStorage.getItem("refresh_token") ?? "";
    await fetch(`${API}/accounts/logout/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${access}` },
      body: JSON.stringify({ refresh }),
    }).catch(() => {});
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/login");
  }

  if (!user) return (
    <main style={styles.page}>
      <p style={{ color: "#888", fontFamily: "sans-serif" }}>Loading…</p>
    </main>
  );

  const initials = user.username.slice(0, 2).toUpperCase();

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.avatar}>{initials}</div>
          <div>
            <h1 style={styles.name}>{user.username}</h1>
            <p style={styles.email}>{user.email}</p>
          </div>
          <button onClick={handleLogout} style={styles.logoutBtn}>Sign out</button>
        </div>

        {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}

        <div style={styles.grid}>
          <div style={styles.stat}>
            <span style={styles.statLabel}>User ID</span>
            <span style={styles.statVal}>#{user.id}</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Birth date</span>
            <span style={styles.statVal}>{user.birth_date ?? "—"}</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Status</span>
            <span style={{ ...styles.statVal, color: "#2e7d32" }}>Active ✓</span>
          </div>
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f4f0",
    fontFamily: "'Georgia', serif",
  },
  card: {
    background: "#fff",
    border: "1px solid #e2e0d8",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "480px",
    boxShadow: "0 2px 24px rgba(0,0,0,0.06)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "32px",
  },
  avatar: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: "#0f0f0f",
    color: "#e8ff5a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "700",
    fontFamily: "'Helvetica Neue', sans-serif",
    flexShrink: 0,
  },
  name: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#0f0f0f",
    margin: "0 0 2px",
    letterSpacing: "-0.3px",
  },
  email: {
    fontSize: "13px",
    color: "#888",
    margin: 0,
    fontFamily: "'Helvetica Neue', sans-serif",
  },
  logoutBtn: {
    marginLeft: "auto",
    padding: "8px 16px",
    background: "transparent",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#555",
    flexShrink: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "12px",
  },
  stat: {
    background: "#f9f8f5",
    border: "1px solid #e8e6de",
    borderRadius: "10px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  statLabel: {
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: "#999",
    fontFamily: "'Helvetica Neue', sans-serif",
  },
  statVal: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#0f0f0f",
    fontFamily: "'Helvetica Neue', sans-serif",
  },
};
