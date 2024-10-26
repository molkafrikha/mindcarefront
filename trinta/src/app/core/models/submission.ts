export interface Submission {
  id: number;
  worker: Worker;
  event: Event;
  stat: 'pending' | 'in_processing' | 'approved';
  location: string;
  result: string;
}
