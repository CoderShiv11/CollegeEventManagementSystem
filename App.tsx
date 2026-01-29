
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getStoredData, saveStoredData } from './storage';
import { CollegeEvent, Registration } from './types';
import Navbar from './components/Navbar';
import UserHome from './pages/UserHome';
import EventDetails from './pages/EventDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminManageEvent from './pages/AdminManageEvent';
import AdminRegistrations from './pages/AdminRegistrations';

const App: React.FC = () => {
  const [events, setEvents] = useState<CollegeEvent[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('eduvent_admin_session') === 'true';
  });
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('eduvent_theme') as 'light' | 'dark';
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Initialize data
  useEffect(() => {
    const data = getStoredData();
    setEvents(data.events);
    setRegistrations(data.registrations);
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    if (events.length > 0 || registrations.length > 0) {
      saveStoredData(events, registrations);
    }
  }, [events, registrations]);

  // Handle theme application
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('eduvent_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleLogin = (status: boolean) => {
    setIsAdmin(status);
    if (status) {
      localStorage.setItem('eduvent_admin_session', 'true');
    } else {
      localStorage.removeItem('eduvent_admin_session');
    }
  };

  const addEvent = (event: Omit<CollegeEvent, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (updatedEvent: CollegeEvent) => {
    setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    setRegistrations(prev => prev.filter(r => r.eventId !== id));
  };

  const registerUser = (registration: Omit<Registration, 'id' | 'registrationDate'>) => {
    const newReg = {
      ...registration,
      id: Date.now().toString(),
      registrationDate: new Date().toISOString()
    };
    setRegistrations(prev => [...prev, newReg]);
    return true;
  };

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Navbar 
          isAdmin={isAdmin} 
          onLogout={() => handleLogin(false)} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
        
        <main className="container mx-auto px-4 py-12">
          <Routes>
            <Route path="/" element={<UserHome events={events} registrations={registrations} />} />
            <Route 
              path="/event/:id" 
              element={<EventDetails events={events} onRegister={registerUser} registrations={registrations} />} 
            />
            <Route 
              path="/login" 
              element={isAdmin ? <Navigate to="/admin" /> : <AdminLogin onLogin={() => handleLogin(true)} />} 
            />
            
            {/* Protected Admin Routes */}
            <Route 
              path="/admin" 
              element={isAdmin ? <AdminDashboard events={events} registrations={registrations} deleteEvent={deleteEvent} updateEvent={updateEvent} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/admin/create" 
              element={isAdmin ? <AdminManageEvent onSave={addEvent} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/admin/edit/:id" 
              element={isAdmin ? <AdminManageEvent events={events} onSave={updateEvent} /> : <Navigate to="/login" />} 
            />
             <Route 
              path="/admin/registrations/:id" 
              element={isAdmin ? <AdminRegistrations events={events} registrations={registrations} /> : <Navigate to="/login" />} 
            />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="border-t border-gray-200 dark:border-slate-800 py-12 mt-12 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
              &copy; 2025 EduVent Ecosystem • Optimized for Excellence
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
