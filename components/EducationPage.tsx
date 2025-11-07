import React, { useContext, useState } from 'react';
import Card from './common/Card';
import { AppContext } from '../App';

const lessons = [
    { id: 1, title: 'emotionalIntelligence', category: 'الذكاء العاطفي', img: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=500&auto=format&fit=crop', duration: '45 دقيقة' },
    { id: 2, title: 'digitalSkills', category: 'المهارات الرقمية', img: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=500&auto=format&fit=crop', duration: 'ساعة و 30 دقيقة' },
    { id: 3, title: 'crafts', category: 'الحرف اليدوية', img: 'https://images.unsplash.com/photo-1596700128352-ac53883a8b23?q=80&w=500&auto=format&fit=crop', duration: 'ساعتان' },
    { id: 4, title: 'financialLiteracy', category: 'الثقافة المالية', img: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=500&auto=format&fit=crop', duration: 'ساعة' }
];

const EducationPage: React.FC = () => {
    const { t } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState('lessons');

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">{t('educationTitle')}</h1>
                <div className="mt-4 sm:mt-0">
                    <div className="inline-flex items-center justify-center bg-shahd-gold-light p-1.5 rounded-full space-x-2 rtl:space-x-reverse">
                        <TabButton title={t('allLessons')} isActive={activeTab === 'lessons'} onClick={() => setActiveTab('lessons')} />
                        <TabButton title={t('myAchievements')} isActive={activeTab === 'achievements'} onClick={() => setActiveTab('achievements')} />
                        <TabButton title={t('myProgress')} isActive={activeTab === 'progress'} onClick={() => setActiveTab('progress')} />
                    </div>
                </div>
            </div>

            {activeTab === 'lessons' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {lessons.map(lesson => (
                        <Card key={lesson.id} className="flex flex-col group">
                            <div className="overflow-hidden rounded-t-3xl">
                              <img src={lesson.img} alt={t(lesson.title)} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <span className="text-sm text-shahd-gold font-semibold">{lesson.category}</span>
                                <h2 className="text-lg font-bold mt-1 flex-1">{t(lesson.title)}</h2>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-xs text-gray-500">{lesson.duration}</span>
                                    <button className="px-4 py-2 bg-shahd-gold-light text-shahd-gold font-semibold rounded-full text-sm hover:bg-shahd-gold hover:text-white transition-colors duration-300">
                                        {t('startLesson')}
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
            {activeTab === 'achievements' && <EmptyState message="لا توجد إنجازات لعرضها بعد. أكمل الدروس لكسب الشارات!" />}
            {activeTab === 'progress' && <EmptyState message="لا يوجد تقدم مسجل. ابدأ درساً لتتبع تقدمك!" />}
        </div>
    );
};

const TabButton: React.FC<{ title: string, isActive: boolean, onClick: () => void }> = ({ title, isActive, onClick }) => (
    <button onClick={onClick} className={`px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full focus:outline-none ${isActive ? 'bg-white text-shahd-gold shadow-md' : 'text-shahd-accent hover:bg-white/70'}`}>
        {title}
    </button>
);

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
    <div className="text-center py-16">
        <p className="text-gray-500">{message}</p>
    </div>
);

export default EducationPage;