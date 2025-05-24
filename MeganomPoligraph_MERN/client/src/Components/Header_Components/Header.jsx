import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useTranslation } from "react-i18next";
import "../Standard-Component-style.css";
import "./Header.css";

export default function Header() {
  const { t, i18n } = useTranslation("global");
  const [activeSection, setActiveSection] = useState("hero");
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [themeToggleAnimating, setThemeToggleAnimating] = useState(false);

  useEffect(() => {
    // Визначення теми
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    setIsLightTheme(!prefersDarkScheme.matches);

    // Визначення мови
    let defaultLang;
    switch (navigator.language) {
      case "uk-UA":
        defaultLang = "ua";
        break;
      case "ru-RU":
        defaultLang = "ru";
        break;
      default:
        defaultLang = "en";
        break;
    }

    // Зміна мови
    i18n.changeLanguage(defaultLang);
  }, [i18n]);

  const toggleTheme = () => {
    setThemeToggleAnimating(true);
    setTimeout(() => {
      setIsLightTheme(prevTheme => !prevTheme);
      setThemeToggleAnimating(false);
    }, 400);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("light-theme", isLightTheme);
    document.documentElement.classList.toggle("dark-theme", !isLightTheme);
  }, [isLightTheme]);

  const handleLanguageChange = event => {
    const lang = event.target.value;
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const sections = [
      "hero",
      "services",
      "portfolio",
      "management",
      "about",
      "delivery",
      "requests"
    ];
    let foundActiveSection = "";
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top <= 100 && position.bottom >= 100) {
          foundActiveSection = section;
          break;
        }
      }
    }
    setActiveSection(foundActiveSection);
  };

  const scrollToSection = sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      let position = element.getBoundingClientRect();
      window.scrollTo(position.left, position.top + window.scrollY - 50);
    }
  };

  const handleNavLinkClick = sectionId => {
    scrollToSection(sectionId);
    setActiveSection(sectionId);
  };

  return (
    <Navbar
      expand="xl"
      className="header fixed"
      variant={isLightTheme ? "light" : "dark"}
    >
      <Container fluid>
        <Navbar.Brand onClick={() => handleNavLinkClick("hero")}>
          <img
            src={isLightTheme ? "/img/logo-light.png" : "/img/logo-dark.png"}
            alt="logo"
          />
          <span>{t("header.brand")}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="nav-btn" />
        <Navbar.Collapse className="justify-content-end nav-collapse">
          <Nav className="ms-auto">
            {[
              "hero",
              "services",
              "portfolio",
              "management",
              "about",
              "delivery",
              "requests"
            ].map(sectionId => (
              <Nav.Link
                key={sectionId}
                className={
                  activeSection === sectionId ? "nav-item active" : "nav-item"
                }
                onClick={() => handleNavLinkClick(sectionId)}
              >
                {t(`header.${sectionId}`)}
              </Nav.Link>
            ))}
            {/* Перемикання мови */}
            {/* <Nav className="mr-2 change-lang-div">
              <select
                onChange={handleLanguageChange}
                defaultValue={i18n.language}
              >
                <option value="ua">Українська</option>
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>
            </Nav> */}
            <Nav className="mr-2 change-lang-div">
              <select onChange={handleLanguageChange} value={i18n.language}>
                <option value="ua">Українська</option>
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>
            </Nav>
            {/* Перемикання теми */}
            <Nav.Item className="mr-2">
              <button className="theme-toggle-button" onClick={toggleTheme}>
                <img
                  src={isLightTheme ? "/img/sun.png" : "/img/moon.png"}
                  alt={isLightTheme ? "sun" : "moon"}
                  className={themeToggleAnimating ? "slide-out" : "slide-in"}
                />
              </button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
