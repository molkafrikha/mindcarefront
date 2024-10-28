import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../../../core/Services/event.service';
import { AuthServiceService } from '../../../core/Services/auth-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-request-worker',
  templateUrl: './request-worker.component.html',
  styleUrls: ['./request-worker.component.scss']
})
export class RequestWorkerComponent implements OnInit {
  
  displayedColumns: string[] = ['event_title', 'patient_fullname', 'joined_at', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<any>([]);
  constructor(private eventService: EventService, private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.loadPendingInvitations();
  }
  
  loadPendingInvitations() {
    this.eventService.getPendingInvitations().subscribe(data => {
      console.log('Data received:', data);  // Vérifiez le format des données ici
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  acceptInvitation(event_worker_id: number): void {
    this.eventService.acceptInvitation(event_worker_id).subscribe(
      (response) => {
        console.log('Invitation accepted:', response);
        this.loadPendingInvitations(); // Refresh the list
      },
      (error) => {
        console.error('Error accepting invitation', error);
      }
    );
  }

  rejectInvitation(event_worker_id: number): void {
    this.eventService.rejectInvitation(event_worker_id).subscribe(
      (response) => {
        console.log('Invitation rejected:', response);
        this.loadPendingInvitations(); // Refresh the list
      },
      (error) => {
        console.error('Error rejecting invitation', error);
      }
    );
  }
}
