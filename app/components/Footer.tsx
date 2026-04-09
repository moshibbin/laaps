import menu from "@/data/menu";
import Link from "next/link";
import React from "react";

function Footer() {
  const primaryMenuItems = menu.filter(
    (item) => item.name !== "Advisory & Services",
  );
  const aboutIndex = primaryMenuItems.findIndex(
    (item) => item.name === "About",
  );
  const beforeAndIncludingAbout =
    aboutIndex >= 0
      ? primaryMenuItems.slice(0, aboutIndex + 1)
      : primaryMenuItems;
  const afterAbout =
    aboutIndex >= 0 ? primaryMenuItems.slice(aboutIndex + 1) : [];

  return (
    <div>
      {" "}
      {/* ===== FOOTER ===== */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <img
                  src="/logo.png"
                  alt="LAAPS Logo"
                  style={{
                    height: "50px",
                    width: "auto",
                  }}
                />
                <div>
                  <h3 style={{ color: "white", margin: 0 }}>LAAPS Institute</h3>
                </div>
              </div>
              <p style={{ color: "#b9c6cc" }}>
                Institute of Applied Analysis for Practical Solutions
              </p>
              <p
                style={{
                  color: "#b9c6cc",
                  fontSize: "0.9rem",
                  marginTop: "1rem",
                }}
              >
                Advancing research for real-world solutions in the Horn of
                Africa.
              </p>
              <div
                style={{
                  margin: "1rem 0",
                  color: "#b9c6cc",
                  fontSize: "1.5rem",
                }}
              >
                <i
                  className="fab fa-linkedin"
                  style={{ marginRight: "1rem", cursor: "pointer" }}
                ></i>
                <i className="fab fa-twitter" style={{ cursor: "pointer" }}></i>
              </div>
            </div>
            <div>
              <p style={{ fontWeight: 600, color: "white" }}>Quick links</p>
              <ul style={{ listStyle: "none", color: "#b9c6cc" }}>
                {beforeAndIncludingAbout.map((item) => (
                  <li key={`footer-menu-${item.id}`}>
                    <Link style={{ color: "#b9c6cc" }} href={item.link}>
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li className="footer-services-dropdown">
                  <button
                    type="button"
                    className="footer-services-trigger"
                    aria-haspopup="true"
                  >
                    Services
                  </button>
                  <div className="footer-services-menu">
                    <Link href="/publications" className="footer-services-item">
                      Research
                    </Link>
                    <Link href="/consultancy" className="footer-services-item">
                      Consultancy
                    </Link>
                    <Link
                      href="/services#advisory"
                      className="footer-services-item"
                    >
                      Advisory
                    </Link>
                  </div>
                </li>
                {afterAbout.map((item) => (
                  <li key={`footer-menu-after-${item.id}`}>
                    <Link style={{ color: "#b9c6cc" }} href={item.link}>
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link style={{ color: "#b9c6cc" }} href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p style={{ fontWeight: 600, color: "white" }}>Contact</p>
              <p style={{ color: "#b9c6cc" }}>
                <i
                  className="fas fa-envelope"
                  style={{ marginRight: "0.5rem" }}
                ></i>
                info@laapsinstitute.com
                <br />
                <i
                  className="fas fa-phone"
                  style={{ marginRight: "0.5rem" }}
                ></i>
                +252 634 888 070 · +252 634 000 203
                <br />
                <i
                  className="fas fa-map-marker-alt"
                  style={{ marginRight: "0.5rem" }}
                ></i>
                Hargeisa · Mogadishu · Garowe
              </p>
            </div>
          </div>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#b9c6cc",
              fontSize: "0.8rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <span>
              © {new Date().getFullYear()} LAAPS Institute – all rights reserved
            </span>
            <span>Privacy policy · Terms · Safeguarding</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
