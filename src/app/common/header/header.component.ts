import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GeneralService } from 'src/app/service/general.service';
import { getUserInitials } from 'src/app/utilities/Utility';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router, private service: GeneralService) {}
  showLogout: boolean = false;
  userName: string = 'Anonymous User';
  shortName: string = 'AU';
  ngOnInit(): void {
    this.router.events.subscribe((evnt) => {
      if (evnt instanceof NavigationEnd) {
        if (evnt.url === '/dashboard') {
          this.showLogout = true;
          let userId = this.service.getLocalStorage('userId');
          var data = {
            userId: userId,
          };
          this.service.userDetails(data).subscribe((res: any) => {
            if (res.status === 200) {
              this.userName = res.body.fullName;
              this.shortName = getUserInitials(this.userName);
            } else {
              console.log('User Not Found', res.status);
            }
          });
        } else {
          this.showLogout = false;
        }
      }
    });
  }

  logout() {
    this.router.navigate(['/login']);
    this.service.clearLocalStorage();
  }
}
