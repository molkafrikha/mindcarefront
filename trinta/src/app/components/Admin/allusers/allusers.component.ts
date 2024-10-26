import { NgIf, CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { EventService } from '../../../core/Services/event.service';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';
import { MatPaginator } from '@angular/material/paginator';
import { AuthServiceService } from '../../../core/Services/auth-service.service';
@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.scss'],
  providers:[EventService]
})
export class AllusersComponent implements OnInit {
    displayedColumns: string[] = ['fullName', 'email', 'roles', 'city', 'organization_name', 'action'];
    approvedRequesters: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  dataSource = new MatTableDataSource<any>([]);
  constructor(private eventService: EventService, private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.loadPendingInvitations();
  }

  loadPendingInvitations() {
    this.eventService.getApprovedRequesters().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

rejectRequester(email: string): void {
    this.eventService.rejectRequester(email).subscribe(
      (response) => {
        console.log('Requester rejected', response);
         // Refresh the list
      },
      (error) => {
        console.error('Error rejecting requester', error);
      }
    );
  }
}
