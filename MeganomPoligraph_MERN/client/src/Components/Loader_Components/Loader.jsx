import React from "react";
import useLoad from "../../Hooks/useLoad";
import "./Loader.css";

const Loader = () => {
  const loading = useLoad();

  return (
    <div className={`loader-container ${loading ? "visible" : "hidden"}`}>
      <div className="loader">
        <img src="/img/logo-light.png" alt="logo" />
      </div>
    </div>
  );
};

export default Loader;
