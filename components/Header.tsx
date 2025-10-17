import React from 'react';
import { FilmIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center text-center">
      <FilmIcon className="w-8 h-8 mr-3 text-indigo-400" />
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          AI Music Video Generator
        </h1>
        <p className="text-md text-gray-400 mt-1">
          Bring your music to life with a unique, AI-generated video.
        </p>
      </div>
    </header>
  );
};

export default Header;
