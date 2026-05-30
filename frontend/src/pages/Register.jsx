import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import bgImage from "../assets/main.png";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.username || !form.password || !form.confirmPassword) {
      return setError("All fields are required.");
    }
    if (form.password !== form.confirmPassword) {
      return setError("Passwords don't match.");
    }
    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }
    
    setLoading(true);
    setError("");
    try {
      await API.post("/register/", {
        username: form.username,
        password: form.password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.username?.[0] || "Registration failed. Try again.");
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
      {/* Left Panel - Background Image */}
      <div style={{
        flex: 1,
        background: `
          linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%),
          url(${bgImage}) center/cover
        `,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Back to Home Button */}
        <button
          onClick={() => navigate("/")}
          style={{
            position: "absolute",
            top: 32,
            left: 32,
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 12,
            padding: "10px 20px",
            color: "#fff",
            fontSize: 14,
            cursor: "pointer",
            backdropFilter: "blur(10px)",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 500,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.15)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
          }}
        >
          ← Back to Home
        </button>

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
            Join Research AI
          </h1>
          
          <p style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: 18,
            maxWidth: 400,
            lineHeight: 1.6,
            margin: "0 auto",
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}>
            Start your journey with intelligent document analysis
          </p>
        </div>
      </div>

      {/* Right Panel - Register Form */}
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
            Create Account
          </h2>
          
          <p style={{
            color: "#666",
            fontSize: 15,
            margin: "0 0 40px",
          }}>
            Get started with your free account
          </p>

          {/* Username Field */}
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
              placeholder="Choose a username"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
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
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: "block",
              color: "#999",
              fontSize: 13,
              fontWeight: 500,
              marginBottom: 10,
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
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

          {/* Confirm Password Field */}
          <div style={{ marginBottom: 32 }}>
            <label style={{
              display: "block",
              color: "#999",
              fontSize: 13,
              fontWeight: 500,
              marginBottom: 10,
            }}>
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
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

          {/* Register Button */}
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
            {loading ? "Creating account..." : "Create Account"}
          </button>

          {/* Login Link */}
          <p style={{
            color: "#666",
            fontSize: 14,
            textAlign: "center",
            marginTop: 32,
          }}>
            Already have an account?{" "}
            <Link to="/login" style={{
              color: "#20b8cd",
              textDecoration: "none",
              fontWeight: 600,
            }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}