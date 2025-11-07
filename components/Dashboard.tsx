import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../App';
import { Page, UserRole } from '../types';
import HomePage from './HomePage';
import CommunityPage from './CommunityPage';
import EducationPage from './EducationPage';
import SupportPage from './SupportPage';
import TalentPage from './TalentPage';
import OrphanagesPage from './OrphanagesPage';
import VolunteerPage from './VolunteerPage';
import ProfilePage from './ProfilePage';
import AdminPage from './AdminPage';
import Logo from './common/Logo';

const Dashboard: React.FC = () => {
    const { user, setUser, page, setPage, lang, setLang, t, setAuthState } = useContext(AppContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        setUser(null);
        setAuthState('welcome');
    };

    const toggleLanguage = () => {
        const newLang = lang === 'ar' ? 'en' : 'ar';
        setLang(newLang);
    };

    const renderPage = () => {
        switch (page) {
            case Page.Community:
                return <CommunityPage />;
            case Page.Education:
                return <EducationPage />;
            case Page.Support:
                return <SupportPage />;
            case Page.Talent:
                return <TalentPage />;
            case Page.Collaboration:
                return <OrphanagesPage />;
            case Page.Volunteer:
                 return <VolunteerPage />;
            case Page.Profile:
                return <ProfilePage />;
            case Page.Admin:
                return <AdminPage />;
            case Page.Home:
            default:
                return <HomePage />;
        }
    };
    
    const navItems = [
      { page: Page.Home, icon: HomeIcon, label: t('home') },
      { page: Page.Community, icon: CommunityIcon, label: t('community') },
      { page: Page.Education, icon: EducationIcon, label: t('education') },
      { page: Page.Support, icon: SupportIcon, label: t('support') },
      { page: Page.Talent, icon: TalentIcon, label: t('talentZone') },
      { page: Page.Collaboration, icon: CollabIcon, label: t('collaboration') },
      { page: Page.Volunteer, icon: VolunteerIcon, label: t('volunteerAndDonate') },
    ];
    
    if (user?.role === UserRole.Supervisor) {
        navItems.push({ page: Page.Admin, icon: AdminIcon, label: t('adminDashboard')});
    }

    const SidebarContent = () => (
      <div className="flex flex-col h-full bg-white shadow-lg">
        <div className="p-4 border-b">
          <Logo />
        </div>
        <nav className="flex-1 p-4 space-y-2">
            {navItems.map(item => (
                <button
                    key={item.page}
                    onClick={() => {
                        setPage(item.page);
                        setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center p-3 rounded-lg transition-all duration-300 relative ${
                        page === item.page
                            ? 'bg-gradient-to-l from-shahd-gold-light text-shahd-gold font-bold'
                            : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    {page === item.page && <div className="absolute start-0 top-0 bottom-0 w-1.5 bg-shahd-gold rounded-s-full"></div>}
                    <item.icon className="w-6 h-6 me-3" />
                    <span>{item.label}</span>
                </button>
            ))}
        </nav>
        <div className="p-4 border-t">
          <button onClick={handleLogout} className="w-full flex items-center p-3 rounded-lg text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors duration-200">
            <LogoutIcon className="w-6 h-6 me-3"/>
            <span>{t('logout')}</span>
          </button>
        </div>
      </div>
    );

    return (
        <div className="flex h-screen bg-shahd-bg">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 h-full">
               <SidebarContent/>
            </aside>
            
            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-40 transform ${isSidebarOpen ? 'translate-x-0' : (lang === 'ar' ? 'translate-x-full' : '-translate-x-full')} transition-transform duration-300 ease-in-out lg:hidden`}>
                <div className="w-64 h-full">
                    <SidebarContent />
                </div>
            </div>
            {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center p-4 bg-white shadow-md z-20">
                    <button className="lg:hidden text-gray-600" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <MenuIcon className="w-6 h-6"/>
                    </button>
                    <div className="flex-1"></div>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <span className="font-semibold text-gray-600">{lang === 'ar' ? 'EN' : 'AR'}</span>
                        </button>
                        <UserMenu handleLogout={handleLogout} />
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    <div className="p-4 sm:p-6 lg:p-8">
                        {renderPage()}
                    </div>
                </main>
            </div>
        </div>
    );
};

const UserMenu = ({ handleLogout }: { handleLogout: () => void; }) => {
    const { user, setPage, t } = useContext(AppContext);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer">
                <img src={user?.avatarUrl || 'https://i.pravatar.cc/150'} alt={user?.name} className="w-10 h-10 rounded-full object-cover"/>
                <span className="hidden md:block font-semibold text-gray-700">{user?.name}</span>
            </button>
            {isOpen && (
                <div className="absolute top-12 end-0 w-48 bg-white rounded-lg shadow-xl py-2 z-30">
                    <button onClick={() => { setPage(Page.Profile); setIsOpen(false); }} className="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <ProfileIcon className="w-4 h-4 me-2" /> {t('myProfile')}
                    </button>
                    {user?.role === UserRole.Supervisor && (
                         <button onClick={() => { setPage(Page.Admin); setIsOpen(false); }} className="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                            <AdminIcon className="w-4 h-4 me-2" /> {t('adminDashboard')}
                        </button>
                    )}
                    <div className="border-t my-1"></div>
                    <button onClick={handleLogout} className="w-full text-start px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                        <LogoutIcon className="w-4 h-4 me-2" /> {t('logout')}
                    </button>
                </div>
            )}
        </div>
    );
};


// SVG Icons
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
const CommunityIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);
const EducationIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M12 12L8 9.778 4 12l4 2.222L12 12z" /></svg>
);
const SupportIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
);
const CollabIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
);
const TalentIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
);
const VolunteerIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);
const LogoutIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
);
const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
);
const ProfileIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);
const AdminIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);

export default Dashboard;