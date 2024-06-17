import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token-storage/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private token: TokenService, private route: Router) {}

  canActivate(): boolean {
    if(this.token.getDecodedToken()) {
      return true;
    } else {
      this.route.navigate(['/login']);
      return false;
    }
  };

}
