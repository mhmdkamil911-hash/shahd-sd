import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import Logo from '../common/Logo';
import { UserRole } from '../../types';

const Login: React.FC = () => {
    const { t, setAuthState, setUser } = useContext(AppContext);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Admin login check
        if (phone === '0534212149' && password === '17991799') {
            setUser({
                id: 'admin-01',
                name: 'Admin',
                role: UserRole.Supervisor,
                avatarUrl: 'https://i.pravatar.cc/150?u=admin'
            });
            setAuthState('authenticated');
            return;
        }

        // Default mock login for other users
        setUser({
            id: '1',
            name: 'مستخدم شهد',
            role: UserRole.Orphan,
            avatarUrl: 'https://i.pravatar.cc/150'
        });
        setAuthState('authenticated');
    };

    return (
        <div className="min-h-screen flex items-center justify-center sudanese-pattern p-4">
            <div className="w-full max-w-sm">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex justify-center mb-6">
                        <Logo />
                    </div>
                    <h1 className="text-2xl font-bold text-center text-shahd-text mb-6">{t('login')}</h1>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="text-sm font-bold text-gray-600 block">{t('emailOrPhone')}</label>
                            <input 
                                type="text" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-shahd-gold" />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-600 block">{t('password')}</label>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-shahd-gold" />
                        </div>
                        <button type="submit" className="w-full py-3 px-6 bg-shahd-gold text-white font-bold rounded-full shadow-lg hover:bg-amber-600 transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
                            {t('login')}
                        </button>
                    </form>
                </div>
                <p className="text-center text-sm text-gray-600 mt-6">
                    ليس لديك حساب؟ <button onClick={() => setAuthState('register')} className="font-bold text-shahd-gold hover:underline">{t('createAccount')}</button>
                </p>
            </div>
        </div>
    );
};

export default Login;
