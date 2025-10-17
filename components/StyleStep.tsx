import React from 'react';
import Button from './Button';
import Card from './Card';
import { UserIcon } from './icons';
import { StyleInfo } from '../types';

interface StyleStepProps {
  characterImageUrl: string | null;
  styles: StyleInfo[];
  selectedStyle: StyleInfo | null;
  onStyleSelect: (style: StyleInfo) => void;
  onGenerate: () => void;
  onBack: () => void;
}

const StyleStep: React.FC<StyleStepProps> = ({
  characterImageUrl,
  styles,
  selectedStyle,
  onStyleSelect,
  onGenerate,
  onBack,
}) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4 text-center">Your Character</h3>
          <div className="w-48 h-48 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden border-2 border-gray-600">
            {characterImageUrl ? (
              <img src={characterImageUrl} alt="Character" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-gray-400">
                <UserIcon className="w-16 h-16 mx-auto" />
                <p className="text-sm mt-2">No Image Uploaded</p>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">This character will be kept consistent across scenes.</p>
        </div>
        
        <div className="md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">Step 2: Choose a Visual Style</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {styles.map((style) => (
              <Card
                key={style.id}
                title={style.name}
                description={style.description}
                imageUrl={style.imageUrl}
                isSelected={selectedStyle?.id === style.id}
                onClick={() => onStyleSelect(style)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button onClick={onBack} variant="secondary">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Upload
        </Button>
        <Button onClick={onGenerate} disabled={!selectedStyle}>
          Generate Music Video
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default StyleStep;
