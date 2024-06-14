import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardData: any[] = [];
  searchText!: string;
  constructor(private dashboard: DashboardService, private darkMode: DarkModeService) { }

  ngOnInit(): void {
    this.getDashboardDetails();
    this.darkMode.enable();
  }

  getDashboardDetails() {
    this.dashboard.getDashboardDetails()
    .subscribe({
      next: (res: any) => {
        if(res.statusCode === "200") {
          this.dashboardData.push(...res.data);
        } else {
          this.dashboardData = [];
        }
      }
    })
  };

  onScroll() {
    this.getDashboardDetails();
  };

  onToggleMode() {
    this.darkMode.toggle();
  };

}
