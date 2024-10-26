import {Component} from '@angular/core';
import {DatePipe, NgClass} from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {FeathericonsModule} from '../../icons/feathericons/feathericons.module';
import {Router, RouterLink} from '@angular/router';
import {ToggleService} from './toggle.service';
import {AuthServiceService} from "../../core/Services/auth-service.service";
import {an} from "@fullcalendar/core/internal-common";
import {Capacitor} from "@capacitor/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',

})
export class HeaderComponent {
  searchTerm: string = '';
  isToggled = false;
  currentDate: Date = new Date();
  name: any;
  role: any;
  isMobile: Boolean

  formattedDate: any = this.datePipe.transform(this.currentDate, 'dd MMMM yyyy');

  constructor(
    public toggleService: ToggleService,
    private datePipe: DatePipe,
    private authServiceService: AuthServiceService,
    private router: Router
  ) {

    this.toggleService.isToggled$.subscribe(isToggled => {
      this.isToggled = isToggled;
    });
    const token = localStorage.getItem('jwt_token');

    if (token) {
      this.getUserById()
      this.role = this.authServiceService.getRole()
    }

    this.checkIfMobile()
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 767; // Simple mobile detection
  }

  toggle() {
    this.toggleService.toggle();
  }

  getUserById() {
    if (this.isRequester()) {
      this.authServiceService.getRequesterById(this.authServiceService.getUserId()).subscribe(res => {
        console.log("requester", res)
        this.name = res.organization_name
        console.log(this.name)

      })
    }

    this.authServiceService.getUserById(this.authServiceService.getUserId()).subscribe(res => {
      console.log(res)
      if (res.role == 'Worker') {
        this.name = res.fullName

      } else if (res.role == 'Admin') {
        this.name = "Admin"

      }
    })
  }

  isRequester(): boolean {
    this.name
    return this.authServiceService.getRole() === 'Requester';

  }

  logout() {
    this.authServiceService.logout()
  }
}
