import React, { useContext } from 'react';
import { AppContext } from '../App';
import Logo from './common/Logo';

const Welcome: React.FC = () => {
    const { t, setAuthState } = useContext(AppContext);

    return (
        <div className="relative flex flex-col lg:flex-row h-screen w-full bg-shahd-bg">
            {/* Video Section */}
            <div className="lg:w-1/2 h-2/5 lg:h-full w-full relative">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                    src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4"
                >
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black opacity-20"></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-shahd-bg via-shahd-bg/50 to-transparent"></div>
            </div>

            {/* Content Section */}
            <div 
                className="relative z-10 w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 flex-1 bg-cover bg-center -mt-16 lg:mt-0 rounded-t-[40px] lg:rounded-none"
                style={{ backgroundImage: `url('https://images.pexels.com/photos/8979929/pexels-photo-8979929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` }}
            >
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-shahd-bg/90 backdrop-blur-sm rounded-t-[40px] lg:rounded-none"></div>

                <div className="relative z-10 w-full max-w-md text-center">
                    <div className="inline-block mb-6">
                        <Logo />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-shahd-accent leading-tight mb-4">{t('welcomeHeader')}</h1>
                    <p className="text-md text-gray-600 mb-10">{t('welcomeSubHeader')}</p>
                    
                    <div className="flex flex-col space-y-4">
                        <button 
                            onClick={() => setAuthState('login')}
                            className="w-full py-3 px-6 bg-shahd-gold text-white font-bold rounded-full shadow-lg hover:bg-amber-600 transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-shahd-gold focus:ring-opacity-50"
                        >
                            {t('login')}
                        </button>
                        <button 
                            onClick={() => setAuthState('register')}
                            className="w-full py-3 px-6 bg-white text-shahd-gold font-bold rounded-full border-2 border-shahd-gold shadow-md hover:bg-shahd-gold-light transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-shahd-gold focus:ring-opacity-50"
                        >
                            {t('createAccount')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;