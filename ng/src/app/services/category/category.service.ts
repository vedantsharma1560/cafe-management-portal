import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get(`${environment.apiUrl}/category`);
  };

  addCategories(body: any) {
    return this.http.post(`${environment.apiUrl}/category`, body);
  };

  updateCategories(Id: any, body: any) {
    return this.http.put(`${environment.apiUrl}/category?id=${Id}`, body);
  };
}
