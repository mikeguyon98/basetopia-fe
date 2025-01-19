import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'English', emoji: '🇺🇸' },
    { code: 'es', label: 'Español', emoji: '🇪🇸' },
    { code: 'ja', label: '日本語', emoji: '🇯🇵' }
  ];

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <select 
      onChange={changeLanguage} 
      value={i18n.language}
      className="
        px-3 py-2 
        bg-dark-800 
        text-white 
        border border-dark-700 
        rounded-md 
        text-sm 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500 
        focus:border-transparent
        hover:bg-dark-700
        transition-colors
      "
    >
      {languages.map(({ code, label, emoji }) => (
        <option key={code} value={code} className="bg-dark-800">
          {emoji} {label}
        </option>
      ))}
    </select>
  );
}

export default LanguageSelector;