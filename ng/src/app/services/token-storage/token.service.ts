import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }

  setToken(token: any) {
    sessionStorage.setItem("cmsToken", token);
  };

  getDecodedToken() {
    let token : any = sessionStorage.getItem("cmsToken");
    let decodedToken = jwt_decode(token);
    if(decodedToken) {
      return decodedToken;
    }
    return null;
  };

}
