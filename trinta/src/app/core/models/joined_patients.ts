export interface joined_patients {
  id: number;                     // Identifiant unique pour le patient
  event_title: string;            // Titre de l'événement
  patient_id: any;                // Identifiant du patient (remplace worker_id)
  joined_at: string;              // Date et heure d'adhésion au format de chaîne
  status: string;                 // Statut (ex. 'APPROVED', 'PENDING', etc.)
  device_specs: Record<string, any>; // Spécifications de l'appareil, si nécessaire
}
