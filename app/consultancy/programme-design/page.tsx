"use client";

import SecondHeader from "@/app/components/SecondHeader";

export default function ProgrammeDesignPage() {
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
            <span className="badge-pill">Programme Design</span>
            <h1>Programme Design & Strategic Advisory</h1>
            <p className="subhead">
              Supporting context-sensitive programme and strategy design for
              fragile and climate-affected contexts. Our strongest advisory
              capability sits at the intersection of livelihoods, climate
              change, disaster risk reduction (DRR), and anticipatory action
              (AA).
            </p>
          </div>
        </div>
      </section>

      {/* ===== SUB-NAVIGATION ===== */}
      <div className="consultancy-subnav-shell">
        <div className="container consultancy-subnav-container">
          <nav className="consultancy-subnav-list">
            <a
              href="/consultancy"
              className="consultancy-subnav-link sub-nav-link"
              style={{
                color: "var(--text-medium)",
                fontWeight: 500,
                textDecoration: "none",
                paddingBottom: "0.5rem",
              }}
            >
              Overview
            </a>
            <a
              href="/consultancy/applied-research"
              className="consultancy-subnav-link sub-nav-link"
              style={{
                color: "var(--text-medium)",
                fontWeight: 500,
                textDecoration: "none",
                paddingBottom: "0.5rem",
              }}
            >
              Applied Research
            </a>
            <a
              href="/consultancy/programme-design"
              className="consultancy-subnav-link consultancy-subnav-link-active"
              style={{
                color: "var(--primary-deep)",
                fontWeight: 600,
                textDecoration: "none",
                borderBottom: "2px solid var(--primary-deep)",
                paddingBottom: "0.5rem",
              }}
            >
              Programme Design
            </a>
            <a
              href="/consultancy/meal"
              className="consultancy-subnav-link sub-nav-link"
              style={{
                color: "var(--text-medium)",
                fontWeight: 500,
                textDecoration: "none",
                paddingBottom: "0.5rem",
              }}
            >
              MEAL
            </a>
            <a
              href="/consultancy/capacity-building"
              className="consultancy-subnav-link sub-nav-link"
              style={{
                color: "var(--text-medium)",
                fontWeight: 500,
                textDecoration: "none",
                paddingBottom: "0.5rem",
              }}
            >
              Capacity Building
            </a>
          </nav>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="section">
        <div className="container">
          <h2 style={{ marginBottom: "2rem" }}>Core Advisory Services</h2>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* Service 1 */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-project-diagram"></i>
                </div>
                <div>
                  <h3>Systems Mapping and Problem Diagnostics</h3>
                  <p className="advisory-subtitle">
                    Clarifying what is failing and why
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <p>
                  We clarify what is failing and why—mapping actors, incentives,
                  bottlenecks, and institutional dynamics across climate risk,
                  livelihoods, and related systems (food, natural capital,
                  services), to identify leverage points for resilience and risk
                  reduction.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-sitemap"></i>
                </div>
                <div>
                  <h3>Theory of Change (ToC) Development and Testing</h3>
                  <p className="advisory-subtitle">
                    Evidence-grounded and risk-aware ToCs
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <p>
                  We develop and stress-test ToCs that are evidence-grounded and
                  risk-aware. We strive for TOCs with explicit on assumptions,
                  causal pathways, feasibility, and what must hold true for
                  results, with clear articulation of climate and livelihood
                  risk pathways.
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-layer-group"></i>
                </div>
                <div>
                  <h3>Programme and Portfolio Design</h3>
                  <p className="advisory-subtitle">
                    Layered and sequenced responses
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <p style={{ marginBottom: "1rem" }}>
                  We design integrated programmes and portfolios that combine
                  immediate risk management with livelihood protection and
                  recovery to system building and promoting adaptation and
                  mitigation capacities.
                </p>
                <ul className="service-list">
                  <li>Layered and sequenced approaches</li>
                  <li>Resilience and climate-smart programming</li>
                  <li>Targeting logic</li>
                  <li>Portfolio coherence reviews</li>
                </ul>
              </div>
            </div>

            {/* Service 4 */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div>
                  <h3>Anticipatory Action and Shock-Responsive Design</h3>
                  <p className="advisory-subtitle">
                    Early action frameworks and trigger-linked interventions
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <p style={{ marginBottom: "1rem" }}>
                  We support AA and shock-responsive models, including:
                </p>
                <ul className="service-list">
                  <li>Early action frameworks</li>
                  <li>Trigger-linked intervention packages</li>
                  <li>Contingency planning</li>
                  <li>Design inputs for shock-responsive social protection</li>
                  <li>Adaptive delivery systems</li>
                </ul>
              </div>
            </div>

            {/* Service 5 */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-chess"></i>
                </div>
                <div>
                  <h3>Strategy and Investment Advisory</h3>
                  <p className="advisory-subtitle">
                    Sector strategies and investment frameworks
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <p style={{ marginBottom: "1rem" }}>
                  We support sector strategies and investment frameworks:
                </p>
                <ul className="service-list">
                  <li>Prioritizing options</li>
                  <li>Sequencing investments</li>
                  <li>Defining implementation pathways</li>
                  <li>Embedding learning and adaptive management</li>
                  <li>Focus on climate resilience and livelihood systems</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cross-Cutting */}
          <div className="cross-cutting-note" style={{ marginTop: "3rem" }}>
            <h3>
              <i
                className="fas fa-arrows-alt"
                style={{ marginRight: "0.5rem" }}
              ></i>
              Cross-Cutting Lenses
            </h3>
            <p style={{ marginBottom: "1.5rem" }}>
              All our advisory work integrates the following cross-cutting
              considerations:
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1rem",
              }}
            >
              <div style={{ color: "var(--text-medium)" }}>
                <strong style={{ color: "var(--primary-deep)" }}>
                  Governance and Institutions:
                </strong>{" "}
                Understanding institutional roles, capacities, incentives, and
                power dynamics that shape programme implementation and outcomes.
              </div>
              <div style={{ color: "var(--text-medium)" }}>
                <strong style={{ color: "var(--primary-deep)" }}>
                  Gender Equity and Social Inclusion (GESI):
                </strong>{" "}
                Ensuring programmes address differential vulnerabilities,
                opportunities, and needs across gender, age, disability, and
                social groups.
              </div>
              <div style={{ color: "var(--text-medium)" }}>
                <strong style={{ color: "var(--primary-deep)" }}>
                  Data, Evidence, and Learning:
                </strong>{" "}
                Embedding evidence use, monitoring, and adaptive management
                systems from the design stage.
              </div>
            </div>
            <p
              style={{
                marginTop: "1.5rem",
                fontStyle: "italic",
                color: "var(--text-medium)",
              }}
            >
              <strong>Typical outputs:</strong> problem diagnostic notes;
              systems maps and actor analyses; ToCs and results frameworks;
              programme and portfolio design documents; AA and contingency
              frameworks; sector strategies and investment briefs; concise
              advisory memos
            </p>
          </div>

          {/* Back link */}
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a
              href="/consultancy"
              className="btn-outline"
              style={{ display: "inline-block" }}
            >
              ← Back to consultancy overview
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
