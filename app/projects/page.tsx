"use client";

import SecondHeader from "../components/SecondHeader";

export default function ProjectsPage() {
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
            <span className="badge-pill">Work Portfolio</span>
            <h1>
              Recent Assignments &<br />
              Project Experience
            </h1>
            <p className="subhead">
              LAAPS Institute has delivered high-quality research, advisory, and
              analytical services to international organizations, development
              agencies, and humanitarian partners across the Horn of Africa.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ALL PROJECTS ===== */}
      <div className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: "2rem" }}>
            {/* Project 1 */}
            <div className="work-card">
              <div className="client-name">
                IRARA{" "}
                <span style={{ fontWeight: 400, color: "var(--text-medium)" }}>
                  · ESA Regional
                </span>
              </div>
              <p className="project-title">
                Framework agreement: reach, policy & technical advisory
              </p>
              <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
                Comprehensive framework agreement to provide reach, policy
                development, technical advisory, and implementation support
                services across East and Southern Africa region.
              </p>
              <p className="small-meta">
                <i
                  className="fas fa-user"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                Ahmed Fagaase · Regional Director
                <br />
                <i
                  className="fas fa-envelope"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                Ahmed.fagaase@irara.org
                <br />
                <i
                  className="fas fa-phone"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                +254 115 783 111
              </p>
            </div>

            {/* Project 2 */}
            <div className="work-card">
              <div className="client-name">Save the Children International</div>
              <p className="project-title">Household Economic Analysis</p>
              <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
                Comprehensive household economy analysis to inform programming
                and support evidence-based interventions in vulnerable
                communities across Somalia.
              </p>
              <p className="small-meta">
                <i
                  className="fas fa-user"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                Mohamed Abdi Mohamed · Country Procurement Manager
                <br />
                <i
                  className="fas fa-envelope"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                Mohamed.mohamed@savethechildren.org
                <br />
                <i
                  className="fas fa-phone"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                +252 907 797 251
              </p>
            </div>

            {/* Project 3 */}
            <div className="work-card">
              <div className="client-name">Save the Children International</div>
              <p className="project-title">
                Anticipatory Action Workshop and Response Planning
              </p>
              <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
                Workshop on anticipatory action mechanisms and development of
                response planning frameworks for early action in drought-prone
                areas of Somalia.
              </p>
              <p className="small-meta">
                <i
                  className="fas fa-user"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                Mohamed Abdi Mohamed · Country Procurement Manager
                <br />
                <i
                  className="fas fa-envelope"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                Mohamed.mohamed@savethechildren.org
                <br />
                <i
                  className="fas fa-phone"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                +252 907 797 251
              </p>
            </div>

            {/* Project 4 */}
            <div className="work-card">
              <div className="client-name">International Rescue Committee</div>
              <p className="project-title">Household Economic Analysis</p>
              <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
                Livelihood and household economy analysis to inform resilience
                programming and support vulnerable communities in Somalia.
              </p>
              <p className="small-meta">
                <i
                  className="fas fa-user"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                Mohamed Abdi Mohamed (via Save the Children)
                <br />
                <i
                  className="fas fa-envelope"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                Mohamed.mohamed@savethechildren.org
                <br />
                <i
                  className="fas fa-phone"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                +252 907 797 251
              </p>
            </div>

            {/* Project 5 */}
            <div className="work-card">
              <div className="client-name">NADFOR (Somaliland)</div>
              <p className="project-title">
                Workshop on Locally Funded Anticipatory Action
              </p>
              <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
                Capacity building workshop on locally-funded anticipatory action
                mechanisms and systems for NADFOR's humanitarian and development
                operations in Somaliland.
              </p>
              <p className="small-meta">
                <i
                  className="fas fa-user"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                Hassan Mataan · Director of Planning and Research
                <br />
                <i
                  className="fas fa-envelope"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                hassandahir183@gmail.com
                <br />
                <i
                  className="fas fa-phone"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                +252 634 417 314
              </p>
            </div>

            {/* Project 6 */}
            <div className="work-card">
              <div className="client-name">NADFOR (Somaliland)</div>
              <p className="project-title">
                Development of an Integrated Organizational Risk Register
              </p>
              <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
                Development of comprehensive organizational risk register
                covering operational, financial, programmatic, and contextual
                risks for NADFOR's operations in Somaliland.
              </p>
              <p className="small-meta">
                <i
                  className="fas fa-user"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                Hassan Mataan · Director of Planning and Research
                <br />
                <i
                  className="fas fa-envelope"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                hassandahir183@gmail.com
                <br />
                <i
                  className="fas fa-phone"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                +252 634 417 314
              </p>
            </div>

            {/* Project 7 */}
            <div className="work-card">
              <div className="client-name">
                Initiative for Relief and Climate Action (IRCA)
              </div>
              <p className="project-title">
                Development of Organizational 5-year Strategy for IRCA
              </p>
              <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
                Strategic planning engagement to develop IRCA's 5-year
                organizational strategy, defining vision, mission, strategic
                objectives, and implementation pathways.
              </p>
              <p className="small-meta">
                <i
                  className="fas fa-user"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                Abdullahi Mohamed · Executive Director
                <br />
                <i
                  className="fas fa-envelope"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                info@ircaction.org
                <br />
                <i
                  className="fas fa-phone"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                +252 615 111 516
              </p>
            </div>

            {/* Project 8 */}
            <div className="work-card">
              <div className="client-name">
                Initiative for Relief and Climate Action (IRCA)
              </div>
              <p className="project-title">
                Development of Program Quality Toolkit
              </p>
              <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
                Design and development of comprehensive program quality toolkit
                including standards, guidelines, and operational tools for
                IRCA's climate action programming.
              </p>
              <p className="small-meta">
                <i
                  className="fas fa-user"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                Abdullahi Mohamed · Executive Director
                <br />
                <i
                  className="fas fa-envelope"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                info@ircaction.org
                <br />
                <i
                  className="fas fa-phone"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                +252 615 111 516
              </p>
            </div>

            {/* Project 9 */}
            <div className="work-card">
              <div className="client-name">Danish Refugee Council (DRC)</div>
              <p className="project-title">
                Marketable Assessments for Skills Vocational Training in 6
                Towns, Somalia
              </p>
              <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
                Market analysis and skills assessment across six Somali towns
                (Bosasso, Garowe, Dollow, Baidoa, Galkayo & Beletweyne) to
                inform vocational training programming and youth employment
                initiatives.
              </p>
              <p className="small-meta">
                <i
                  className="fas fa-user"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                Simon Nziokah · Regional Contact
                <br />
                <i
                  className="fas fa-envelope"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                s.nziokah@drcsomalia.org
                <br />
                <i
                  className="fas fa-phone"
                  style={{ marginRight: "0.3rem" }}
                ></i>
                +254 729 947 350
              </p>
            </div>

            {/* Project 10 */}
            <div className="work-card">
              <div className="client-name">
                Initiative for Relief and Climate Action (IRCA)
              </div>
              <p className="project-title">
                Development of Organizational Program SOPs and Quality Guides
                and Toolkits
              </p>
              <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
                Comprehensive development of Standard Operating Procedures
                (SOPs), quality guides, and operational toolkits for IRCA's
                program implementation and organizational management.
              </p>
            </div>
          </div>

          {/* Back link */}
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a
              href="/#work"
              className="btn-outline"
              style={{ display: "inline-block" }}
            >
              ← Back to homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
