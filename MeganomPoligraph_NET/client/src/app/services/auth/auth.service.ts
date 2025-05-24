import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { isPlatformBrowser } from "@angular/common";
import { jwtDecode } from "jwt-decode";
import { environment } from "../../../environments/environment";

interface LoginResponse {
  jwt_token: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly TOKEN_KEY = "jwt_token";
  private readonly TOKEN_TIMESTAMP = "jwt_timestamp";
  private readonly EXPIRATION_DAYS = 30;
  private baseUrl = `${environment.apiUrl}/api/admin` || "http://localhost:5039/api/admin";

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(login: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { login, password }).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          const now = new Date().getTime();
          localStorage.setItem(this.TOKEN_KEY, response.jwt_token);
          localStorage.setItem(this.TOKEN_TIMESTAMP, now.toString());
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.TOKEN_TIMESTAMP);
    }
  }

  isAuthenticated(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const token = localStorage.getItem(this.TOKEN_KEY);
    const timestamp = localStorage.getItem(this.TOKEN_TIMESTAMP);

    if (!token || !timestamp) {
      return false;
    }

    const now = Date.now();
    const storedTime = parseInt(timestamp, 10);
    const expirationTime = this.EXPIRATION_DAYS * 24 * 60 * 60 * 1000;

    if (now - storedTime > expirationTime) {
      this.logout();
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      if (!decodedToken || !decodedToken.exp) {
        this.logout();
        return false;
      }

      const tokenExpTime = decodedToken.exp * 1000;
      if (now > tokenExpTime) {
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      this.logout();
      return false;
    }
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
