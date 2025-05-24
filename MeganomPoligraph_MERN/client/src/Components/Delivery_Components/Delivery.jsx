import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Standard-Component-style.css";
import "./Delivery.css";

export default function Delivery() {
  const { t } = useTranslation("global");

  return (
    <Container className="mar-48" id="delivery">
      <h1>{t("delivery.header")}</h1>
      <Row>
        <Col lg>
          <p>
            <b>{t("delivery.kyiv")}</b>
          </p>
          <p
            dangerouslySetInnerHTML={{
              __html: t("delivery.kyiv-paragraph-first")
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: t("delivery.kyiv-paragraph-second")
            }}
          />
        </Col>
        <Col lg>
          <p>
            <b>{t("delivery.ukraine")}</b>
          </p>
          <p
            dangerouslySetInnerHTML={{
              __html: t("delivery.ukraine-paragraph-first")
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: t("delivery.ukraine-paragraph-second")
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}
