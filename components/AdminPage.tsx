import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { UserRole, Activity } from '../types';
import Card from './common/Card';

const mockApplications = [
    { id: 1, name: 'أحمد محمود', contact: 'ahmed@email.com', reason: 'لدي خبرة في تدريس الرياضيات وأود المساعدة.' },
    { id: 2, name: 'سارة إبراهيم', contact: '+249123456789', reason: 'أنا فنانة وأرغب في تنظيم ورش عمل فنية للأطفال.' },
];

const initialActivities: Activity[] = [
    { id: 1, title: 'ورشة عمل جديدة في الرسم', description: 'انضموا إلينا يوم السبت القادم لورشة عمل فنية ممتعة للأطفال من كل الأعمار!', author: 'إدارة المركز', avatar: 'https://i.pravatar.cc/150?u=admin' },
    { id: 2, title: 'تهنئة لفريق "الأمل"', description: 'تهانينا الحارة لفريق "الأمل" من دارنا لفوزهم بالمركز الأول في تحدي البرمجة المحلي.', author: 'إدارة المركز', avatar: 'https://i.pravatar.cc/150?u=admin' },
];

const AdminPage: React.FC = () => {
    const { t, user } = useContext(AppContext);
    
    if (user?.role !== UserRole.Supervisor) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
                <p className="text-gray-600">You do not have permission to view this page.</p>
            </div>
        );
    }
    
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">{t('adminDashboard')}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <VolunteerApplications />
                    <ContentManagement />
                </div>
                <div className="lg:col-span-1">
                    <DonationSummary />
                </div>
            </div>
        </div>
    );
};

const VolunteerApplications: React.FC = () => {
    const { t } = useContext(AppContext);
    const [applications, setApplications] = useState(mockApplications);

    const handleDecision = (id: number) => {
        setApplications(apps => apps.filter(app => app.id !== id));
    };

    return (
        <Card>
            <div className="p-6">
                <h2 className="text-xl font-bold text-shahd-accent mb-4">{t('volunteerApplications')}</h2>
                {applications.length > 0 ? (
                    <div className="space-y-4">
                        {applications.map(app => (
                            <div key={app.id} className="bg-shahd-gold-light/50 rounded-lg p-4 border border-shahd-gold-light">
                                <h3 className="font-bold">{app.name}</h3>
                                <p className="text-sm text-gray-600"><span className="font-semibold">{t('contactInfo')}</span> {app.contact}</p>
                                <p className="text-sm text-gray-600 mt-1"><span className="font-semibold">{t('reasonForVolunteering')}</span> {app.reason}</p>
                                <div className="flex justify-end space-x-2 rtl:space-x-reverse mt-3">
                                    <button onClick={() => handleDecision(app.id)} className="px-3 py-1 text-xs font-semibold text-white bg-shahd-green rounded-full hover:bg-green-700">{t('approve')}</button>
                                    <button onClick={() => handleDecision(app.id)} className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full hover:bg-red-600">{t('reject')}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">{t('noPendingApplications')}</p>
                )}
            </div>
        </Card>
    );
};

const ContentManagement: React.FC = () => {
    const { t } = useContext(AppContext);
    const [activities, setActivities] = useState(initialActivities);

    const handleDelete = (id: number) => {
        if(window.confirm('Are you sure you want to delete this activity?')) {
            setActivities(acts => acts.filter(act => act.id !== id));
        }
    };
    
    return (
        <Card>
            <div className="p-6">
                <h2 className="text-xl font-bold text-shahd-accent mb-4">{t('manageContent')}</h2>
                <div className="space-y-4">
                    {activities.map(activity => (
                        <div key={activity.id} className="flex items-center justify-between bg-shahd-gold-light/50 p-3 rounded-lg">
                             <div className="flex-1 me-4">
                                <p className="font-bold text-shahd-text">{activity.title}</p>
                                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                            </div>
                            <button onClick={() => handleDelete(activity.id)} aria-label={t('deleteActivity')} className="text-red-500 hover:text-red-700 p-2 flex-shrink-0">
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}

const DonationSummary: React.FC = () => {
    const { t } = useContext(AppContext);
    return (
        <Card>
            <div className="p-6">
                <h2 className="text-xl font-bold text-shahd-accent mb-4">{t('donationSummary')}</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-shahd-green-light rounded-lg">
                        <span className="font-semibold text-sm text-shahd-accent">{t('totalFinancial')}</span>
                        <span className="font-bold text-lg text-shahd-green">$15,250</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-shahd-gold-light rounded-lg">
                        <span className="font-semibold text-sm text-shahd-accent">{t('totalInKind')}</span>
                        <span className="font-bold text-lg text-shahd-gold">342 {t('items')}</span> 
                    </div>
                </div>
            </div>
        </Card>
    );
};

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);


export default AdminPage;