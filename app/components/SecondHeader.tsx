"use client";

import menu from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

function SecondHeader() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsHeaderVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;

      // Always reveal near the top for reliable return behavior.
      if (currentScrollY <= 80) {
        setIsHeaderVisible(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      // Ignore tiny movements that cause flicker.
      if (Math.abs(scrollDelta) < 6) {
        return;
      }

      if (scrollDelta > 0) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    setIsHeaderVisible(true);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  }, [pathname]);

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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  };

  return (
    <div>
      {" "}
      <header
        // style={{ position: "fixed", zIndex: 1000, width: "100%" }}
        className={`header-bar ${isHeaderVisible ? "" : "header-hidden"} ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}
      >
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
          <button
            type="button"
            className={`mobile-nav-toggle ${isMobileMenuOpen ? "mobile-nav-toggle-open" : ""}`}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className="nav-links">
            {beforeAndIncludingAbout.map((item) => (
              <Link key={item.id} href={item.link} className="nav-link">
                {item.name}
              </Link>
            ))}
            <div className="nav-dropdown">
              <span className="nav-dropdown-trigger">Services</span>
              <div className="dropdown-menu">
                <Link href="/publications" className="dropdown-item">
                  Research
                </Link>
                <div className="dropdown-group">
                  <span className="dropdown-group-title">
                    Consultancy &amp; Advisory
                  </span>
                  <Link href="/consultancy" className="dropdown-sub-item">
                    Consultancy
                  </Link>
                  <Link href="/services#advisory" className="dropdown-sub-item">
                    Advisory
                  </Link>
                </div>
              </div>
            </div>
            {afterAbout.map((item) => (
              <Link key={item.id} href={item.link} className="nav-link">
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
        <button
          type="button"
          aria-label="Close mobile menu"
          className={`mobile-nav-backdrop ${isMobileMenuOpen ? "mobile-nav-backdrop-open" : ""}`}
          onClick={closeMobileMenu}
        />
        <div
          className={`mobile-nav-panel ${isMobileMenuOpen ? "mobile-nav-panel-open" : ""}`}
        >
          <div className="mobile-nav-list">
            {beforeAndIncludingAbout.map((item) => (
              <Link
                key={`mobile-menu-${item.id}`}
                href={item.link}
                className="mobile-nav-link"
                onClick={closeMobileMenu}
              >
                {item.name}
              </Link>
            ))}
            <div className="mobile-services-section">
              <button
                type="button"
                className="mobile-services-trigger"
                aria-expanded={isMobileServicesOpen}
                onClick={() => setIsMobileServicesOpen((current) => !current)}
              >
                <span>Services</span>
                <span>{isMobileServicesOpen ? "−" : "+"}</span>
              </button>
              <div
                className={`mobile-services-items ${isMobileServicesOpen ? "mobile-services-items-open" : ""}`}
              >
                <Link
                  href="/publications"
                  className="mobile-nav-sublink"
                  onClick={closeMobileMenu}
                >
                  Research
                </Link>
                <Link
                  href="/consultancy"
                  className="mobile-nav-sublink"
                  onClick={closeMobileMenu}
                >
                  Consultancy
                </Link>
                <Link
                  href="/services#advisory"
                  className="mobile-nav-sublink"
                  onClick={closeMobileMenu}
                >
                  Advisory
                </Link>
              </div>
            </div>
            {afterAbout.map((item) => (
              <Link
                key={`mobile-menu-after-${item.id}`}
                href={item.link}
                className="mobile-nav-link"
                onClick={closeMobileMenu}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="cta-button mobile-nav-cta"
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </header>
      <div style={{ marginTop: "5rem" }}></div>
    </div>
  );
}

export default SecondHeader;
