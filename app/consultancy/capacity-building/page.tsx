"use client";

import SecondHeader from "@/app/components/SecondHeader";

export default function CapacityBuildingPage() {
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
            <span className="badge-pill">Capacity Building</span>
            <h1>Capacity Building & Executive Learning</h1>
            <p className="subhead">
              Applied, practitioner-led capacity building and executive learning
              programmes that strengthen analytical capability, decision-making,
              and adaptive practice. Our learning helps teams use evidence with
              confidence in complex, uncertain, and shock-prone environments.
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
              className="consultancy-subnav-link sub-nav-link"
              style={{
                color: "var(--text-medium)",
                fontWeight: 500,
                textDecoration: "none",
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
              className="consultancy-subnav-link consultancy-subnav-link-active"
              style={{
                color: "var(--primary-deep)",
                fontWeight: 600,
                textDecoration: "none",
                borderBottom: "2px solid var(--primary-deep)",
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
          <h2 style={{ marginBottom: "2rem" }}>
            Core Capacity Building and Learning Services
          </h2>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* Service 1 */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-book-open"></i>
                </div>
                <div>
                  <h3>Technical Training</h3>
                  <p className="advisory-subtitle">
                    Practical, skills-focused training across key technical
                    areas
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <ul className="service-list">
                  <li>
                    <strong>Anticipatory Action:</strong> Early action
                    frameworks, trigger design, risk financing, forecast
                    interpretation
                  </li>
                  <li>
                    <strong>Climate Risk and DRR:</strong> Climate risk
                    assessment, vulnerability analysis, disaster risk reduction
                  </li>
                  <li>
                    <strong>HEA and Livelihoods Analysis:</strong> Household
                    Economy Analysis methodology, livelihood profiling, shock
                    modelling
                  </li>
                  <li>
                    <strong>Food Systems Analysis:</strong> Market analysis,
                    value chain assessment, food systems diagnostics
                  </li>
                  <li>
                    <strong>MEAL:</strong> Monitoring system design, evaluation
                    methods, impact evaluation, learning frameworks
                  </li>
                  <li>
                    <strong>Adaptive Management:</strong> Evidence-informed
                    decision-making, learning agendas, programme adaptation
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 2 */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-laptop-code"></i>
                </div>
                <div>
                  <h3>Applied Learning Programmes</h3>
                  <p className="advisory-subtitle">
                    Case-based learning, simulations, and scenario exercises
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <p style={{ marginBottom: "1rem" }}>
                  Using case-based learning, simulations, scenario exercises,
                  and problem-solving workshops grounded in real contexts:
                </p>
                <ul className="service-list">
                  <li>
                    <strong>HEA-Based Shock Modelling:</strong> Hands-on
                    exercises translating scenarios into household-level
                    deficits
                  </li>
                  <li>
                    <strong>Climate Risk Interpretation:</strong> Reading
                    forecasts, understanding uncertainty, translating signals
                    into action
                  </li>
                  <li>
                    <strong>Anticipatory Action Trigger Simulation:</strong>{" "}
                    Interactive decision games under uncertainty
                  </li>
                  <li>
                    <strong>Testing Layered Response Options:</strong>{" "}
                    Scenario-based exercises testing intervention packages
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 3 */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-user-tie"></i>
                </div>
                <div>
                  <h3>Executive and Leadership Learning</h3>
                  <p className="advisory-subtitle">
                    Strategic decision-making under uncertainty
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <p style={{ marginBottom: "1rem" }}>
                  For senior staff, focused on strategic decision-making under
                  uncertainty:
                </p>
                <ul className="service-list">
                  <li>
                    <strong>Leading Climate-Informed Decisions:</strong>{" "}
                    Translating climate risk intelligence into organizational
                    strategy
                  </li>
                  <li>
                    <strong>Risk Appetite and Trade-Offs:</strong> Navigating
                    trade-offs between early action vs late response
                  </li>
                  <li>
                    <strong>HEA as Strategic Tool:</strong> Understanding
                    thresholds, prioritization, and strategic implications
                  </li>
                  <li>
                    <strong>Systems Thinking:</strong> Applying systems
                    approaches to resilience and DRR programming
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 4 */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-hands-helping"></i>
                </div>
                <div>
                  <h3>Institutional Capacity Support</h3>
                  <p className="advisory-subtitle">
                    Mentoring, accompaniment, and on-the-job learning
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <p style={{ marginBottom: "1rem" }}>
                  Through mentoring, accompaniment, and on-the-job learning
                  linked to live programmes, strategies, and decision processes:
                </p>
                <ul className="service-list">
                  <li>
                    <strong>Accompaniment:</strong> Working alongside teams on
                    real assignments
                  </li>
                  <li>
                    <strong>Mentoring:</strong> One-on-one and team coaching to
                    develop analytical skills
                  </li>
                  <li>
                    <strong>Embedding systems:</strong> Building internal
                    capacity for evidence use and adaptive management
                  </li>
                  <li>
                    <strong>Learning culture:</strong> Fostering environments
                    where evidence drives decisions
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Learning Philosophy */}
          <div className="cross-cutting-note" style={{ marginTop: "3rem" }}>
            <h3>
              <i
                className="fas fa-lightbulb"
                style={{ marginRight: "0.5rem" }}
              ></i>
              Our Learning Philosophy
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              <div style={{ color: "var(--text-medium)" }}>
                <strong style={{ color: "var(--primary-deep)" }}>
                  Applied, Not Academic:
                </strong>{" "}
                Every learning programme is grounded in real-world problems and
                contexts
              </div>
              <div style={{ color: "var(--text-medium)" }}>
                <strong style={{ color: "var(--primary-deep)" }}>
                  Practitioner-Led:
                </strong>{" "}
                Led by experienced practitioners who have applied these tools in
                the field
              </div>
              <div style={{ color: "var(--text-medium)" }}>
                <strong style={{ color: "var(--primary-deep)" }}>
                  Learning by Doing:
                </strong>{" "}
                Emphasis on hands-on exercises, simulations, and problem-solving
              </div>
              <div>
                <strong style={{ color: "var(--primary-deep)" }}>
                  Confidence Under Uncertainty:
                </strong>{" "}
                Developing judgment and analytical confidence despite data gaps
              </div>
            </div>
            <p
              style={{
                marginTop: "1.5rem",
                fontStyle: "italic",
                color: "var(--text-medium)",
              }}
            >
              <strong>Typical outputs:</strong> training curricula; learning
              materials; simulation and scenario tools; facilitation guides;
              post-training learning notes; strengthened institutional capacity
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
