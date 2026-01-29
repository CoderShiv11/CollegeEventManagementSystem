
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowLeft, 
  Users, 
  Mail, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Timer,
  Share2,
  CopyCheck
} from 'lucide-react';
import { CollegeEvent, Registration } from '../types';
import CountdownTimer from '../components/CountdownTimer';

interface EventDetailsProps {
  events: CollegeEvent[];
  registrations: Registration[];
  onRegister: (registration: Omit<Registration, 'id' | 'registrationDate'>) => boolean;
}

const EventDetails: React.FC<EventDetailsProps> = ({ events, onRegister, registrations }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event = events.find(e => e.id === id);

  const [formData, setFormData] = useState({
    teamName: '',
    email: '',
    memberCount: 1
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Event not found</h2>
        <Link to="/" className="text-blue-600 hover:underline">Back to home</Link>
      </div>
    );
  }

  const eventRegs = registrations.filter(r => r.eventId === event.id);
  const isDeadlinePassed = new Date(event.registrationDeadline) < new Date();
  const canRegister = event.status === 'Active' && !isDeadlinePassed;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      onRegister({
        eventId: event.id,
        ...formData
      });
      setIsSubmitting(false);
      setSuccess(true);
    }, 1200);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto py-24 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="text-3xl font-black mb-4 text-slate-800 dark:text-white">Registration Complete!</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg leading-relaxed">
          Great! You have registered for <strong>{event.title}</strong>. Check your inbox at {formData.email} for details.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 dark:shadow-none"
        >
          Explore More Events
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 font-bold uppercase tracking-widest text-xs group">
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to list
        </Link>
        <button 
          onClick={handleShare}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold transition-all duration-300 text-sm border ${
            copied 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-gray-200 dark:border-slate-700 hover:bg-gray-50'
          }`}
        >
          {copied ? (
            <><CopyCheck className="w-4 h-4" /><span>Link Copied</span></>
          ) : (
            <><Share2 className="w-4 h-4" /><span>Share Link</span></>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-800">
            <img src={event.imageUrl} alt={event.title} className="w-full h-[30rem] object-cover" />
            <div className="absolute top-8 left-8">
               <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-white/20">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 flex items-center">
                    <Timer className="w-3 h-3 mr-2 text-blue-500" /> Deadline Countdown
                  </p>
                  <CountdownTimer deadline={event.registrationDeadline} />
               </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-10 border border-gray-100 dark:border-slate-700/50 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h1 className="text-4xl font-black text-slate-800 dark:text-white leading-tight">{event.title}</h1>
              <div className={`self-start px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                event.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-gray-100 text-gray-500'
              }`}>
                {event.status}
              </div>
            </div>

            <div className="flex flex-wrap gap-8 py-8 border-y border-gray-100 dark:border-slate-700 mb-10 text-sm">
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                <span className="font-bold">{new Date(event.date).toLocaleDateString('en-US', { dateStyle: 'full' })}</span>
              </div>
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <Clock className="w-5 h-5 mr-3 text-blue-600" />
                <span className="font-bold">{event.time}</span>
              </div>
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                <span className="font-bold">{event.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="p-8 rounded-3xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-black text-[10px] uppercase tracking-widest text-blue-900/50 dark:text-blue-300/50">Joined Teams</h4>
                  <Users className="w-5 h-5 text-blue-500/50" />
                </div>
                <p className="text-3xl font-black text-blue-600 dark:text-blue-400">{eventRegs.length}</p>
              </div>
              
              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-400">Ends On</h4>
                  <Calendar className="w-5 h-5 text-slate-300" />
                </div>
                <p className="text-xl font-black text-slate-700 dark:text-slate-200">
                  {new Date(event.registrationDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-2xl font-black mb-6 flex items-center text-slate-800 dark:text-white">
                Event Description
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-28">
            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-10 border border-gray-100 dark:border-slate-700/50 shadow-2xl">
              <h3 className="text-2xl font-black mb-8 text-slate-800 dark:text-white">Registration</h3>
              
              {!canRegister ? (
                <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 flex flex-col items-center text-center space-y-3">
                  <AlertTriangle className="w-8 h-8 text-amber-500 mb-2" />
                  <p className="text-sm font-bold text-amber-800 dark:text-amber-300 leading-relaxed">
                    This event is currently {isDeadlinePassed ? 'past its deadline' : 'not accepting registrations'}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Team Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Your awesome team"
                      className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 ring-blue-500 outline-none transition-all dark:text-white font-medium"
                      value={formData.teamName}
                      onChange={(e) => setFormData({...formData, teamName: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="teamlead@college.edu"
                      className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 ring-blue-500 outline-none transition-all dark:text-white font-medium"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Team Count</label>
                    <input 
                      required
                      type="number" min="1" max="10"
                      className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 ring-blue-500 outline-none transition-all dark:text-white font-medium"
                      value={formData.memberCount}
                      onChange={(e) => setFormData({...formData, memberCount: parseInt(e.target.value) || 1})}
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 dark:shadow-none flex items-center justify-center space-x-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        <span>Join Now</span>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Free Registration • Verification Required
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
