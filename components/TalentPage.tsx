import React, { useContext, useState } from 'react';
import Card from './common/Card';
import Modal from './common/Modal';
import { AppContext } from '../App';

const artworks = [
    { id: 1, title: "نهر النيل عند الغروب", author: "خالد", type: "رسم", img: "https://images.unsplash.com/photo-1605256433334-375a5e3a31e8?q=80&w=500&auto=format&fit=crop" },
    { id: 2, title: "قصيدة الأمل", author: "علياء", type: "شعر", img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=500&auto=format&fit=crop" },
    { id: 3, title: "مشغولات يدوية", author: "فاطمة", type: "حرف", img: "https://images.unsplash.com/photo-1596700128352-ac53883a8b23?q=80&w=500&auto=format&fit=crop" },
];

const competitions = [
    { id: 1, title: "مسابقة الرسم الحر", theme: "موضوع: وطني السودان", deadline: "30 يوليو 2024" },
    { id: 2, title: "تحدي كتابة القصة القصيرة", theme: "موضوع: حلم المستقبل", deadline: "15 أغسطس 2024" },
];

const TalentPage: React.FC = () => {
    const { t } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState('gallery');
    const [isAddWorkModalOpen, setIsAddWorkModalOpen] = useState(false);
    const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
    const [subscriptions, setSubscriptions] = useState<Record<number, boolean>>({});

    const handleSubscribe = (competitionId: number) => {
        setSubscriptions(prev => ({ ...prev, [competitionId]: true }));
        setIsSubscribeModalOpen(false);
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">{t('talentZoneTitle')}</h1>
                <div className="mt-4 sm:mt-0">
                    <div className="inline-flex items-center justify-center bg-shahd-gold-light p-1.5 rounded-full space-x-2 rtl:space-x-reverse">
                        <TabButton title={t('gallery')} isActive={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} />
                        <TabButton title={t('competitions')} isActive={activeTab === 'competitions'} onClick={() => setActiveTab('competitions')} />
                    </div>
                </div>
            </div>

            <div className="relative">
                <button 
                    onClick={() => activeTab === 'gallery' ? setIsAddWorkModalOpen(true) : alert('Adding competitions is for supervisors only.')}
                    className="absolute -top-20 end-0 bg-shahd-gold text-white px-4 py-2 text-sm font-semibold rounded-full shadow-lg hover:bg-amber-600 transition-transform transform hover:scale-105"
                >
                   {activeTab === 'gallery' ? t('addWork') : t('addCompetition')}
                </button>

                {activeTab === 'gallery' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {artworks.map(art => (
                            <Card key={art.id} className="group">
                                <img src={art.img} alt={art.title} className="h-48 w-full object-cover" />
                                <div className="p-4">
                                    <h2 className="font-bold">{art.title}</h2>
                                    <p className="text-sm text-gray-600">بواسطة {art.author}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
                {activeTab === 'competitions' && (
                    <div className="space-y-4">
                        {competitions.map(comp => (
                            <Card key={comp.id} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center">
                                <div>
                                    <h2 className="font-bold text-lg">{comp.title}</h2>
                                    <p className="text-sm text-gray-600 mt-1">{comp.theme}</p>
                                    <p className="text-xs text-red-500 mt-1">آخر موعد: {comp.deadline}</p>
                                </div>
                                <button 
                                    onClick={() => !subscriptions[comp.id] && setIsSubscribeModalOpen(true)}
                                    disabled={subscriptions[comp.id]}
                                    className={`mt-4 sm:mt-0 px-6 py-2 text-sm font-semibold rounded-full transition-colors w-full sm:w-auto ${
                                        subscriptions[comp.id] 
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                        : 'bg-shahd-green text-white hover:bg-green-700'
                                    }`}
                                >
                                    {subscriptions[comp.id] ? t('subscribed') : t('subscribe')}
                                </button>
                                {isSubscribeModalOpen && (
                                    <Modal title={t('subscribeConfirmation')} onClose={() => setIsSubscribeModalOpen(false)}>
                                        <p>هل أنت متأكد أنك تريد الاشتراك في "{comp.title}"؟</p>
                                        <div className="flex justify-end space-x-2 rtl:space-x-reverse mt-4">
                                            <button onClick={() => setIsSubscribeModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg">{t('close')}</button>
                                            <button onClick={() => handleSubscribe(comp.id)} className="px-4 py-2 bg-shahd-green text-white rounded-lg">{t('subscribe')}</button>
                                        </div>
                                    </Modal>
                                )}
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <Modal title={t('addYourWorkTitle')} isOpen={isAddWorkModalOpen} onClose={() => setIsAddWorkModalOpen(false)}>
                <form className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">{t('artworkTitle')}</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-shahd-gold" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">{t('artworkType')}</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-shahd-gold" />
                    </div>
                     <div>
                        <label className="text-sm font-bold text-gray-600 block">{t('uploadImage')}</label>
                        <input type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-shahd-gold-light file:text-shahd-gold hover:file:bg-shahd-gold-light/80 mt-1"/>
                    </div>
                    <div className="text-end">
                        <button type="submit" className="py-2 px-6 bg-shahd-gold text-white font-bold rounded-full shadow-lg hover:bg-amber-600 transition-colors">
                            {t('submit')}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

const TabButton: React.FC<{ title: string, isActive: boolean, onClick: () => void }> = ({ title, isActive, onClick }) => (
    <button onClick={onClick} className={`px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full focus:outline-none ${isActive ? 'bg-white text-shahd-gold shadow-md' : 'text-shahd-accent hover:bg-white/70'}`}>
        {title}
    </button>
);

export default TalentPage;