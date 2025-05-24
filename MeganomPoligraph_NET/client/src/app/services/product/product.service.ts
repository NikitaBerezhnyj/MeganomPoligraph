import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { getHeaders } from "../../utils/getHeaders";
import { Product } from "../../interfaces/product";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private baseUrl = `${environment.apiUrl}/api/products` || "http://localhost:5039/api/products";

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getProductsByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/category/${category}`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addProduct(request: Product): Observable<any> {
    return this.http.post<any>(this.baseUrl, request, {
      headers: getHeaders()
    });
  }

  lockProduct(id: number, adminId: number): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/${id}/lock`,
      { userId: adminId },
      {
        headers: getHeaders()
      }
    );
  }

  updateProduct(id: number, request: Product): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, request, {
      headers: getHeaders()
    });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`, {
      headers: getHeaders()
    });
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file, file.name);

    return this.http.post<any>(`${this.baseUrl}/upload`, formData, {
      headers: getHeaders()
    });
  }
}
