import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { MailData } from "../../interfaces/mailData";
import { Visitor } from "../../interfaces/visitor";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ClientService {
  private baseUrl = `${environment.apiUrl}/api` || "http://localhost:5039/api";
  private ipifyUrl = "https://api.ipify.org?format=json";

  constructor(private http: HttpClient) {}

  sendClientMail(mailData: MailData): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/send_mail`, mailData)
      .pipe(catchError(this.handleError));
  }

  getIPAddress(): Observable<any> {
    return this.http.get(this.ipifyUrl);
  }

  trackVisit(visitorData: Visitor): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/visit`, visitorData);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = "Невідома помилка";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Помилка мережі: ${error.error.message}`;
    } else {
      errorMessage = `Сервер повернув помилку: ${error.status}, ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
