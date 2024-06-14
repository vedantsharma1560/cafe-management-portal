import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      "route": "/login",
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

  constructor(private token: TokenService, private route: Router) { }

  ngOnInit(): void {
    this.userData = this.token.getDecodedToken();
    this.getMenuByRole();
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

  navigateToPages(pageRoute: any) {
    this.route.navigate([pageRoute]);
  };

}
