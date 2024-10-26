import { Submission } from "./submission";
import { Reward } from "./reward";
import { Patient } from "./patient"; // Importer le modèle Patient
import { joined_patients } from "./joined_patients"; // Remplacez par le bon nom du fichier

export interface Event {
  id: number;
  requester: Patient; // Changer de Requester à Patient
  type: 'fires' | 'floods';
  title: string;
  description: string;
  location?: {
    lat: number;        // Correspond aux données
    lng: number;        // Correspond aux données
    placeId: string;    // Correspond aux données
  };
  cost: number;
  numberOfPhotos: number;
  max_photos_per_patient: number; // Changer de max_photos_per_worker à max_photos_per_patient
  created_at: Date;
  deadline: Date;
  startdate: Date;
  submissions: Submission[]; // Interface Submission existante
  rewards?: Reward[];
  joined_patients: joined_patients[]; // Changer de joined_workers à joined_patients
  address?: string;
  city?: string;
  country?: string;
  displayName?: string;
  requester_organization_name?: string;
  acceptance_ratio: number; // Optionnel car cela peut ne pas être chargé avec les données de l'événement principal
}
