

export interface User {
    id: any;
    fullName: string;
    email: string;
    mobile_phone: string;
    password: string; // Consider handling passwords more securely and not as plain objects
    role: 'Admin' | 'Worker' | 'Requester' | 'Patient' | 'Doctor';
    is_worker: boolean;
    is_Patient: boolean;
    is_Doctor: boolean;
    is_requester: boolean;
    is_active: boolean;
    is_staff: boolean;
    approved: boolean;
    access?: string;
    date_of_birth:string;
    gender: 'M' | 'F';
}
export interface DeviceSpecs {
  model: string;
  manifacturer: string;
  os: string;
  platform: 'ios' | 'android' | 'web';
  geolocation?: {
    latitude: number;
    longitude: number;
  };
}
