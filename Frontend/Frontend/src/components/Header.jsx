import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  return (

    <div className="flex flex-row justify-between items-center w-full">
 
      <div className="hidden md:block font-semibold text-lg text-customText">
        {t('welcomeAdmin')}
      </div>
      
      <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
       
        <div className="flex bg-customBg border border-customBorder rounded-lg p-1 text-xs font-semibold shadow-sm">
          <button 
            onClick={() => setLang('bs')} 
            className={`px-2.5 py-1 rounded-md transition-all ${lang === 'bs' ? 'bg-customPrimary text-white shadow-sm' : 'text-customMuted hover:text-customText'}`}
          >
            🇧🇦 BS
          </button>
          <button 
            onClick={() => setLang('en')} 
            className={`px-2.5 py-1 rounded-md transition-all ${lang === 'en' ? 'bg-customPrimary text-white shadow-sm' : 'text-customMuted hover:text-customText'}`}
          >
            🇬🇧 EN
          </button>
        </div>

        <div className="flex items-center gap-3">
      
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center text-lg border border-customBorder rounded-lg bg-customBg hover:bg-customCard text-customText transition-all shadow-sm"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
         
          <div className="w-10 h-10 rounded-full bg-customPrimary text-white flex items-center justify-center font-bold shadow-sm">
            A
          </div>
        </div>

      </div>
    </div>
  );
}