import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Standard-Component-style.css";
import "./About.css";

export default function About() {
  const { t } = useTranslation("global");

  return (
    <Container className="mar-48" id="about">
      <h1>{t("about.header")}</h1>
      <p>{t("about.about-paragraph-first")}</p>
      <p>{t("about.about-paragraph-second")}</p>
      <p>{t("about.about-paragraph-third")}</p>
      <p>{t("about.about-paragraph-fourth")}</p>
    </Container>
  );
}
