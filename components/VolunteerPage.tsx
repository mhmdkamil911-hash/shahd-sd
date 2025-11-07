import React, { useContext, useState } from 'react';
import Card from './common/Card';
import Modal from './common/Modal';
import { AppContext } from '../App';
import { Page, UserRole } from '../types';

const VolunteerPage: React.FC = () => {
    const { t, user } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState('volunteer');

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">{t('volunteerAndDonate')}</h1>
                <div className="mt-4 sm:mt-0">
                    <div className="inline-flex items-center justify-center bg-shahd-gold-light p-1.5 rounded-full space-x-2 rtl:space-x-reverse">
                        <TabButton title={t('volunteerTitle')} isActive={activeTab === 'volunteer'} onClick={() => setActiveTab('volunteer')} />
                        <TabButton title={t('donationTitle')} isActive={activeTab === 'donate'} onClick={() => setActiveTab('donate')} />
                    </div>
                </div>
            </div>

            {user?.role === UserRole.Supervisor && (
                <AdminDashboardLink />
            )}
            
            {activeTab === 'volunteer' && <VolunteerSection />}
            {activeTab === 'donate' && <DonationSection />}
        </div>
    );
};

const AdminDashboardLink: React.FC = () => {
    const { t, setPage } = useContext(AppContext);
    return (
        <Card className="p-4 mb-8 bg-shahd-gold-light border border-shahd-gold">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <div>
                    <h3 className="font-bold text-shahd-accent">{t('adminTools')}</h3>
                    <p className="text-sm text-gray-600">إدارة طلبات التطوع، التبرعات، والمحتوى.</p>
                </div>
                <button 
                    onClick={() => setPage(Page.Admin)}
                    className="mt-4 sm:mt-0 py-2 px-6 bg-shahd-gold text-white font-bold rounded-full shadow-md hover:bg-amber-600 transition-colors"
                >
                    {t('goToAdminDashboard')}
                </button>
            </div>
        </Card>
    );
}


const VolunteerSection: React.FC = () => {
    const { t } = useContext(AppContext);
    const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [fullName, setFullName] = useState('');
    const [contact, setContact] = useState('');
    const [reason, setReason] = useState('');
    
    const handleVolunteerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to a server
        console.log({ fullName, contact, reason });

        // Reset form and show success message
        setFullName('');
        setContact('');
        setReason('');
        setIsVolunteerModalOpen(false);
        setIsSuccessModalOpen(true);
    };

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold">{t('volunteerOpportunities')}</h2>
                    <Card className="p-4">
                        <h3 className="font-bold">ورشة عمل فنية</h3>
                        <p className="text-sm text-gray-500">مطلوب متطوعين للمساعدة في تنظيم ورشة رسم للأطفال في دار المستقبل.</p>
                    </Card>
                    <Card className="p-4">
                        <h3 className="font-bold">تدريس رياضيات</h3>
                        <p className="text-sm text-gray-500">بحاجة لمتطوعين لتقديم دروس تقوية في الرياضيات للمرحلة المتوسطة.</p>
                    </Card>
                </div>
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">{t('becomeVolunteer')}</h2>
                    <Card className="p-6 text-center">
                        <p className="mb-4">هل لديك مهارة أو وقت تود مشاركته؟ انضم إلى شبكة المتطوعين لدينا.</p>
                        <button onClick={() => setIsVolunteerModalOpen(true)} className="w-full py-2 px-4 bg-shahd-gold text-white font-bold rounded-full hover:bg-amber-600 transition-colors">{t('becomeVolunteer')}</button>
                    </Card>
                </div>
            </div>
            
            <Modal title={t('volunteerRegistration')} isOpen={isVolunteerModalOpen} onClose={() => setIsVolunteerModalOpen(false)}>
                <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">{t('fullName')}</label>
                        <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg mt-1" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">{t('emailOrPhone')}</label>
                        <input type="text" value={contact} onChange={e => setContact(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg mt-1" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">{t('whyVolunteer')}</label>
                        <textarea value={reason} onChange={e => setReason(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg mt-1" rows={3}></textarea>
                    </div>
                    <div className="text-end">
                        <button type="submit" className="py-2 px-6 bg-shahd-gold text-white font-bold rounded-full">{t('submit')}</button>
                    </div>
                </form>
            </Modal>

            <Modal title={t('volunteerSubmissionSuccessTitle')} isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)}>
                <p className="text-center text-gray-600">{t('volunteerSubmissionSuccessBody')}</p>
                <div className="text-center mt-6">
                     <button onClick={() => setIsSuccessModalOpen(false)} className="py-2 px-8 bg-shahd-gold text-white font-bold rounded-full">{t('close')}</button>
                </div>
            </Modal>
        </>
    );
}

