import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { UserRole } from '../../types';
import Logo from '../common/Logo';

const interests = ['art', 'programming', 'sports', 'reading', 'writing', 'cooking', 'gardening', 'music'];
const skills = ['communication', 'problemSolving', 'leadership', 'teamwork', 'creativity', 'technical'];

const Register: React.FC = () => {
    const { t, setAuthState, setUser } = useContext(AppContext);
    const [step, setStep] = useState(1);
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

    const handleFinish = () => {
        // Mock registration
        setUser({
            id: '2',
            name: 'مستخدم جديد',
            role: selectedRole || UserRole.Orphan,
            avatarUrl: 'https://i.pravatar.cc/150?u=new'
        });
        setAuthState('authenticated');
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    return (
        <div 
            className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
            style={{ backgroundImage: `url('https://images.pexels.com/photos/8979929/pexels-photo-8979929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` }}
        >
            <div className="absolute inset-0 bg-shahd-bg/90 backdrop-blur-sm"></div>
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex justify-center mb-4">
                        <Logo />
                    </div>
                    
                    <div className="flex justify-between items-center mb-6">
                        <Step num={1} title={t('step1')} active={step >= 1} />
                        <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
                        <Step num={2} title={t('step2')} active={step >= 2} />
                        <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
                        <Step num={3} title={t('step3')} active={step >= 3} />
                    </div>

                    {step === 1 && <Step1 onRoleSelect={setSelectedRole} selectedRole={selectedRole} />}
                    {step === 2 && <Step2 />}
                    {step === 3 && <Step3 />}

                    <div className="flex justify-between mt-8">
                        {step > 1 ? (
                            <button onClick={prevStep} className="py-2 px-6 bg-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-300 transition-colors">{t('previous')}</button>
                        ) : <div></div>}
                        {step < 3 ? (
                            <button onClick={nextStep} className="py-2 px-6 bg-shahd-gold text-white font-bold rounded-full shadow-lg hover:bg-amber-600 transition-colors">{t('next')}</button>
                        ) : (
                            <button onClick={handleFinish} className="py-2 px-6 bg-shahd-green text-white font-bold rounded-full shadow-lg hover:bg-green-700 transition-colors">{t('finishRegistration')}</button>
                        )}
                    </div>
                </div>
                 <p className="text-center text-sm text-gray-600 mt-6">
                    لديك حساب بالفعل؟ <button onClick={() => setAuthState('login')} className="font-bold text-shahd-gold hover:underline">{t('login')}</button>
                </p>
            </div>
        </div>
    );
};

const Step = ({ num, title, active }: { num: number, title: string, active: boolean }) => (
    <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${active ? 'bg-shahd-gold text-white' : 'bg-gray-200 text-gray-500'}`}>
            {num}
        </div>
        <p className={`text-xs mt-1 ${active ? 'text-shahd-gold' : 'text-gray-400'}`}>{title}</p>
    </div>
);

const Step1 = ({ onRoleSelect, selectedRole }: { onRoleSelect: (role: UserRole) => void, selectedRole: UserRole | null }) => {
    const { t } = useContext(AppContext);
    const roles = [
        { role: UserRole.Orphan, label: t('orphan') },
        { role: UserRole.Supervisor, label: t('supervisor') },
        { role: UserRole.Volunteer, label: t('volunteer') },
        { role: UserRole.Supporter, label: t('supporter') },
    ];
    return (
        <div>
            <h2 className="text-xl font-bold text-center mb-6">{t('step1')}</h2>
            <div className="grid grid-cols-2 gap-4">
                {roles.map(({ role, label }) => (
                    <button key={role} onClick={() => onRoleSelect(role)} className={`p-4 border-2 rounded-lg text-center font-semibold transition-colors ${selectedRole === role ? 'border-shahd-gold bg-shahd-gold-light' : 'border-gray-200 hover:border-shahd-gold'}`}>
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
};

const Step2 = () => {
    const { t } = useContext(AppContext);
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-center mb-6">{t('step2')}</h2>
            <div>
                <label className="text-sm font-bold text-gray-600 block">{t('fullName')}</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-shahd-gold" />
            </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block">{t('emailOrPhone')}</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-shahd-gold" />
            </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block">{t('password')}</label>
                <input type="password" className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-shahd-gold" />
            </div>
        </div>
    );
};

const Step3 = () => {
    const { t } = useContext(AppContext);
    return (
        <div>
            <h2 className="text-xl font-bold text-center mb-6">{t('step3')}</h2>
            <div>
                <h3 className="font-semibold mb-2">{t('selectInterests')}</h3>
                <div className="flex flex-wrap gap-2">
                    {interests.map(interest => <Pill key={interest} label={t(interest)} />)}
                </div>
            </div>
            <div className="mt-6">
                <h3 className="font-semibold mb-2">{t('selectSkills')}</h3>
                <div className="flex flex-wrap gap-2">
                    {skills.map(skill => <Pill key={skill} label={t(skill)} />)}
                </div>
            </div>
        </div>
    );
};

const Pill = ({ label }: { label: string }) => {
    const [selected, setSelected] = useState(false);
    return (
        <button onClick={() => setSelected(!selected)} className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${selected ? 'bg-shahd-gold text-white' : 'bg-gray-200 text-gray-700'}`}>
            {label}
        </button>
    );
}

export default Register;