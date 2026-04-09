"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SecondHeader from "./components/SecondHeader";

interface News {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author?: string;
  publishDate?: string;
  category?: string;
  tags?: string[];
  imageUrl?: string;
  status?: "draft" | "published";
  featured?: boolean;
}

interface Publication {
  id: string;
  title: string;
  abstract?: string;
  authors?: string[];
  publicationDate?: string;
  type?: string;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url?: string;
  keywords?: string[];
  pdfUrl?: string;
  coverImageUrl?: string;
  citations?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  featured?: boolean;
}

export default function Page() {
  const [news, setNews] = useState<News[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    fetchNews();
    fetchPublications();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      if (data.success) {
        // Only show published and featured news, limit to 3
        const publishedNews = data.data
          .filter((item: News) => item.status === "published")
          .slice(0, 3);
        setNews(publishedNews);
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  };

  const fetchPublications = async () => {
    try {
      const res = await fetch("/api/publications");
      const data = await res.json();
      if (data.success) {
        // Only show published publications, limit to 3
        const publishedPubs = data.data
          .filter((item: Publication) => item.status === "Published")
          .slice(0, 3);
        setPublications(publishedPubs);
      }
    } catch (error) {
      console.error("Failed to fetch publications:", error);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const [activeTab, setActiveTab] = useState("all");
  const phrases = [
    "real‑world solutions",
    "evidence‑based decisions",
    "sustainable impact",
    "contextual intelligence",
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      if (typedText.length > 0) {
        const timeout = setTimeout(() => {
          setTypedText(currentPhrase.slice(0, typedText.length - 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    } else {
      if (typedText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setTypedText(currentPhrase.slice(0, typedText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    }
  }, [typedText, isDeleting, phraseIndex]);

  return (
    <div className="wireframe-container">
      {/* ===== HEADER ===== */}
      <SecondHeader />

      {/* ===== HERO ===== */}
      <section className="hero" id="home">
        <div
          className="container home-hero-layout"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "4rem",
            padding: "4rem 2.5rem",
            minHeight: "500px",
          }}
        >
          <div className="home-hero-copy" style={{ flex: 1.2 }}>
            <span
              className="badge-pill home-hero-badge"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary-deep), var(--secondary-earth))",
                color: "white",
                padding: "0.5rem 1.2rem",
                borderRadius: "30px",
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.5px",
                display: "inline-block",
                marginBottom: "1.5rem",
              }}
            >
              Horn of Africa · since 2020
            </span>
            <h1
              className="home-hero-title"
              style={{
                fontSize: "3.5rem",
                lineHeight: "1.2",
                marginBottom: "1.5rem",
                fontWeight: 700,
              }}
            >
              <span className="home-hero-title-line">
                Advancing research for
              </span>
              <span
                className="home-hero-typed home-hero-title-accent"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary-deep), var(--secondary-earth))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                  minHeight: "70px",
                }}
              >
                {typedText}
                <span
                  style={{
                    opacity: 1,
                    animation: "blink 1s infinite",
                  }}
                >
                  |
                </span>
              </span>
            </h1>
            <style jsx>{`
              @keyframes blink {
                0%,
                50% {
                  opacity: 1;
                }
                51%,
                100% {
                  opacity: 0;
                }
              }
            `}</style>
            <p
              className="subhead"
              style={{
                fontSize: "1.15rem",
                lineHeight: "1.7",
                marginBottom: "2rem",
                maxWidth: "90%",
              }}
            >
              LAAPS is a multidisciplinary research and advisory institute
              working across the Horn of Africa. We turn complex evidence into
              practical, sustainable solutions for fragile contexts.
            </p>
            <div className="home-hero-metrics">
              <div className="home-hero-metric-card">
                <strong>Research-led</strong>
                <span>decision support</span>
              </div>
              <div className="home-hero-metric-card">
                <strong>Horn of Africa</strong>
                <span>deep contextual focus</span>
              </div>
              <div className="home-hero-metric-card">
                <strong>Evidence to action</strong>
                <span>policy, programmes, investment</span>
              </div>
            </div>
            <div
              className="home-hero-actions"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="#work"
                className="cta-button"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.9rem 2rem",
                  fontSize: "1rem",
                  borderRadius: "30px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  transition: "all 0.3s ease",
                }}
              >
                Explore our work
              </Link>
              <Link
                href="#research"
                className="home-hero-secondary-link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  color: "var(--primary-deep)",
                  fontWeight: 700,
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  whiteSpace: "nowrap",
                }}
              >
                Our expertise
              </Link>
            </div>
          </div>
          <div
            className="home-hero-media-shell"
            style={{
              // flex: 0.8,
              background: "linear-gradient(135deg, #e8e3dd, #d9d2cb)",
              height: "280px",
              borderRadius: "40px",
              display: "flex",
              // alignItems: "center",
              // justifyContent: "center",
              color: "#5e6f78",
              fontSize: "1.1rem",
              fontWeight: 500,
              border: "2px solid #c2b6aa",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <div className="home-hero-media-accent"></div>
            <div
              className="home-hero-media-inner"
              style={{ textAlign: "center" }}
            >
              <div
                className="home-hero-media-frame"
                style={{
                  flex: 0.8,
                  height: "280px",
                  width: "100%",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                }}
              >
                <img
                  className="home-hero-image"
                  src="/hero.jpg"
                  alt="LAAPS Consultancy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
            <div className="home-hero-floating-card">
              <span className="home-hero-floating-label">What we do</span>
              <p>
                Applied research, advisory design, MEAL, and institutional
                learning for fragile and fast-changing contexts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHO WE ARE (summary) ===== */}
      <div
        className="section"
        style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
        id="about"
      >
        <div className="container">
          <div
            className="home-about-summary"
            style={{
              display: "flex",
              gap: "3rem",
              alignItems: "center",
              background: "var(--bg-offwhite)",
              padding: "1.8rem",
              borderRadius: "40px",
            }}
          >
            <div className="home-about-icon">
              <span
                style={{ fontSize: "2.5rem", color: "var(--secondary-earth)" }}
              >
                <i className="fas fa-handshake"></i>
              </span>
            </div>
            <div className="home-about-text">
              <p style={{ fontSize: "1rem" }}>
                <strong>
                  LAAPS is a research-led institute rooted in the Horn of
                  Africa,
                </strong>{" "}
                with deep contextual focus on Somalia and Somaliland. We close
                the evidence‑to‑action gap by connecting rigorous analysis with
                operational reality in fragile and rapidly changing systems.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== VISION / MISSION / VALUES ===== 3-col */}
      <div className="section">
        <div className="container grid-3">
          <div className="pillar-card">
            <i className="fas fa-binoculars pillar-icon"></i>
            <h3>Vision</h3>
            <p>
              A future where policy and investments in fragile contexts are
              guided by rigorous learning and practical solutions.
            </p>
          </div>
          <div className="pillar-card">
            <i className="fas fa-bullseye pillar-icon"></i>
            <h3>Mission</h3>
            <p>
              Translate complex evidence into decision‑ready solutions through
              applied systems analysis, supporting confident action.
            </p>
          </div>
          <div className="pillar-card">
            <i className="fas fa-gem pillar-icon"></i>
            <h3>Core values</h3>
            <p>
              Integrity · Applied relevance · Contextual intelligence ·
              Inclusion · Learning & adaptation · Collaboration
            </p>
          </div>
        </div>
      </div>

      {/* ===== CORE VALUE DETAILS ===== */}
      <div className="section section-bg-light">
        <div className="container">
          <h2>Our Core Values in Action</h2>
          <p style={{ maxWidth: "70%", marginBottom: "2rem" }}>
            Our value lies in connecting rigorous analysis with the operational
            realities of fragile and rapidly changing contexts.
          </p>
          <div className="grid-3">
            <div className="value-card">
              <i className="fas fa-certificate pillar-icon"></i>
              <h3>Evidence with Integrity</h3>
              <p>
                We uphold rigorous, transparent, and independent analysis that
                withstands scrutiny and informs real decisions.
              </p>
            </div>
            <div className="value-card">
              <i className="fas fa-check-circle pillar-icon"></i>
              <h3>Applied Relevance</h3>
              <p>
                We prioritize analysis that is practical, usable, and directly
                relevant to policy, programme, and investment choices.
              </p>
            </div>
            <div className="value-card">
              <i className="fas fa-globe-africa pillar-icon"></i>
              <h3>Contextual Intelligence</h3>
              <p>
                We ground our work in the political, economic, and social
                realities of fragile and rapidly changing systems.
              </p>
            </div>
            <div className="value-card">
              <i className="fas fa-users pillar-icon"></i>
              <h3>Inclusion & Equity</h3>
              <p>
                We integrate gender and social inclusion to ensure analysis
                reflects diverse realities and does not reinforce vulnerability.
              </p>
            </div>
            <div className="value-card">
              <i className="fas fa-graduation-cap pillar-icon"></i>
              <h3>Learning & Adaptation</h3>
              <p>
                We promote continuous learning and adaptive use of evidence to
                strengthen institutional effectiveness over time.
              </p>
            </div>
            <div className="value-card">
              <i className="fas fa-network-wired pillar-icon"></i>
              <h3>Collaboration</h3>
              <p>
                Working in partnership with institutions and communities to
                strengthen evidence quality, relevance, and uptake.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== RESEARCH PILLARS ===== */}
      <div className="section" id="research">
        <div className="container">
          <h2>Research & policy pillars</h2>
          <p style={{ maxWidth: "70%", marginBottom: "2rem" }}>
            climate, governance and social inclusion are cross‑cutting lenses
            across all themes.
          </p>
          <div className="grid-4">
            {/* Pillar 1 */}
            <div className="pillar-card">
              <i className="fas fa-leaf pillar-icon"></i>
              <h3>Environmental sustainability</h3>
              <p>Rangelands, water & land, coastal systems, NbS.</p>
              <div className="tag-group">
                <span className="tag">Drylands</span>
                <span className="tag">blue economy</span>
              </div>
            </div>
            {/* Pillar 2 */}
            <div className="pillar-card">
              <i className="fas fa-cloud-rain pillar-icon"></i>
              <h3>Climate risk & resilience</h3>
              <p>
                CRVA, anticipatory action, climate security, finance, early
                warning.
              </p>
              <div className="tag-group">
                <span className="tag">DRR</span>
                <span className="tag">shock analysis</span>
              </div>
            </div>
            {/* Pillar 3 */}
            <div className="pillar-card">
              <i className="fas fa-tractor pillar-icon"></i>
              <h3>Rural economy & food systems</h3>
              <p>
                Household economy, markets, social protection, nutrition, energy
                links.
              </p>
              <div className="tag-group">
                <span className="tag">livelihoods</span>
                <span className="tag">value chains</span>
              </div>
            </div>
            {/* Pillar 4 */}
            <div className="pillar-card">
              <i className="fas fa-solar-panel pillar-icon"></i>
              <h3>Energy access & green transition</h3>
              <p>
                Renewable energy, productive uses, policy & extractives
                (research only).
              </p>
              <div className="tag-group">
                <span className="tag">green economy</span>
              </div>
            </div>
          </div>
          {/* Cross cutting lenses */}
          <div className="cross-cutting">
            <span className="lens-item">
              <Link href={"/publications"}>
                <i
                  className="fas fa-shield-alt"
                  style={{ marginRight: "4px" }}
                ></i>{" "}
                Governance & Institutions
              </Link>
            </span>
            <span className="lens-item">
              <i className="fas fa-venus-mars"></i> GESI
            </span>
            <span className="lens-item">
              <i className="fas fa-heart"></i> Conflict Sensitivity & Do-No-Harm
            </span>
            <span className="lens-item">
              <i className="fas fa-database"></i> Ethics, Safeguarding &
              Research Integrity
            </span>
            <span className="lens-item">
              <i className="fas fa-comments"></i> Knowledge Translation & Uptake
            </span>
          </div>
        </div>
      </div>

      {/* ===== RESEARCH PILLAR DETAILS ===== */}
      <div className="section section-bg-light">
        <div className="container">
          <h2>Research Focus Areas</h2>
          <div className="grid-2" style={{ gap: "2rem" }}>
            <div className="service-card">
              <h3>
                <i
                  className="fas fa-leaf"
                  style={{
                    marginRight: "0.5rem",
                    color: "var(--secondary-earth)",
                  }}
                ></i>
                Environmental Sustainability
              </h3>
              <p style={{ marginBottom: "1rem" }}>
                Degraded ecosystems and unsustainable resource use threaten
                rural livelihoods and resilience. This pillar focuses on
                understanding, protecting, restoring and sustainably managing
                natural resources.
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li style={{ padding: "0.3rem 0" }}>
                  → Rangeland systems and pastoral resources
                </li>
                <li style={{ padding: "0.3rem 0" }}>
                  → Water and land systems in Drylands environments
                </li>
                <li style={{ padding: "0.3rem 0" }}>
                  → Water, land, and coastal systems (blue economy)
                </li>
                <li style={{ padding: "0.3rem 0" }}>
                  → Nature-based Solutions
                </li>
              </ul>
            </div>

            <div className="service-card">
              <h3>
                <i
                  className="fas fa-cloud-rain"
                  style={{
                    marginRight: "0.5rem",
                    color: "var(--secondary-earth)",
                  }}
                ></i>
                Climate Risk & Resilience
              </h3>
              <p style={{ marginBottom: "1rem" }}>
                Communities and systems face recurrent climate shocks. This
                pillar addresses climate change as a systemic risk multiplier
                affecting livelihoods, infrastructure, governance, and social
                stability.
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li style={{ padding: "0.3rem 0" }}>
                  → Climate Risk & Vulnerability Analysis (CRVA)
                </li>
                <li style={{ padding: "0.3rem 0" }}>
                  → Climate change adaptation and mitigation pathways
                </li>
                <li style={{ padding: "0.3rem 0" }}>
                  → Early warning systems and anticipatory action
                </li>
                <li style={{ padding: "0.3rem 0" }}>
                  → Climate security and conflict linkages
                </li>
              </ul>
            </div>

            <div className="service-card">
              <h3>
                <i
                  className="fas fa-tractor"
                  style={{
                    marginRight: "0.5rem",
                    color: "var(--secondary-earth)",
                  }}
                ></i>
                Rural Economy & Food Systems
              </h3>
              <p style={{ marginBottom: "1rem" }}>
                Rural economies remain highly exposed to climate stress,
                volatile markets, and weak safety nets. Understanding how
                households, markets, and food systems function under stress.
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li style={{ padding: "0.3rem 0" }}>
                  → Livelihood systems and household economies
                </li>
                <li style={{ padding: "0.3rem 0" }}>
                  → Food systems and nutrition pathways
                </li>
                <li style={{ padding: "0.3rem 0" }}>
                  → Markets, trade, and value chains
                </li>
                <li style={{ padding: "0.3rem 0" }}>
                  → Social protection and shock-responsive systems
                </li>
              </ul>
            </div>

            <div className="service-card">
              <h3>
                <i
                  className="fas fa-solar-panel"
                  style={{
                    marginRight: "0.5rem",
                    color: "var(--secondary-earth)",
                  }}
                ></i>
                Energy & Green Economy
              </h3>
              <p style={{ marginBottom: "1rem" }}>
                Energy gaps constrain productivity and adaptive capacity in
                rural areas. Viewing energy as an enabler of resilience,
                livelihoods, and inclusive economic transformation.
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li style={{ padding: "0.3rem 0" }}>
                  → Renewable energy systems
                </li>
                <li style={{ padding: "0.3rem 0" }}>
                  → Energy for productive and social uses
                </li>
                <li style={{ padding: "0.3rem 0" }}>
                  → Energy policy and governance
                </li>
                <li style={{ padding: "0.3rem 0" }}>
                  → Links between energy access and rural economies
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CONSULTANCY & ADVISORY ===== */}
      <div className="section" id="advisory">
        <div className="container">
          <h2>Consultancy & Advisory Division</h2>
          <p style={{ maxWidth: "70%", marginBottom: "2rem" }}>
            Evidence-based advisory services for policy, programme design, and
            investment decisions in fragile contexts.
          </p>
          <div className="grid-3">
            {/* Service 1 */}
            <div className="pillar-card">
              <i className="fas fa-chart-line pillar-icon"></i>
              <h3>Applied Research & Analytics</h3>
              <p>CRVA, HEA, market analysis, risk modeling, governance.</p>
              <div className="tag-group">
                <span className="tag">evidence-based</span>
                <span className="tag">analytical</span>
              </div>
              <a
                href="/services"
                className="btn-outline"
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  fontSize: "0.9rem",
                  padding: "0.5rem 1rem",
                }}
              >
                See more →
              </a>
            </div>
            {/* Service 2 */}
            <div className="pillar-card">
              <i className="fas fa-pencil-ruler pillar-icon"></i>
              <h3>Programme Design & Advisory</h3>
              <p>ToC development, resilience programming, adaptive design.</p>
              <div className="tag-group">
                <span className="tag">strategic</span>
                <span className="tag">systems thinking</span>
              </div>
              <a
                href="/services"
                className="btn-outline"
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  fontSize: "0.9rem",
                  padding: "0.5rem 1rem",
                }}
              >
                See more →
              </a>
            </div>
            {/* Service 3 */}
            <div className="pillar-card">
              <i className="fas fa-chart-pie pillar-icon"></i>
              <h3>MEAL Services</h3>
              <p>
                Baselines, evaluations, outcome harvesting, accountability
                systems.
              </p>
              <div className="tag-group">
                <span className="tag">learning</span>
                <span className="tag">impact</span>
              </div>
              <a
                href="/services"
                className="btn-outline"
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  fontSize: "0.9rem",
                  padding: "0.5rem 1rem",
                }}
              >
                See more →
              </a>
            </div>
            {/* Service 4 */}
            <div className="pillar-card">
              <i className="fas fa-chalkboard-teacher pillar-icon"></i>
              <h3>Capacity Building</h3>
              <p>
                Applied training, executive learning, analytical skills
                development.
              </p>
              <div className="tag-group">
                <span className="tag">training</span>
                <span className="tag">mentoring</span>
              </div>
              <a
                href="/services"
                className="btn-outline"
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  fontSize: "0.9rem",
                  padding: "0.5rem 1rem",
                }}
              >
                See more →
              </a>
            </div>
            {/* Service 5 */}
            <div className="pillar-card">
              <i className="fas fa-shield-virus pillar-icon"></i>
              <h3>Safeguards & Compliance</h3>
              <p>Environmental & social risk, ESMP, do-no-harm assessments.</p>
              <div className="tag-group">
                <span className="tag">risk management</span>
              </div>
              <a
                href="/services"
                className="btn-outline"
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  fontSize: "0.9rem",
                  padding: "0.5rem 1rem",
                }}
              >
                See more →
              </a>
            </div>
          </div>
          {/* View all services link */}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <div className="section section-bg-light" id="approach">
          <div className="container">
            <h2>Our Approach</h2>
            <p style={{ maxWidth: "70%", marginBottom: "2rem" }}>
              LAAPS operates at the intersection of research, policy, and
              practice. We bridge disciplines—combining social science, policy
              analysis, systems thinking, and applied research.
            </p>
            <div className="grid-3">
              <div className="approach-card">
                <i className="fas fa-lightbulb pillar-icon"></i>
                <h3>Evidence-to-Action</h3>
                <p>
                  We translate complex evidence into practical decision
                  pathways, supporting institutions to act with confidence in
                  uncertain contexts.
                </p>
              </div>
              <div className="approach-card">
                <i className="fas fa-project-diagram pillar-icon"></i>
                <h3>Systems Thinking</h3>
                <p>
                  We examine interconnected challenges across climate,
                  governance, livelihoods, and social systems to identify
                  leverage points for change.
                </p>
              </div>
              <div className="approach-card">
                <i className="fas fa-handshake pillar-icon"></i>
                <h3>Partnership-Based</h3>
                <p>
                  We strengthen local analytical capacity so that impact endures
                  beyond individual projects, building long-term institutional
                  capability.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== FEATURED WORK (experience) ===== */}
        <div className="section" id="work">
          <div className="container">
            <h2>Recent assignments</h2>
            <p style={{ maxWidth: "70%", marginBottom: "2rem" }}>
              Selected projects demonstrating our analytical capabilities and
              regional expertise.
            </p>
            <div className="grid-2" style={{ marginTop: "2rem" }}>
              <div className="work-card" style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "10px",

                    left: "20px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "var(--primary-deep)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                >
                  1
                </div>
                <div className="client-name" style={{ paddingTop: "2rem" }}>
                  IRARA{" "}
                  <span
                    style={{ fontWeight: 400, color: "var(--text-medium)" }}
                  >
                    · ESA Regional
                  </span>
                </div>
                <p className="project-title">
                  Framework agreement: reach, policy & technical advisory
                </p>
                <p className="small-meta">
                  Ahmed.fagaase@irara.org · +254115783111
                </p>
              </div>
              <div className="work-card" style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "20px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "var(--primary-deep)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                >
                  2
                </div>
                <div className="client-name" style={{ paddingTop: "2rem" }}>
                  Save the Children International
                </div>
                <p className="project-title">
                  Household Economic Analysis & Anticipatory Action planning
                </p>
                <p className="small-meta">
                  Mohamed Abdi Mohamed · +252907797251
                </p>
              </div>
              <div className="work-card" style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "20px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "var(--primary-deep)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                >
                  3
                </div>
                <div className="client-name" style={{ paddingTop: "2rem" }}>
                  NADFOR (Somaliland)
                </div>
                <p className="project-title">
                  Workshop: locally funded anticipatory action + organisational
                  risk register
                </p>
                <p className="small-meta">Hassan Mataan · +252634417314</p>
              </div>
              <div className="work-card" style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "20px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "var(--primary-deep)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                >
                  4
                </div>
                <div className="client-name" style={{ paddingTop: "2rem" }}>
                  Danish Refugee Council (DRC)
                </div>
                <p className="project-title">
                  Marketable assessments for vocational training (6 towns,
                  Somalia)
                </p>
                <p className="small-meta">
                  Simon Nziokah · s.nziokah@drcsomalia.org
                </p>
              </div>
              <div className="work-card" style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "20px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "var(--primary-deep)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                >
                  5
                </div>
                <div className="client-name" style={{ paddingTop: "2rem" }}>
                  Initiative for Relief and Climate Action (IRCA)
                </div>
                <p className="project-title">
                  5‑year strategy & Program Quality Toolkit
                </p>
                <p className="small-meta">Abdullahi Mohamed · 0615111516</p>
              </div>
              <div className="work-card" style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "20px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "var(--primary-deep)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                >
                  6
                </div>
                <div className="client-name" style={{ paddingTop: "2rem" }}>
                  International Rescue Committee
                </div>
                <p className="project-title">
                  Household Economic Analysis (Somalia)
                </p>
                <p className="small-meta">Mohamed Abdi Mohamed (SCI)</p>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <a
                href="/projects"
                className="cta-button"
                style={{ display: "inline-block" }}
              >
                View all projects →
              </a>
            </div>
          </div>
        </div>

        {/* ===== INSTITUTIONAL STRUCTURE ===== */}
        <div className="section">
          <div className="container">
            <h2>Institutional Structure</h2>
            <p style={{ maxWidth: "70%", marginBottom: "2rem" }}>
              LAAPS operates with a clear governance and management structure to
              ensure accountability, quality, and integrity.
            </p>
            <div className="grid-3">
              <div className="pillar-card">
                <i className="fas fa-user-tie pillar-icon"></i>
                <h3>Executive Director</h3>
                <p>
                  Strategic leadership and external engagement with partners and
                  stakeholders.
                </p>
              </div>
              <div className="pillar-card">
                <i className="fas fa-users-cog pillar-icon"></i>
                <h3>Deputy ED – Programs</h3>
                <p>
                  Oversight of research and consultancy delivery across all
                  thematic areas.
                </p>
              </div>
              <div className="pillar-card">
                <i className="fas fa-building pillar-icon"></i>
                <h3>Deputy ED – Operations</h3>
                <p>
                  Finance, HR, procurement, compliance, and safeguarding
                  coordination.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== STATS / IMPACT ===== */}
        <div className="section section-bg-light">
          <div className="container">
            <h2>Our Impact in Numbers</h2>
            <div className="grid-4" style={{ textAlign: "center" }}>
              <div className="stat-card">
                <div className="stat-number">20+</div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">10+</div>
                <div className="stat-label">Partner Organizations</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">3</div>
                <div className="stat-label">Countries of Operation</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">4</div>
                <div className="stat-label">Research Pillars</div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== NEWS & UPDATES ===== */}
        {news.length > 0 && (
          <div className="section">
            <div className="container">
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h2>Latest News & Updates</h2>
                <p
                  style={{
                    maxWidth: "700px",
                    margin: "0 auto",
                    color: "#64748b",
                  }}
                >
                  Stay informed about our latest research findings, events, and
                  announcements
                </p>
              </div>
              <div className="grid-3">
                {news.map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="news-card">
                      {item.imageUrl && (
                        <div className="news-image-wrapper">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="news-image"
                          />
                        </div>
                      )}
                      <div className="news-card-content">
                        <div className="news-meta">
                          {item.category && (
                            <span className="news-category">
                              {item.category}
                            </span>
                          )}
                          <span className="news-date">
                            <i className="fas fa-calendar"></i>{" "}
                            {formatDate(item.publishDate)}
                          </span>
                        </div>
                        <h3>{item.title}</h3>
                        {item.excerpt && (
                          <p className="news-excerpt">{item.excerpt}</p>
                        )}
                        {item.author && (
                          <div className="news-author">
                            <i className="fas fa-user"></i> {item.author}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
                <Link href="/news" className="btn">
                  View All News <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ===== PUBLICATIONS ===== */}
        {publications.length > 0 && (
          <div className="section section-bg-light">
            <div className="container">
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h2>Recent Publications</h2>
                <p
                  style={{
                    maxWidth: "700px",
                    margin: "0 auto",
                    color: "#64748b",
                  }}
                >
                  Explore our latest academic publications and research findings
                </p>
              </div>
              <div className="grid-3">
                {publications.map((item) => (
                  <Link
                    key={item.id}
                    href={`/publications/${item.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      className="publication-card"
                      style={{
                        background: "white",
                        borderRadius: "16px",
                        padding: "1.5rem",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        cursor: "pointer",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 30px rgba(0, 0, 0, 0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 20px rgba(0, 0, 0, 0.08)";
                      }}
                    >
                      <div style={{ marginBottom: "1rem" }}>
                        <span
                          style={{
                            color: "#64748b",
                            fontSize: "0.85rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                          }}
                        >
                          <i className="fas fa-calendar"></i>{" "}
                          {formatDate(item.publicationDate)}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: 700,
                          marginBottom: "0.8rem",
                          color: "#1e293b",
                          lineHeight: "1.3",
                        }}
                      >
                        {item.title}
                      </h3>
                      {item.authors && item.authors.length > 0 && (
                        <p
                          style={{
                            color: "#475569",
                            fontSize: "0.9rem",
                            marginBottom: "0.8rem",
                            fontStyle: "italic",
                          }}
                        >
                          {item.authors.join(", ")}
                        </p>
                      )}
                      {item.journal && (
                        <p
                          style={{
                            color: "#0b2e48",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            marginBottom: "0.8rem",
                          }}
                        >
                          {item.journal}
                        </p>
                      )}
                      {item.abstract && (
                        <p
                          style={{
                            color: "#64748b",
                            fontSize: "0.9rem",
                            lineHeight: "1.6",
                            marginBottom: "1rem",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.abstract}
                        </p>
                      )}
                      <div style={{ marginTop: "auto", paddingTop: "1rem" }}>
                        <span
                          style={{
                            color: "#0b2e48",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                          }}
                        >
                          Read More <i className="fas fa-arrow-right"></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
                <Link href="/publications" className="btn">
                  View All Publications <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
