
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Users, 
  Calendar, 
  Activity, 
  Edit3, 
  Trash2, 
  Eye, 
  BarChart3, 
  FileSpreadsheet,
  ChevronDown
} from 'lucide-react';
import { CollegeEvent, Registration, EventStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AdminDashboardProps {
  events: CollegeEvent[];
  registrations: Registration[];
  deleteEvent: (id: string) => void;
  updateEvent: (event: CollegeEvent) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ events, registrations, deleteEvent, updateEvent }) => {
  const stats = useMemo(() => {
    return {
      total: events.length,
      active: events.filter(e => e.status === 'Active').length,
      paused: events.filter(e => e.status === 'Paused').length,
      ended: events.filter(e => e.status === 'Ended').length,
      totalReg: registrations.length,
      totalParticipants: registrations.reduce((acc, r) => acc + r.memberCount, 0)
    };
  }, [events, registrations]);

  const chartData = useMemo(() => {
    return events.map(event => ({
      name: event.title.length > 12 ? event.title.substring(0, 10) + '...' : event.title,
      registrations: registrations.filter(r => r.eventId === event.id).length
    }));
  }, [events, registrations]);

  const handleStatusChange = (event: CollegeEvent, newStatus: EventStatus) => {
    updateEvent({ ...event, status: newStatus });
  };

  const handleDownloadAllExcel = () => {
    if (registrations.length === 0) return;

    const headers = ['Event Name', 'Team Name', 'Email', 'Member Count', 'Registration Date'];
    const rows = registrations.map(reg => {
      const event = events.find(e => e.id === reg.eventId);
      return [
        `"${(event?.title || 'Unknown Event').replace(/"/g, '""')}"`,
        `"${reg.teamName.replace(/"/g, '""')}"`,
        reg.email,
        reg.memberCount,
        new Date(reg.registrationDate).toLocaleDateString()
      ];
    });

    const csvContent = "\uFEFF" + [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Master_Campus_Event_Registrations.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white">Admin Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Strategic overview and management of campus activities.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleDownloadAllExcel}
            disabled={registrations.length === 0}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-all shadow-sm disabled:opacity-50"
          >
            <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
            <span className="hidden sm:inline">Export Master List</span>
          </button>
          <Link 
            to="/admin/create" 
            className="flex items-center justify-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 dark:shadow-none"
          >
            <Plus className="w-5 h-5" />
            <span>Publish Event</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Initiatives', value: stats.total, icon: Calendar, color: 'blue' },
          { label: 'Live Tracks', value: stats.active, icon: Activity, color: 'emerald' },
          { label: 'Total Registrations', value: stats.totalReg, icon: Users, color: 'cyan' },
          { label: 'Member Count', value: stats.totalParticipants, icon: BarChart3, color: 'slate' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-700 shadow-sm transition-all hover:shadow-xl">
            <div className={`w-12 h-12 rounded-2xl mb-5 flex items-center justify-center bg-${stat.color}-50 dark:bg-${stat.color}-900/20`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
            </div>
            <p className="text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-800 dark:text-white mt-2">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-700 shadow-sm">
          <h3 className="text-xl font-black mb-10 flex items-center text-slate-800 dark:text-white">
            <BarChart3 className="w-5 h-5 mr-3 text-blue-600" /> Participation Metrics
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} fontVariant="bold" />
                <YAxis fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '1rem' }}
                />
                <Bar dataKey="registrations" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#2563eb' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-700 shadow-sm">
          <h3 className="text-xl font-black mb-8 text-slate-800 dark:text-white">Track Status</h3>
          <div className="space-y-4">
            {[
              { label: 'Active', value: stats.active, bg: 'bg-emerald-50', text: 'text-emerald-700', circle: 'bg-emerald-600' },
              { label: 'Paused', value: stats.paused, bg: 'bg-amber-50', text: 'text-amber-700', circle: 'bg-amber-600' },
              { label: 'Ended', value: stats.ended, bg: 'bg-gray-50', text: 'text-gray-600', circle: 'bg-gray-600' },
            ].map((item, i) => (
              <div key={i} className={`flex items-center justify-between p-5 ${item.bg} dark:bg-opacity-10 rounded-2xl border border-transparent hover:border-current transition-all cursor-default`}>
                <span className={`${item.text} font-black uppercase tracking-widest text-xs`}>{item.label}</span>
                <span className={`${item.circle} text-white px-4 py-1 rounded-full text-xs font-black`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-gray-100 dark:border-slate-700">
          <h3 className="text-xl font-black text-slate-800 dark:text-white">Active Management</h3>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-900/50">
                <th className="px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Initiative</th>
                <th className="px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Sphere</th>
                <th className="px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                <th className="px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Regs</th>
                <th className="px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex items-center">
                      <img src={event.imageUrl} alt="" className="w-12 h-12 rounded-xl object-cover mr-4 shadow-sm" />
                      <div>
                        <div className="font-bold text-slate-800 dark:text-white group-hover:text-blue-600 transition-colors">{event.title}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{new Date(event.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      {event.category}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="relative inline-block">
                      <select
                        value={event.status}
                        onChange={(e) => handleStatusChange(event, e.target.value as EventStatus)}
                        className={`appearance-none pl-3 pr-8 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest cursor-pointer outline-none transition-all border ${
                          event.status === 'Active' ? 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800/30' :
                          event.status === 'Paused' ? 'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800/30' : 
                          'text-slate-400 bg-gray-50 border-gray-100 dark:bg-slate-700 dark:border-slate-600'
                        }`}
                      >
                        <option value="Active">Active</option>
                        <option value="Paused">Paused</option>
                        <option value="Ended">Ended</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-50" />
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center text-slate-600 dark:text-slate-300 font-black text-sm">
                      {registrations.filter(r => r.eventId === event.id).length}
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link to={`/admin/registrations/${event.id}`} className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all" title="View Database">
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link to={`/admin/edit/${event.id}`} className="p-2.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl transition-all" title="Edit">
                        <Edit3 className="w-5 h-5" />
                      </Link>
                      <button onClick={() => deleteEvent(event.id)} className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all" title="Remove">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
