import React, { useContext, useState } from 'react';
import Card from './common/Card';
import { AppContext } from '../App';

const counselors = [
    { id: 1, name: "د. فاطمة أحمد", specialty: "أخصائية نفسية للأطفال", available: "متاحة للحجز", avatar: "https://i.pravatar.cc/150?u=fatima" },
    { id: 2, name: "أ. يوسف علي", specialty: "مرشد أسري وتربوي", available: "متاحة للحجز", avatar: "https://i.pravatar.cc/150?u=youssef" },
];

const sessions = [
    { id: 1, title: "التعامل مع الضغوط", date: "السبت، 5 مساءً", status: 'upcoming' },
    { id: 2, title: "بناء الثقة بالنفس", date: "الأربعاء، 6 مساءً", status: 'upcoming' },
];

const resources = [
    { id: 1, title: "كتيب تمارين الاسترخاء", type: "PDF" },
    { id: 2, title: "فيديو تأمل موجه", type: "فيديو" },
];

const SupportPage: React.FC = () => {
    const { t } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState('individual');

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">{t('supportTitle')}</h1>
                <div className="mt-4 sm:mt-0">
                    <div className="inline-flex items-center justify-center bg-shahd-gold-light p-1.5 rounded-full space-x-2 rtl:space-x-reverse">
                        <TabButton title={t('individualCounseling')} isActive={activeTab === 'individual'} onClick={() => setActiveTab('individual')} />
                        <TabButton title={t('groupSessions')} isActive={activeTab === 'group'} onClick={() => setActiveTab('group')} />
                        <TabButton title={t('resources')} isActive={activeTab === 'resources'} onClick={() => setActiveTab('resources')} />
                    </div>
                </div>
            </div>

            {activeTab === 'individual' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {counselors.map(c => (
                        <Card key={c.id} className="p-4 flex items-center space-x-4 rtl:space-x-reverse">
                            <img src={c.avatar} alt={c.name} className="w-20 h-20 rounded-full object-cover" />
                            <div className="flex-1">
                                <h2 className="font-bold text-lg">{c.name}</h2>
                                <p className="text-sm text-gray-600">{c.specialty}</p>
                                <button className="mt-2 px-4 py-1 bg-shahd-gold-light text-shahd-gold text-sm font-semibold rounded-full hover:bg-shahd-gold hover:text-white transition-colors">
                                    {t('bookSession')}
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
            {activeTab === 'group' && (
                <div className="space-y-4">
                    {sessions.map(s => (
                        <Card key={s.id} className="p-4 flex justify-between items-center">
                            <div>
                                <h2 className="font-bold">{s.title}</h2>
                                <p className="text-sm text-gray-500">{s.date}</p>
                            </div>
                            <button className="px-4 py-2 bg-shahd-green text-white text-sm font-semibold rounded-full hover:bg-green-700 transition-colors">{t('joinSession')}</button>
                        </Card>
                    ))}
                </div>
            )}
            {activeTab === 'resources' && (
                <div className="space-y-4">
                    {resources.map(r => (
                        <Card key={r.id} className="p-4 flex justify-between items-center">
                            <div>
                                <h2 className="font-bold">{r.title}</h2>
                                <p className="text-sm text-gray-500">{r.type}</p>
                            </div>
                            <button className="px-4 py-2 bg-shahd-gold text-white text-sm font-semibold rounded-full hover:bg-amber-600 transition-colors">{t('download')}</button>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

const TabButton: React.FC<{ title: string, isActive: boolean, onClick: () => void }> = ({ title, isActive, onClick }) => (
    <button onClick={onClick} className={`px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full focus:outline-none ${isActive ? 'bg-white text-shahd-gold shadow-md' : 'text-shahd-accent hover:bg-white/70'}`}>
        {title}
    </button>
);

export default SupportPage;