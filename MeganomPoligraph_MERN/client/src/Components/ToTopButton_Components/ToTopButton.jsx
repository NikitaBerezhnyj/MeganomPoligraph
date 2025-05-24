import React from "react";
import { useEffect, useState } from "react";
import { scrollToSection } from "../../Utils/scrollToSection";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Standard-Component-style.css";
import "./ToTopButton.css";

const ToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className={`to-top-button-container ${isVisible ? "show" : ""}`}>
      <button
        className="scroll-btn to-top-button"
        onClick={e => {
          e.preventDefault();
          scrollToSection("hero", 64);
        }}
      >
        <span className="to-top-arrow"></span>
      </button>
    </div>
  );
};

export default ToTopButton;
