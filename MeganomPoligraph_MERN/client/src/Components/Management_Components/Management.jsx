import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "../Standard-Component-style.css";
import "./Management.css";

export default function Management() {
  const { t } = useTranslation("global");

  return (
    <Container className="mar-48" id="management">
      <Row className="mar-36">
        <h1>{t("management.header")}</h1>
      </Row>
      <Row>
        <Col lg className="manager-card">
          <div className="manager-card-img">
            <img src="/img/management/irina.png" alt="Зображення Тетяни" />
          </div>
          <div className="manager-card-text">
            <h3>{t("management.name-first")}</h3>
            <p className="manager-card-text-position">
              {t("management.position")}
            </p>
            <p>
              {t("management.phone")}
              <a href="tel:+380992340083">+380992340083</a>
            </p>
          </div>
          <div className="contact-container mar-24">
            <span className="messenger-logos">
              <a href="tel:+380992340083">
                <img src="/img/messenger_logos/phone.png" alt="Phone" />
              </a>
              <a href="viber://chat?number=0992340083">
                <img src="/img/messenger_logos/viber.png" alt="Viber" />
              </a>
              <a
                href="https://t.me/+380992340083"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/img/messenger_logos/telegram.png" alt="Telegram" />
              </a>
              <a href="https://wa.me/+380992340083">
                <img src="/img/messenger_logos/whatsapp.png" alt="WhatsApp" />
              </a>
            </span>
          </div>
        </Col>
        <Col lg className="manager-card">
          <div className="manager-card-img">
            <img src="/img/management/tetyana.png" alt="Зображення Тетяни" />
          </div>
          <div className="manager-card-text">
            <h3>{t("management.name-second")}</h3>
            <p className="manager-card-text-position">
              {t("management.position")}
            </p>
            <p>
              {t("management.phone")}
              <a href="tel:+380679308951">+380679308951</a>
            </p>
          </div>
          <div className="contact-container mar-24">
            <span className="messenger-logos">
              <a href="tel:+380679308951">
                <img src="/img/messenger_logos/phone.png" alt="Phone" />
              </a>
              <a href="viber://chat?number=0679308951">
                <img src="/img/messenger_logos/viber.png" alt="Viber" />
              </a>
              <a
                href="https://t.me/+380679308951"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/img/messenger_logos/telegram.png" alt="Telegram" />
              </a>
              <a href="https://wa.me/+380679308951">
                <img src="/img/messenger_logos/whatsapp.png" alt="WhatsApp" />
              </a>
            </span>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
