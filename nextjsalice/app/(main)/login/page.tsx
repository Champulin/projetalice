"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);

  useEffect(() => {
    if (params.get("registered") === "1") setSuccess(true);
  }, [params]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/accounts/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.detail ?? "Invalid credentials");
      }
      const { access, refresh } = await res.json();
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logoWrap}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="10" fill="#0f0f0f"/>
            <path d="M10 26 L18 10 L26 26" stroke="#e8ff5a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="13" y1="20" x2="23" y2="20" stroke="#e8ff5a" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>

        <h1 style={styles.title}>Welcome back</h1>
        <p style={styles.sub}>Sign in to your account</p>

        {success && (
          <p style={styles.successBox}>
            ✓ Account created — you can sign in now
          </p>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Username</label>
            <input
              style={styles.input}
              type="text"
              placeholder="alice"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div style={styles.fieldWrap}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && <p style={styles.errorBox}>{error}</p>}

          <button
            type="submit"
            style={{ ...styles.btn, opacity: loading ? 0.6 : 1 }}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in →"}
          </button>
        </form>

        <p style={styles.footer}>
          No account?{" "}
          <a href="/register" style={styles.link}>Register here</a>
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
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
    background: "#ffffff",
    border: "1px solid #e2e0d8",
    borderRadius: "16px",
    padding: "48px 44px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 2px 24px rgba(0,0,0,0.06)",
  },
  logoWrap: { marginBottom: "28px" },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#0f0f0f",
    margin: "0 0 6px",
    letterSpacing: "-0.5px",
  },
  sub: {
    fontSize: "14px",
    color: "#888",
    margin: "0 0 24px",
    fontFamily: "'Helvetica Neue', sans-serif",
  },
  successBox: {
    fontSize: "13px",
    color: "#1a7f37",
    background: "#eafaf0",
    border: "1px solid #b7e4c7",
    borderRadius: "6px",
    padding: "10px 12px",
    marginBottom: "16px",
    fontFamily: "'Helvetica Neue', sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  fieldWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#555",
    fontFamily: "'Helvetica Neue', sans-serif",
  },
  input: {
    padding: "11px 14px",
    fontSize: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    outline: "none",
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#0f0f0f",
    background: "#fafaf8",
  },
  errorBox: {
    fontSize: "13px",
    color: "#c0392b",
    background: "#fdf0ee",
    border: "1px solid #f5c6c0",
    borderRadius: "6px",
    padding: "10px 12px",
    margin: "0",
    fontFamily: "'Helvetica Neue', sans-serif",
  },
  btn: {
    marginTop: "6px",
    padding: "13px",
    background: "#0f0f0f",
    color: "#e8ff5a",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.01em",
  },
  footer: {
    marginTop: "24px",
    textAlign: "center",
    fontSize: "13px",
    color: "#888",
    fontFamily: "'Helvetica Neue', sans-serif",
  },
  link: {
    color: "#0f0f0f",
    fontWeight: "600",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  },
};
