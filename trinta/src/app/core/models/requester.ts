import {User} from "./user";

export interface Requester {
  user: User; // This assumes you have a User interface already defined
  approved: boolean;
  organization_name: string;
  location: string;
}
