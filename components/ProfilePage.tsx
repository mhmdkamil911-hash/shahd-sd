import React, { useContext, useState } from 'react';
import Card from './common/Card';
import { AppContext } from '../App';

const artworks = [
    { id: 1, title: "نهر النيل عند الغروب", type: "رسم", img: "https://images.unsplash.com/photo-1605256433334-375a5e3a31e8?q=80&w=500&auto=format&fit=crop" },
];

const competitions = [
    { id: 1, title: "مسابقة الرسم الحر", status: "مسجل" },
];

const ProfilePage: React.FC = () => {
    const { t, user } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState('artworks');

    return (
        <div className="space-y-8">
            <Card className="p-6">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 rtl:sm:space-x-reverse">
                    <img src={user?.avatarUrl} alt={user?.name} className="w-24 h-24 rounded-full object-cover shadow-lg" />
                    <div>
                        <h1 className="text-2xl font-bold text-shahd-accent">{user?.name}</h1>
                        <p className="text-gray-500 capitalize">{user?.role ? t(user.role) : ''}</p>
                    </div>
                </div>
            </Card>

            <div>
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-6 rtl:space-x-reverse" aria-label="Tabs">
                        <TabButton title={t('myArtworks')} isActive={activeTab === 'artworks'} onClick={() => setActiveTab('artworks')} />
                        <TabButton title={t('myCompetitions')} isActive={activeTab === 'competitions'} onClick={() => setActiveTab('competitions')} />
                    </nav>
                </div>

                <div className="mt-6">
                    {activeTab === 'artworks' && (
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {artworks.map(art => (
                                <Card key={art.id} className="group">
                                    <img src={art.img} alt={art.title} className="h-48 w-full object-cover" />
                                    <div className="p-4">
                                        <h2 className="font-bold">{art.title}</h2>
                                        <p className="text-sm text-gray-600">{art.type}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                     {activeTab === 'competitions' && (
                        <div className="space-y-4">
                            {competitions.map(comp => (
                                <Card key={comp.id} className="p-4">
                                    <h2 className="font-bold">{comp.title}</h2>
                                    <p className="text-sm text-green-600 font-semibold">{comp.status}</p>
                                </Card>
                            ))}
                        </div>
                     )}
                </div>
            </div>
        </div>
    );
};

const TabButton: React.FC<{ title: string, isActive: boolean, onClick: () => void }> = ({ title, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
            isActive
                ? 'border-shahd-gold text-shahd-gold'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
    >
        {title}
    </button>
);

export default ProfilePage;