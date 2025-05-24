import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { getHeaders } from "../../utils/getHeaders";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AdminsService {
  private baseUrl = `${environment.apiUrl}/api/admin` || "http://localhost:5039/api/admin";

  constructor(private http: HttpClient) {}

  getAllAdmins(): Observable<any> {
    return this.http.get<any>(this.baseUrl, { headers: getHeaders() });
  }

  getAdminById(adminId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${adminId}`, {
      headers: getHeaders()
    });
  }

  createAdmin(adminData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, adminData, {
      headers: getHeaders()
    });
  }

  updateAdmin(
    adminId: string,
    updateData: { name?: string; login?: string; password?: string }
  ): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${adminId}`, updateData, {
      headers: getHeaders()
    });
  }

  updateRequestStatus(requestId: number, status: string): Observable<any> {
    const requestData = { status };
    return this.http.put<any>(`${this.baseUrl}/request/${requestId}/status`, requestData, {
      headers: getHeaders()
    });
  }

  deleteAdmin(adminId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${adminId}`, {
      headers: getHeaders()
    });
  }
}
