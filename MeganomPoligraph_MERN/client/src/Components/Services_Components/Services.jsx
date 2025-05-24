import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Standard-Component-style.css";
import "./Services.css";

export default function Services() {
  const { t } = useTranslation("global");
  const [showModal, setShowModal] = useState(false);
  const [modalHeader, setModalHeader] = useState("");
  const [modalContent, setModalContent] = useState("");

  const handleShowModal = (header, content) => {
    setModalHeader(header);
    setModalContent(content);
    setShowModal(true);
  };

  const handleCloseModal = event => {
    if (
      event.target.tagName !== "IMG" &&
      event.target.tagName !== "PRE" &&
      event.target.tagName !== "H2" &&
      !event.target.classList.contains("model-description")
    ) {
      setShowModal(false);
    }
  };

  const renderService = (
    header,
    shortDescription,
    longDescription,
    imageSrc
  ) => (
    <Col
      md
      className="service-container"
      onClick={() => handleShowModal(header, longDescription)}
    >
      <div className="content-wrapper">
        <img src={imageSrc} alt="" className="service-image" />
        <div className="service-details">
          <h4>{header}</h4>
          <p>{shortDescription}</p>
        </div>
      </div>
    </Col>
  );

  return (
    <>
      {/* Modal */}
      <div
        className={showModal ? "model open" : "model"}
        onClick={handleCloseModal}
      >
        <Row>
          <button onClick={() => setShowModal(false)}>X</button>
        </Row>
        <Row>
          <div className="model-wrap">
            <div className="model-description">
              <h2 className="mar-24">{modalHeader}</h2>
              <pre dangerouslySetInnerHTML={{ __html: modalContent }} />
            </div>
          </div>
        </Row>
      </div>

      {/* Main Content */}
      <Container className="mar-48" id="services">
        <Row className="mar-36">
          <h1>{t("services.header")}</h1>
        </Row>
        <Row className="mar-16">
          {renderService(
            t("services.service-first-header"),
            t("services.service-first-short-description"),
            t("services.service-first-long-description"),
            "/img/services/cardboard.png"
          )}
          {renderService(
            t("services.service-second-header"),
            t("services.service-second-short-description"),
            t("services.service-second-long-description"),
            "/img/services/logo.png"
          )}
          {renderService(
            t("services.service-third-header"),
            t("services.service-third-short-description"),
            t("services.service-third-long-description"),
            "/img/services/cardboard.png"
          )}
        </Row>
        <Row>
          {renderService(
            t("services.service-fourth-header"),
            t("services.service-fourth-short-description"),
            t("services.service-fourth-long-description"),
            "/img/services/craft.png"
          )}
          {renderService(
            t("services.service-fifth-header"),
            t("services.service-fifth-short-description"),
            t("services.service-fifth-long-description"),
            "/img/services/present.png"
          )}
          {renderService(
            t("services.service-sixth-header"),
            t("services.service-sixth-short-description"),
            t("services.service-sixth-long-description"),
            "/img/services/folder.png"
          )}
        </Row>
        <Row>
          {renderService(
            t("services.service-seventh-header"),
            t("services.service-seventh-short-description"),
            t("services.service-seventh-long-description"),
            "/img/services/design.png"
          )}
          {renderService(
            t("services.service-eighth-header"),
            t("services.service-eighth-short-description"),
            t("services.service-eighth-long-description"),
            "/img/services/ultraviolet_varnish.png"
          )}
          {renderService(
            t("services.service-ninth-header"),
            t("services.service-ninth-short-description"),
            t("services.service-ninth-long-description"),
            "/img/services/embossing.png"
          )}
        </Row>
      </Container>
    </>
  );
}
