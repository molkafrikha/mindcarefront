import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../../../core/Services/assessment-service.service';  // Adjust the path if necessary
import { Assessment } from '../../../core/models/assessment.model';  // Adjust the path if necessary

@Component({
  selector: 'app-assessments-list',
  templateUrl: './assessments-list.component.html',  // Ensure this path is correct
  styleUrls: ['./assessments-list.component.scss'],
})
export class AssessmentsListComponent implements OnInit {
  assessments: Assessment[] = [];
  displayedColumns: string[] = [
    'dateOfAssessment',
    'moodRating',
    'anxietyRating',
    'stressRating',
    'sleepQualityRating',
    'physicalPainRating',
    'copingMechanisms',
    'recentEvents',
    'dailyHighlights',
    'thoughtPatterns',
    'gratitudeEntries',
    'comments',
    'followUpNeeded'
  ];

  constructor(private assessmentService: AssessmentService) {}

  ngOnInit(): void {
    this.loadAssessments();
  }

  loadAssessments() {
    this.assessmentService.getAssessments().subscribe(
      (data) => {
        this.assessments = data;
        console.log('Assessments:', this.assessments);  // Add this line to log the assessments
      },
      (error) => {
        console.error('Error loading assessments:', error);
      }
    );
  }
}