import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import bgImage from "../assets/main.png";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.username || !form.password) return setError("Fill in all fields.");
    setLoading(true);
    setError("");
    try {
      console.log(form);
      const res = await API.post("/login/", form);
      login(res.data.access, { username: form.username });
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials. Try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      display: "flex",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Left Panel - Add your background image here */}
      <div style={{
        flex: 1,
        background: `
          linear-gradient(135deg, rgba(32,184,205,0.05) 0%, rgba(30,144,255,0.03) 100%),
          url(${bgImage}) center/cover
        `,
        /* Replace 'YOUR_IMAGE_URL_HERE' with your image path */
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Gradient Overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
        }} />
        
        {/* Content */}
        <div style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "40px",
        }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #20b8cd 0%, #1e90ff 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            color: "#fff",
            fontWeight: 800,
            margin: "0 auto 24px",
            boxShadow: "0 16px 48px rgba(32,184,205,0.4)",
          }}>
            ∞
          </div>
          
          <h1 style={{
            color: "#fff",
            fontSize: 48,
            fontWeight: 700,
            margin: "0 0 16px",
            letterSpacing: "-1.5px",
            textShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}>
            Research AI
          </h1>
          
          <p style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: 18,
            maxWidth: 400,
            lineHeight: 1.6,
            margin: "0 auto",
          }}>
            Transform your documents into insights with AI-powered intelligence
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div style={{
        width: 520,
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 48px",
        borderLeft: "1px solid #1a1a1a",
      }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
          <h2 style={{
            color: "#e5e5e5",
            fontSize: 32,
            fontWeight: 700,
            margin: "0 0 12px",
            letterSpacing: "-0.8px",
          }}>
            Login
          </h2>
          
          <p style={{
            color: "#666",
            fontSize: 15,
            margin: "0 0 40px",
          }}>
            Enter your credentials to access your account
          </p>

          {/* Email Field */}
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: "block",
              color: "#999",
              fontSize: 13,
              fontWeight: 500,
              marginBottom: 10,
            }}>
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              style={{
                width: "100%",
                padding: "16px 18px",
                background: "#000",
                border: "1px solid #1a1a1a",
                borderRadius: 14,
                color: "#e5e5e5",
                fontSize: 15,
                outline: "none",
                boxSizing: "border-box",
                transition: "all 0.2s",
                fontFamily: "'Inter', sans-serif",
              }}
              onFocus={e => {
                e.target.style.borderColor = "#20b8cd";
                e.target.style.boxShadow = "0 0 0 4px rgba(32,184,205,0.1)";
              }}
              onBlur={e => {
                e.target.style.borderColor = "#1a1a1a";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}>
              <label style={{
                color: "#999",
                fontSize: 13,
                fontWeight: 500,
              }}>
                Password
              </label>
              <a href="#" style={{
                color: "#20b8cd",
                fontSize: 13,
                textDecoration: "none",
              }}>
                Forgot?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              style={{
                width: "100%",
                padding: "16px 18px",
                background: "#000",
                border: "1px solid #1a1a1a",
                borderRadius: 14,
                color: "#e5e5e5",
                fontSize: 15,
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "'Inter', sans-serif",
              }}
              onFocus={e => {
                e.target.style.borderColor = "#20b8cd";
                e.target.style.boxShadow = "0 0 0 4px rgba(32,184,205,0.1)";
              }}
              onBlur={e => {
                e.target.style.borderColor = "#1a1a1a";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {error && (
            <p style={{
              color: "#ff6b6b",
              fontSize: 14,
              marginBottom: 24,
              padding: "14px 18px",
              background: "rgba(255,107,107,0.1)",
              borderRadius: 12,
              border: "1px solid rgba(255,107,107,0.2)",
            }}>
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              background: loading
                ? "#1a1a1a"
                : "linear-gradient(135deg, #20b8cd 0%, #1e90ff 100%)",
              border: "none",
              borderRadius: 14,
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s",
              boxShadow: loading ? "none" : "0 8px 24px rgba(32,184,205,0.35)",
            }}
            onMouseEnter={e => !loading && (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          {/* Register Link */}
          <p style={{
            color: "#666",
            fontSize: 14,
            textAlign: "center",
            marginTop: 32,
          }}>
            Not a member?{" "}
            <Link to="/register" style={{
              color: "#20b8cd",
              textDecoration: "none",
              fontWeight: 600,
            }}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}