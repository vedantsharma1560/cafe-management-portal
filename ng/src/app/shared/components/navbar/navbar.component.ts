import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { TokenService } from 'src/app/services/token-storage/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userData: any;
  pages = [
    {
      "name": "Dashboard",
      "route": "/dashboard",
    },
    {
      "name": "Bill",
      "route": "/bill",
    },
    {
      "name": "Food",
      "route": "/food",
    },
    {
      "name": "Beverages",
      "route": "/beverages",
    },
    {
      "name": "User-Controls",
      "route": "/user-control",
    },
    {
      "name": "Settings",
      "route": "/app-settings",
    }
  ];
  countdown: number = 0;

  constructor(private token: TokenService, private login: LoginService) { }

  ngOnInit(): void {
    this.userData = this.token.getDecodedToken();
    this.getMenuByRole();
    this.login.startLogoutTimer();
    this.login.countdown.subscribe((count: any ) => this.countdown = count); // Update the countdown
  }

  getMenuByRole() {
    if(this.userData && this.userData?.role === "admin") {
    } else {
      //This is how I can remove the pages of my choice to the user which is not an admin
      this.pages = this.removePages("Bill");
      console.log("Pages", this.pages);
    }
  };

  removePages(pageName: string) {
    return this.pages.filter(page => page.name !== pageName);
  };

  logout() {
    this.login.logout();
  };

  getFormattedTime(): string {
    const minutes = Math.floor(this.countdown / 60);
    const seconds = this.countdown % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

}
