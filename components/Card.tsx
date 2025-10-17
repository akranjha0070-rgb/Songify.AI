import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  isSelected: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, isSelected, onClick }) => {
  const selectedClasses = isSelected
    ? 'border-indigo-500 ring-2 ring-indigo-500'
    : 'border-gray-700 hover:border-indigo-500';

  return (
    <div
      onClick={onClick}
      className={`bg-gray-800 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 transform hover:scale-105 ${selectedClasses}`}
    >
      <img src={imageUrl} alt={title} className="w-full h-24 object-cover" />
      <div className="p-3">
        <h4 className="font-semibold text-sm text-white truncate">{title}</h4>
        <p className="text-xs text-gray-400 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default Card;
