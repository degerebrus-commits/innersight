
import React from 'react';
import {useState} from 'react'
import { MODULATORS, THEME } from '../constants';
import { Modulator, Signal } from '../types';
import { generateInsight } from "../services/generateInsight";

interface ModulatorListProps {
  selectedSignal: Signal;
  onSelect: (modulator: Modulator) => void;
}

const ModulatorList: React.FC<ModulatorListProps> = ({ selectedSignal, onSelect }) => {

  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 space-y-2">
        <p className="text-sm uppercase tracking-widest text-gray-400 font-bold">Dynamic: {selectedSignal.name}</p>
        <h1 className="text-2xl font-light tracking-tight opacity-90">And what's the emotional texture?</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-1 pb-20">
        {MODULATORS.map((mod, idx) => (
          <button
            key={mod.name}
            onClick={() => onSelect(selectedSignal, mod)}
            className="w-full text-left p-6 bg-white rounded-2xl border border-black/5 shadow-sm transition-all hover:border-[#5A9A9A]/30 active:scale-[0.98] group flex justify-between items-center"
            style={{ 
              animationDelay: `${idx * 100}ms`,
              animationFillMode: 'both'
            }}
          >
            <div className="space-y-1">
              <h3 className="text-xl font-medium">{mod.name}</h3>
              <p className="text-sm font-light text-gray-500">{mod.description}</p>
            </div>
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-[#5A9A9A]/10 transition-colors"
            >
              <svg 
                className="w-5 h-5 opacity-30 group-hover:opacity-100 transition-opacity" 
                style={{ color: THEME.accent }}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
        {/* Visual cue for scrolling */}
        <div className="py-8 flex justify-center opacity-20">
          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-gray-400 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default ModulatorList;