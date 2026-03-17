import menu from "@/data/menu";
import Link from "next/link";
import React from "react";

function SecondHeader() {
  return (
    <div>
      {" "}
      <header className="header-bar">
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 0,
          }}
        >
          <div className="logo-area">
            <a
              href="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <img
                src="/logo.png"
                alt="LAAPS Logo"
                style={{ height: "50px", width: "auto" }}
              />
              <div>
                <h1>
                  LAAPS <span style={{ fontWeight: 300 }}>Institute</span>
                </h1>
                <div className="logo-tag">
                  applied analysis · practical solutions
                </div>
              </div>
            </a>
          </div>
          <nav className="nav-links">
            {menu.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="nav-link"
                style={{ transition: "color 0.3s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#283b5a")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
              >
                {item.name}
              </Link>
            ))}
            <Link
              style={{ padding: "1rem 2rem" }}
              href="/contact"
              className="cta-button"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default SecondHeader;
