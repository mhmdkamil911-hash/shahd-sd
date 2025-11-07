import React, { useState, useCallback, useMemo } from 'react';
import { User, Page, Language } from './types';
import { translations } from './constants';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

type AuthState = 'welcome' | 'login' | 'register' | 'authenticated';

export const AppContext = React.createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  page: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
  lang: Language;
  setLang: React.Dispatch<React.SetStateAction<Language>>;
  t: (key: string) => string;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}>({
  user: null,
  setUser: () => {},
  page: Page.Home,
  setPage: () => {},
  lang: 'ar',
  setLang: () => {},
  t: () => '',
  setAuthState: () => {},
});

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<Page>(Page.Home);
  const [lang, setLang] = useState<Language>('ar');
  const [authState, setAuthState] = useState<AuthState>('welcome');

  const t = useCallback((key: string): string => {
    return translations[lang][key] || key;
  }, [lang]);

  const contextValue = useMemo(() => ({
    user,
    setUser,
    page,
    setPage,
    lang,
    setLang,
    t,
    setAuthState,
  }), [user, page, lang, t]);

  React.useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const renderContent = () => {
    switch(authState) {
      case 'authenticated':
        return <Dashboard />;
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      case 'welcome':
      default:
        return <Welcome />;
    }
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      <div className="bg-shahd-bg min-h-screen text-shahd-text">
        {renderContent()}
      </div>
    </AppContext.Provider>
  );
};

export default App;
