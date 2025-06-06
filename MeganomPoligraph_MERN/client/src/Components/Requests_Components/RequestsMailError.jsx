import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Standard-Component-style.css";
import "./Requests.css";

export default function RequestsMailError({ show }) {
  const { t } = useTranslation("global");
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [show]);

  return (
    <>
      <div className={`mail-error-container ${isVisible ? "" : "hide"}`}>
        {isVisible && (
          <>
            <p>{t("requests.error")}</p>
            <div className="progress-bar">
              <div className="progress" />
            </div>
          </>
        )}
      </div>
    </>
  );
}
