import React, { useContext } from 'react';
import { AppContext } from '../../App';

const Logo = () => {
    const { t } = useContext(AppContext);
    return (
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#C0A062', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            fill="url(#goldGradient)"
            d="M50 95C50 95 0 65 0 40C0 15 22.386 0 50 25C77.614 0 100 15 100 40C100 65 50 95 50 95Z"
            transform="translate(0, -5)"
          />
          <path
            fill="none"
            stroke="#FDFBF6"
            strokeWidth="3"
            d="M50 80C30 65 20 50 20 40C20 25 35 15 50 30"
          />
        </svg>
        <span className="text-2xl font-bold text-shahd-text">{t('appName')}</span>
      </div>
    );
};

export default Logo;