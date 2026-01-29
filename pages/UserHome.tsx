
import React, { useState } from 'react';
import { CollegeEvent, Registration } from '../types';
import EventCard from '../components/EventCard';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

interface UserHomeProps {
  events: CollegeEvent[];
  registrations: Registration[];
}

const UserHome: React.FC<UserHomeProps> = ({ events, registrations }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'All' | 'Technical' | 'Cultural' | 'Entrepreneurship'>('All');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || event.category === filter;
    return matchesSearch && matchesFilter;
  });

  const getRegistrationCount = (eventId: string) => {
    return registrations.filter(r => r.eventId === eventId).length;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section - Redesigned for Professional Light Aesthetic */}
      <section className="relative py-20 px-4 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 dark:bg-blue-900/10 skew-x-12 transform origin-top-right"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-100/30 dark:bg-blue-800/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100 dark:border-blue-800/50">
            <Sparkles className="w-3 h-3 mr-2" /> Campus Engagement Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-white mb-6 leading-tight">
            Discover Excellence in <br /><span className="text-blue-600">Campus Events</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Join thousands of students in workshops, competitions, and festivals designed to empower your career and creative spirit.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <div className="relative w-full group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 w-5 h-5 transition-colors" />
              <input 
                type="text"
                placeholder="Search events (e.g. Hackathon, Art Fest...)"
                className="w-full pl-14 pr-6 py-5 rounded-2xl border border-gray-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-4 ring-blue-50 dark:ring-blue-900/20 outline-none text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-950 shadow-sm transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-gray-100 dark:border-slate-800 pb-8">
        <div className="flex items-center space-x-3 text-slate-400">
          <SlidersHorizontal className="w-5 h-5" />
          <span className="font-bold text-sm uppercase tracking-widest">Filter by category</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['All', 'Technical', 'Cultural', 'Entrepreneurship'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                filter === cat 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              registrationCount={getRegistrationCount(event.id)}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-gray-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-slate-800">
            <div className="bg-white dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No Matching Events</h3>
            <p className="text-slate-500 dark:text-slate-400">We couldn't find any events matching your current search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHome;
