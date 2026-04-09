"use client";

import SecondHeader from "@/app/components/SecondHeader";

export default function MEALPage() {
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
            <span className="badge-pill">MEAL Services</span>
            <h1>Monitoring, Evaluation, Accountability & Learning</h1>
            <p className="subhead">
              MEAL services across humanitarian, development, and resilience
              programming. Our MEAL work goes beyond compliance—we help
              organizations understand what is changing, why it is changing, and
              what to do next.
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
              className="consultancy-subnav-link consultancy-subnav-link-active"
              style={{
                color: "var(--primary-deep)",
                fontWeight: 600,
                textDecoration: "none",
                borderBottom: "2px solid var(--primary-deep)",
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
          {/* Cross-Sectoral Note */}
          <div className="cross-cutting-note" style={{ marginBottom: "2rem" }}>
            <h3>
              <i className="fas fa-globe" style={{ marginRight: "0.5rem" }}></i>
              Cross-Sectoral MEAL Services
            </h3>
            <p>
              While ALAAPS's thematic pillars focus on climate risk,
              livelihoods, natural capital, and energy, our MEAL services extend
              beyond these areas.{" "}
              <strong>
                We offer MEAL services across all sectors including Health,
                Nutrition, Education, and more.
              </strong>
            </p>
          </div>

          <h2 style={{ marginBottom: "2rem" }}>
            Core MEAL Analytics and Services
          </h2>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* Service 1 */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                <div>
                  <h3>Monitoring System Design</h3>
                  <p className="advisory-subtitle">
                    Indicator frameworks and data collection systems
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <p style={{ marginBottom: "1rem" }}>
                  We develop indicator frameworks, data collection systems,
                  dashboards, and monitoring plans suited to complex and
                  adaptive programmes.
                </p>
                <ul className="service-list">
                  <li>Results frameworks and indicator selection</li>
                  <li>Data collection tools and protocols</li>
                  <li>Data quality assurance systems</li>
                  <li>Real-time dashboards and visualization</li>
                  <li>Adaptive monitoring systems</li>
                </ul>
              </div>
            </div>

            {/* Service 2 */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-chart-bar"></i>
                </div>
                <div>
                  <h3>Baseline, Midline, and Endline Studies</h3>
                  <p className="advisory-subtitle">
                    Mixed-methods designs with context-sensitive measurement
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <p style={{ marginBottom: "1rem" }}>
                  We use mixed-methods designs with context-sensitive
                  measurement and clear interpretation for decision-makers.
                </p>
                <ul className="service-list">
                  <li>
                    <strong>Baseline Studies:</strong> Establish benchmark data
                    and context analysis
                  </li>
                  <li>
                    <strong>Midline Studies:</strong> Assess progress and inform
                    adaptive management
                  </li>
                  <li>
                    <strong>Endline Studies:</strong> Measure outcomes and
                    document lessons learned
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 3 */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-search"></i>
                </div>
                <div>
                  <h3>Evaluations and Reviews</h3>
                  <p className="advisory-subtitle">
                    Formative and summative evaluations
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <p style={{ marginBottom: "1rem" }}>
                  ALAAPS conducts formative and summative evaluations using
                  rigorous and context-appropriate methodologies:
                </p>
                <ul className="service-list">
                  <li>
                    <strong>Impact Evaluation:</strong> Assessing attribution
                    and causal pathways
                  </li>
                  <li>
                    <strong>Theory-Based Evaluation:</strong> Testing theories
                    of change and causal mechanisms
                  </li>
                  <li>
                    <strong>Contribution Analysis:</strong> Understanding
                    contribution in complex environments
                  </li>
                  <li>
                    <strong>Outcome Harvesting:</strong> Identifying outcomes in
                    unpredictable contexts
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 4 */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-users"></i>
                </div>
                <div>
                  <h3>Accountability to Affected Populations (AAP)</h3>
                  <p className="advisory-subtitle">
                    Feedback and response mechanisms
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <p style={{ marginBottom: "1rem" }}>
                  Our organization designs and strengthens feedback and response
                  mechanisms, grievance analysis, and accountability system
                  improvement.
                </p>
                <ul className="service-list">
                  <li>Feedback and complaint mechanism design</li>
                  <li>Community engagement and consultation frameworks</li>
                  <li>Grievance data analysis and response tracking</li>
                  <li>Accountability system assessments</li>
                  <li>Participatory monitoring and evaluation</li>
                </ul>
              </div>
            </div>

            {/* Service 5 */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div>
                  <h3>Learning and Adaptive Management</h3>
                  <p className="advisory-subtitle">
                    Translating evidence into programme adjustments
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <p style={{ marginBottom: "1rem" }}>
                  We help partners with learning agendas, after-action reviews,
                  learning synthesis, and facilitated reflection processes.
                </p>
                <ul className="service-list">
                  <li>
                    <strong>Learning Agendas:</strong> Structuring key learning
                    questions
                  </li>
                  <li>
                    <strong>After-Action Reviews:</strong> Rapid reflective
                    processes
                  </li>
                  <li>
                    <strong>Learning Synthesis:</strong> Consolidating insights
                  </li>
                  <li>
                    <strong>Adaptive Management:</strong> Evidence-informed
                    decision-making
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Programme Contexts */}
          <div className="cross-cutting-note" style={{ marginTop: "3rem" }}>
            <h3>
              <i
                className="fas fa-sitemap"
                style={{ marginRight: "0.5rem" }}
              ></i>
              Programme Contexts We Support
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
                  Humanitarian Programming:
                </strong>{" "}
                Emergency response, needs assessments, rapid monitoring
              </div>
              <div style={{ color: "var(--text-medium)" }}>
                <strong style={{ color: "var(--primary-deep)" }}>
                  Development Programming:
                </strong>{" "}
                Long-term impact evaluation, systems strengthening
              </div>
              <div style={{ color: "var(--text-medium)" }}>
                <strong style={{ color: "var(--primary-deep)" }}>
                  Resilience Programming:
                </strong>{" "}
                Resilience measurement, shock-response tracking
              </div>
            </div>
            <p
              style={{
                marginTop: "1.5rem",
                fontStyle: "italic",
                color: "var(--text-medium)",
              }}
            >
              <strong>Typical outputs:</strong> MEAL frameworks; evaluation
              reports; learning reports; monitoring dashboards; learning briefs;
              actionable recommendations
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
