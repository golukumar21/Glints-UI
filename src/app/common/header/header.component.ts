import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router) {}
  showLogout: boolean = false;
  ngOnInit(): void {
    this.router.events.subscribe((evnt) => {
      if (evnt instanceof NavigationEnd) {
        if (evnt.url === '/dashboard') {
          this.showLogout = true;
        } else {
          this.showLogout = false;
        }
      }
    });
  }

  logout() {}
}
