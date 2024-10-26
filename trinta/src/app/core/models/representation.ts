import {Submission} from "./submission";

export interface Representation {
  photo: Photo;
  vector: { [key: string]: any }; // Again, could be more specific if vector structure is known
  submission: Submission; // Assuming an interface Submission exists
}
export interface Photo {
  id: number;
  image: string; // URL of the image
  created_at: Date;
  metadata: { [key: string]: any }; // Could define more specific types based on known metadata
  worker: Worker; // Assuming an interface Worker exists
  representation?: Representation; // Optional, based on usage
}
