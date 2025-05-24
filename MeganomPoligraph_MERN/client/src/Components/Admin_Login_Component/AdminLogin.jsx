import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Standard-Component-style.css";
import "./AdminLogin.css";
import { adminLogin } from "../../API/adminApi";
import { CgDanger } from "react-icons/cg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function AdminLogin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!login) {
      newErrors.login = "* Логін обов'язковий";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "* Пароль обов'язковий";
      isValid = false;
    } else if (password.length < 5) {
      newErrors.password = "* Пароль має бути довший 5 символів";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAdminLogin = async e => {
    e.preventDefault();
    if (validateForm()) {
      const loginQuery = { login, password };
      try {
        const res = await adminLogin(loginQuery);
        localStorage.setItem("jwtToken", res.data);
        window.location.reload();
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setErrorMessage(error.response.data.message);
        }
      }
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-wrap">
        <h1>Увійдіть як адміністратор</h1>
        <form onSubmit={handleAdminLogin}>
          <div className="admin-login-input-container">
            <div className="admin-login-header">
              <label htmlFor="login">Логін</label>
              {errors.login && (
                <span style={{ color: "red" }}>{errors.login}</span>
              )}
            </div>
            <input
              type="text"
              id="login"
              placeholder="Введіть логін адміністратора"
              onChange={e => {
                setLogin(e.target.value);
                setErrors({ ...errors, login: "" });
              }}
            />
          </div>
          <div>
            <div className="admin-login-header">
              <label htmlFor="password">Пароль</label>
              {errors.password && (
                <span style={{ color: "red" }}>{errors.password}</span>
              )}
            </div>
            <div className="password-input-container">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Введіть пароль адміністратора"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: "" });
                }}
                aria-describedby="password-error"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          {errorMessage && (
            <div className="server-error-message">
              <CgDanger />
              {errorMessage}
            </div>
          )}
          <button className="admin-login-button" type="submit">
            Вхід
          </button>
        </form>
      </div>
    </div>
  );
}
