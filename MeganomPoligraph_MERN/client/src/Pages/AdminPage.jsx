import React, { useEffect, useState } from "react";
import AdminLogin from "../Components/Admin_Login_Component/AdminLogin";
import AdminView from "../Components/Admin_View_Component/AdminView";

function AdminPage() {
  const token = localStorage.getItem("jwtToken");
  const [isLightTheme, setIsLightTheme] = useState(false);

  useEffect(() => {
    // Визначення теми
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    setIsLightTheme(!prefersDarkScheme.matches);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light-theme", isLightTheme);
    document.documentElement.classList.toggle("dark-theme", !isLightTheme);
  }, [isLightTheme]);

  return <>{token === null ? <AdminLogin /> : <AdminView />}</>;
}

export default AdminPage;
