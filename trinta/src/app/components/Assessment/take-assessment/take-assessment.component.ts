import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AssessmentService } from '../../../core/Services/assessment-service.service';  // Adjust the path if necessary
import { Assessment } from '../../../core/models/assessment.model';  // Adjust the path if necessary

@Component({
  selector: 'app-take-assessment',
  templateUrl: './take-assessment.component.html',
  styleUrls: ['./take-assessment.component.scss'],
})
export class TakeAssessmentComponent implements OnInit {
  assessmentData: Assessment = {
    dateOfAssessment: new Date(),  // Set to today's date
    moodRating: 3,
    anxietyRating: 3,
    stressRating: 3,
    sleepQualityRating: 3,
    physicalPainRating: 1,
    copingMechanisms: '',
    recentEvents: '',
    dailyHighlights: '',
    thoughtPatterns: '',
    gratitudeEntries: '',
    comments: '',
    followUpNeeded: false
  };

  moodRatings = [
    { value: 1, viewValue: 'Very Low' },
    { value: 2, viewValue: 'Low' },
    { value: 3, viewValue: 'Neutral' },
    { value: 4, viewValue: 'High' },
    { value: 5, viewValue: 'Very High' },
  ];

  sleepQualityRatings = [
    { value: 1, viewValue: 'Very Poor' },
    { value: 2, viewValue: 'Poor' },
    { value: 3, viewValue: 'Fair' },
    { value: 4, viewValue: 'Good' },
    { value: 5, viewValue: 'Excellent' },
  ];

  physicalPainRatings = [
    { value: 1, viewValue: 'None' },
    { value: 2, viewValue: 'Mild' },
    { value: 3, viewValue: 'Moderate' },
    { value: 4, viewValue: 'Severe' },
    { value: 5, viewValue: 'Extreme' },
  ];

  constructor(private assessmentService: AssessmentService) {}

  ngOnInit(): void {
    this.assessmentData.dateOfAssessment = new Date();  // Ensure the date is set to today's date
  }

  createAssessment(form: NgForm) {
    if (form.valid) {
      this.assessmentService.createAssessment(this.assessmentData).subscribe(
        (response) => {
          console.log('Assessment Submitted:', response);
          this.cancel();
        },
        (error) => {
          console.error('Error submitting assessment:', error);
        }
      );
    }
  }

  cancel() {
    this.assessmentData = {
      dateOfAssessment: new Date(),  // Reset to today's date
      moodRating: 3,
      anxietyRating: 3,
      stressRating: 3,
      sleepQualityRating: 3,
      physicalPainRating: 1,
      copingMechanisms: '',
      recentEvents: '',
      dailyHighlights: '',
      thoughtPatterns: '',
      gratitudeEntries: '',
      comments: '',
      followUpNeeded: false
    };
  }
}