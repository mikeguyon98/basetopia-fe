import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <select 
      onChange={changeLanguage} 
      value={i18n.language}
      className="px-2 py-1 border rounded-md text-sm"
    >
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="ja">日本語</option>
    </select>
  );
}

export default LanguageSelector;