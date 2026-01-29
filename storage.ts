
import { AppState, CollegeEvent, Registration } from './types';
import { INITIAL_EVENTS } from './constants';

const STORAGE_KEY = 'eduvent_app_data';

export const getStoredData = (): { events: CollegeEvent[], registrations: Registration[] } => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return { events: INITIAL_EVENTS, registrations: [] };
  }
  return JSON.parse(data);
};

export const saveStoredData = (events: CollegeEvent[], registrations: Registration[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ events, registrations }));
};
