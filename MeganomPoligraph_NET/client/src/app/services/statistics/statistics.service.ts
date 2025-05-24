import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { getHeaders } from "../../utils/getHeaders";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class StatisticsService {
  private baseUrl =
    `${environment.apiUrl}/api/statistics` || "http://localhost:5039/api/statistics";

  constructor(private http: HttpClient) {}

  getStatisticsData(timePeriod: string = "all"): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?timePeriod=${timePeriod}`, {
      headers: getHeaders()
    });
  }

  getAllRequests(timePeriod: string = "all"): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/requests?timePeriod=${timePeriod}`, {
      headers: getHeaders()
    });
  }
}
