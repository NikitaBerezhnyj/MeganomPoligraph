import React, { useState } from "react";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import RequestsMailSuccess from "./RequestsMailSuccess";
import RequestsMailError from "./RequestsMailError";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Standard-Component-style.css";
import "./Requests.css";

export default function Requests() {
  const { t } = useTranslation("global");
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    phone: "",
    mail: "",
    message: ""
  });
  const [showMailSuccess, setShowMailSuccess] = useState(false);
  const [showMailError, setShowMailError] = useState(false);
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const mailInputRef = useRef(null);
  const messageInputRef = useRef(null);

  const handleSendMessage = async () => {
    const nameInput = nameInputRef.current.value;
    const phoneInput = phoneInputRef.current.value;
    const mailInput = mailInputRef.current.value;
    const messageInput = messageInputRef.current.value;

    const errors = {};

    if (!nameInput) {
      errors.name = t("requests.name-error");
    }

    if (!phoneInput && !mailInput) {
      errors.phone = t("requests.contact-error");
    }

    if (!messageInput) {
      errors.message = t("requests.massage-error");
    }

    if (phoneInput && !validatePhone(phoneInput)) {
      errors.phone = t("requests.phone-error");
    }

    if (mailInput && !validateEmail(mailInput)) {
      errors.mail = t("requests.mail-error");
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    const userMessage = {
      name: nameInput,
      phone: phoneInput,
      mail: mailInput,
      message: messageInput
    };

    setShowMailError(false);

    try {
      const currentProtocol = window.location.protocol;
      let apiUrl = "http://meganom-polygraph.com/send-mail"; // за замовчуванням http

      if (currentProtocol === "https:") {
        apiUrl = "https://meganom-polygraph.com/send-mail"; // якщо поточний протокол - https, використовуйте https
      }

      await axios.post(apiUrl, userMessage);
      console.log("Email sent successfully");
      clearInput();
      setTimeout(() => {
        setShowMailSuccess(true);
      }, 250);
    } catch (error) {
      if (error.response) {
        // Сервер відповів кодом стану, що не відповідає 2xx
        console.error("Server response error:", error.response.data);
      } else if (error.request) {
        // Запит був зроблений, але відповіді не отримано
        console.error("No response from server:", error.request);
      } else {
        // Помилка налаштування запиту
        console.error("Error setting up request:", error.message);
      }
      setShowMailError(true);
    }
  };

  const validatePhone = phone => {
    const phoneRegex = /^\+?3?8?(0\d{9})$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const clearInput = () => {
    nameInputRef.current.value = "";
    phoneInputRef.current.value = "";
    mailInputRef.current.value = "";
    messageInputRef.current.value = "";
    setShowMailSuccess(false);
  };

  return (
    <>
      {/* Modal success */}
      <RequestsMailSuccess show={showMailSuccess} />
      {/* Modal error */}
      <RequestsMailError show={showMailError} />
      {/* Main block */}
      <Container className="requests mar-48" id="requests">
        <Row>
          <h1>{t("requests.header")}</h1>
        </Row>
        <Row className="send-form">
          <div className="input-header">
            <p>{t("requests.name-label")}</p>
            {errorMessages.name && (
              <p style={{ color: "red" }} id="name-error">
                {errorMessages.name}
              </p>
            )}
          </div>
          <input
            type="text"
            placeholder={t("requests.name-placeholder")}
            ref={nameInputRef}
            required
            aria-describedby="name-error"
            onChange={() => setErrorMessages({ ...errorMessages, name: "" })}
          />
          <div className="input-header">
            <p>{t("requests.phone-label")}</p>
            {errorMessages.phone && (
              <p style={{ color: "red" }} id="phone-error">
                {errorMessages.phone}
              </p>
            )}
          </div>
          <input
            type="tel"
            placeholder={t("requests.phone-placeholder")}
            ref={phoneInputRef}
            required
            aria-describedby="phone-error"
            onChange={() => setErrorMessages({ ...errorMessages, phone: "" })}
          />
          <div className="input-header">
            <p>{t("requests.mail-label")}</p>
            {errorMessages.mail && (
              <p style={{ color: "red" }} id="mail-error">
                {errorMessages.mail}
              </p>
            )}
          </div>
          <input
            type="email"
            placeholder={t("requests.mail-placeholder")}
            ref={mailInputRef}
            aria-describedby="mail-error"
            onChange={() => setErrorMessages({ ...errorMessages, mail: "" })}
          />
          <div className="input-header">
            <p>{t("requests.massage-label")}</p>
            {errorMessages.message && (
              <p style={{ color: "red" }} id="message-error">
                {errorMessages.message}
              </p>
            )}
          </div>
          <textarea
            className="user-message"
            name="user-message"
            placeholder={t("requests.massage-placeholder")}
            rows={7}
            ref={messageInputRef}
            aria-describedby="message-error"
            onChange={() => setErrorMessages({ ...errorMessages, message: "" })}
          ></textarea>
          <button className="send-button" onClick={handleSendMessage}>
            {t("requests.button")}
          </button>
        </Row>
      </Container>
    </>
  );
}
