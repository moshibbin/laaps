"use client";

import { useState } from "react";
import SecondHeader from "../components/SecondHeader";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate form submission
    setTimeout(() => {
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        organization: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }, 1500);
  };

  return (
    <div className="wireframe-container">
      {/* Header */}
      <SecondHeader />

      {/* Hero Section */}
      <section className="hero" style={{ padding: "5rem 2.5rem" }}>
        <div
          className="container"
          style={{ maxWidth: "800px", textAlign: "center" }}
        >
          <span
            className="badge-pill"
            style={{
              background:
                "linear-gradient(135deg, var(--primary-deep), var(--secondary-earth))",
              color: "white",
              padding: "0.5rem 1.2rem",
              borderRadius: "30px",
              fontSize: "0.85rem",
              fontWeight: 500,
              letterSpacing: "0.5px",
              display: "inline-block",
              marginBottom: "1.5rem",
            }}
          >
            Get in Touch
          </span>
          <h1 style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>
            Partner with Us
          </h1>
          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-medium)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Whether you need research support, technical advisory, or strategic
            partnership, we're here to help.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.5fr",
              gap: "4rem",
              alignItems: "start",
            }}
          >
            {/* Contact Info */}
            <div>
              <h2>Contact Information</h2>
              <p style={{ marginBottom: "2rem", marginTop: "1rem" }}>
                Reach out to us through any of these channels. We typically
                respond within 24-48 hours.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
                <div className="pillar-card" style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "start",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.5rem",
                        color: "var(--secondary-earth)",
                        minWidth: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <h3
                        style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}
                      >
                        Email
                      </h3>
                      <a
                        href="mailto:info@laapsinstitute.com"
                        style={{
                          color: "var(--primary-deep)",
                          textDecoration: "none",
                        }}
                      >
                        info@laapsinstitute.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pillar-card" style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "start",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.5rem",
                        color: "var(--secondary-earth)",
                        minWidth: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <i className="fas fa-phone"></i>
                    </div>
                    <div>
                      <h3
                        style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}
                      >
                        Phone
                      </h3>
                      <p style={{ margin: 0 }}>+252 634 888 070</p>
                      <p style={{ margin: "0.5rem 0 0 0" }}>+252 634 000 203</p>
                    </div>
                  </div>
                </div>

                <div className="pillar-card" style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "start",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.5rem",
                        color: "var(--secondary-earth)",
                        minWidth: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <h3
                        style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}
                      >
                        Locations
                      </h3>
                      <p style={{ margin: 0 }}>
                        Hargeisa, Somaliland
                        <br />
                        Mogadishu, Somalia
                        <br />
                        Garowe, Puntland
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pillar-card" style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "start",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.5rem",
                        color: "var(--secondary-earth)",
                        minWidth: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <i className="fab fa-linkedin"></i>
                    </div>
                    <div>
                      <h3
                        style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}
                      >
                        Social Media
                      </h3>
                      <p style={{ margin: 0 }}>
                        <a
                          href="https://www.linkedin.com/company/laaps-institute"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "var(--primary-deep)",
                            textDecoration: "none",
                            marginRight: "1rem",
                          }}
                        >
                          LinkedIn
                        </a>
                        <a
                          href="https://twitter.com/LAAPSInstitute"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "var(--primary-deep)",
                            textDecoration: "none",
                          }}
                        >
                          Twitter
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="pillar-card" style={{ padding: "2.5rem" }}>
              <h2>Send us a Message</h2>
              <p style={{ marginBottom: "2rem", marginTop: "1rem" }}>
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  <div>
                    <label
                      htmlFor="name"
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        color: "var(--text-dark)",
                      }}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: "12px",
                        border: "2px solid var(--border-light)",
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        fontFamily: "var(--font-inter), sans-serif",
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "var(--accent-gold)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "var(--border-light)")
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        color: "var(--text-dark)",
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: "12px",
                        border: "2px solid var(--border-light)",
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        fontFamily: "var(--font-inter), sans-serif",
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "var(--accent-gold)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "var(--border-light)")
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="organization"
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        color: "var(--text-dark)",
                      }}
                    >
                      Organization
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: "12px",
                        border: "2px solid var(--border-light)",
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        fontFamily: "var(--font-inter), sans-serif",
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "var(--accent-gold)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "var(--border-light)")
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        color: "var(--text-dark)",
                      }}
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: "12px",
                        border: "2px solid var(--border-light)",
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        fontFamily: "var(--font-inter), sans-serif",
                        backgroundColor: "white",
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "var(--accent-gold)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "var(--border-light)")
                      }
                    >
                      <option value="">Select a subject</option>
                      <option value="research">Research Inquiry</option>
                      <option value="advisory">Advisory Services</option>
                      <option value="partnership">
                        Partnership Opportunity
                      </option>
                      <option value="general">General Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        color: "var(--text-dark)",
                      }}
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: "12px",
                        border: "2px solid var(--border-light)",
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        fontFamily: "var(--font-inter), sans-serif",
                        resize: "vertical",
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "var(--accent-gold)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "var(--border-light)")
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    className="cta-button"
                    disabled={status === "sending"}
                    style={{
                      width: "100%",
                      padding: "1rem",
                      fontSize: "1rem",
                      opacity: status === "sending" ? 0.7 : 1,
                      cursor: status === "sending" ? "not-allowed" : "pointer",
                    }}
                  >
                    {status === "sending"
                      ? "Sending..."
                      : status === "success"
                        ? "Message Sent! ✓"
                        : "Send Message"}
                  </button>

                  {status === "success" && (
                    <div
                      style={{
                        padding: "1rem",
                        background:
                          "linear-gradient(135deg, rgba(147, 120, 95, 0.1), rgba(200, 162, 123, 0.1))",
                        borderRadius: "12px",
                        border: "1px solid var(--accent-gold)",
                        color: "var(--primary-deep)",
                        fontSize: "0.95rem",
                        textAlign: "center",
                      }}
                    >
                      <i
                        className="fas fa-check-circle"
                        style={{ marginRight: "0.5rem" }}
                      ></i>
                      Thank you for contacting us! We'll get back to you soon.
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
