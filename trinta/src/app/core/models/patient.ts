import { User } from "./user";
import { Reward } from "./reward";

export interface Patient {
  user: User; // Référence à l'utilisateur associé au patient
  medicalHistory: string; // Historique médical du patient
  medications: string[]; // Liste des médicaments pris par le patient
  
  emergencyContact: { // Contact d'urgence
    name: string; // Nom du contact
    phone: string; // Numéro de téléphone du contact
  };
  location: string; // Localisation du patient
  gender: 'M' | 'F' | 'O'; // Ajout d'une option pour d'autres genres
}
