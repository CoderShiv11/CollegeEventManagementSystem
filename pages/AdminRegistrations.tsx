
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Users, Calendar, FileSpreadsheet } from 'lucide-react';
import { CollegeEvent, Registration } from '../types';

interface AdminRegistrationsProps {
  events: CollegeEvent[];
  registrations: Registration[];
}

const AdminRegistrations: React.FC<AdminRegistrationsProps> = ({ events, registrations }) => {
  const { id } = useParams<{ id: string }>();
  const event = events.find(e => e.id === id);
  const eventRegs = registrations.filter(r => r.eventId === id);

  if (!event) return (
    <div className="text-center py-24">
      <h2 className="text-2xl font-black mb-4 text-slate-800 dark:text-white">Record Not Found</h2>
      <Link to="/admin" className="text-blue-600 font-bold hover:underline">Return to Dashboard</Link>
    </div>
  );

  const handleDownloadExcel = () => {
    if (eventRegs.length === 0) return;

    const headers = ['Team Name', 'Email', 'Member Count', 'Registration Date'];
    const rows = eventRegs.map(reg => [
      `"${reg.teamName.replace(/"/g, '""')}"`,
      reg.email,
      reg.memberCount,
      new Date(reg.registrationDate).toLocaleDateString()
    ]);

    const csvContent = "\uFEFF" + [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${event.title.replace(/\s+/g, '_')}_Manifest.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <Link to="/admin" className="inline-flex items-center text-slate-500 hover:text-blue-600 font-bold text-xs uppercase tracking-widest mb-6 group">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-black text-slate-800 dark:text-white">{event.title}</h1>
            <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-800/30">
              Verified Database
            </span>
          </div>
          <div className="flex items-center gap-6 mt-4">
             <div className="flex items-center text-sm font-bold text-slate-400">
                <Users className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-slate-800 dark:text-slate-200">{eventRegs.length} Teams</span>
             </div>
             <div className="flex items-center text-sm font-bold text-slate-400">
                <Users className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-slate-800 dark:text-slate-200">{eventRegs.reduce((sum, r) => sum + r.memberCount, 0)} Total Participants</span>
             </div>
          </div>
        </div>
        
        <button 
          onClick={handleDownloadExcel}
          disabled={eventRegs.length === 0}
          className="flex items-center justify-center space-x-3 px-8 py-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl font-black uppercase tracking-widest text-xs text-slate-700 dark:text-slate-200 hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm disabled:opacity-50"
        >
          <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
          <span>Export Manifest</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
        {eventRegs.length > 0 ? (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-900/50">
                  <th className="px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Team Details</th>
                  <th className="px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Point of Contact</th>
                  <th className="px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Size</th>
                  <th className="px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                {eventRegs.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-10 py-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mr-4 text-sm font-black shadow-inner border border-blue-100 dark:border-blue-800/50">
                          {reg.teamName.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-bold text-slate-800 dark:text-white">{reg.teamName}</div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center text-slate-500 dark:text-slate-400 font-medium">
                        <Mail className="w-4 h-4 mr-2 text-blue-500/50" />
                        {reg.email}
                      </div>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-black text-xs">
                        {reg.memberCount}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex items-center justify-end text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                        <Calendar className="w-3 h-3 mr-2" />
                        {new Date(reg.registrationDate).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-32 text-center bg-gray-50/50 dark:bg-slate-900/20">
            <div className="bg-white dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Users className="w-8 h-8 text-slate-200" />
            </div>
            <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">No Records Found</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-medium">Participant information will automatically populate here as teams register for the initiative.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRegistrations;
