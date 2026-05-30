import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NAV = [
  { icon: "⬡", label: "Dashboard", path: "/dashboard" },
  { icon: "↑", label: "Upload PDF", path: "/upload" },
  { icon: "◈", label: "Chat", path: "/chat" },
];

export default function Sidebar({ history = [], onChatClick }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleChatClick = (chatId) => {
    if (location.pathname !== "/chat") {
      navigate("/chat");
    }
    // Wait a bit for navigation, then trigger load
    setTimeout(() => {
      if (onChatClick) {
        onChatClick(chatId);
      }
    }, 100);
  };

  return (
    <aside
      style={{
        width: collapsed ? 72 : 280,
        minHeight: "100vh",
        background: "#0a0a0a",
        borderRight: "1px solid #1a1a1a",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s cubic-bezier(.4,0,.2,1)",
        overflow: "hidden",
        flexShrink: 0,
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Logo & Collapse Button */}
      <div style={{
        padding: "24px 20px 20px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        borderBottom: "1px solid #1a1a1a",
      }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #20b8cd 0%, #1e90ff 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          flexShrink: 0,
          fontWeight: 700,
          color: "#fff",
          boxShadow: "0 4px 16px rgba(32,184,205,0.25)",
        }}>
          ∞
        </div>
        {!collapsed && (
          <span style={{
            color: "#e5e5e5",
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: "-0.5px",
            whiteSpace: "nowrap",
          }}>
            Research AI
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            color: "#666",
            cursor: "pointer",
            fontSize: 18,
            padding: 6,
            flexShrink: 0,
            transition: "color 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#999"}
          onMouseLeave={e => e.currentTarget.style.color = "#666"}
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* New Chat Button */}
      <div style={{ padding: "20px 16px" }}>
        <button
          onClick={() => {
            navigate("/chat");
            window.location.reload(); // Force new chat
          }}
          style={{
            width: "100%",
            padding: collapsed ? "12px" : "14px 18px",
            background: "linear-gradient(135deg, #20b8cd 0%, #1e90ff 100%)",
            border: "none",
            borderRadius: 14,
            color: "#fff",
            cursor: "pointer",
            fontSize: 15,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 10,
            justifyContent: collapsed ? "center" : "flex-start",
            transition: "all 0.3s",
            boxShadow: "0 4px 16px rgba(32,184,205,0.25)",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(32,184,205,0.35)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(32,184,205,0.25)";
          }}
        >
          <span style={{ fontSize: 20, lineHeight: 1 }}>+</span>
          {!collapsed && <span>New Chat</span>}
        </button>
      </div>

      {/* Navigation */}
      <nav style={{ padding: "0 16px", flex: 1 }}>
        {!collapsed && (
          <p style={{
            color: "#666",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "1px",
            textTransform: "uppercase",
            padding: "0 4px 12px",
            margin: 0,
          }}>
            Navigation
          </p>
        )}
        {NAV.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                width: "100%",
                padding: collapsed ? "12px" : "12px 16px",
                marginBottom: 6,
                background: active ? "#141414" : "transparent",
                border: active ? "1px solid #20b8cd" : "1px solid transparent",
                borderRadius: 12,
                color: active ? "#20b8cd" : "#888",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: active ? 600 : 500,
                display: "flex",
                alignItems: "center",
                gap: 12,
                justifyContent: collapsed ? "center" : "flex-start",
                transition: "all 0.2s",
                textAlign: "left",
              }}
              onMouseEnter={e => {
                if (!active) {
                  e.currentTarget.style.background = "#0f0f0f";
                  e.currentTarget.style.color = "#ccc";
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#888";
                }
              }}
            >
              <span style={{ fontSize: 18, lineHeight: 1 }}>{item.icon}</span>
              {!collapsed && item.label}
            </button>
          );
        })}

        {/* Recent Chats - NOW CLICKABLE */}
        {!collapsed && history.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <p style={{
              color: "#666",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
              padding: "0 4px 12px",
              margin: 0,
            }}>
              Recent Chats
            </p>
            <div style={{
              overflowY: "auto",
              maxHeight: 240,
              scrollbarWidth: "thin",
              scrollbarColor: "#1a1a1a #0a0a0a",
            }}>
              {history.slice(0, 8).map((item, i) => (
                <div
                  key={item.id || i}
                  onClick={() => handleChatClick(item.id)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 10,
                    color: "#666",
                    fontSize: 13,
                    cursor: "pointer",
                    marginBottom: 4,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#0f0f0f";
                    e.currentTarget.style.color = "#ccc";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#666";
                  }}
                >
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#333",
                    flexShrink: 0,
                  }} />
                  {item.question || "Chat session"}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* User Profile */}
      <div style={{
        marginTop: "auto",
        padding: "16px",
        borderTop: "1px solid #1a1a1a",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: collapsed ? "10px" : "12px 14px",
          borderRadius: 14,
          background: "#0f0f0f",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "#141414"}
          onMouseLeave={e => e.currentTarget.style.background = "#0f0f0f"}
        >
          <div style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #20b8cd 0%, #1e90ff 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            fontWeight: 700,
            color: "#fff",
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(32,184,205,0.2)",
          }}>
            {user?.username?.[0]?.toUpperCase() || "U"}
          </div>
          {!collapsed && (
            <>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  color: "#e5e5e5",
                  fontSize: 14,
                  fontWeight: 600,
                  margin: 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                  {user?.username || "User"}
                </p>
                <p style={{
                  color: "#666",
                  fontSize: 12,
                  margin: 0,
                }}>
                  Free tier
                </p>
              </div>
              <button
                onClick={logout}
                style={{
                  background: "none",
                  border: "none",
                  color: "#666",
                  cursor: "pointer",
                  fontSize: 16,
                  padding: 4,
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#ff6b6b"}
                onMouseLeave={e => e.currentTarget.style.color = "#666"}
                title="Logout"
              >
                ⏻
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}