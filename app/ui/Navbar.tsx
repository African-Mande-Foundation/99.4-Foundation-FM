'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ChevronDown, Search, X } from 'lucide-react';
import LanguageSearchBar from "./searchbar";
import { Menu } from "lucide-react";

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('home');
    const [showHomeDropdown, setShowHomeDropdown] = useState(false);
    const [showPagesDropdown, setShowPagesDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showMobileHomeDropdown, setShowMobileHomeDropdown] = useState(false);
    const [showMobilePagesDropdown, setShowMobilePagesDropdown] = useState(false);
    const homeDropdownRef = useRef<HTMLDivElement>(null);
    const pagesDropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    // Handle scroll to update active section
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'podcasts', 'collection', 'about', 'programs', 'testimonials',];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        // Only add scroll listener if we're on the main page
        if (pathname === '/') {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [pathname]);

    // Handle scroll to section from URL parameter
    useEffect(() => {
        const sectionParam = searchParams.get('section');
        if (sectionParam) {
            // Wait a bit for the page to load, then scroll to section
            setTimeout(() => {
                scrollToSection(sectionParam);
            }, 100);
        }
    }, [searchParams]);

    // Handle click outside to close dropdowns
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (homeDropdownRef.current && !homeDropdownRef.current.contains(event.target as Node)) {
                setShowHomeDropdown(false);
            }
            if (pagesDropdownRef.current && !pagesDropdownRef.current.contains(event.target as Node)) {
                setShowPagesDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        // Close dropdowns when navigating
        setShowHomeDropdown(false);
        setShowPagesDropdown(false);
        setIsMobileMenuOpen(false);
        setShowMobileHomeDropdown(false);
        setShowMobilePagesDropdown(false);
    };

    const navigateToSection = (sectionId: string) => {
        // If we're on the main page, just scroll
        if (window.location.pathname === '/') {
            scrollToSection(sectionId);
        } else {
            // If we're on another page, navigate to main page with section parameter
            router.push(`/?section=${sectionId}`);
        }
    };

    // Check if HOME should be active (when any of its dropdown sections are active)
    const isHomeActive = ['podcasts', 'collection', 'about'].includes(activeSection);

    // Check if PAGES should be active (when on any of its dropdown pages)
    const isPagesActive = ['/about', '/media', '/initiatives'].includes(pathname);

    return (
        <div className="sticky top-0 bg-black h-16 w-full flex items-center z-50 lg:px-0 xl:px-45">
            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center space-x-8 text-white font-bold text-sm">
                {/* Home with dropdown */}
                <div ref={homeDropdownRef} className="relative">
                    <button 
                        className={`flex items-center space-x-1 transition-all h-16 px-2 ${
                            isHomeActive 
                                ? 'bg-[#03A0B4] text-white' 
                                : 'hover:text-[#03A0B4]'
                        }`}
                        onClick={() => setShowHomeDropdown(!showHomeDropdown)}
                    >
                        <span>HOME</span>
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    {showHomeDropdown && (
                        <div className="absolute top-full left-0 mt-1 bg-black border border-gray-700 min-w-[200px] py-2 rounded shadow-lg">
                            <button 
                                onClick={() => navigateToSection('podcasts')}
                                className={`block w-full text-left px-4 py-2 transition-colors ${
                                    activeSection === 'podcasts' 
                                        ? 'bg-[#03A0B4] text-white' 
                                        : 'hover:bg-gray-800 hover:text-[#03A0B4]'
                                }`}
                            >
                                Podcasts
                            </button>
                            <button 
                                onClick={() => navigateToSection('collection')}
                                className={`block w-full text-left px-4 py-2 transition-colors ${
                                    activeSection === 'collection' 
                                        ? 'bg-[#03A0B4] text-white' 
                                        : 'hover:bg-gray-800 hover:text-[#03A0B4]'
                                }`}
                            >
                                Collections
                            </button>
                            <button 
                                onClick={() => navigateToSection('about')}
                                className={`block w-full text-left px-4 py-2 transition-colors ${
                                    activeSection === 'about' 
                                        ? 'bg-[#03A0B4] text-white' 
                                        : 'hover:bg-gray-800 hover:text-[#03A0B4]'
                                }`}
                            >
                                About Station
                            </button>
                        </div>
                    )}
                </div>

                {/* Pages with dropdown */}
                <div ref={pagesDropdownRef} className="relative">
                    <button 
                        className={`flex items-center space-x-1 transition-all h-16 px-2 ${
                            isPagesActive 
                                ? 'bg-[#03A0B4] text-white' 
                                : 'hover:text-[#03A0B4]'
                        }`}
                        onClick={() => setShowPagesDropdown(!showPagesDropdown)}
                    >
                        <span>PAGES</span>
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    {showPagesDropdown && (
                        <div className="absolute top-full left-0 mt-1 bg-black border border-gray-700 min-w-[200px] py-2 rounded shadow-lg">
                            <Link 
                                href="/about" 
                                className={`block px-4 py-2 transition-colors ${
                                    pathname === '/about' 
                                        ? 'bg-[#03A0B4] text-white' 
                                        : 'hover:bg-gray-800 hover:text-[#03A0B4]'
                                }`}
                            >
                                About Us
                            </Link>
                            <Link 
                                href="/media" 
                                className={`block px-4 py-2 transition-colors ${
                                    pathname === '/media' 
                                        ? 'bg-[#03A0B4] text-white' 
                                        : 'hover:bg-gray-800 hover:text-[#03A0B4]'
                                }`}
                            >
                                Media Gallery
                            </Link>
                            <Link 
                                href="/initiatives" 
                                className={`block px-4 py-2 transition-colors ${
                                    pathname === '/initiatives' 
                                        ? 'bg-[#03A0B4] text-white' 
                                        : 'hover:bg-gray-800 hover:text-[#03A0B4]'
                                }`}
                            >
                                Initiatives
                            </Link>
                        </div>
                    )}
                </div>

                {/* Programs - Active state */}
                <button 
                    onClick={() => navigateToSection('programs')}
                    className={`h-16 px-2 transition-all ${
                        activeSection === 'programs' 
                            ? 'bg-[#03A0B4] text-white' 
                            : 'hover:text-[#03A0B4]'
                    }`}
                >
                    PROGRAMS
                </button>

                {/* Testimonials */}
                <button 
                    onClick={() => navigateToSection('testimonials')}
                    className={`h-16 px-2 transition-all ${
                        activeSection === 'testimonials' ? 'bg-[#03A0B4] text-white' : 'hover:text-[#03A0B4]'
                    }`}
                >
                    TESTIMONIAL
                </button>

                {/* News */}
                <Link 
                    href="/news" 
                    className={`h-16 px-2 flex items-center transition-all ${
                        pathname === '/news' 
                            ? 'bg-[#03A0B4] text-white' 
                            : 'hover:text-[#03A0B4]'
                    }`}
                >
                    NEWS
                </Link>

                {/* Contact Us */}
                <button 
                    onClick={() => navigateToSection('contact')}
                    className={`h-16 px-2 transition-all ${
                        activeSection === 'contact' ? 'bg-[#03A0B4] text-white' : 'hover:text-[#03A0B4]'
                    }`}
                >
                    CONTACT US
                </button>

                {/* Donate */}
                <Link 
                    href="/donate" 
                    className={`h-16 px-2 flex items-center transition-all ${
                        pathname === '/donate' 
                            ? 'bg-[#03A0B4] text-white' 
                            : 'hover:text-[#03A0B4]'
                    }`}
                >
                    DONATE
                </Link>

                {/* Join Live */}
                <Link 
                    href="/join-live" 
                    className={`h-16 px-2 flex items-center transition-all ${
                        pathname === '/join-live' 
                            ? 'bg-[#03A0B4] text-white' 
                            : 'hover:text-[#03A0B4]'
                    }`}
                >
                    JOIN LIVE
                </Link>
                <Link 
                    href="/register" 
                    className={`h-16 px-2 flex items-center transition-all ${
                        pathname === '/register' 
                            ? 'bg-[#03A0B4] text-white' 
                            : 'hover:text-[#03A0B4]'
                    }`}
                >
                    SIGN UP
                </Link>
                <Link 
                    href="/login" 
                    className={`h-16 px-2 flex items-center transition-all ${
                        pathname === '/login' 
                            ? 'bg-[#03A0B4] text-white' 
                            : 'hover:text-[#03A0B4]'
                    }`}
                >
                    LOGIN
                </Link>
            </div>

            {/* Mobile layout */}
            <div className="lg:hidden flex items-center justify-between w-full px-4">
                {/* Left side - Logo/Brand */}
                <div className="text-white font-bold text-lg">
                    FOUNDATION FM
                </div>

                {/* Right side - Search, Language, and Menu */}
                <div className="flex items-center space-x-4">
                    {/* Language selector */}
                    <div className="flex items-center space-x-2 text-white">
                        <span className="text-sm font-bold">EN</span>
                        <div className="w-px h-4 bg-white"></div>
                    </div>

                    {/* Search icon */}
                    <button className="text-white hover:text-[#03A0B4] transition-colors">
                        <Search className="w-5 h-5" />
                    </button>

                    {/* Mobile menu button */}
                    <button 
                        className="text-[#03A0B4]"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Desktop right side - Language and Search */}
            <div className="hidden lg:flex ml-auto items-center space-x-4 text-white">
                {/* Language selector */}
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold">EN</span>
                    <div className="w-px h-4 bg-white"></div>
                </div>

                {/* Search icon */}
                <button className="hover:text-[#03A0B4] transition-colors">
                    <Search className="w-5 h-5" />
                </button>
            </div>

            {/* Mobile menu overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="absolute top-16 left-0 right-0 bg-black border-t border-gray-700" onClick={(e) => e.stopPropagation()}>
                        <div className="px-4 py-6 space-y-4">
                            {/* Home with dropdown */}
                            <div className="border-b border-gray-700 pb-4">
                                <button 
                                    className="flex items-center justify-between w-full text-white font-bold text-sm mb-2"
                                    onClick={() => setShowMobileHomeDropdown(!showMobileHomeDropdown)}
                                >
                                    <span>HOME</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${showMobileHomeDropdown ? 'rotate-180' : ''}`} />
                                </button>
                                {showMobileHomeDropdown && (
                                    <div className="pl-4 space-y-2">
                                        <button 
                                            onClick={() => navigateToSection('podcasts')}
                                            className={`block w-full text-left py-2 transition-colors ${
                                                activeSection === 'podcasts' 
                                                    ? 'text-[#03A0B4]' 
                                                    : 'text-gray-300 hover:text-[#03A0B4]'
                                            }`}
                                        >
                                            Podcasts
                                        </button>
                                        <button 
                                            onClick={() => navigateToSection('collection')}
                                            className={`block w-full text-left py-2 transition-colors ${
                                                activeSection === 'collection' 
                                                    ? 'text-[#03A0B4]' 
                                                    : 'text-gray-300 hover:text-[#03A0B4]'
                                            }`}
                                        >
                                            Collections
                                        </button>
                                        <button 
                                            onClick={() => navigateToSection('about')}
                                            className={`block w-full text-left py-2 transition-colors ${
                                                activeSection === 'about' 
                                                    ? 'text-[#03A0B4]' 
                                                    : 'text-gray-300 hover:text-[#03A0B4]'
                                            }`}
                                        >
                                            About Station
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Pages with dropdown */}
                            <div className="border-b border-gray-700 pb-4">
                                <button 
                                    className="flex items-center justify-between w-full text-white font-bold text-sm mb-2"
                                    onClick={() => setShowMobilePagesDropdown(!showMobilePagesDropdown)}
                                >
                                    <span>PAGES</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${showMobilePagesDropdown ? 'rotate-180' : ''}`} />
                                </button>
                                {showMobilePagesDropdown && (
                                    <div className="pl-4 space-y-2">
                                        <Link 
                                            href="/about" 
                                            className={`block py-2 transition-colors ${
                                                pathname === '/about' 
                                                    ? 'text-[#03A0B4]' 
                                                    : 'text-gray-300 hover:text-[#03A0B4]'
                                            }`}
                                        >
                                            About Us
                                        </Link>
                                        <Link 
                                            href="/media" 
                                            className={`block py-2 transition-colors ${
                                                pathname === '/media' 
                                                    ? 'text-[#03A0B4]' 
                                                    : 'text-gray-300 hover:text-[#03A0B4]'
                                            }`}
                                        >
                                            Media Gallery
                                        </Link>
                                        <Link 
                                            href="/initiatives" 
                                            className={`block py-2 transition-colors ${
                                                pathname === '/initiatives' 
                                                    ? 'text-[#03A0B4]' 
                                                    : 'text-gray-300 hover:text-[#03A0B4]'
                                            }`}
                                        >
                                            Initiatives
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Programs */}
                            <div className="border-b border-gray-700 pb-4">
                                <button 
                                    onClick={() => navigateToSection('programs')}
                                    className={`block w-full text-left py-2 font-bold text-sm transition-colors ${
                                        activeSection === 'programs' 
                                            ? 'text-[#03A0B4]' 
                                            : 'text-white hover:text-[#03A0B4]'
                                    }`}
                                >
                                    PROGRAMS
                                </button>
                            </div>

                            {/* Testimonials */}
                            <div className="border-b border-gray-700 pb-4">
                                <button 
                                    onClick={() => navigateToSection('testimonials')}
                                    className={`block w-full text-left py-2 font-bold text-sm transition-colors ${
                                        activeSection === 'testimonials' 
                                            ? 'text-[#03A0B4]' 
                                            : 'text-white hover:text-[#03A0B4]'
                                    }`}
                                >
                                    TESTIMONIAL
                                </button>
                            </div>

                            {/* News */}
                            <div className="border-b border-gray-700 pb-4">
                                <Link 
                                    href="/news" 
                                    className={`block py-2 font-bold text-sm transition-colors ${
                                        pathname === '/news' 
                                            ? 'text-[#03A0B4]' 
                                            : 'text-white hover:text-[#03A0B4]'
                                    }`}
                                >
                                    NEWS
                                </Link>
                            </div>

                            {/* Contact Us */}
                            <div className="border-b border-gray-700 pb-4">
                                <button 
                                    onClick={() => navigateToSection('contact')}
                                    className={`block w-full text-left py-2 font-bold text-sm transition-colors ${
                                        activeSection === 'contact' 
                                            ? 'text-[#03A0B4]' 
                                            : 'text-white hover:text-[#03A0B4]'
                                    }`}
                                >
                                    CONTACT US
                                </button>
                            </div>

                            {/* Donate */}
                            <div className="border-b border-gray-700 pb-4">
                                <Link 
                                    href="/donate" 
                                    className={`block py-2 font-bold text-sm transition-colors ${
                                        pathname === '/donate' 
                                            ? 'text-[#03A0B4]' 
                                            : 'text-white hover:text-[#03A0B4]'
                                    }`}
                                >
                                    DONATE
                                </Link>
                            </div>

                            {/* Join Live */}
                            <div className="pb-4">
                                <Link 
                                    href="/join-live" 
                                    className={`block py-2 font-bold text-sm transition-colors ${
                                        pathname === '/join-live' 
                                            ? 'text-[#03A0B4]' 
                                            : 'text-white hover:text-[#03A0B4]'
                                    }`}
                                >
                                    JOIN LIVE
                                </Link>
                            </div>

                             <div className="border-b border-gray-700 pb-4">
                                <Link 
                                    href="/register" 
                                    className={`block py-2 font-bold text-sm transition-colors ${
                                        pathname === '/news' 
                                            ? 'text-[#03A0B4]' 
                                            : 'text-white hover:text-[#03A0B4]'
                                    }`}
                                >
                                    SIGN UP
                                </Link>
                            </div>
                             <div className="border-b border-gray-700 pb-4">
                                <Link 
                                    href="/login" 
                                    className={`block py-2 font-bold text-sm transition-colors ${
                                        pathname === '/news' 
                                            ? 'text-[#03A0B4]' 
                                            : 'text-white hover:text-[#03A0B4]'
                                    }`}
                                >
                                    LOGIN
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}