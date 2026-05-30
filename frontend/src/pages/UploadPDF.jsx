import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import API from "../services/api";

export default function UploadPDF() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleFile = (f) => {
    if (!f || f.type !== "application/pdf") return setError("Please select a PDF file.");
    setFile(f);
    setError("");
    setStatus("idle");
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus("uploading");
    setProgress(0);
    const data = new FormData();
    data.append("file", file);
    data.append("title", file.name.replace(".pdf", ""));
    try {
      await API.post("/upload/", data, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => setProgress(Math.round((e.loaded / e.total) * 100)),
      });
      setStatus("success");
      setProgress(100);
      
      setTimeout(() => {
        navigate('/chat');
      }, 1500);
      
    } catch (e) {
      setStatus("error");
      setError(e.response?.data?.detail || "Upload failed. Try again.");
    }
  };

  const reset = () => {
    setFile(null);
    setStatus("idle");
    setProgress(0);
    setError("");
  };

  return (
    <AppLayout>
      <div style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        padding: "40px",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: 700, width: "100%" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h1 style={{
              color: "#e5e5e5",
              fontSize: 36,
              fontWeight: 700,
              margin: "0 0 12px",
              letterSpacing: "-1px",
              fontFamily: "'Inter', sans-serif",
            }}>
              Upload Document
            </h1>
            <p style={{
              color: "#666",
              fontSize: 15,
              margin: 0,
            }}>
              Add PDFs to your knowledge base
            </p>
          </div>

          {/* Drop Zone */}
          <div
            onClick={() => !file && inputRef.current.click()}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
            style={{
              border: `2px dashed ${
                dragging ? "#20b8cd" :
                file ? "#20b8cd" :
                "#1a1a1a"
              }`,
              borderRadius: 20,
              padding: "60px 48px",
              textAlign: "center",
              cursor: file ? "default" : "pointer",
              background: dragging
                ? "rgba(32,184,205,0.05)"
                : file
                ? "rgba(32,184,205,0.03)"
                : "#0a0a0a",
              transition: "all 0.3s",
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf"
              style={{ display: "none" }}
              onChange={e => handleFile(e.target.files[0])}
            />

            {!file ? (
              <>
                <div style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "rgba(32,184,205,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  margin: "0 auto 20px",
                }}>
                  📄
                </div>
                <p style={{
                  color: "#e5e5e5",
                  fontSize: 18,
                  fontWeight: 600,
                  margin: "0 0 8px",
                }}>
                  Drop your PDF here
                </p>
                <p style={{
                  color: "#666",
                  fontSize: 13,
                  margin: "0 0 24px",
                }}>
                  or click to browse
                </p>
                <div style={{
                  display: "inline-flex",
                  padding: "12px 28px",
                  background: "linear-gradient(135deg, #20b8cd 0%, #1e90ff 100%)",
                  border: "none",
                  borderRadius: 12,
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  boxShadow: "0 4px 16px rgba(32,184,205,0.3)",
                  cursor: "pointer",
                }}>
                  Select File
                </div>
              </>
            ) : (
              <div>
                <div style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #20b8cd 0%, #1e90ff 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  margin: "0 auto 20px",
                  boxShadow: "0 8px 24px rgba(32,184,205,0.3)",
                }}>
                  📑
                </div>
                <p style={{
                  color: "#e5e5e5",
                  fontSize: 16,
                  fontWeight: 600,
                  margin: "0 0 6px",
                }}>
                  {file.name}
                </p>
                <p style={{
                  color: "#666",
                  fontSize: 13,
                  margin: "0 0 20px",
                }}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                {status !== "uploading" && status !== "success" && (
                  <button
                    onClick={e => { e.stopPropagation(); reset(); }}
                    style={{
                      background: "transparent",
                      border: "1px solid #333",
                      color: "#888",
                      borderRadius: 10,
                      padding: "8px 20px",
                      cursor: "pointer",
                      fontSize: 13,
                      transition: "all 0.2s",
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {status === "uploading" && (
            <div style={{ marginTop: 24 }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
              }}>
                <span style={{ color: "#888", fontSize: 13 }}>Processing...</span>
                <span style={{ color: "#20b8cd", fontSize: 13, fontWeight: 600 }}>{progress}%</span>
              </div>
              <div style={{
                height: 6,
                background: "#1a1a1a",
                borderRadius: 3,
                overflow: "hidden",
              }}>
                <div style={{
                  height: "100%",
                  borderRadius: 3,
                  background: "linear-gradient(90deg, #20b8cd 0%, #1e90ff 100%)",
                  width: `${progress}%`,
                  transition: "width 0.3s",
                }} />
              </div>
            </div>
          )}

          {/* Success */}
          {status === "success" && (
            <div style={{
              marginTop: 24,
              padding: "16px 20px",
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.3)",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}>
              <span style={{ fontSize: 20 }}>✓</span>
              <div>
                <p style={{ color: "#10b981", fontSize: 14, fontWeight: 600, margin: 0 }}>
                  Upload successful!
                </p>
                <p style={{ color: "#666", fontSize: 12, margin: "2px 0 0" }}>
                  Redirecting...
                </p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <p style={{
              color: "#ff6b6b",
              fontSize: 13,
              marginTop: 20,
              padding: "12px 16px",
              background: "rgba(255,107,107,0.1)",
              borderRadius: 10,
              border: "1px solid rgba(255,107,107,0.2)",
            }}>
              {error}
            </p>
          )}

          {/* Upload Button */}
          {file && status === "idle" && (
            <div style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 24,
            }}>
              <button
                onClick={handleUpload}
                style={{
                  padding: "14px 40px",
                  background: "linear-gradient(135deg, #20b8cd 0%, #1e90ff 100%)",
                  border: "none",
                  borderRadius: 12,
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(32,184,205,0.3)",
                  transition: "all 0.3s",
                }}
              >
                Upload & Process
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}