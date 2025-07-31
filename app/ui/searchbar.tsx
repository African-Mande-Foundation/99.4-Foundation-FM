'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

const translations = {
  en: {
    search: 'Search...',
  },
  ar: {
    search: 'بحث...',
  },
};

export default function LanguageSearchBar({
  onLanguageChange,
  onSearch,
}: {
  onLanguageChange?: (lang: string) => void;
  onSearch?: (query: string) => void;
}) {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Show the language to switch to
  const nextLang = language === 'en' ? 'ar' : 'en';
  // Use 'EN' for English, 'ع' for Arabic
  const nextLangLabel = nextLang === 'en' ? 'EN' : 'ع';

  const toggleLanguage = () => {
    setLanguage(nextLang);
    if (onLanguageChange) onLanguageChange(nextLang);
    document.documentElement.lang = nextLang;
  };

  const toggleSearchBar = () => {
    setShowSearch((prev) => !prev);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(searchValue);
    }
  };

  return (
    <div className="relative flex items-center justify-between pr-4 space-x-4 text-white z-50">
      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="p-2 border-r-2 border-white hover:cursor-pointer focus:outline-none"
        aria-label="Toggle language"
      >
        {nextLangLabel}
      </button>

      {/* Search Icon with Click */}
      <div className="relative">
        <button onClick={toggleSearchBar} aria-label="Toggle Search Bar">
          <Search className="cursor-pointer w-5 h-5" />
        </button>

        {showSearch && (
          <input
            type="text"
            placeholder={translations[language].search}
            className="absolute top-7 right-0 mt-1 p-1 w-40 border border-gray-300 rounded-md text-black"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            autoFocus
          />
        )}
      </div>
    </div>
  );
}