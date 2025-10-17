import React from 'react';
import Button from './Button';
import { DownloadIcon, RefreshIcon } from './icons';

interface ResultStepProps {
  videoUrl: string | null;
  onRestart: () => void;
}

const ResultStep: React.FC<ResultStepProps> = ({ videoUrl, onRestart }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700 animate-fade-in text-center">
      <h2 className="text-3xl font-bold mb-4">Your Music Video is Ready!</h2>
      
      <div className="aspect-video bg-black rounded-lg overflow-hidden my-6 border-2 border-gray-700">
        {videoUrl ? (
          // In a real app, we'd use a video player. For this mock, an image is fine.
          // <video src={videoUrl} controls className="w-full h-full object-contain"></video>
          <img src={videoUrl} alt="Generated music video placeholder" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Loading video...
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button onClick={onRestart} variant="secondary">
          <RefreshIcon className="w-5 h-5 mr-2" />
          Create Another Video
        </Button>
        <a href={videoUrl || '#'} download="ai-music-video.mp4">
          {/* Fix: Add a no-op onClick handler to satisfy the ButtonProps interface. */}
          <Button onClick={() => {}} disabled={!videoUrl}>
            <DownloadIcon className="w-5 h-5 mr-2" />
            Download Video (HD)
          </Button>
        </a>
      </div>
    </div>
  );
};

export default ResultStep;