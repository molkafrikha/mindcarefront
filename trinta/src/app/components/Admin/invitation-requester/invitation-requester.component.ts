import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';
import { EventService } from '../../../core/Services/event.service';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-invitation-requester',
  templateUrl: './invitation-requester.component.html',
  styleUrls: ['./invitation-requester.component.scss'],
})
export class InvitationRequesterComponent implements OnInit {
  pendingRequesters: any[] = [];
  displayedColumns: string[] = ['fullName', 'organization_name', 'email', 'location', 'mobile_phone', 'role', 'actions'];

  constructor(private eventService: EventService) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<any>([]);
  ngOnInit(): void {
    this.getPendingRequesters();
  }

  getPendingRequesters(): void {
    this.eventService.getPendingRequesters().subscribe(
      (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching pending requesters', error);
      }
    );
  }

  approveRequester(email: string): void {
    this.eventService.approveRequester(email).subscribe(
      (response) => {
        console.log('Requester approved', response);
        this.getPendingRequesters(); // Refresh the list
      },
      (error) => {
        console.error('Error approving requester', error);
      }
    );
  }

  rejectRequester(email: string): void {
    this.eventService.rejectRequester(email).subscribe(
      (response) => {
        console.log('Requester rejected', response);
        this.getPendingRequesters(); // Refresh the list
      },
      (error) => {
        console.error('Error rejecting requester', error);
      }
    );
  }
}
