import { jwtDecode } from "jwt-decode";

export function checkUserRole() {
  const token = localStorage.getItem("jwt_token");
  let isAdmin = false;
  let isSuperAdmin = false;

  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      isAdmin = decodedToken.role === "Admin" || decodedToken.role === "SuperAdmin";
      isSuperAdmin = decodedToken.role === "SuperAdmin";
    } catch (error) {
      console.error("Помилка декодування токена:", error);
    }
  }

  return { isAdmin, isSuperAdmin };
}
