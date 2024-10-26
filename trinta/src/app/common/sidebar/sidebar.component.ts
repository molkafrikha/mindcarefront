import { EventService } from './../../core/Services/event.service';

import {Component, OnInit} from '@angular/core';
import { NgClass } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ToggleService } from '../header/toggle.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import {AuthServiceService} from "../../core/Services/auth-service.service";
import {Capacitor} from "@capacitor/core";
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{
  notApprovedCount: number = 0;
  pendingWorkersCount: number = 0;
  isMobile: Boolean

    constructor(
        private toggleService: ToggleService,
        private authServiceService: AuthServiceService,
        private eventService : EventService
    ) {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
      this.isMobile = Capacitor.getPlatform() === 'ios' || Capacitor.getPlatform() === 'android';

    }

    ngOnInit(): void {
      const token = localStorage.getItem('jwt_token');
      const role = localStorage.getItem('role');
      if(token && role=='Admin'){
        this.eventService.getPendingWorkersCount().subscribe(
          (data) => {
            this.pendingWorkersCount = data.pending_workers_count;
          },
          (error) => {
            console.error('Error fetching pending workers count:', error);
          }
        );
        this.getNotApprovedCount();

      }


    }
  handleClick() {
    if (this.isMobile) {
      this.toggleService.toggle(); // Assuming this method exists to close the sidebar
    }
  }
    // Toggle Service
    isToggled = false;
    toggle() {
        this.toggleService.toggle();
    }

    isRequester(): boolean {
        return this.authServiceService.getRole() === 'Requester';
      }

      isPatient(): boolean {
        return this.authServiceService.getRole() === 'Patient';
      }

      isWorker(): boolean {
        return this.authServiceService.getRole() === 'Worker';
      }

      isAdmin(): boolean {
        return this.authServiceService.getRole() === 'Admin';
      }


      getNotApprovedCount() {
        this.eventService.gettotalrequestNotif()
          .subscribe(response => {
            console.log("API Response:", response); // Check the full response
            this.notApprovedCount = response.
            not_approved_count
            ;
            console.log("fffff", this.notApprovedCount);
          }, error => {
            console.error("Error fetching not approved count:", error);
          });
      }
    // Mat Expansion
    panelOpenState = false;
    logout(){
      this.authServiceService.logout()
    }

}