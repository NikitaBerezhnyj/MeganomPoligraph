import { HttpHeaders } from "@angular/common/http";

export function getHeaders(): HttpHeaders {
  const token = localStorage.getItem("jwt_token");
  let headers = new HttpHeaders();
  if (token) {
    headers = headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
}
