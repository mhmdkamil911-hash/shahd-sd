import React, { useContext, useState } from 'react';
import Card from './common/Card';
import Modal from './common/Modal';
import { AppContext } from '../App';
import { Activity, UserRole } from '../types';

const initialActivities: Activity[] = [
    { id: 1, title: 'ورشة عمل جديدة في الرسم', description: 'انضموا إلينا يوم السبت القادم لورشة عمل فنية ممتعة للأطفال من كل الأعمار!', author: 'إدارة المركز', avatar: 'https://i.pravatar.cc/150?u=admin' },
    { id: 2, title: 'تهنئة لفريق "الأمل"', description: 'تهانينا الحارة لفريق "الأمل" من دارنا لفوزهم بالمركز الأول في تحدي البرمجة المحلي.', author: 'إدارة المركز', avatar: 'https://i.pravatar.cc/150?u=admin' },
    { id: 3, title: 'حملة تبرع بالكتب', description: 'دار أيتام "المستقبل" بحاجة ماسة إلى كتب للمرحلة الإعدادية. يمكنكم المساهمة في مكتبة الدار.', author: 'إدارة المركز', avatar: 'https://i.pravatar.cc/150?u=admin' }
];

const BrandHeader: React.FC = () => {
    return (
        <div className="text-center animate-fade-in-down" style={{ animationDelay: '200ms' }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>
                <span className="text-2xl md:text-3xl font-medium opacity-90 align-middle">دار</span>
                {' '}
                <span className="font-elmessiri text-5xl md:text-7xl align-middle mx-1">شهد</span>
                {' '}
                <span className="text-2xl md:text-3xl font-medium opacity-90 align-middle">الأمل</span>
            </h1>
        </div>
    );
};


const HomePage: React.FC = () => {
    const { t, user } = useContext(AppContext);
    const [activities, setActivities] = useState<Activity[]>(initialActivities);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newActivityTitle, setNewActivityTitle] = useState('');
    const [newActivityDesc, setNewActivityDesc] = useState('');

    const handleAddActivity = (e: React.FormEvent) => {
        e.preventDefault();
        if(!newActivityTitle.trim() || !newActivityDesc.trim()) return;

        const newActivity: Activity = {
            id: Date.now(),
            title: newActivityTitle,
            description: newActivityDesc,
            author: user?.name || 'Admin',
            avatar: user?.avatarUrl || 'https://i.pravatar.cc/150?u=admin'
        };
        setActivities([newActivity, ...activities]);
        setIsModalOpen(false);
        setNewActivityTitle('');
        setNewActivityDesc('');
    };

    return (
        <div className="-m-4 sm:-m-6 lg:-m-8">
            <div 
                className="relative h-[60vh] md:h-[70vh] overflow-hidden flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
            >
                <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-shahd-bg via-shahd-bg/50 to-transparent z-0"></div>
                <div className="relative z-10 p-6">
                    <BrandHeader />
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-24 relative z-10 bg-shahd-bg rounded-t-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Activities Column */}
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-shahd-accent">{t('newActivities')}</h2>
                            {user?.role === UserRole.Supervisor && (
                                <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 rtl:space-x-reverse bg-shahd-gold text-white px-4 py-2 text-sm font-semibold rounded-full shadow-lg hover:bg-amber-600 transition-transform transform hover:scale-105">
                                    <PlusIcon className="w-5 h-5" />
                                    <span>{t('addActivity')}</span>
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            {activities.map((activity, index) => (
                                <Card key={activity.id} className="p-4 animate-bubble-float" style={{animationDelay: `${index * 150}ms`}}>
                                    <div className="flex items-start space-x-3 rtl:space-x-reverse">
                                        <img src={activity.avatar} alt={activity.author} className="w-10 h-10 rounded-full object-cover" />
                                        <div className="flex-1">
                                            <p className="font-bold text-shahd-text">{activity.title}</p>
                                            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Social Media Column */}
                    <div className="space-y-8">
                         <SocialLinks />
                    </div>
                </div>
            </div>

             <Modal title={t('addActivity')} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleAddActivity} className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">{t('newActivityTitle')}</label>
                        <input type="text" value={newActivityTitle} onChange={(e) => setNewActivityTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-shahd-gold" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">{t('activityDescription')}</label>
                        <textarea value={newActivityDesc} onChange={(e) => setNewActivityDesc(e.target.value)} placeholder={t('activityDescriptionPlaceholder')} className="w-full p-2 border border-gray-300 rounded-lg mt-1" rows={4}></textarea>
                    </div>
                    <div className="text-end">
                        <button type="submit" className="py-2 px-6 bg-shahd-gold text-white font-bold rounded-full shadow-lg hover:bg-amber-600 transition-colors">
                            {t('save')}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

const SocialLinks = () => {
    const { t } = useContext(AppContext);
     const socialPlatforms = [
        { href: "#", Icon: FacebookIcon },
        { href: "#", Icon: TikTokIcon },
        { href: "#", Icon: YoutubeIcon },
        { href: "#", Icon: TelegramIcon },
        { href: "#", Icon: WhatsAppIcon },
    ];
    return (
        <Card className="animate-fade-in-up">
            <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-shahd-accent mb-4">{t('followUs')}</h3>
                <div className="flex justify-center items-center space-x-3 rtl:space-x-reverse">
                    {socialPlatforms.map((platform, index) => (
                        <SocialIcon key={index} href={platform.href} Icon={platform.Icon} index={index} />
                    ))}
                </div>
            </div>
        </Card>
    );
}

const SocialIcon: React.FC<{href: string, Icon: React.FC<React.SVGProps<SVGSVGElement>>, index: number}> = ({ href, Icon, index }) => (
    <a href={href} 
       target="_blank" 
       rel="noopener noreferrer" 
       className="w-12 h-12 rounded-full bg-shahd-gold-light text-shahd-gold flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:bg-shahd-gold hover:text-white hover:shadow-lg"
       >
        <Icon className="w-6 h-6" />
    </a>
)

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

// Social Media Icons
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
);
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.63-1.1-6-3.02-1.3-1.79-1.84-4.06-1.83-6.27.02-2.82.01-5.63.01-8.45 0-1.14.37-2.23 1.05-3.17 1.41-1.99 3.7-3.22 6.01-3.21zM7.68 8.88c-.01 2.11.01 4.22 0 6.33 0 1.61.91 2.96 2.41 3.42 1.59.48 3.23.09 4.25-1.12 1.03-1.22 1.34-2.87 1.32-4.48-.02-2.11-.01-4.22.01-6.33 0-1.57-.86-2.93-2.34-3.41-1.55-.49-3.24-.12-4.28 1.11-1.04 1.23-1.36 2.89-1.35 4.5z"></path></svg>
);
const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>
);
const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12s5.373 12 12 12 12-5.373 12-12zM5.223 12.019l12.43-4.885c.45-.178.89.24.73.69l-2.56 12.053c-.15.71-.8.93-1.33.61l-3.83-2.81-1.82 1.75c-.2.2-.46.25-.73.12l.26-3.92 7.02-6.35c.32-.29-.07-.44-.48-.16l-8.7 5.48-3.9-1.2c-.7-.22-.72-.73.13-1.09z"></path></svg>
);
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.38 1.25 4.82l-1.32 4.81 4.93-1.3c1.38.73 2.94 1.17 4.58 1.17h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zm5.22 13.39c-.27.42-.99.79-1.37.83-.38.04-.84.06-1.32-.08-.53-.16-1.15-.35-1.74-.59-.93-.38-1.74-.95-2.4-1.64-1.04-1.08-1.75-2.42-1.92-2.73-.16-.3-.34-.51-.34-.84s.16-.51.32-.67c.13-.13.3-.32.42-.42.12-.1.2-.18.3-.3.1-.12.04-.26-.02-.38-.06-.12-.51-1.22-.7-1.67-.18-.45-.36-.38-.5-.38-.13 0-.28-.02-.42-.02s-.36.04-.53.18c-.18.14-.68.66-.88.86-.2.2-.33.45-.33.77s.12 1.05.28 1.43c.16.38.7 1.55 1.73 2.58 1.48 1.48 2.58 1.9 3.48 2.21.36.12.6.2.82.26.45.12.87.1.95.08.38-.08.99-.4 1.13-.79.14-.38.14-.7.1-.79-.04-.08-.14-.12-.3-.2z"></path></svg>
);


export default HomePage;