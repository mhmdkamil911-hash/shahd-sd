import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  // Fix: Add style property to allow passing inline styles for animations.
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, className = '', style }) => {
  return (
    <div
      className={`bg-white rounded-3xl shadow-lg shadow-gray-200/60 overflow-hidden transition-shadow duration-300 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;
