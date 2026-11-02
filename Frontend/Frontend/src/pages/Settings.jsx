import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { FiSave, FiMoon, FiSun } from 'react-icons/fi';
import React, { useState, useEffect } from "react";
import { loginAdmin, updatePassword, getAdmin } from "../services/adminApi";
export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [admin, setAdmin] = useState(null);
  const [notification, setNotification] = useState(null);
  useEffect(() => {
    const loadAdmin = async () => {
      const data = await getAdmin();
      setAdmin(data);
    };
    loadAdmin();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showNotification(t('passwordsDoNotMatch'), "error");
      return;
    }
    const login = await loginAdmin({
      username: admin.username,
      password: currentPassword
    });
    if (!login) {
      showNotification(t('currentPasswordIncorrect'), "error");
      return;
    }
    const updated = await updatePassword({
      username: admin.username,
      password: newPassword
    });
    if (updated) {
      showNotification(t('passwordChangedSuccess'), "success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };
  const showNotification = (message, type = "success") => {
    setNotification({
      message,
      type
    });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  return (
    <div className="relative">
      {notification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>
          <div
            className={`relative z-10 px-8 py-5 rounded-2xl shadow-xl border bg-customCard text-customText animate-fadeIn`}>
            <div className="text-lg font-semibold">
              {notification.type === "success" ? "✓ Success" : "⚠ Error"}
            </div>
            <div className="text-sm text-customMuted mt-1">
              {notification.message}
            </div>
          </div>
        </div>
      )}
      <div className="space-y-6 text-left max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-customText">{t('systemSettings')}</h1>
          <p className="text-customMuted text-sm mt-1">{t('settingsSubtitle')}</p>
        </div>
        <div className="bg-customCard p-6 rounded-2xl border border-customBorder shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-customText">{t('appAppearance')}</h3>
          <p className="text-sm text-customMuted">{t('appearanceDesc')}</p>
          <div className="flex items-center justify-between p-4 bg-customBg rounded-xl border border-customBorder">
            <div className="flex items-center gap-3">
              {theme === 'light' ? <FiSun className="text-amber-500" size={22} /> : <FiMoon className="text-indigo-400" size={22} />}
              <div>
                <div className="font-medium text-sm text-customText">
                  {theme === 'light' ? t('lightModeLabel') : t('darkModeLabel')}
                </div>
                <div className="text-xs text-customMuted">{t('themeDesc')}</div>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 text-xs font-semibold bg-customPrimary text-white rounded-xl shadow-sm hover:opacity-90 transition-all"
            >
              {t('themeToggleBtn')} {theme === 'light' ? t('themeToggleDark') : t('themeToggleLight')}
            </button>
          </div>
        </div>
        <div className="bg-customCard p-6 rounded-2xl border border-customBorder shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-customText">{t('securityTitle')}</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-customMuted uppercase tracking-wider mb-2">{t('currentPassword')}</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-customBg border border-customBorder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-customPrimary/20 focus:border-customPrimary text-customText transition-all"
                />
              </div>
              <div></div>
              <div>
                <label className="block text-xs font-semibold text-customMuted uppercase tracking-wider mb-2">{t('newPassword')}</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={t('minCharacters')}
                  className="w-full bg-customBg border border-customBorder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-customPrimary/20 focus:border-customPrimary text-customText transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-customMuted uppercase tracking-wider mb-2">{t('confirmPassword')}</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t('repeatPassword')}
                  className="w-full bg-customBg border border-customBorder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-customPrimary/20 focus:border-customPrimary text-customText transition-all"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button className="flex items-center gap-2 bg-customPrimary hover:bg-opacity-90 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all text-sm">
                <FiSave size={16} /> {t('saveChanges')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}