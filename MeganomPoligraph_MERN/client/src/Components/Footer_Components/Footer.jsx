import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Standard-Component-style.css";
import "./Footer.css";

export default function Footer() {
  const { t } = useTranslation("global");

  return (
    <footer className="footer-wrap">
      <Container fluid className="footer">
        <div>
          <p>
            {t("footer.phone")}
            <br />
            <a href="tel:+380992340083">+380 (99) 234 0083</a>
            <br />
            <a href="tel:+380679308951">+380 (67) 930 8951</a>
          </p>
          <p>
            {t("footer.mail")}
            <br />
            <a href="mailto: chief@meganom-polygraph.com.ua ">
              chief@meganom-polygraph.com.ua
            </a>
          </p>
        </div>
        <p>меганом-поліграф ©.</p>
      </Container>
    </footer>
  );
}
