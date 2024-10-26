import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { SubmissionService } from '../../../../core/Services/submission.service';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, NgForOf, CommonModule } from '@angular/common';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-gallery-page',
  templateUrl: './all-approved-submissions.component.html',
  styleUrls: ['./all-approved-submissions.component.scss']
})
export class AllApprovedSubmissionsComponent implements OnInit {
  eventId: any;
  approvedSubmissions: any[] = [];
  event_name: string;
  currentPage: number = 1;
  totalPages: number;

  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventId = params['event_id'];
      this.loadApprovedSubmissions(this.eventId, this.currentPage);
    });

    this.route.queryParams.subscribe(params => {
      this.event_name = params['event_name'];
    });
    console.log('event_name:', this.event_name);
  }

  loadApprovedSubmissions(eventId: any, page: number): void {
    this.submissionService.approvedSubmissions(eventId, page).subscribe(
      (data) => {
        this.approvedSubmissions = data.submissions;
        this.currentPage = data.current_page;
        this.totalPages = data.num_pages;
        console.log(this.approvedSubmissions);
      },
      (error) => {
        console.error('Error fetching approved submissions', error);
      }
    );
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadApprovedSubmissions(this.eventId, this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.loadApprovedSubmissions(this.eventId, this.currentPage - 1);
    }
  }
}
