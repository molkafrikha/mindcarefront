import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {SubmissionService} from "../../../../core/Services/submission.service";
import {MatCardModule} from "@angular/material/card";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [RouterLink, MatCardModule, DatePipe, NgForOf],
  templateUrl: './worker-approved-submissions.component.html',
  styleUrls: ['./worker-approved-submissions.component.scss']
})
export class WorkerApprovedSubmissionsComponent implements OnInit {
  eventId: any;
  workerId: any;
  approvedSubmissions: any[] = [];
  fullName: string;
  constructor(private route: ActivatedRoute, private submissionServive: SubmissionService ) {}

  ngOnInit(): void {
    // Get the eventId and workerId from the route parameters
    this.route.params.subscribe(params => {
      this.eventId = params['eventId'];
      this.workerId = params['workerId'];
      this.loadApprovedSubmissions(this.eventId, this.workerId);
    });
    this.route.queryParams.subscribe(params => {
      this.fullName = params['full_name'];
    });
    console.log('Full Name:', this.fullName);
  }

  loadApprovedSubmissions(eventId: any, workerId: any): void {
    this.submissionServive.approvedSubmissionsByWorker(eventId, workerId).subscribe(
      (data) => {
        this.approvedSubmissions = data;
        console.log(this.approvedSubmissions);
      },
      (error) => {
        console.error('Error fetching approved submissions', error);
      }
    );
  }


}

