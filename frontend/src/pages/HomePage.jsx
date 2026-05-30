import { useNavigate } from "react-router-dom";
import { useState } from "react";
import bgImage from "../assets/main.png";

export default function HomePage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  return (
    <div style={{
      background: "#000",
      fontFamily: "'Inter', sans-serif",
      overflowX: "hidden",
    }}>
      {/* Fixed Navbar */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 80px",
          maxWidth: 1400,
          margin: "0 auto",
        }}>
          {/* Logo */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
          }}
            onClick={() => scrollToSection("home")}
          >
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
            }}>
              ∞
            </div>
            <span style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "-0.3px",
            }}>
              Please Don't Read(PDF)
            </span>
          </div>

          {/* Navigation Links */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 48,
          }}>
            {[
              { id: "home", label: "HOME" },
              { id: "about", label: "ABOUT US" },
              { id: "contact", label: "CONTACT US" },
              { id: "faq", label: "FAQ" },
              { id: "blogs", label: "BLOGS" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: activeSection === item.id ? "#fff" : "rgba(255,255,255,0.7)",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  letterSpacing: "0.5px",
                  transition: "color 0.2s",
                  position: "relative",
                  padding: "8px 0",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => activeSection !== item.id && (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >
                {item.label}
                {activeSection === item.id && (
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "#20b8cd",
                    borderRadius: 2,
                  }} />
                )}
              </button>
            ))}
          </div>

          {/* Sign In Button */}
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "10px 32px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 24,
              color: "#fff",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              letterSpacing: "0.5px",
              transition: "all 0.3s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
            }}
          >
            SIGN IN
          </button>
        </div>
      </nav>

      {/* HOME Section */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          background: `
            linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 100%),
            url(${bgImage}) center/cover
          `,
          position: "relative",
          display: "flex",
          alignItems: "center",
          paddingTop: 80,
        }}
      >
        <div style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 80px",
          width: "100%",
        }}>
          <div style={{
            maxWidth: 700,
          }}>
            <h1 style={{
              color: "#fff",
              fontSize: 64,
              fontWeight: 700,
              margin: "0 0 24px",
              letterSpacing: "-2px",
              lineHeight: 1.1,
            }}>
              Transform Documents with AI
            </h1>
            
            <p style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: 18,
              lineHeight: 1.8,
              margin: "0 0 40px",
              maxWidth: 540,
            }}>
              Unlock the power of artificial intelligence to analyze, understand, and extract insights from your PDF documents. Experience the future of document research today.
            </p>

            <button
              onClick={() => navigate("/register")}
              style={{
                padding: "16px 48px",
                background: "linear-gradient(135deg, #20b8cd 0%, #1e90ff 100%)",
                border: "none",
                borderRadius: 28,
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.5px",
                boxShadow: "0 8px 32px rgba(32,184,205,0.4)",
                transition: "all 0.3s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(32,184,205,0.5)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(32,184,205,0.4)";
              }}
            >
              Get Started Free
            </button>
          </div>
        </div>

        {/* Decorative Arrow */}
        <div style={{
          position: "absolute",
          bottom: 120,
          right: 140,
          fontSize: 80,
          color: "rgba(255,255,255,0.1)",
          transform: "rotate(-45deg)",
        }}>
          →
        </div>
      </section>

      {/* ABOUT US Section */}
      <section
        id="about"
        style={{
          minHeight: "100vh",
          background: "#000",
          padding: "120px 80px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{
          maxWidth: 1400,
          margin: "0 auto",
          width: "100%",
        }}>
          <h2 style={{
            color: "#20b8cd",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: 16,
          }}>
            About Us
          </h2>
          <h3 style={{
            color: "#fff",
            fontSize: 48,
            fontWeight: 700,
            margin: "0 0 32px",
            letterSpacing: "-1.5px",
            maxWidth: 700,
          }}>
            Revolutionizing Document Analysis with AI
          </h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            marginTop: 48,
          }}>
            <div>
              <p style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 17,
                lineHeight: 1.8,
                marginBottom: 24,
              }}>
                Please Don't Read(PDF) is a cutting-edge AI-powered platform designed to transform how you interact with PDF documents. Our mission is to make document research faster, smarter, and more efficient.
              </p>
              <p style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 17,
                lineHeight: 1.8,
              }}>
                Using advanced natural language processing and machine learning algorithms, we extract meaningful insights from your documents in seconds, saving you hours of manual reading.
              </p>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
            }}>
              {[
                { num: "10K+", label: "Documents Processed" },
                { num: "5K+", label: "Active Users" },
                { num: "99.9%", label: "Accuracy Rate" },
                { num: "24/7", label: "Support Available" },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: "#0a0a0a",
                    border: "1px solid #1a1a1a",
                    borderRadius: 16,
                    padding: "32px 24px",
                    textAlign: "center",
                  }}
                >
                  <p style={{
                    color: "#20b8cd",
                    fontSize: 36,
                    fontWeight: 700,
                    margin: "0 0 8px",
                    letterSpacing: "-1px",
                  }}>
                    {stat.num}
                  </p>
                  <p style={{
                    color: "#666",
                    fontSize: 13,
                    margin: 0,
                  }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT US Section */}
      <section
        id="contact"
        style={{
          minHeight: "100vh",
          background: "#000",
          padding: "120px 80px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{
          maxWidth: 1400,
          margin: "0 auto",
          width: "100%",
        }}>
          <h2 style={{
            color: "#20b8cd",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: 16,
          }}>
            Contact Us
          </h2>
          <h3 style={{
            color: "#fff",
            fontSize: 48,
            fontWeight: 700,
            margin: "0 0 64px",
            letterSpacing: "-1.5px",
          }}>
            Get in Touch
          </h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
          }}>
            {/* Contact Form */}
            <div>
              <div style={{ marginBottom: 24 }}>
                <label style={{
                  display: "block",
                  color: "#999",
                  fontSize: 13,
                  fontWeight: 500,
                  marginBottom: 10,
                }}>
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  style={{
                    width: "100%",
                    padding: "16px 18px",
                    background: "#0a0a0a",
                    border: "1px solid #1a1a1a",
                    borderRadius: 14,
                    color: "#e5e5e5",
                    fontSize: 15,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{
                  display: "block",
                  color: "#999",
                  fontSize: 13,
                  fontWeight: 500,
                  marginBottom: 10,
                }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    width: "100%",
                    padding: "16px 18px",
                    background: "#0a0a0a",
                    border: "1px solid #1a1a1a",
                    borderRadius: 14,
                    color: "#e5e5e5",
                    fontSize: 15,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ marginBottom: 32 }}>
                <label style={{
                  display: "block",
                  color: "#999",
                  fontSize: 13,
                  fontWeight: 500,
                  marginBottom: 10,
                }}>
                  Message
                </label>
                <textarea
                  placeholder="Your message..."
                  rows={6}
                  style={{
                    width: "100%",
                    padding: "16px 18px",
                    background: "#0a0a0a",
                    border: "1px solid #1a1a1a",
                    borderRadius: 14,
                    color: "#e5e5e5",
                    fontSize: 15,
                    outline: "none",
                    boxSizing: "border-box",
                    resize: "none",
                    fontFamily: "'Inter', sans-serif",
                  }}
                />
              </div>
              <button
                style={{
                  padding: "16px 48px",
                  background: "linear-gradient(135deg, #20b8cd 0%, #1e90ff 100%)",
                  border: "none",
                  borderRadius: 14,
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(32,184,205,0.3)",
                  transition: "all 0.3s",
                }}
              >
                Send Message
              </button>
            </div>

            {/* Contact Info */}
            <div>
              <div style={{
                background: "#0a0a0a",
                border: "1px solid #1a1a1a",
                borderRadius: 20,
                padding: "40px",
              }}>
                <h4 style={{
                  color: "#fff",
                  fontSize: 24,
                  fontWeight: 600,
                  margin: "0 0 32px",
                }}>
                  Contact Information
                </h4>
                {[
                  { icon: "📧", label: "Email", value: "support@pleasedontread.ai" },
                  { icon: "📱", label: "Phone", value: "+1 (555) 123-4567" },
                  { icon: "📍", label: "Address", value: "San Francisco, CA 94102" },
                  { icon: "🕐", label: "Hours", value: "Mon-Fri: 9AM - 6PM PST" },
                ].map((item, i) => (
                  <div key={i} style={{ marginBottom: 28 }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                    }}>
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: "rgba(32,184,205,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                      }}>
                        {item.icon}
                      </div>
                      <div>
                        <p style={{
                          color: "#666",
                          fontSize: 12,
                          margin: "0 0 4px",
                        }}>
                          {item.label}
                        </p>
                        <p style={{
                          color: "#e5e5e5",
                          fontSize: 15,
                          margin: 0,
                          fontWeight: 500,
                        }}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        style={{
          minHeight: "100vh",
          background: "#000",
          padding: "120px 80px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{
          maxWidth: 1000,
          margin: "0 auto",
          width: "100%",
        }}>
          <h2 style={{
            color: "#20b8cd",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: 16,
            textAlign: "center",
          }}>
            FAQ
          </h2>
          <h3 style={{
            color: "#fff",
            fontSize: 48,
            fontWeight: 700,
            margin: "0 0 64px",
            letterSpacing: "-1.5px",
            textAlign: "center",
          }}>
            Frequently Asked Questions
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              {
                q: "How does the AI analyze my documents?",
                a: "Our AI uses advanced natural language processing and machine learning to extract key information, summarize content, and answer questions about your PDFs."
              },
              {
                q: "Is my data secure?",
                a: "Yes! All documents are encrypted and securely stored. We never share your data with third parties and you can delete your documents anytime."
              },
              {
                q: "What file formats are supported?",
                a: "Currently, we support PDF files. We're working on adding support for Word documents, PowerPoint, and Excel files soon."
              },
              {
                q: "How accurate is the AI?",
                a: "Our AI achieves 99.9% accuracy on standard documents. Complex technical or handwritten documents may have slightly lower accuracy."
              },
              {
                q: "Can I upload multiple documents?",
                a: "Yes! You can upload unlimited documents and ask questions across all of them simultaneously."
              },
            ].map((faq, i) => (
              <div
                key={i}
                style={{
                  background: "#0a0a0a",
                  border: "1px solid #1a1a1a",
                  borderRadius: 16,
                  padding: "28px 32px",
                  transition: "all 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#2a2a2a"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1a1a1a"}
              >
                <h4 style={{
                  color: "#e5e5e5",
                  fontSize: 18,
                  fontWeight: 600,
                  margin: "0 0 12px",
                }}>
                  {faq.q}
                </h4>
                <p style={{
                  color: "#666",
                  fontSize: 15,
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOGS Section */}
      <section
        id="blogs"
        style={{
          minHeight: "100vh",
          background: "#000",
          padding: "120px 80px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{
          maxWidth: 1400,
          margin: "0 auto",
          width: "100%",
        }}>
          <h2 style={{
            color: "#20b8cd",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: 16,
          }}>
            Latest Blogs
          </h2>
          <h3 style={{
            color: "#fff",
            fontSize: 48,
            fontWeight: 700,
            margin: "0 0 64px",
            letterSpacing: "-1.5px",
          }}>
            Insights & Updates
          </h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}>
            {[
              {
                title: "10 Ways AI is Transforming Document Research",
                date: "May 15, 2026",
                excerpt: "Discover how artificial intelligence is revolutionizing the way we interact with and extract insights from documents.",
              },
              {
                title: "Best Practices for PDF Organization",
                date: "May 10, 2026",
                excerpt: "Learn expert tips for organizing your PDF library for maximum efficiency and easy retrieval.",
              },
              {
                title: "The Future of AI-Powered Search",
                date: "May 5, 2026",
                excerpt: "Explore upcoming trends in semantic search and how they'll change document analysis forever.",
              },
            ].map((blog, i) => (
              <div
                key={i}
                style={{
                  background: "#0a0a0a",
                  border: "1px solid #1a1a1a",
                  borderRadius: 20,
                  overflow: "hidden",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.borderColor = "#2a2a2a";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#1a1a1a";
                }}
              >
                <div style={{
                  height: 200,
                  background: "linear-gradient(135deg, rgba(32,184,205,0.2) 0%, rgba(30,144,255,0.2) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 48,
                }}>
                  📄
                </div>
                <div style={{ padding: 28 }}>
                  <p style={{
                    color: "#20b8cd",
                    fontSize: 12,
                    margin: "0 0 12px",
                    fontWeight: 500,
                  }}>
                    {blog.date}
                  </p>
                  <h4 style={{
                    color: "#e5e5e5",
                    fontSize: 20,
                    fontWeight: 600,
                    margin: "0 0 12px",
                    lineHeight: 1.3,
                  }}>
                    {blog.title}
                  </h4>
                  <p style={{
                    color: "#666",
                    fontSize: 14,
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {blog.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: "#0a0a0a",
        borderTop: "1px solid #1a1a1a",
        padding: "60px 80px 40px",
      }}>
        <div style={{
          maxWidth: 1400,
          margin: "0 auto",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 60,
            marginBottom: 48,
          }}>
            <div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}>
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
                }}>
                  ∞
                </div>
                <span style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 700,
                }}>
                  Please Don't Read(PDF)
                </span>
              </div>
              <p style={{
                color: "#666",
                fontSize: 14,
                lineHeight: 1.7,
                margin: 0,
              }}>
                Transform your documents with AI-powered intelligence. Fast, accurate, and secure.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Security", "Updates"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Cookie Policy", "Licenses"],
              },
            ].map((col, i) => (
              <div key={i}>
                <h5 style={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  margin: "0 0 20px",
                }}>
                  {col.title}
                </h5>
                {col.links.map((link, j) => (
                  <p key={j} style={{
                    color: "#666",
                    fontSize: 14,
                    margin: "0 0 12px",
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = "#20b8cd"}
                    onMouseLeave={e => e.currentTarget.style.color = "#666"}
                  >
                    {link}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div style={{
            borderTop: "1px solid #1a1a1a",
            paddingTop: 32,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <p style={{
              color: "#666",
              fontSize: 14,
              margin: 0,
            }}>
              © 2026 Please Don't Read(PDF). All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 24 }}>
              {["Twitter", "LinkedIn", "GitHub"].map((social, i) => (
                <span
                  key={i}
                  style={{
                    color: "#666",
                    fontSize: 14,
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "#20b8cd"}
                  onMouseLeave={e => e.currentTarget.style.color = "#666"}
                >
                  {social}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}