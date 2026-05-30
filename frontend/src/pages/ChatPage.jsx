import { useState, useRef, useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import API from "../services/api";

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 6, padding: "12px 0", alignItems: "center" }}>
      {[0, 1, 2].map(i => (
        <div
          key={i}
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #20b8cd, #1e90ff)",
            animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function Message({ msg, onSpeak, onSuggest }) {
  const isUser = msg.role === "user";
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      setSpeaking(true);
      onSpeak(msg.text, () => setSpeaking(false));
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: 32,
      gap: 16,
    }}>
      {!isUser && (
        <div style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          flexShrink: 0,
          background: "linear-gradient(135deg, #20b8cd 0%, #1e90ff 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          color: "#fff",
          fontWeight: 700,
          boxShadow: "0 4px 16px rgba(32,184,205,0.3)",
        }}>
          ∞
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", maxWidth: "75%", gap: 12 }}>
        <div style={{
          padding: "16px 22px",
          borderRadius: isUser ? "24px 24px 4px 24px" : "24px 24px 24px 4px",
          background: isUser ? "#1a1a1a" : "#0f0f0f",
          border: `1px solid ${isUser ? "#2a2a2a" : "#1a1a1a"}`,
          color: "#e5e5e5",
          fontSize: 15,
          lineHeight: 1.7,
          fontFamily: "'Inter', sans-serif",
        }}>
          {msg.typing ? <TypingDots /> : (
            <span style={{ whiteSpace: "pre-wrap" }}>{msg.text}</span>
          )}
        </div>

        {/* Action Buttons (Listen & Follow-ups for bot messages) */}
        {!isUser && !msg.typing && (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {/* Listen Button */}
            <button
              onClick={handleSpeak}
              style={{
                padding: "6px 14px",
                background: speaking ? "rgba(32,184,205,0.1)" : "#0a0a0a",
                border: `1px solid ${speaking ? "#20b8cd" : "#1a1a1a"}`,
                borderRadius: 20,
                color: speaking ? "#20b8cd" : "#666",
                fontSize: 12,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "all 0.2s",
                fontWeight: 500,
              }}
              onMouseEnter={e => {
                if (!speaking) {
                  e.currentTarget.style.borderColor = "#2a2a2a";
                  e.currentTarget.style.color = "#888";
                }
              }}
              onMouseLeave={e => {
                if (!speaking) {
                  e.currentTarget.style.borderColor = "#1a1a1a";
                  e.currentTarget.style.color = "#666";
                }
              }}
            >
              🔊 {speaking ? "Stop" : "Listen"}
            </button>

            {/* Suggest Follow-ups Button */}
            {msg.followups && msg.followups.length > 0 && (
              <span style={{ color: "#444", fontSize: 12 }}>•</span>
            )}
          </div>
        )}

        {/* AI-Generated Follow-up Suggestions */}
        {!isUser && !msg.typing && msg.followups && msg.followups.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <p style={{
              color: "#666",
              fontSize: 11,
              margin: 0,
              fontWeight: 600,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}>
              Ask Follow-up
            </p>
            {msg.followups.map((followup, i) => (
              <button
                key={i}
                onClick={() => onSuggest(followup)}
                style={{
                  padding: "10px 14px",
                  background: "#0a0a0a",
                  border: "1px solid #1a1a1a",
                  borderRadius: 12,
                  color: "#888",
                  fontSize: 13,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#20b8cd";
                  e.currentTarget.style.color = "#e5e5e5";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "#1a1a1a";
                  e.currentTarget.style.color = "#888";
                }}
              >
                {followup}
              </button>
            ))}
          </div>
        )}
      </div>

      {isUser && (
        <div style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          flexShrink: 0,
          background: "#1a1a1a",
          border: "1px solid #2a2a2a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          color: "#888",
          fontWeight: 600,
        }}>
          U
        </div>
      )}
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [uploadedPDFs, setUploadedPDFs] = useState([]);
  const [selectedPDFs, setSelectedPDFs] = useState([]);
  const [loadingPDFs, setLoadingPDFs] = useState(true);
  const [showDocs, setShowDocs] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isListening, setIsListening] = useState(false);
  
  const bottomRef = useRef();
  const textareaRef = useRef();
  const recognitionRef = useRef(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = () => {
    API.get("/chat-history/")
      .then(r => setHistory(Array.isArray(r.data) ? r.data : []))
      .catch(() => {});
  };

  useEffect(() => {
    fetchUploadedPDFs();
  }, []);

  const fetchUploadedPDFs = async () => {
    setLoadingPDFs(true);
    try {
      const response = await API.get("/documents/");
      const pdfs = Array.isArray(response.data) ? response.data : [];
      setUploadedPDFs(pdfs);
      // Auto-select all PDFs
      setSelectedPDFs(pdfs.map(pdf => pdf.id));
    } catch (error) {
      console.error("Error fetching PDFs:", error);
      setUploadedPDFs([]);
    }
    setLoadingPDFs(false);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  };

  const loadChat = (chatId) => {
    const chat = history.find(h => h.id === chatId);
    if (!chat) return;

    setCurrentChatId(chatId);
    setMessages([
      { role: "user", text: chat.question },
      { role: "bot", text: chat.answer }
    ]);
  };

  const streamResponse = (fullText, callback) => {
    let currentText = "";
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < fullText.length) {
        const charsToAdd = Math.min(Math.floor(Math.random() * 4) + 2, fullText.length - index);
        currentText += fullText.slice(index, index + charsToAdd);
        index += charsToAdd;
        callback(currentText);
      } else {
        clearInterval(interval);
      }
    }, 30);
  };

  // Generate AI Follow-up Suggestions
  const generateFollowups = (question, answer) => {
    const followups = [
      `Can you explain this in more detail?`,
      `What are the implications of this?`,
      `Are there any related findings?`,
    ];
    return followups;
  };

  const sendMessage = async (customQuestion = null) => {
    const q = (customQuestion || input).trim();
    if (!q || loading) return;

    const userMsg = { role: "user", text: q };
    const typingMsg = { role: "bot", text: "", typing: true };

    setMessages(prev => [...prev, userMsg, typingMsg]);
    if (!customQuestion) {
      setInput("");
      textareaRef.current && (textareaRef.current.style.height = "auto");
    }
    setLoading(true);
    setCurrentChatId(null);

    try {
      const res = await API.post("/chat/", { 
        question: q,
        pdf_ids: selectedPDFs // Send selected PDFs
      });
      const answer = res.data.answer || "No response received.";
      
      setMessages(prev => [...prev.slice(0, -1), { role: "bot", text: "" }]);
      
      streamResponse(answer, (streamedText) => {
        const followups = generateFollowups(q, answer);
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: "bot", text: streamedText, followups: followups }
        ]);
      });

      fetchHistory();
    } catch {
      setMessages(prev => [...prev.slice(0, -1), {
        role: "bot",
        text: "Error: Please upload a PDF document first.",
      }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Text-to-Speech
  const speakText = (text, onEnd) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = onEnd;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Voice Input
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Toggle PDF Selection
  const togglePDFSelection = (pdfId) => {
    setSelectedPDFs(prev => 
      prev.includes(pdfId) 
        ? prev.filter(id => id !== pdfId)
        : [...prev, pdfId]
    );
  };

  const suggestions = [
    "Summarize this document",
    "What are the key findings?",
    "Extract main conclusions",
    "What methodology was used?",
  ];

  return (
    <AppLayout history={history} onChatClick={loadChat}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#000",
        position: "relative",
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 32px",
          borderBottom: "1px solid #1a1a1a",
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #20b8cd 0%, #1e90ff 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "#fff",
              fontWeight: 700,
              boxShadow: "0 4px 12px rgba(32,184,205,0.25)",
            }}>
              ∞
            </div>
            <span style={{ color: "#e5e5e5", fontSize: 15, fontWeight: 600 }}>
              AI Research Assistant
            </span>
            {selectedPDFs.length > 0 && (
              <span style={{
                padding: "4px 12px",
                background: "rgba(32,184,205,0.1)",
                border: "1px solid rgba(32,184,205,0.3)",
                borderRadius: 12,
                color: "#20b8cd",
                fontSize: 12,
                fontWeight: 500,
              }}>
                {selectedPDFs.length} PDF{selectedPDFs.length > 1 ? 's' : ''} Selected
              </span>
            )}
          </div>
          
          <button
            onClick={() => setShowDocs(!showDocs)}
            style={{
              padding: "8px 16px",
              background: showDocs ? "#1a1a1a" : "transparent",
              border: `1px solid ${showDocs ? "#20b8cd" : "#333"}`,
              borderRadius: 20,
              color: showDocs ? "#20b8cd" : "#888",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.2s",
            }}
          >
            📄 Documents ({uploadedPDFs.length})
          </button>
        </div>

        {/* Multi-PDF Workspace Panel */}
        {showDocs && (
          <div style={{
            position: "absolute",
            top: 68,
            right: 0,
            width: 340,
            height: "calc(100vh - 68px)",
            background: "#0a0a0a",
            borderLeft: "1px solid #1a1a1a",
            zIndex: 100,
            padding: "20px",
            overflowY: "auto",
            animation: "slideIn 0.3s ease-out",
          }}>
            <style>{`
              @keyframes slideIn {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
              }
            `}</style>
            
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}>
              <h3 style={{
                color: "#e5e5e5",
                fontSize: 16,
                fontWeight: 600,
                margin: 0,
              }}>
                PDF Workspace
              </h3>
              <button
                onClick={() => setSelectedPDFs(uploadedPDFs.map(p => p.id))}
                style={{
                  padding: "4px 10px",
                  background: "transparent",
                  border: "1px solid #333",
                  borderRadius: 8,
                  color: "#666",
                  fontSize: 11,
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Select All
              </button>
            </div>
            
            {loadingPDFs ? (
              <p style={{ color: "#666", fontSize: 14 }}>Loading...</p>
            ) : uploadedPDFs.length === 0 ? (
              <p style={{ color: "#666", fontSize: 14 }}>No documents yet</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {uploadedPDFs.map((pdf) => {
                  const isSelected = selectedPDFs.includes(pdf.id);
                  return (
                    <div
                      key={pdf.id}
                      onClick={() => togglePDFSelection(pdf.id)}
                      style={{
                        padding: "14px",
                        background: isSelected ? "rgba(32,184,205,0.05)" : "#0f0f0f",
                        border: `1px solid ${isSelected ? "#20b8cd" : "#1a1a1a"}`,
                        borderRadius: 12,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={e => {
                        if (!isSelected) e.currentTarget.style.borderColor = "#2a2a2a";
                      }}
                      onMouseLeave={e => {
                        if (!isSelected) e.currentTarget.style.borderColor = "#1a1a1a";
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        {/* Checkbox */}
                        <div style={{
                          width: 20,
                          height: 20,
                          borderRadius: 6,
                          border: `2px solid ${isSelected ? "#20b8cd" : "#333"}`,
                          background: isSelected ? "#20b8cd" : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}>
                          {isSelected && (
                            <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>
                          )}
                        </div>
                        
                        <div style={{
                          width: 40,
                          height: 40,
                          background: "rgba(32,184,205,0.1)",
                          borderRadius: 10,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 20,
                          flexShrink: 0,
                        }}>
                          📄
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{
                            color: "#e5e5e5",
                            fontSize: 13,
                            fontWeight: 500,
                            margin: "0 0 4px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}>
                            {pdf.filename}
                          </p>
                          <p style={{ color: "#666", fontSize: 11, margin: 0 }}>
                            {new Date(pdf.uploaded_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        {messages.length === 0 ? (
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 32px",
            maxWidth: 900,
            margin: "0 auto",
            width: "100%",
          }}>
            <div style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #20b8cd 0%, #1e90ff 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              color: "#fff",
              fontWeight: 700,
              marginBottom: 24,
              boxShadow: "0 8px 32px rgba(32,184,205,0.3)",
            }}>
              ∞
            </div>
            
            <h1 style={{
              color: "#e5e5e5",
              fontSize: 42,
              fontWeight: 700,
              margin: "0 0 12px",
              textAlign: "center",
              letterSpacing: "-1px",
            }}>
              Research AI
            </h1>
            
            <p style={{
              color: "#666",
              fontSize: 17,
              margin: "0 0 48px",
              textAlign: "center",
              maxWidth: 500,
              lineHeight: 1.6,
            }}>
              Ask anything about your documents. Get precise answers instantly.
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
              width: "100%",
              maxWidth: 700,
              marginBottom: 32,
            }}>
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(s); textareaRef.current?.focus(); }}
                  style={{
                    padding: "16px 20px",
                    background: "#0a0a0a",
                    border: "1px solid #1a1a1a",
                    borderRadius: 16,
                    color: "#999",
                    fontSize: 14,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "#20b8cd";
                    e.currentTarget.style.color = "#e5e5e5";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#1a1a1a";
                    e.currentTarget.style.color = "#999";
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "48px 32px",
            maxWidth: 900,
            margin: "0 auto",
            width: "100%",
          }}>
            {messages.map((msg, i) => (
              <Message 
                key={i} 
                msg={msg} 
                onSpeak={speakText}
                onSuggest={(q) => sendMessage(q)}
              />
            ))}
            <div ref={bottomRef} />
          </div>
        )}

        {/* Input Area */}
        <div style={{
          padding: "20px 32px 32px",
          borderTop: "1px solid #1a1a1a",
          background: "#000",
        }}>
          <div style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            alignItems: "flex-end",
            gap: 12,
            background: "#0f0f0f",
            border: "1px solid #1a1a1a",
            borderRadius: 28,
            padding: "14px 16px",
            transition: "all 0.2s",
          }}
            onFocusCapture={e => e.currentTarget.style.borderColor = "#20b8cd"}
            onBlurCapture={e => e.currentTarget.style.borderColor = "#1a1a1a"}
          >
            {/* Voice Input Button */}
            <button
              onClick={isListening ? stopListening : startListening}
              style={{
                background: isListening ? "rgba(32,184,205,0.1)" : "none",
                border: isListening ? "1px solid #20b8cd" : "none",
                color: isListening ? "#20b8cd" : "#666",
                cursor: "pointer",
                fontSize: 20,
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 12,
                transition: "all 0.2s",
              }}
              title={isListening ? "Stop listening" : "Voice input"}
            >
              🎤
            </button>
            
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => { setInput(e.target.value); autoResize(); }}
              onKeyDown={handleKey}
              placeholder={isListening ? "Listening..." : "Ask anything..."}
              rows={1}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                color: "#e5e5e5",
                fontSize: 15,
                lineHeight: 1.6,
                resize: "none",
                fontFamily: "'Inter', sans-serif",
                maxHeight: 200,
              }}
            />
            
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                flexShrink: 0,
                background: loading || !input.trim()
                  ? "#1a1a1a"
                  : "linear-gradient(135deg, #20b8cd 0%, #1e90ff 100%)",
                border: "none",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 20,
                transition: "all 0.3s",
                boxShadow: loading || !input.trim() ? "none" : "0 4px 16px rgba(32,184,205,0.3)",
              }}
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}