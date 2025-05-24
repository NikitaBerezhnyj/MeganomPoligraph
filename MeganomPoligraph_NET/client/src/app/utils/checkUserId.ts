import { jwtDecode } from "jwt-decode";

export function checkUserId() {
  const token = localStorage.getItem("jwt_token");
  let adminID: number = 1;

  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      adminID = decodedToken.id;
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }

  return adminID;
}
