"use client";

import Link from "next/link";
import SecondHeader from "../components/SecondHeader";

export default function ConsultancyPage() {
  return (
    <div className="wireframe-container">
      {/* ===== HEADER ===== */}

      <SecondHeader />

      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "3rem",
            padding: "3rem 2.5rem",
          }}
        >
          <div style={{ flex: 1 }}>
            <span className="badge-pill">Consultancy & Advisory Services</span>
            <h1>What We Offer</h1>
            <p className="subhead">
              The Institute of Research Impact and Development (ALAAPS delivers
              selective, mission-aligned and high impact consultancy and
              advisory services that translate our vision to practice, research
              into decision-making and action.
            </p>
            <p
              style={{
                fontStyle: "italic",
                color: "var(--secondary-earth)",
                fontWeight: 500,
                marginTop: "1rem",
              }}
            >
              ALAAPS does not operate as a generic consulting firm, and instead
              we provide applied advisory, analytics, learning, and capacity
              support that reinforces our research agenda, protects analytical
              independence, and contributes to public good.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SUB-NAVIGATION ===== */}
      <div
        style={{
          background: "var(--surface-light)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="container" style={{ padding: "1rem 2.5rem" }}>
          <nav style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <Link
              href="/consultancy"
              style={{
                color: "var(--primary-deep)",
                fontWeight: 600,
                textDecoration: "none",
                borderBottom: "2px solid var(--primary-deep)",
                paddingBottom: "0.5rem",
              }}
            >
              Overview
            </Link>
            <Link
              href="/consultancy/applied-research"
              style={{
                color: "var(--text-medium)",
                fontWeight: 500,
                textDecoration: "none",
                paddingBottom: "0.5rem",
              }}
              className="sub-nav-link"
            >
              Applied Research
            </Link>
            <Link
              href="/consultancy/programme-design"
              style={{
                color: "var(--text-medium)",
                fontWeight: 500,
                textDecoration: "none",
                paddingBottom: "0.5rem",
              }}
              className="sub-nav-link"
            >
              Programme Design
            </Link>
            <Link
              href="/consultancy/meal"
              style={{
                color: "var(--text-medium)",
                fontWeight: 500,
                textDecoration: "none",
                paddingBottom: "0.5rem",
              }}
              className="sub-nav-link"
            >
              MEAL
            </Link>
            <Link
              href="/consultancy/capacity-building"
              style={{
                color: "var(--text-medium)",
                fontWeight: 500,
                textDecoration: "none",
                paddingBottom: "0.5rem",
              }}
              className="sub-nav-link"
            >
              Capacity Building
            </Link>
          </nav>
        </div>
      </div>

      {/* ===== SERVICE AREAS ===== */}
      <div className="section">
        <div className="container">
          <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>
            Our Service Areas
          </h2>

          <div className="grid-2" style={{ gap: "2rem", marginBottom: "3rem" }}>
            {/* Applied Research */}
            <Link
              href="/consultancy/applied-research"
              style={{ textDecoration: "none" }}
            >
              <div
                className="advisory-section-card"
                style={{
                  height: "100%",
                  transition: "transform 0.2s",
                  cursor: "pointer",
                }}
              >
                <div className="advisory-header">
                  <div className="advisory-icon-box">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div>
                    <h3>Applied Research and Analysis</h3>
                    <p className="advisory-subtitle">
                      Problem-driven, decision-oriented research and analytics
                    </p>
                  </div>
                </div>
                <div className="advisory-body">
                  <p style={{ marginBottom: "1rem" }}>
                    ALAAPS undertakes problem driven and decision-oriented
                    research and analytics services which can inform policy,
                    programming and investment decision making.
                  </p>
                  <ul className="service-list">
                    <li>Climate Risk & Resilience</li>
                    <li>Natural Capital & Ecosystems</li>
                    <li>Rural Economy & Food Systems</li>
                    <li>Energy Access & Green Economy</li>
                  </ul>
                </div>
              </div>
            </Link>

            {/* Programme Design */}
            <Link
              href="/consultancy/programme-design"
              style={{ textDecoration: "none" }}
            >
              <div
                className="advisory-section-card"
                style={{
                  height: "100%",
                  transition: "transform 0.2s",
                  cursor: "pointer",
                }}
              >
                <div className="advisory-header">
                  <div className="advisory-icon-box">
                    <i className="fas fa-pencil-ruler"></i>
                  </div>
                  <div>
                    <h3>Programme Design & Strategic Advisory</h3>
                    <p className="advisory-subtitle">
                      Context-sensitive programmes for fragile and
                      climate-affected contexts
                    </p>
                  </div>
                </div>
                <div className="advisory-body">
                  <p style={{ marginBottom: "1rem" }}>
                    Supporting governments, donors, UN agencies, NGOs, and
                    foundations to design effective, context-sensitive
                    programmes and strategies.
                  </p>
                  <ul className="service-list">
                    <li>Systems Mapping & Diagnostics</li>
                    <li>Theory of Change Development</li>
                    <li>Anticipatory Action Design</li>
                    <li>Strategy & Investment Advisory</li>
                  </ul>
                </div>
              </div>
            </Link>

            {/* MEAL */}
            <Link href="/consultancy/meal" style={{ textDecoration: "none" }}>
              <div
                className="advisory-section-card"
                style={{
                  height: "100%",
                  transition: "transform 0.2s",
                  cursor: "pointer",
                }}
              >
                <div className="advisory-header">
                  <div className="advisory-icon-box">
                    <i className="fas fa-chart-pie"></i>
                  </div>
                  <div>
                    <h3>
                      Monitoring, Evaluation, Accountability & Learning (MEAL)
                    </h3>
                    <p className="advisory-subtitle">
                      MEAL services across all sectors with strong analytical
                      standards
                    </p>
                  </div>
                </div>
                <div className="advisory-body">
                  <p style={{ marginBottom: "1rem" }}>
                    MEAL services across humanitarian, development, and
                    resilience programming, going beyond compliance to
                    strengthen learning and adaptive management.
                  </p>
                  <ul className="service-list">
                    <li>Monitoring System Design</li>
                    <li>Baseline, Midline & Endline Studies</li>
                    <li>Evaluations and Reviews</li>
                    <li>Accountability to Affected Populations</li>
                  </ul>
                </div>
              </div>
            </Link>

            {/* Capacity Building */}
            <Link
              href="/consultancy/capacity-building"
              style={{ textDecoration: "none" }}
            >
              <div
                className="advisory-section-card"
                style={{
                  height: "100%",
                  transition: "transform 0.2s",
                  cursor: "pointer",
                }}
              >
                <div className="advisory-header">
                  <div className="advisory-icon-box">
                    <i className="fas fa-chalkboard-teacher"></i>
                  </div>
                  <div>
                    <h3>Capacity Building & Executive Learning</h3>
                    <p className="advisory-subtitle">
                      Applied, practitioner-led capacity building programmes
                    </p>
                  </div>
                </div>
                <div className="advisory-body">
                  <p style={{ marginBottom: "1rem" }}>
                    Strengthening analytical capability, decision-making, and
                    adaptive practice through practitioner-led training and
                    learning.
                  </p>
                  <ul className="service-list">
                    <li>Technical Training</li>
                    <li>Applied Learning Programmes</li>
                    <li>Executive & Leadership Learning</li>
                    <li>Institutional Capacity Support</li>
                  </ul>
                </div>
              </div>
            </Link>
          </div>

          {/* Environmental & Social Risk */}
          <div
            className="advisory-section-card"
            style={{ marginBottom: "3rem" }}
          >
            <div className="advisory-header">
              <div className="advisory-icon-box">
                <i className="fas fa-shield-virus"></i>
              </div>
              <div>
                <h3>
                  Environmental & Social Risk Assessment, Safeguards &
                  Compliance
                </h3>
                <p className="advisory-subtitle">
                  Cross-cutting advisory support
                </p>
              </div>
            </div>
            <div className="advisory-body">
              <p style={{ marginBottom: "1rem" }}>
                ALAAPS helps partners identify, manage, and reduce environmental
                and social risks so programmes and investments are safer, more
                inclusive, and meet safeguard expectations.
              </p>
              <ul className="service-list">
                <li>Environmental & Social Screening (ESA/ESIA scoping)</li>
                <li>Environmental & Social Management Plans (ESMP)</li>
                <li>Safeguards integration in design and delivery</li>
                <li>Environmental & social audits and compliance reviews</li>
                <li>Stakeholder engagement support</li>
              </ul>
              <p
                style={{
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                  marginTop: "1rem",
                  color: "var(--text-medium)",
                }}
              >
                Where full technical ESIA studies require specialised licensed
                inputs, ALAAPS partners with specialist firms while providing
                analytical leadership and safeguards coordination.
              </p>
            </div>
          </div>

          {/* Consultancy Principles */}
          <div className="cross-cutting-note">
            <h3>
              <i className="fas fa-star" style={{ marginRight: "0.5rem" }}></i>
              Consultancy Principles
            </h3>
            <p style={{ marginBottom: "1.5rem" }}>
              ALAAPS s consultancy services are guided by the following
              principles:
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1rem",
              }}
            >
              <div>
                <strong style={{ color: "var(--primary-deep)" }}>
                  Mission alignment with ALAAPS s research agenda:
                </strong>{" "}
                We prioritize assignments that reinforce our core purpose and
                thematic priorities.
              </div>
              <div>
                <strong style={{ color: "var(--primary-deep)" }}>
                  Analytical independence and integrity:
                </strong>{" "}
                We provide objective, evidence-based analysis and advice,
                grounded in transparent methods and professional standards.
              </div>
              <div>
                <strong style={{ color: "var(--primary-deep)" }}>
                  Learning and systems improvement:
                </strong>{" "}
                Our work is designed to strengthen decisions, adaptive practice,
                and system performance—not only to produce reports.
              </div>
              <div>
                <strong style={{ color: "var(--primary-deep)" }}>
                  Selectivity and quality:
                </strong>{" "}
                We focus on high-value engagements where ALAAPS can add depth,
                clarity, and practical value.
              </div>
            </div>
          </div>

          {/* Back link */}
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a
              href="/#advisory"
              className="btn-outline"
              style={{ display: "inline-block" }}
            >
              ← Back to homepage
            </a>
          </div>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3 style={{ color: "white" }}>LAAPS Institute</h3>
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
                <li>
                  <a href="/#research">Research</a>
                </li>
                <li>
                  <a href="/#advisory">Consultancy</a>
                </li>
                <li>
                  <a href="/#approach">Our Approach</a>
                </li>
                <li>
                  <a href="/#work">Work</a>
                </li>
                <li>
                  <a href="/#contact">Contact</a>
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
                general@laaps.institute
                <br />
                <i
                  className="fas fa-phone"
                  style={{ marginRight: "0.5rem" }}
                ></i>
                +254 115 783 111 (Nairobi)
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
            <span>© 2025 LAAPS Institute – all rights reserved</span>
            <span>Privacy policy · Terms · Safeguarding</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
