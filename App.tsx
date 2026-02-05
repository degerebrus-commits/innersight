
import React, { useState } from 'react';
import Layout from './components/Layout';
import SignalCarousel from './components/SignalCarousel';
import ModulatorList from './components/ModulatorList';
import InsightCard from './components/InsightCard';
import { AppScreen, Signal, Modulator, Insight } from './types';
import { fetchInsight } from './services/geminiService';
import { THEME } from './constants';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.SIGNAL_SELECTION);
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
  const [selectedModulator, setSelectedModulator] = useState<Modulator | null>(null);
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignalSelect = (signal: Signal) => {
    setSelectedSignal(signal);
    setScreen(AppScreen.MODULATOR_SELECTION);
  };

  const handleModulatorSelect = async (signal: Signal, modulator: Modulator) => {

    if (signal && modulator) {
      try {
        const result = await fetchInsight(signal.name, modulator.name);
        setInsight(result);
        setScreen(AppScreen.INSIGHT_CARD);
      } catch (error) {
        console.error("Insight generation failed", error);
        setScreen(AppScreen.SIGNAL_SELECTION);
      }
    }
  };

  const handleBack = () => {
    if (screen === AppScreen.MODULATOR_SELECTION) {
      setScreen(AppScreen.SIGNAL_SELECTION);
      setSelectedModulator(null);
    } else if (screen === AppScreen.INSIGHT_CARD) {
      setScreen(AppScreen.MODULATOR_SELECTION);
      setInsight(null);
    }
  };

  const reset = () => {
    setScreen(AppScreen.SIGNAL_SELECTION);
    setSelectedSignal(null);
    setSelectedModulator(null);
    setInsight(null);
  };

  const showBackButton = screen === AppScreen.MODULATOR_SELECTION || screen === AppScreen.INSIGHT_CARD;

  return (
    <Layout>
      <div className="w-full h-full flex flex-col">
        {/* Header with Navigational Back Button */}
        {screen !== AppScreen.LOADING && (
          <div className="flex justify-between items-center mb-10 w-full px-2 h-8">
            <div className="flex items-center space-x-4">
              {showBackButton && (
                <button 
                  onClick={handleBack}
                  className="p-2 -ml-2 rounded-full hover:bg-black/5 active:scale-90 transition-all group"
                  aria-label="Go back"
                >
                  <svg className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: THEME.accent }}></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Innersight</span>
              </div>
            </div>
            
            <div className="flex space-x-1">
              <div className={`h-1 rounded-full transition-all duration-500 ${screen === AppScreen.SIGNAL_SELECTION ? 'w-8' : 'w-4'}`} style={{ backgroundColor: screen === AppScreen.SIGNAL_SELECTION ? THEME.accent : '#E5E7EB' }}></div>
              <div className={`h-1 rounded-full transition-all duration-500 ${screen === AppScreen.MODULATOR_SELECTION ? 'w-8' : 'w-4'}`} style={{ backgroundColor: screen === AppScreen.MODULATOR_SELECTION ? THEME.accent : '#E5E7EB' }}></div>
              {screen === AppScreen.INSIGHT_CARD && (
                <div className="h-1 w-8 rounded-full transition-all duration-500" style={{ backgroundColor: THEME.accent }}></div>
              )}
            </div>
          </div>
        )}

        {/* Screen Rendering */}
        <div className="flex-1 w-full">
          {screen === AppScreen.SIGNAL_SELECTION && (
            <SignalCarousel onSelect={handleSignalSelect} />
          )}

          {screen === AppScreen.MODULATOR_SELECTION && selectedSignal && (
            <ModulatorList 
              selectedSignal={selectedSignal}
              onSelect={handleModulatorSelect}
            />
          )}

          {screen === AppScreen.LOADING && (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-8 animate-pulse">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border border-teal-100 flex items-center justify-center">
                   <div 
                    className="w-12 h-12 rounded-full animate-ping opacity-20"
                    style={{ backgroundColor: THEME.accent }}
                   />
                </div>
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ color: THEME.accent }}
                >
                  <svg className="w-8 h-8 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-xl font-light tracking-wide text-gray-500">Cultivating Clarity...</p>
                <p className="text-xs uppercase tracking-widest text-gray-300">Merging {selectedModulator?.name} with {selectedSignal?.name}</p>
              </div>
            </div>
          )}

          {screen === AppScreen.INSIGHT_CARD && insight && (
            <InsightCard insight={insight} onReset={reset} loading={loading} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default App;
