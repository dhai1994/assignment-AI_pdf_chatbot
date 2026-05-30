import Sidebar from "./Sidebar";

export default function AppLayout({ children, history, onChatClick }) {
  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "#000",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      <Sidebar history={history} onChatClick={onChatClick} />
      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "#000",
      }}>
        {children}
      </main>
    </div>
  );
}