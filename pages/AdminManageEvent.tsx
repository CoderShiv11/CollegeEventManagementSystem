
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Image as ImageIcon, Calendar, Clock, MapPin, AlignLeft, Tag, Timer } from 'lucide-react';
import { CollegeEvent } from '../types';

interface AdminManageEventProps {
  events?: CollegeEvent[];
  onSave: (event: any) => void;
}

const AdminManageEvent: React.FC<AdminManageEventProps> = ({ events, onSave }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const initialFormState: Omit<CollegeEvent, 'id'> = {
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    status: 'Active',
    category: 'Technical',
    imageUrl: 'https://images.unsplash.com/photo-1540575861501-7ad05823c9f5?auto=format&fit=crop&q=80&w=800',
    registrationDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (isEdit && events) {
      const existing = events.find(e => e.id === id);
      if (existing) {
        setFormData({
          title: existing.title,
          description: existing.description,
          date: existing.date,
          time: existing.time,
          location: existing.location,
          status: existing.status,
          category: existing.category,
          imageUrl: existing.imageUrl,
          registrationDeadline: existing.registrationDeadline.slice(0, 16)
        });
      }
    }
  }, [id, isEdit, events]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      registrationDeadline: new Date(formData.registrationDeadline).toISOString()
    };
    
    if (isEdit) {
      onSave({ ...finalData, id });
    } else {
      onSave(finalData);
    }
    navigate('/admin');
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <Link to="/admin" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-bold text-xs uppercase tracking-widest mb-8 group">
        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to Dashboard
      </Link>

      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 dark:border-slate-700 transition-all">
        <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-10">
          {isEdit ? 'Update Event Details' : 'Publish New Initiative'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Event Title</label>
                <div className="relative">
                  <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    required
                    type="text" 
                    className="w-full pl-12 pr-5 py-4 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 ring-blue-500 outline-none transition-all dark:text-white font-medium"
                    placeholder="e.g. Innovation Summit"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input 
                      required
                      type="date" 
                      className="w-full pl-12 pr-5 py-4 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 ring-blue-500 outline-none transition-all dark:text-white font-medium"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input 
                      required
                      type="text" 
                      placeholder="09:00 AM"
                      className="w-full pl-12 pr-5 py-4 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 ring-blue-500 outline-none transition-all dark:text-white font-medium"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2 ml-1 flex items-center">
                  <Timer className="w-3 h-3 mr-2" /> Registration Deadline
                </label>
                <input 
                  required
                  type="datetime-local" 
                  className="w-full px-5 py-4 bg-blue-50/30 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-2xl focus:ring-2 ring-blue-500 outline-none transition-all dark:text-white font-medium"
                  value={formData.registrationDeadline}
                  onChange={(e) => setFormData({...formData, registrationDeadline: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Venue Location</label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    required
                    type="text" 
                    placeholder="Conference Hall A"
                    className="w-full pl-12 pr-5 py-4 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 ring-blue-500 outline-none transition-all dark:text-white font-medium"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Category</label>
                  <select 
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 ring-blue-500 outline-none transition-all dark:text-white font-medium appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Technical">Technical</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Entrepreneurship">Entrepreneurship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Current Status</label>
                  <select 
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 ring-blue-500 outline-none transition-all dark:text-white font-medium appearance-none"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                  >
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                    <option value="Ended">Ended</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Cover Image URL</label>
                <div className="relative">
                  <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="url" 
                    placeholder="https://images.unsplash.com/..."
                    className="w-full pl-12 pr-5 py-4 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 ring-blue-500 outline-none transition-all dark:text-white font-medium"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  />
                </div>
              </div>

              <div className="relative h-44 rounded-3xl overflow-hidden border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 shadow-inner group">
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 font-bold uppercase tracking-widest text-[10px]">Preview Display</div>
                )}
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Short Description</label>
                <div className="relative">
                  <AlignLeft className="absolute left-5 top-5 text-slate-400 w-4 h-4" />
                  <textarea 
                    required
                    rows={4}
                    className="w-full pl-12 pr-5 py-4 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 ring-blue-500 outline-none transition-all dark:text-white font-medium"
                    placeholder="Detail the event objectives and outcomes..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-gray-100 dark:border-slate-700 flex justify-end">
            <button 
              type="submit"
              className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 dark:shadow-none flex items-center space-x-3"
            >
              <Save className="w-5 h-5" />
              <span>{isEdit ? 'Save Changes' : 'Confirm & Publish'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminManageEvent;
