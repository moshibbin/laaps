"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate loading for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdminAuthenticated", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid username or password");
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e as any);
    }
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          background: "#f0f4fa",
          flexDirection: "column",
          justifyItems: "center",
          padding: "5rem",
        }}
      >
        <div className="login-card">
          {/* Icon & Title */}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/logo.png"
              alt="LAAPS Logo"
              style={{ height: "50px", width: "auto" }}
            />
            <h2>LAAPS Admin</h2>
          </div>
          <div className="login-sub">
            <i className="fas fa-lock-open"></i> admin access
          </div>

          {/* Error Alert */}
          {error && (
            <div className="error-alert">
              <i className="fas fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                className="input-field"
                id="loginUsername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="admin"
                disabled={loading}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                className="input-field"
                id="loginPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="••••••••"
                disabled={loading}
                required
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Signing in...
                </>
              ) : (
                <>
                  <i className="fas fa-arrow-right-to-bracket"></i> Sign in to
                  dashboard
                </>
              )}
            </button>
          </form>

          <div className="footer-note">
            <i className="fas fa-shield"></i> LAAPS Institute Admin Panel v1
          </div>

          {/* Back to Home Link */}
          <Link href="/" className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Home
          </Link>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .login-card {
          background: white;
          width: 440px;
          max-width: 100%;
          padding: 2.8rem 2.5rem;
          border-radius: 48px;
          box-shadow: 0 35px 65px -20px rgba(18, 52, 92, 0.35);
          text-align: center;
          border: 1px solid rgba(0, 80, 130, 0.1);
        }

        .login-card h2 {
          font-size: 2rem;
          font-weight: 600;
          color: #0b2e4a;
          letter-spacing: -0.02em;
          margin-bottom: 0.4rem;
        }

        .login-sub {
          color: #627b9b;
          font-size: 0.95rem;
          margin-bottom: 2.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .error-alert {
          background: #fee;
          border: 1.5px solid #fcc;
          border-radius: 24px;
          padding: 0.9rem 1.2rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #c33;
          font-size: 0.9rem;
          font-weight: 500;
          animation: shake 0.3s ease-in-out;
        }

        .error-alert i {
          font-size: 1rem;
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-10px);
          }
          75% {
            transform: translateX(10px);
          }
        }

        .input-group {
          text-align: left;
          margin-bottom: 1.8rem;
        }

        .input-group label {
          display: block;
          font-weight: 600;
          font-size: 0.85rem;
          color: #1b3b5c;
          margin-bottom: 6px;
          letter-spacing: 0.2px;
        }

        .input-field {
          width: 100%;
          padding: 1rem 1.2rem;
          background: #f2f7ff;
          border: 1.5px solid #dbe5f0;
          border-radius: 36px;
          font-size: 1rem;
          transition: 0.15s;
          outline: none;
          color: #121f2f;
        }

        .input-field:focus {
          border-color: #1f6fb0;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(25, 120, 200, 0.15);
        }

        .input-field:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-btn {
          background: #153b5c;
          color: white;
          border: none;
          width: 100%;
          padding: 1rem;
          border-radius: 40px;
          font-weight: 600;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 2.2rem 0 1.5rem;
          cursor: pointer;
          transition: 0.15s;
          box-shadow: none;
        }

        .login-btn:hover:not(:disabled) {
          background: #1d4e7c;
          transform: scale(1.01);
        }

        .login-btn:disabled {
          opacity: 0.8;
          cursor: not-allowed;
          transform: none;
        }

        .demo-cred {
          background: #eef4fc;
          padding: 0.8rem;
          border-radius: 50px;
          font-size: 0.85rem;
          color: #2a4f73;
          font-weight: 500;
        }

        .demo-cred i {
          margin-right: 6px;
          color: #3d74a8;
        }

        .demo-cred strong {
          font-family: "Courier New", monospace;
          background: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.9em;
        }

        .footer-note {
          margin-top: 1.8rem;
          font-size: 0.8rem;
          color: #8aa4c0;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 1.5rem;
          color: #627b9b;
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          transition: 0.15s;
        }

        .back-link:hover {
          color: #1f6fb0;
          gap: 12px;
        }

        .back-link i {
          transition: 0.15s;
        }
      `}</style>
    </>
  );
}
