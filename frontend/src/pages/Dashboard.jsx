import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

function StatCard({ icon, label, value, gradient }) {
  return (
    <div style={{
      background: "#0a0a0a",
      border: "1px solid #1a1a1a",
      borderRadius: 16,
      padding: "24px",
      transition: "all 0.3s",
      cursor: "pointer",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "#2a2a2a";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "#1a1a1a";
      }}
    >
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 12,
        background: gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
        marginBottom: 16,
        boxShadow: "0 4px 16px rgba(32,184,205,0.2)",
      }}>
        {icon}
      </div>
      <p style={{
        color: "#666",
        fontSize: 11,
        margin: "0 0 8px",
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        fontWeight: 600,
      }}>
        {label}
      </p>
      <p style={{
        color: "#e5e5e5",
        fontSize: 28,
        fontWeight: 700,
        margin: 0,
        letterSpacing: "-1px",
      }}>
        {value}
      </p>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [pdfCount, setPdfCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/chat-history/")
      .then(r => setHistory(Array.isArray(r.data) ? r.data : []))
      .catch(() => setHistory([]))
      .finally(() => setLoading(false));

    API.get("/documents/")
      .then(r => setPdfCount(Array.isArray(r.data) ? r.data.length : 0))
      .catch(() => setPdfCount(0));
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <AppLayout history={history}>
      <div style={{
        padding: "40px 56px",
        overflowY: "auto",
        flex: 1,
        background: "#000",
        minHeight: "100vh",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <p style={{
              color: "#666",
              fontSize: 14,
              margin: "0 0 8px",
              fontWeight: 500,
            }}>
              {greeting} 👋
            </p>
            <h1 style={{
              color: "#e5e5e5",
              fontSize: 32,
              fontWeight: 700,
              margin: 0,
              letterSpacing: "-1px",
            }}>
              {user?.username || "Researcher"}
            </h1>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 40,
          }}>
            <StatCard
              icon="📄"
              label="Documents"
              value={loading ? "..." : pdfCount}
              gradient="linear-gradient(135deg, #20b8cd 0%, #1e90ff 100%)"
            />
            <StatCard
              icon="💬"
              label="Conversations"
              value={loading ? "..." : history.length}
              gradient="linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)"
            />
            <StatCard
              icon="⚡"
              label="Model"
              value="RAG"
              gradient="linear-gradient(135deg, #10b981 0%, #14b8a6 100%)"
            />
          </div>

          {/* Quick Actions */}
          <div style={{ marginBottom: 40 }}>
            <h2 style={{
              color: "#999",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: 16,
            }}>
              Quick Actions
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
            }}>
              {[
                {
                  icon: "↑",
                  title: "Upload Document",
                  desc: "Add PDFs to your knowledge base",
                  path: "/upload",
                  gradient: "linear-gradient(135deg, #20b8cd 0%, #1e90ff 100%)",
                },
                {
                  icon: "◈",
                  title: "Start Research",
                  desc: "Ask questions about your documents",
                  path: "/chat",
                  gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                },
              ].map(action => (
                <button
                  key={action.path}
                  onClick={() => navigate(action.path)}
                  style={{
                    background: "#0a0a0a",
                    border: "1px solid #1a1a1a",
                    borderRadius: 16,
                    padding: "24px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "#2a2a2a";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#1a1a1a";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: action.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    marginBottom: 16,
                    color: "#fff",
                    boxShadow: "0 4px 16px rgba(32,184,205,0.2)",
                  }}>
                    {action.icon}
                  </div>
                  <p style={{
                    color: "#e5e5e5",
                    fontSize: 16,
                    fontWeight: 600,
                    margin: "0 0 6px",
                    letterSpacing: "-0.3px",
                  }}>
                    {action.title}
                  </p>
                  <p style={{
                    color: "#666",
                    fontSize: 13,
                    margin: 0,
                    lineHeight: 1.5,
                  }}>
                    {action.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Conversations */}
          {history.length > 0 && (
            <div>
              <h2 style={{
                color: "#999",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: 16,
              }}>
                Recent Conversations
              </h2>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}>
                {history.slice(0, 4).map((item, i) => (
                  <div
                    key={i}
                    onClick={() => navigate("/chat")}
                    style={{
                      background: "#0a0a0a",
                      border: "1px solid #1a1a1a",
                      borderRadius: 12,
                      padding: "14px 18px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "#2a2a2a";
                      e.currentTarget.style.background = "#0f0f0f";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "#1a1a1a";
                      e.currentTarget.style.background = "#0a0a0a";
                    }}
                  >
                    <div style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #20b8cd 0%, #1e90ff 100%)",
                      flexShrink: 0,
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        color: "#e5e5e5",
                        fontSize: 13,
                        margin: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontWeight: 500,
                      }}>
                        {item.question || "Chat session"}
                      </p>
                      {item.answer && (
                        <p style={{
                          color: "#666",
                          fontSize: 12,
                          margin: "4px 0 0",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>
                          {item.answer}
                        </p>
                      )}
                    </div>
                    <span style={{ color: "#444", fontSize: 14 }}>→</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}