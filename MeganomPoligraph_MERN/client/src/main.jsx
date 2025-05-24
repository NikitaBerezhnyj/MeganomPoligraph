import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import global_ua from "./Translations/ua/global.json";
import global_ru from "./Translations/ru/global.json";
import global_en from "./Translations/en/global.json";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import App from "./App";
import "./main.css";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "ua",
  resources: {
    ua: {
      global: global_ua
    },
    ru: {
      global: global_ru
    },
    en: {
      global: global_en
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);
