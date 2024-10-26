import {Representation} from "./representation";

export interface Reward {
  id: number;
  cost: string;
  event: Event;
  workers: Worker[]; // Could include through table data if needed
}
export interface Photo {
  id: number;
  image: string; // URL of the image
  created_at: Date;
  metadata: { [key: string]: any }; // Could define more specific types based on known metadata
  worker: Worker; // Assuming an interface Worker exists
  representation?: Representation; // Optional, based on usage
}
