import React from 'react';
import { CheckCircleIcon } from './icons';

interface ProgressStepProps {
  progress: number;
  message: string;
  storyboard: string[];
}

const ProgressStep: React.FC<ProgressStepProps> = ({ progress, message, storyboard }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700 animate-fade-in flex flex-col items-center text-center">
      <h2 className="text-2xl font-semibold mb-4">Generating Your Masterpiece...</h2>
      <p className="text-gray-400 mb-8">This may take a few moments. Please don't close this window.</p>

      <div className="w-full max-w-lg">
        <div className="w-full bg-gray-700 rounded-full h-4 mb-2 overflow-hidden">
          <div
            className="bg-indigo-500 h-4 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center">
            <p className="text-indigo-300 font-medium text-sm">{message}</p>
            <p className="text-white font-bold text-lg">{progress}%</p>
        </div>
      </div>
      
      {storyboard.length > 0 && progress >= 40 && (
          <div className="mt-8 w-full max-w-lg text-left bg-gray-900/50 p-4 rounded-lg border border-gray-700 animate-fade-in">
              <h3 className="font-semibold text-lg mb-3 text-gray-200">AI Generated Storyboard:</h3>
              <ul className="space-y-2">
                  {storyboard.map((scene, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-300">
                          <CheckCircleIcon className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                          <span>{scene}</span>
                      </li>
                  ))}
              </ul>
          </div>
      )}

    </div>
  );
};

export default ProgressStep;
