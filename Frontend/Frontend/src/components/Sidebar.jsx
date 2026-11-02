import React from 'react';
import { FiGrid, FiCompass, FiSettings, FiMap, FiMessageSquare, FiLogOut } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from "../context/ThemeContext";
export default function Sidebar({ setActivePage, activePage, onLogout }) {
  const { t, lang } = useLanguage();
  const { theme } = useTheme();
  const menuItems = [
    { id: 'dashboard', label: t('agencyDashboard'), icon: FiGrid },
    { id: 'destinations', label: t('availableTours'), icon: FiMap },
    { id: 'users', label: t('passengerRegister'), icon: FiCompass },
    {
      id: 'reviews',
      label: lang === 'bs' ? 'Recenzije i utisci' : 'Reviews & Feedback',
      icon: FiMessageSquare
    },
    { id: 'settings', label: t('systemSettings'), icon: FiSettings }
  ];

  return (
    <div className="flex flex-col h-full p-4 justify-between">


      <div>
        <div className="mb-8 p-2">
          <div className="flex items-center gap-3">
            
            <span className="text-lg font-semibold tracking-[0.18em] text-white">
              TRAVEL <span className="text-white">THE WORLD</span>
            </span>
          </div>

          <div className="ml-2 mt-2 h-[2px] w-30 bg-blue-400/70 rounded-full"></div>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-3 ${activePage === item.id
                  ? 'bg-sidebarActive text-sidebarActive shadow-md'
                  : 'hover:bg-customBg text-customMuted hover:text-customText'
                  }`}
              >
                <IconComponent size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>


      <div className="pt-4 border-t border-customBorder mt-auto">
        <button
          onClick={onLogout}
          className="w-full text-left px-4 py-3 rounded-lg font-medium text-red-500 hover:bg-red-500/10 transition-all flex items-center gap-3 group"
        >
          <FiLogOut size={18} className="transform group-hover:-translate-x-0.5 transition-transform" />
          <span>{lang === 'bs' ? 'Odjavi se' : 'Logout'}</span>
        </button>
      </div>

    </div>
  );
}