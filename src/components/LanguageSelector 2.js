import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, Option } from "@material-tailwind/react";

function LanguageSelector() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
  ];

  const changeLanguage = (value) => {
    i18n.changeLanguage(value);
    // Store the language preference
    localStorage.setItem('preferred-language', value);
  };

  return (
    <div className="w-40">
      <Select
        value={i18n.language}
        onChange={changeLanguage}
        variant="outlined"
        className="bg-white"
        label="Language"
      >
        {languages.map((lang) => (
          <Option key={lang.code} value={lang.code}>
            <div className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default LanguageSelector;