
import { CollegeEvent } from './types';

// Helper to set dates in the future
const getFutureDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

export const INITIAL_EVENTS: CollegeEvent[] = [
  {
    id: '1',
    title: 'Hackathon 2024',
    description: 'A 24-hour coding challenge to solve real-world problems. Join us for a weekend of innovation, networking, and exciting prizes!',
    date: '2024-12-15',
    time: '09:00 AM',
    location: 'Main Auditorium',
    status: 'Active',
    category: 'Technical',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    registrationDeadline: getFutureDate(5)
  },
  {
    id: '2',
    title: 'Annual Cultural Fest',
    description: 'Experience a vibrant display of talent including music, dance, and theater. A celebration of diversity and creativity.',
    date: '2024-11-20',
    time: '05:00 PM',
    location: 'Open Air Theatre',
    status: 'Active',
    category: 'Cultural',
    imageUrl: 'https://images.unsplash.com/photo-1514525253361-bee8718a74a2?auto=format&fit=crop&q=80&w=800',
    registrationDeadline: getFutureDate(12)
  },
  {
    id: '3',
    title: 'Robotics Workshop',
    description: 'Learn the fundamentals of building and programming autonomous robots. Hands-on experience with Arduino and sensors.',
    date: '2024-10-05',
    time: '10:00 AM',
    location: 'Lab Room 102',
    status: 'Paused',
    category: 'Technical',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    registrationDeadline: getFutureDate(2)
  },
  {
    id: '4',
    title: 'Startup Pitch Deck',
    description: 'Present your business ideas to a panel of investors and mentors. Win funding and incubation support.',
    date: '2024-08-12',
    time: '02:00 PM',
    location: 'Seminar Hall',
    status: 'Ended',
    category: 'Entrepreneurship',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800',
    registrationDeadline: new Date('2024-08-10').toISOString()
  }
];
