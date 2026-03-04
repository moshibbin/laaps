"use client";

export default function AppliedResearchPage() {
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
            <span className="badge-pill">Applied Research</span>
            <h1>Applied Research and Analysis</h1>
            <p className="subhead">
              Problem-driven, decision-oriented research and analytics to inform
              policy, programming, and investment decisions. We prioritize
              relevance, clarity and usability for decision makers rather than
              academic outputs alone.
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
            <a
              href="/consultancy"
              style={{
                color: "var(--text-medium)",
                fontWeight: 500,
                textDecoration: "none",
                paddingBottom: "0.5rem",
              }}
              className="sub-nav-link"
            >
              Overview
            </a>
            <a
              href="/consultancy/applied-research"
              style={{
                color: "var(--primary-deep)",
                fontWeight: 600,
                textDecoration: "none",
                borderBottom: "2px solid var(--primary-deep)",
                paddingBottom: "0.5rem",
              }}
            >
              Applied Research
            </a>
            <a
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
            </a>
            <a
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
            </a>
            <a
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
            </a>
          </nav>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="section">
        <div className="container">
          <h2 style={{ marginBottom: "2rem" }}>
            Core Analytics We Deliver (Aligned with IRID's Four Pillars)
          </h2>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* Pillar 1: Climate Risk */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-cloud-showers-heavy"></i>
                </div>
                <div>
                  <h3>
                    Pillar 1: Climate Risk, Resilience & Disaster Risk Reduction
                  </h3>
                  <p className="advisory-subtitle">
                    Multi-hazard climate risk analysis and vulnerability
                    assessment
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <div style={{ marginBottom: "1.5rem" }}>
                  <strong
                    style={{
                      color: "var(--primary-deep)",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Climate Risk & Vulnerability Analysis (CRVA):
                  </strong>
                  <p>
                    IRID conducts multi-hazard climate risk and vulnerability
                    analysis to understand not only where risks occur, but what
                    they mean for different households and livelihood systems.
                    This includes risk profiling, hotspot mapping, and
                    vulnerability segmentation across geographies, wealth
                    groups, and livelihood systems, with integrated GESI and
                    institutional analysis.
                  </p>
                  <p style={{ marginTop: "0.5rem" }}>
                    IRID uses Household Economy Analysis (HEA) to translate
                    climate exposure into household-level impacts on food
                    access, income, and essential expenditure, enabling analysis
                    of compounding and cascading risks, seasonality and timing
                    of shocks, spatial inequality, and resilience capacities.
                  </p>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <strong
                    style={{
                      color: "var(--primary-deep)",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Early Warning and Trigger Analytics:
                  </strong>
                  <p>
                    IRID delivers early warning and trigger analytics that
                    connect climate and hazard signals to decision-relevant
                    household outcomes, supporting anticip​​atory action and
                    risk-informed decision-making. This includes historical
                    hazard–impact analysis, trigger calibration, lead-time
                    evaluation, and decision threshold setting.
                  </p>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <strong
                    style={{
                      color: "var(--primary-deep)",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Scenario Analysis and Stress Testing:
                  </strong>
                  <p>
                    IRID undertakes forward-looking scenario analysis and stress
                    testing to explore how drought, flood, market, conflict, and
                    compound shocks affect households, livelihoods, and systems
                    under different conditions.
                  </p>
                </div>

                <div>
                  <strong
                    style={{
                      color: "var(--primary-deep)",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Climate–Security Analysis:
                  </strong>
                  <p>
                    IRID analyses climate–security linkages to understand how
                    climate stress interacts with livelihood disruption,
                    resource competition, displacement, and conflict dynamics.
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 2: Natural Capital */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-tree"></i>
                </div>
                <div>
                  <h3>Pillar 2: Natural Capital and Ecosystems</h3>
                  <p className="advisory-subtitle">
                    Dryland and fragile environment analysis
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <p style={{ marginBottom: "1rem" }}>
                  IRID provides applied analysis and advisory support on natural
                  capital and ecosystem systems, with a focus on dryland and
                  fragile environments where livelihoods, climate risk, and
                  resource governance intersect.
                </p>
                <ul className="service-list">
                  <li>
                    <strong>Rangeland and dryland system analytics:</strong>{" "}
                    vegetation and pasture conditions, grazing pressure, land
                    degradation drivers
                  </li>
                  <li>
                    <strong>Water and land systems analysis:</strong> water
                    access, watershed dynamics, land-use and land-cover change
                  </li>
                  <li>
                    <strong>Coastal and blue economy diagnostics:</strong>{" "}
                    coastal livelihoods and resource use analysis
                  </li>
                  <li>
                    <strong>
                      Ecosystem services and nature-based solutions (NbS):
                    </strong>{" "}
                    feasibility and benefits analysis
                  </li>
                  <li>
                    <strong>Natural resource governance:</strong> resource
                    tenure, access rules, management arrangements
                  </li>
                  <li>
                    <strong>Environmental risk screening:</strong> rapid
                    identification of environmental sensitivities
                  </li>
                </ul>
              </div>
            </div>

            {/* Pillar 3: Rural Economy */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-home"></i>
                </div>
                <div>
                  <h3>Pillar 3: Rural Economy, Livelihoods and Food Systems</h3>
                  <p className="advisory-subtitle">
                    Household Economy Analysis (HEA) as core framework
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <p style={{ marginBottom: "1rem" }}>
                  IRID's work on rural and urban economies is anchored in
                  Household Economy Analysis (HEA) as a core framework for
                  understanding how households earn income, access food and
                  essential services, manage risk, and cope with shocks.
                </p>
                <ul className="service-list">
                  <li>
                    <strong>Household Economy Analysis (HEA):</strong> baseline
                    livelihood profiling and seasonal analysis across rural and
                    urban contexts
                  </li>
                  <li>
                    <strong>Resilience analysis:</strong> absorptive, adaptive,
                    and transformative capacities within household economies
                  </li>
                  <li>
                    <strong>
                      Livelihood, labour, and urban economy dynamics:
                    </strong>{" "}
                    rural and urban livelihood systems analysis
                  </li>
                  <li>
                    <strong>Food systems diagnostics:</strong> rural–urban food
                    system linkages and nutrition pathways
                  </li>
                  <li>
                    <strong>Market, trade, and value chain analytics:</strong>{" "}
                    price monitoring, market functionality assessment
                  </li>
                  <li>
                    <strong>Market Systems Development (MSD):</strong> how
                    market systems function for different livelihood groups
                  </li>
                  <li>
                    <strong>Access to finance:</strong> household access to
                    financial services and inclusion analysis
                  </li>
                  <li>
                    <strong>Cash and response analytics:</strong> transfer value
                    analysis, MEB analysis, CVA feasibility
                  </li>
                </ul>
              </div>
            </div>

            {/* Pillar 4: Energy */}
            <div className="advisory-section-card">
              <div className="advisory-header">
                <div className="advisory-icon-box">
                  <i className="fas fa-bolt"></i>
                </div>
                <div>
                  <h3>Pillar 4: Energy Access and Green Economy Transition</h3>
                  <p className="advisory-subtitle">
                    System constraints, risks, and opportunities analysis
                  </p>
                </div>
              </div>
              <div className="advisory-body">
                <p style={{ marginBottom: "1rem" }}>
                  IRID provides analytical and advisory support on energy access
                  and green economy transition, with a focus on understanding
                  system constraints, risks, and opportunities in fragile and
                  low-capacity contexts.
                </p>
                <ul className="service-list">
                  <li>
                    <strong>Energy access and power sector diagnostics:</strong>{" "}
                    energy access gaps, demand patterns, affordability
                    constraints
                  </li>
                  <li>
                    <strong>
                      Renewable energy and green economy transition:
                    </strong>{" "}
                    risks and opportunities of clean and decentralized energy
                    solutions
                  </li>
                  <li>
                    <strong>Environmental and social risk advisory:</strong>{" "}
                    environmental and social risk screening and mitigation
                  </li>
                  <li>
                    <strong>Policy and decision-making support:</strong>{" "}
                    synthesis of evidence to inform energy strategies
                  </li>
                </ul>
                <p
                  style={{
                    fontSize: "0.9rem",
                    fontStyle: "italic",
                    marginTop: "1rem",
                    color: "var(--text-medium)",
                  }}
                >
                  <strong>Typical outputs:</strong> analytical briefs; risk and
                  opportunity notes; diagnostic summaries; scenario notes;
                  datasets and indicator packs; decision memos
                </p>
              </div>
            </div>
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
