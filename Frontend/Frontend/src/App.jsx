import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Destinations from './pages/Destinations';
import Reviews from './pages/Reviews.jsx';
import Login from './components/Login';
import { FiMenu, FiX } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';
import { useTheme } from "./context/ThemeContext";

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAdminLoggedIn') === 'true'
  );

  const handleLoginSuccess = () => {
    localStorage.setItem('isAdminLoggedIn', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    setIsAuthenticated(false);
    setActivePage('dashboard');
    setIsSidebarOpen(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLoginSuccess} />;
  }

  return (

    <div className="flex flex-col md:grid md:grid-cols-[260px_1fr] md:grid-rows-[70px_1fr] h-screen w-full bg-customBg text-customText overflow-hidden">

      <div className={`
        fixed inset-y-0 left-0 z-50 w-[260px] border-r border-customBorder bg-customCard transform transition-transform duration-300 ease-in-out
        md:relative md:transform-none md:row-span-2
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>

        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 text-customText md:hidden p-1 hover:bg-customBg rounded-lg"
        >
          <FiX size={20} />
        </button>

        <Sidebar
          setActivePage={(page) => {
            setActivePage(page);
            setIsSidebarOpen(false);
          }}
          activePage={activePage}
          onLogout={handleLogout}
        />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="h-[70px] border-b border-customBorder bg-customCard flex items-center justify-between md:justify-end px-6">

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-customText md:hidden p-2 hover:bg-customBg rounded-xl border border-customBorder"
        >
          <FiMenu size={22} />
        </button>

        <Header />
      </div>

      <div className="p-4 md:p-6 overflow-y-auto flex-1">
        {activePage === 'dashboard' && <Dashboard />}
        {activePage === 'users' && <Users />}
        {activePage === 'settings' && <Settings />}
        {activePage === 'destinations' && <Destinations />}
        {activePage === 'reviews' && <Reviews />}
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: theme === "dark" ? "#1f2937" : "#ffffff",
            color: theme === "dark" ? "#ffffff" : "#111827",
          },
        }}
      />
    </div>
  );
}

export default App;
