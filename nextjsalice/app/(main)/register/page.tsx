"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "", email: "", password: "", password2: "",
  });
  const [error, setError]   = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError({});
    setLoading(true);
    try {
      const res = await fetch(`${API}/accounts/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data);
        return;
      }
      router.push("/login?registered=1");
    } catch {
      setError({ non_field_errors: ["Network error — is Django running?"] });
    } finally {
      setLoading(false);
    }
  }

  const fields: { key: keyof typeof form; label: string; type: string; placeholder: string }[] = [
    { key: "username",  label: "Username",         type: "text",     placeholder: "alice" },
    { key: "email",     label: "Email",            type: "email",    placeholder: "alice@example.com" },
    { key: "password",  label: "Password",         type: "password", placeholder: "••••••••" },
    { key: "password2", label: "Confirm password", type: "password", placeholder: "••••••••" },
  ];

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

        <h1 style={styles.title}>Create account</h1>
        <p style={styles.sub}>Get started — it only takes a moment</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {fields.map(({ key, label, type, placeholder }) => (
            <div key={key} style={styles.fieldWrap}>
              <label style={styles.label}>{label}</label>
              <input
                style={{
                  ...styles.input,
                  borderColor: error[key] ? "#e74c3c" : "#ddd",
                }}
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={e => set(key, e.target.value)}
                required
                autoComplete={key === "password2" ? "new-password" : key}
              />
              {error[key] && (
                <span style={styles.fieldError}>{error[key][0]}</span>
              )}
            </div>
          ))}

          {error.non_field_errors && (
            <p style={styles.errorBox}>{error.non_field_errors[0]}</p>
          )}
          {error.password && !error.password2 && (
            <p style={styles.errorBox}>{error.password[0]}</p>
          )}

          <button
            type="submit"
            style={{ ...styles.btn, opacity: loading ? 0.6 : 1 }}
            disabled={loading}
          >
            {loading ? "Creating account…" : "Create account →"}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <a href="/login" style={styles.link}>Sign in</a>
        </p>
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
    margin: "0 0 32px",
    fontFamily: "'Helvetica Neue', sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  fieldWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
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
  fieldError: {
    fontSize: "12px",
    color: "#c0392b",
    fontFamily: "'Helvetica Neue', sans-serif",
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
