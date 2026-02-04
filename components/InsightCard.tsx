
import React, { useEffect, useState } from 'react';
import { Insight } from '../types';
import { THEME } from '../constants';

interface InsightCardProps {
  insight: Insight;
  onReset: () => void;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight, onReset }) => {
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleSteps(prev => (prev < 4 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-full flex flex-col py-4 animate-in fade-in duration-1000">
      <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-black/5 border border-black/5 space-y-10">
        
        {/* Title Section */}
        <div className={`transition-all duration-1000 transform ${visibleSteps >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2" style={{ color: THEME.accent }}>
            {insight.title}
          </h2>
          <div className="w-12 h-1 rounded-full" style={{ backgroundColor: THEME.accent }} />
        </div>

        {/* Reflection Section */}
        <div className={`transition-all duration-1000 delay-300 transform ${visibleSteps >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-lg md:text-xl font-light leading-relaxed text-gray-700 italic">
            "{insight.reflection}"
          </p>
        </div>

        {/* Action Cue */}
        <div className={`transition-all duration-1000 delay-600 transform ${visibleSteps >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-start space-x-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="mt-1" style={{ color: THEME.accent }}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Action</p>
              <p className="text-base font-medium text-gray-800">{insight.action_cue}</p>
            </div>
          </div>
        </div>

        {/* Journal Prompt */}
        <div className={`transition-all duration-1000 delay-900 transform ${visibleSteps >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-start space-x-4">
            <span className="text-2xl">✍️</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Journal Prompt</p>
              <p className="text-base font-light text-gray-600 leading-relaxed">{insight.journal_prompt}</p>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={onReset}
        className={`mt-10 mb-6 w-full py-5 rounded-2xl text-lg font-light transition-all duration-1000 active:scale-95 flex items-center justify-center space-x-3 ${visibleSteps >= 4 ? 'opacity-100' : 'opacity-0'}`}
        style={{ color: THEME.text, border: `1px solid ${THEME.accent}33` }}
      >
        <span>Begin Again</span>
        <svg className="w-5 h-5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
  );
};

export default InsightCard;
