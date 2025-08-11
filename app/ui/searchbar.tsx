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
    <div className="relative flex items-center justify-center  h-16 w-20 ">
    <div className="absolute z-20 w-20 flex items-center justify-end mb-1 space-x-4 text-white z-50">
      {/* Language Toggle */}
      <div className="flex items-center space-x-2">
      <button
        onClick={toggleLanguage}
        className="text-base font-bold"
        aria-label="Toggle language"
      >
        {nextLangLabel}
      </button>
      </div>

      <div className="w-px h-5 bg-white"></div>

      {/* Search Icon with Click */}
      
        <button onClick={toggleSearchBar}
        className="hover:text-[#03A0B4] transition-colors" aria-label="Toggle Search Bar">
          <Search className="cursor-pointer  w-5 h-5" />
        </button>

       

        
      
    </div>

    {showSearch && (
      <div className="absolute top-20 z-20 right-0 h-14 w-50 bg-[#0d0d0d]">
        <div className="relative w-full h-full flex items-center justify-center">
          <input
            type="text"
            placeholder={translations[language].search}
            className="  w-45 text-white border-b-1 text-black outline-none"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            
          />
          </div>
          </div>
        )}
     
    </div>
  );
}