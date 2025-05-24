import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Standard-Component-style.css";
import "./Hero.css";

export default function Hero() {
  const { t } = useTranslation("global");

  return (
    <section className="hero-container mar-48">
      <Container id="hero" className="hero">
        <div className="hero-text">
          <h1>{t("hero.header")}</h1>
          <p>{t("hero.services")}</p>
          <p>
            <a href="tel:+380992340083">+380 (99) 234 0083</a> ⋅{" "}
            <a href="tel:+380679308951">+380 (67) 930 8951</a>
          </p>
        </div>
      </Container>
    </section>
  );
}
