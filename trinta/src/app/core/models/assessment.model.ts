export interface Assessment {
  id?: number;  // Optional ID field for the response
  dateOfAssessment: Date;
  moodRating: number;
  anxietyRating: number;
  stressRating: number;
  sleepQualityRating: number;
  physicalPainRating: number;
  copingMechanisms: string;
  recentEvents: string;
  dailyHighlights?: string;
  thoughtPatterns?: string;
  gratitudeEntries?: string;
  comments?: string;
  followUpNeeded?: boolean;
}