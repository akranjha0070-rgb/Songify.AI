import React, { useState, useCallback, ChangeEvent } from 'react';
import Button from './Button';
import { UploadIcon, MusicIcon, FileTextIcon, UserIcon, CheckCircleIcon } from './icons';

interface UploadStepProps {
  onNext: (audio: File, lyrics: File | null, character: File | null, characterImageUrl: string | null) => void;
}

const FileInput: React.FC<{ id: string; label: string; icon: React.ReactNode; file: File | null; accept: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void; }> = 
({ id, label, icon, file, accept, onChange }) => (
    <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors w-full">
        <input
            type="file"
            id={id}
            accept={accept}
            onChange={onChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center text-gray-400">
            {file ? (
                <>
                    <CheckCircleIcon className="w-10 h-10 mb-2 text-green-500" />
                    <span className="font-semibold text-white truncate max-w-full px-2">{file.name}</span>
                    <span className="text-sm mt-1">Click or drag to replace</span>
                </>
            ) : (
                <>
                    {icon}
                    <span className="mt-2 font-semibold text-white">{label}</span>
                    <span className="text-sm">Click or drag file here</span>
                </>
            )}
        </div>
    </div>
);

const UploadStep: React.FC<UploadStepProps> = ({ onNext }) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [lyricsFile, setLyricsFile] = useState<File | null>(null);
  const [characterImage, setCharacterImage] = useState<File | null>(null);
  const [characterImageUrl, setCharacterImageUrl] = useState<string | null>(null);

  const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File | null>>) => (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleCharacterImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCharacterImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCharacterImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNextClick = useCallback(() => {
    if (audioFile) {
      onNext(audioFile, lyricsFile, characterImage, characterImageUrl);
    }
  }, [audioFile, lyricsFile, characterImage, characterImageUrl, onNext]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700 animate-fade-in">
      <h2 className="text-2xl font-semibold mb-2 text-center">Step 1: Upload Your Assets</h2>
      <p className="text-gray-400 text-center mb-8">Start by providing a song. Lyrics and a character image are optional but recommended.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FileInput 
          id="audio-upload"
          label="Upload Song (MP3, WAV)"
          icon={<MusicIcon className="w-10 h-10 mb-2" />}
          file={audioFile}
          accept=".mp3,.wav,.m4a"
          onChange={handleFileChange(setAudioFile)}
        />
        <FileInput 
          id="lyrics-upload"
          label="Upload Lyrics (TXT, SRT)"
          icon={<FileTextIcon className="w-10 h-10 mb-2" />}
          file={lyricsFile}
          accept=".txt,.srt"
          onChange={handleFileChange(setLyricsFile)}
        />
        <FileInput 
          id="character-upload"
          label="Upload Character Image"
          icon={<UserIcon className="w-10 h-10 mb-2" />}
          file={characterImage}
          accept="image/*"
          onChange={handleCharacterImageChange}
        />
      </div>

      <div className="mt-8 flex justify-center">
        <Button onClick={handleNextClick} disabled={!audioFile}>
          <span className="mr-2">Continue to Style Selection</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default UploadStep;
