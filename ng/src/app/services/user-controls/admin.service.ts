import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addUserByAdmin(body: any) {
    return this.http.post(`${environment.apiUrl}/user/addUserByAdmin`, body);
  };

}
