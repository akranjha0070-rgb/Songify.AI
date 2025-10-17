import React, { useState, useCallback } from 'react';
import { AppStep, VisualStyle, StyleInfo } from './types';
import { VISUAL_STYLES } from './constants';
import { generateStoryboard } from './services/geminiService';

import Header from './components/Header';
import UploadStep from './components/UploadStep';
import StyleStep from './components/StyleStep';
import ProgressStep from './components/ProgressStep';
import ResultStep from './components/ResultStep';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.UPLOAD);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [lyricsFile, setLyricsFile] = useState<File | null>(null);
  const [characterImage, setCharacterImage] = useState<File | null>(null);
  const [characterImageUrl, setCharacterImageUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StyleInfo | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [storyboard, setStoryboard] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');

  const handleUploadNext = (audio: File, lyrics: File | null, character: File | null, charImgUrl: string | null) => {
    setAudioFile(audio);
    setLyricsFile(lyrics);
    setCharacterImage(character);
    setCharacterImageUrl(charImgUrl);
    setStep(AppStep.STYLE);
  };

  const handleStyleSelect = (style: StyleInfo) => {
    setSelectedStyle(style);
  };
  
  const readLyrics = async (): Promise<string> => {
    if (!lyricsFile) return "No lyrics provided.";
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target?.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(lyricsFile);
    });
  };

  const simulateProgress = useCallback(async () => {
    if (!selectedStyle) return;

    setProgress(0);
    setProgressMessage('Starting job...');
    
    // 1. Audio Analysis
    await new Promise(res => setTimeout(res, 1500));
    setProgress(20);
    setProgressMessage('Analyzing audio: BPM, sections, mood...');
    const lyricsContent = await readLyrics();

    // 2. Storyboard Generation (with Gemini)
    await new Promise(res => setTimeout(res, 1500));
    setProgress(40);
    setProgressMessage('Generating storyboard with AI...');
    try {
      const generatedStoryboard = await generateStoryboard(lyricsContent, 'upbeat', selectedStyle.id);
      setStoryboard(generatedStoryboard);
    } catch (error) {
        console.error("Storyboard generation failed:", error);
        setProgressMessage('Error generating storyboard. Using fallback.');
        setStoryboard(['A dynamic opening shot.', 'Close-up on the character.', 'An energetic chorus sequence.', 'A final, memorable scene.']);
    }


    // 3. Scene Generation
    await new Promise(res => setTimeout(res, 2000));
    setProgress(60);
    setProgressMessage('Rendering video scenes...');
    
    // 4. Lip-sync Pass
    await new Promise(res => setTimeout(res, 2000));
    setProgress(80);
    setProgressMessage('Applying character lip-sync...');

    // 5. Final Assembly
    await new Promise(res => setTimeout(res, 1500));
    setProgress(100);
    setProgressMessage('Assembling final video...');
    
    await new Promise(res => setTimeout(res, 1000));
    // In a real app, this would be the URL from the backend
    setGeneratedVideoUrl('https://picsum.photos/seed/musicvideo/1280/720'); 
    setStep(AppStep.RESULT);

  }, [selectedStyle, lyricsFile]);

  const handleGenerate = () => {
    if (selectedStyle) {
      setStep(AppStep.PROGRESS);
      simulateProgress();
    }
  };

  const handleRestart = () => {
    setStep(AppStep.UPLOAD);
    setAudioFile(null);
    setLyricsFile(null);
    setCharacterImage(null);
    setCharacterImageUrl(null);
    setSelectedStyle(null);
    setGeneratedVideoUrl(null);
    setProgress(0);
    setProgressMessage('');
    setStoryboard([]);
  };

  const renderStep = () => {
    switch (step) {
      case AppStep.UPLOAD:
        return <UploadStep onNext={handleUploadNext} />;
      case AppStep.STYLE:
        return (
          <StyleStep
            characterImageUrl={characterImageUrl}
            styles={VISUAL_STYLES}
            selectedStyle={selectedStyle}
            onStyleSelect={handleStyleSelect}
            onGenerate={handleGenerate}
            onBack={() => setStep(AppStep.UPLOAD)}
          />
        );
      case AppStep.PROGRESS:
        return (
            <ProgressStep 
                progress={progress} 
                message={progressMessage}
                storyboard={storyboard}
            />
        );
      case AppStep.RESULT:
        return (
            <ResultStep 
                videoUrl={generatedVideoUrl} 
                onRestart={handleRestart} 
            />
        );
      default:
        return <UploadStep onNext={handleUploadNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl">
        <Header />
        <main className="mt-8">
          {renderStep()}
        </main>
      </div>
    </div>
  );
};

export default App;
