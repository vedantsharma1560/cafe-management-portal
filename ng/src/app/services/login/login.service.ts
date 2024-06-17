import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token-storage/token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public countdown: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public countdownTimer: any;
  private logoutTimer: any;

  constructor(private http: HttpClient, private route: Router, private token: TokenService) { }

  login(body: any) {
    return this.http.post(`${environment.apiUrl}/user/login`, body);
  };

  signup(body: any) {
    return this.http.post(`${environment.apiUrl}/user/signup`, body);
  };

  logout() {
    sessionStorage.clear();
    clearTimeout(this.logoutTimer);
    clearInterval(this.countdownTimer);
    this.route.navigate(['/login']);
  };

  startLogoutTimer() {
    let decodedToken : any = this.token.getDecodedToken();
    if (decodedToken) {
      const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      const timeRemaining = expirationTime - currentTime;

      if (timeRemaining > 0) {
        this.countdown.next(Math.floor(timeRemaining / 1000));
        this.setCountdownTimer();
        this.logoutTimer = setTimeout(() => {
          this.logout();
        }, timeRemaining);
      } else {
        this.logout();
      }
    }
  };

  setCountdownTimer(): void {
    this.countdownTimer = setInterval(() => {
      let currentCount = this.countdown.value;
      if (currentCount > 0) {
        this.countdown.next(currentCount - 1);
      } else {
        clearInterval(this.countdownTimer);
      }
    }, 1000);
  };

  resetLogoutTimer() {
    clearTimeout(this.logoutTimer);
    clearInterval(this.countdownTimer);
    this.startLogoutTimer();
  };

}
