"use client";

export default function ServicesPage() {
  return (
    <div className="wireframe-container">
      {/* ===== HEADER ===== */}
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
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
            </div>
          </div>
          <nav className="nav-links">
            <a href="/#home">Home</a>
            <a href="/#about">About</a>
            <a href="/#research">Research</a>
            <a href="/#advisory">Advisory</a>
            <a href="/#approach">Approach</a>
            <a href="/#work">Work</a>
            <a href="/#contact">Contact</a>
            <a href="/#contact" className="cta-button">
              Partner with us
            </a>
          </nav>
        </div>
      </header>

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
            <span className="badge-pill">Consultancy & Advisory</span>
            <h1>
              Evidence-based advisory for
              <br />
              complex decisions
            </h1>
            <p className="subhead">
              LAAPS's consultancy and advisory work supports partners to use
              research and evidence to make better decisions. It builds directly
              on the Institute's research and focuses on helping policymakers,
              program teams, and investors navigate complex choices in fragile
              and climate-affected contexts.
            </p>
            <p
              style={{
                fontStyle: "italic",
                color: "var(--secondary-earth)",
                fontWeight: 500,
                marginTop: "1rem",
              }}
            >
              We advise, we do not implement — our role is to provide analysis,
              insight, and advisory support that strengthens decision-making,
              improves design, and enhances learning.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FULL SERVICES CONTENT ===== */}
      <div className="section">
        <div className="container">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* Service 1 */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div>
                  <h3>Applied Research & Analytics</h3>
                  <p className="advisory-subtitle">
                    Problem-driven analytical support to inform policy,
                    programme, and investment decisions
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <p>
                  LAAPS provides problem-driven analytical support to inform
                  policy, programme, and investment decisions across fragile and
                  climate-affected contexts. Our analytical work is designed to
                  answer specific operational questions and support
                  evidence-based decision-making in complex environments.
                </p>
                <div style={{ marginTop: "1.5rem" }}>
                  <strong
                    style={{
                      color: "var(--primary-deep)",
                      display: "block",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Core Services:
                  </strong>
                  <ul className="service-list">
                    <li>
                      Climate Risk and Vulnerability Analysis (CRVA) with GESI
                      integration
                    </li>
                    <li>Livelihoods and Household Economy Analysis (HEA)</li>
                    <li>Food systems and market analysis</li>
                    <li>Anticipatory action analytics and trigger analysis</li>
                    <li>Scenario-based stress testing and risk modeling</li>
                    <li>Political economy and governance analysis</li>
                  </ul>
                </div>
                <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                  <a
                    href="/#advisory"
                    className="btn-outline"
                    style={{ display: "inline-block" }}
                  >
                    Back to services overview
                  </a>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-pencil-ruler"></i>
                </div>
                <div>
                  <h3>Programme Design & Strategic Advisory</h3>
                  <p className="advisory-subtitle">
                    Systems thinking and evidence-based advisory for programme
                    and portfolio design
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <p>
                  LAAPS supports the design of policies, programmes, and
                  portfolios by applying systems thinking, theory of change
                  development, and evidence-based advisory. We help partners
                  translate analysis into actionable programme designs that are
                  contextually appropriate, conflict-sensitive, and resilient to
                  shocks.
                </p>
                <div style={{ marginTop: "1.5rem" }}>
                  <strong
                    style={{
                      color: "var(--primary-deep)",
                      display: "block",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Core Services:
                  </strong>
                  <ul className="service-list">
                    <li>
                      Theory of Change (ToC) development and results frameworks
                    </li>
                    <li>
                      Anticipatory action design and early action protocols
                    </li>
                    <li>Shock-responsive systems and adaptive programming</li>
                    <li>
                      Resilience programming and climate adaptation strategies
                    </li>
                    <li>
                      Strategic positioning in complex and fragile environments
                    </li>
                    <li>
                      Programme feasibility studies and risk-informed design
                    </li>
                  </ul>
                </div>
                <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                  <a
                    href="/#advisory"
                    className="btn-outline"
                    style={{ display: "inline-block" }}
                  >
                    Back to services overview
                  </a>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-chart-pie"></i>
                </div>
                <div>
                  <h3>
                    Monitoring, Evaluation, Accountability & Learning (MEAL)
                  </h3>
                  <p className="advisory-subtitle">
                    High-quality MEAL services designed to strengthen learning
                    and adaptation
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <p>
                  LAAPS delivers high-quality MEAL services across sectors,
                  including baselines, evaluations, outcome harvesting, learning
                  reviews, and accountability systems. Our MEAL work is designed
                  to go beyond compliance—strengthening learning, adaptation,
                  and evidence use in decision-making.
                </p>
                <div style={{ marginTop: "1.5rem" }}>
                  <strong
                    style={{
                      color: "var(--primary-deep)",
                      display: "block",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Core Services:
                  </strong>
                  <ul className="service-list">
                    <li>Baseline studies and endline evaluations</li>
                    <li>Mid-term reviews and formative evaluations</li>
                    <li>Outcome harvesting and contribution analysis</li>
                    <li>
                      Real-time learning reviews and adaptive management support
                    </li>
                    <li>Accountability and feedback mechanism design</li>
                    <li>MEAL system design and capacity strengthening</li>
                    <li>Impact assessments and cost-effectiveness analysis</li>
                  </ul>
                </div>
                <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                  <a
                    href="/#advisory"
                    className="btn-outline"
                    style={{ display: "inline-block" }}
                  >
                    Back to services overview
                  </a>
                </div>
              </div>
            </div>

            {/* Service 4 */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-chalkboard-teacher"></i>
                </div>
                <div>
                  <h3>Capacity Building & Executive Learning</h3>
                  <p className="advisory-subtitle">
                    Applied training and learning engagements for practitioners
                    and decision-makers
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <p>
                  LAAPS designs and delivers applied training and learning
                  engagements for practitioners, technical teams, and
                  decision-makers. Our capacity support focuses on strengthening
                  analytical skills, evidence use, and adaptive management
                  rather than generic training delivery.
                </p>
                <div style={{ marginTop: "1.5rem" }}>
                  <strong
                    style={{
                      color: "var(--primary-deep)",
                      display: "block",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Core Services:
                  </strong>
                  <ul className="service-list">
                    <li>
                      Analytical skills development (CRVA, HEA, market analysis)
                    </li>
                    <li>Evidence use and adaptive management training</li>
                    <li>
                      Anticipatory action and early warning system capacity
                      building
                    </li>
                    <li>Programme quality and M&E strengthening</li>
                    <li>Climate risk and resilience programming workshops</li>
                    <li>Executive learning sessions for senior leadership</li>
                    <li>On-the-job mentoring and embedded support</li>
                  </ul>
                </div>
                <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                  <a
                    href="/#advisory"
                    className="btn-outline"
                    style={{ display: "inline-block" }}
                  >
                    Back to services overview
                  </a>
                </div>
              </div>
            </div>

            {/* Service 5 */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-shield-virus"></i>
                </div>
                <div>
                  <h3>Environmental & Social Risk, Safeguards & Compliance</h3>
                  <p className="advisory-subtitle">
                    Supporting partners to identify, manage, and reduce
                    environmental and social risks
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <p>
                  LAAPS supports partners to identify, manage, and reduce
                  environmental and social risks across programmes and
                  investments. This includes environmental and social screening,
                  safeguards integration in design, compliance reviews,
                  stakeholder engagement support, and safeguards coordination.
                </p>
                <div style={{ marginTop: "1.5rem" }}>
                  <strong
                    style={{
                      color: "var(--primary-deep)",
                      display: "block",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Core Services:
                  </strong>
                  <ul className="service-list">
                    <li>Environmental and social screening and scoping</li>
                    <li>Safeguards integration in programme design</li>
                    <li>Environmental and Social Management Plans (ESMP)</li>
                    <li>Stakeholder engagement and consultation design</li>
                    <li>Compliance reviews and safeguards monitoring</li>
                    <li>
                      Grievance mechanism design and implementation support
                    </li>
                    <li>Do-no-harm and conflict sensitivity assessments</li>
                    <li>Safeguards coordination and capacity strengthening</li>
                  </ul>
                </div>
                <p
                  style={{
                    fontSize: "0.9rem",
                    fontStyle: "italic",
                    marginTop: "1rem",
                    color: "var(--text-medium)",
                  }}
                >
                  Note: Where full technical ESIA studies require licensed
                  inputs, LAAPS partners with specialist firms while providing
                  analytical leadership and coordination.
                </p>
                <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                  <a
                    href="/#advisory"
                    className="btn-outline"
                    style={{ display: "inline-block" }}
                  >
                    Back to services overview
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Cross-cutting note */}
          <div className="cross-cutting-note">
            <h3>
              <i
                className="fas fa-info-circle"
                style={{ marginRight: "0.5rem" }}
              ></i>
              Cross-Cutting Integration
            </h3>
            <p style={{ marginBottom: "1.5rem" }}>
              All consultancy services integrate LAAPS's cross-cutting lenses.
              These lenses shape how LAAPS works across all thematic areas and
              ensure research is rigorous, ethical, relevant, and usable in
              complex and fragile contexts:
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
                  Governance & Institutions:
                </strong>{" "}
                Analysis of policies, institutions, incentives, and power
                relations influencing system performance, implementation
                feasibility, and reform pathways.
              </div>
              <div>
                <strong style={{ color: "var(--primary-deep)" }}>
                  Gender, Equity & Social Inclusion (GESI):
                </strong>{" "}
                Ensuring research examines who benefits, who is excluded, and
                why, across gender, age, disability, displacement, and
                vulnerability dimensions.
              </div>
              <div>
                <strong style={{ color: "var(--primary-deep)" }}>
                  Conflict Sensitivity & Do-No-Harm:
                </strong>{" "}
                Integrating conflict analysis and social cohesion considerations
                to ensure research and recommendations do not exacerbate
                tensions, particularly around land, water, and resource access.
              </div>
              <div>
                <strong style={{ color: "var(--primary-deep)" }}>
                  Ethics, Safeguarding & Research Integrity:
                </strong>{" "}
                Commitment to ethical research practice, including informed
                consent, safeguarding of vulnerable populations, data
                protection, and research integrity standards.
              </div>
              <div>
                <strong style={{ color: "var(--primary-deep)" }}>
                  Knowledge Translation & Uptake:
                </strong>{" "}
                Focusing on how evidence is translated into decisions and action
                through policy engagement, decision briefs, advisory support,
                and learning feedback loops.
              </div>
            </div>
            <p
              style={{
                marginTop: "1.5rem",
                fontStyle: "italic",
                color: "var(--text-medium)",
              }}
            >
              Together, these lenses ensure LAAPS's research is not only
              technically sound but socially inclusive, conflict-sensitive, and
              usable by those making real-time decisions.
            </p>
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
