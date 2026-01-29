
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Tag, ChevronRight, Users } from 'lucide-react';
import { CollegeEvent } from '../types';
import CountdownTimer from './CountdownTimer';

interface EventCardProps {
  event: CollegeEvent;
  registrationCount: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, registrationCount }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/30';
      case 'Paused': return 'bg-amber-50 text-amber-600 border border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30';
      case 'Ended': return 'bg-gray-50 text-gray-500 border border-gray-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700/50';
      default: return 'bg-blue-50 text-blue-600 border border-blue-100';
    }
  };

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-3xl shadow-sm hover:shadow-2xl border border-gray-100 dark:border-slate-700/50 overflow-hidden transition-all duration-500 transform hover:-translate-y-2">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm ${getStatusColor(event.status)}`}>
            {event.status}
          </span>
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur px-3 py-1.5 rounded-lg shadow-lg border border-white/20">
            <CountdownTimer deadline={event.registrationDeadline} compact />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 flex gap-2">
          <span className="px-3 py-1.5 bg-slate-900/80 backdrop-blur rounded-lg text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1.5 shadow-sm border border-white/10">
            <Tag className="w-3 h-3" />
            {event.category}
          </span>
          {registrationCount > 0 && (
            <span className="px-3 py-1.5 bg-blue-600/90 backdrop-blur rounded-lg text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
              <Users className="w-3 h-3" />
              {registrationCount} Joined
            </span>
          )}
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">{event.title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">
          {event.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-8 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-blue-500" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center col-span-2">
            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        <Link 
          to={`/event/${event.id}`}
          className="flex items-center justify-center w-full py-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 font-bold transition-all hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 shadow-sm"
        >
          View Event Details
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