const DonationSection: React.FC = () => {
    const { t } = useContext(AppContext);
    const [isFinancialModalOpen, setIsFinancialModalOpen] = useState(false);
    const [isInKindModalOpen, setIsInKindModalOpen] = useState(false);

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                 <Card className="p-6 flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">{t('financialDonation')}</h2>
                    <p className="text-gray-600 mb-4 flex-1">
                        تبرعاتكم المالية تساعد في توفير التعليم، الرعاية الصحية، والغذاء للأطفال. كل مساهمة تصنع فرقاً.
                    </p>
                    <button onClick={() => setIsFinancialModalOpen(true)} className="w-full py-3 mt-auto px-6 bg-shahd-green text-white font-bold rounded-full shadow-lg hover:bg-green-700 transition-colors transform hover:-translate-y-1">
                        {t('donateNow')}
                    </button>
                 </Card>
                 <Card className="p-6 flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">{t('inKindDonation')}</h2>
                    <p className="text-gray-600 mb-4 flex-1">
                        نحن بحاجة مستمرة للكتب، الملابس، والأدوات المدرسية. تبرعاتكم العينية تدعم احتياجاتهم اليومية بشكل مباشر.
                    </p>
                    <p className="font-bold mb-4">الاحتياجات الحالية: كتب للمرحلة الإعدادية.</p>
                     <button onClick={() => setIsInKindModalOpen(true)} className="w-full py-3 mt-auto px-6 bg-shahd-gold text-white font-bold rounded-full shadow-lg hover:bg-amber-600 transition-colors transform hover:-translate-y-1">
                        {t('donateNow')}
                    </button>
                 </Card>
            </div>

            <Modal title={t('financialDonation')} isOpen={isFinancialModalOpen} onClose={() => setIsFinancialModalOpen(false)}>
                <div className="space-y-4">
                    <p>{t('bankTransfer')}</p>
                    <div className="bg-gray-100 p-3 rounded-lg text-sm">
                        <p><strong>اسم البنك:</strong> بنك الأمل السوداني</p>
                        <p><strong>رقم الحساب:</strong> SA01 2345 6789 1011 1213</p>
                        <p><strong>اسم المستفيد:</strong> منصة شهد</p>
                    </div>
                </div>
            </Modal>

            <Modal title={t('inKindDonation')} isOpen={isInKindModalOpen} onClose={() => setIsInKindModalOpen(false)}>
                 <div className="space-y-4">
                    <p>{t('inKindContact')}</p>
                    <div className="bg-gray-100 p-3 rounded-lg text-sm">
                        <p><strong>البريد الإلكتروني:</strong> donations@shahd.org</p>
                        <p><strong>رقم الهاتف:</strong> +249 12 345 6789</p>
                    </div>
                </div>
            </Modal>
        </>
    )
}

const TabButton: React.FC<{ title: string, isActive: boolean, onClick: () => void }> = ({ title, isActive, onClick }) => (
    <button onClick={onClick} className={`px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full focus:outline-none ${isActive ? 'bg-white text-shahd-gold shadow-md' : 'text-shahd-accent hover:bg-white/70'}`}>
        {title}
    </button>
);


export default VolunteerPage;