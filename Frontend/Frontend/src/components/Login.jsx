import React, { useState } from 'react';
import { FiLock, FiUser, FiAlertCircle } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { loginAdmin } from "../services/adminApi";
export default function Login({ onLogin }) {
  const { lang, setLang, t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {

    e.preventDefault();


    const success = await loginAdmin({
      username: username,
      password: password
    });


    if (success) {
      localStorage.setItem(
        "isAdminLoggedIn",
        "true"
      );

      onLogin();
    }
    else {
      setError("loginError");
      setUsername('');
      setPassword('');
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-customBg px-4 page-fade">
      <div className="w-full max-w-md bg-customCard border border-customBorder rounded-2xl shadow-xl p-8 space-y-6 relative">

        <div className="absolute top-4 right-4 flex gap-1 bg-customBg border border-customBorder p-1 rounded-lg text-xs">
          <button
            onClick={() => { setLang('bs'); setError(''); }}
            className={`px-2 py-1 rounded font-bold transition-all ${lang === 'bs' ? 'bg-customPrimary text-white shadow-sm' : 'text-customMuted hover:text-customText'}`}
          >
            BS
          </button>
          <button
            onClick={() => { setLang('en'); setError(''); }}
            className={`px-2 py-1 rounded font-bold transition-all ${lang === 'en' ? 'bg-customPrimary text-white shadow-sm' : 'text-customMuted hover:text-customText'}`}
          >
            EN
          </button>
        </div>

        <div className="text-center space-y-2 pt-2">
          <h2 className="text-3xl font-bold tracking-tight text-customText">
            {t('loginWelcome')}
          </h2>
          <p className="text-customMuted text-sm">
            {t('loginSubtitle')}
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-xl">
            <FiAlertCircle className="min-w-[16px]" />
            <span>{t(error)}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-customMuted uppercase">
              {t('loginUsername')}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-customMuted">
                <FiUser size={16} />
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t('loginUsernamePlaceholder')}
                className="w-full bg-customBg border border-customBorder rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-customPrimary text-customText transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-customMuted uppercase">
              {t('loginPassword')}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-customMuted">
                <FiLock size={16} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-customBg border border-customBorder rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-customPrimary text-customText transition-all"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-customPrimary hover:bg-customPrimary/90 text-white font-semibold py-2.5 rounded-xl text-sm transition-all shadow-md shadow-customPrimary/10 mt-2"
          >
            {t('loginBtn')}
          </button>
        </form>
      </div>
    </div>
  );
}