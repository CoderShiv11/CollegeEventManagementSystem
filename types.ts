
export type EventStatus = 'Active' | 'Paused' | 'Ended';

export interface CollegeEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: EventStatus;
  category: string;
  imageUrl: string;
  registrationDeadline: string; // ISO format string
}

export interface Registration {
  id: string;
  eventId: string;
  teamName: string;
  email: string;
  memberCount: number;
  registrationDate: string;
}

export interface AppState {
  events: CollegeEvent[];
  registrations: Registration[];
  isAdmin: boolean;
  theme: 'light' | 'dark';
}
