"use client";

import { useState } from "react";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
    setEmail("");

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <main className="coming-soon-container">
      {/* Animated Background Grid */}
      <div className="grid-background">
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
      </div>

      <div className="content">
        {/* Logo with Pulse Animation */}
        <div className="logo">
          <div className="logo-icon">
            <span className="rocket">🚀</span>
            <div className="pulse-ring"></div>
            <div className="pulse-ring delay-1"></div>
            <div className="pulse-ring delay-2"></div>
          </div>
        </div>
        {/* Main Title with Typewriter Effect */}
        <h1 className="title">
          <span className="gradient-text">Coming Soon</span>
        </h1>
        <p className="subtitle">
          We're building something extraordinary. Be the first to know when we
          launch!
        </p>
        {/* Feature Highlights */}
        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Blazing fast performance</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Beautiful Design</h3>
            <p>Stunning user interface</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure</h3>
            <p>Enterprise-grade security</p>
          </div>
        </div>
        {/* Email Subscription Form
        <form onSubmit={handleSubmit} className="notify-section">
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Enter your email"
              className="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || isSubmitted}
              required
            />
            <button
              type="submit"
              className={`notify-button ${isLoading ? "loading" : ""} ${isSubmitted ? "submitted" : ""}`}
              disabled={isLoading || isSubmitted}
            >
              {isLoading ? (
                <span className="spinner"></span>
              ) : isSubmitted ? (
                <>
                  <span className="checkmark">✓</span> Subscribed!
                </>
              ) : (
                "Notify Me"
              )}
            </button>
          </div>
          {isSubmitted && (
            <p className="success-message">
              🎉 Thanks! We'll notify you when we launch.
            </p>
          )}
        </form> */}
        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-label">
            <span>Development Progress</span>
            <span className="progress-percentage">75%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "75%" }}>
              <div className="progress-glow"></div>
            </div>
          </div>
        </div>
        {/* Social Links with Tooltips */}
        <div className="social-section">
          <p className="social-title">Follow Us</p>
          <div className="social-links">
            <a
              href="#"
              className="social-icon twitter"
              aria-label="Twitter"
              data-tooltip="@yourhandle"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a
              href="#"
              className="social-icon facebook"
              aria-label="Facebook"
              data-tooltip="Facebook"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a
              href="#"
              className="social-icon instagram"
              aria-label="Instagram"
              data-tooltip="@yourhandle"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* <a
              href="#"
              className="social-icon github"
              aria-label="GitHub"
              data-tooltip="GitHub"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a> */}
          </div>
        </div>
      </div>

      {/* Enhanced Particle System */}
      <div className="particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          ></div>
        ))}
      </div>

      {/* Floating Shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </main>
  );
}
