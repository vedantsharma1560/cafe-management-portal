import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

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
