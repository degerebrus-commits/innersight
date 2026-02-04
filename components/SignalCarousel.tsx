
import React, { useRef, useState, useLayoutEffect, useCallback } from 'react';
import { SIGNALS, THEME } from '../constants';
import { Signal } from '../types';

interface SignalCarouselProps {
  onSelect: (signal: Signal) => void;
}

// Multiplier for infinite scrolling effect.
const MULTIPLIER = 10; 
const INFINITE_SIGNALS = Array(MULTIPLIER).fill(SIGNALS).flat();
const CENTER_OFFSET = Math.floor(MULTIPLIER / 2) * SIGNALS.length;

const SignalCarousel: React.FC<SignalCarouselProps> = ({ onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Robust calculation to find which card is closest to the viewport center
  const updateActiveIndex = useCallback(() => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    let closestIndex = 0;
    let minDistance = Infinity;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    const effectiveIndex = ((closestIndex % SIGNALS.length) + SIGNALS.length) % SIGNALS.length;
    if (effectiveIndex !== activeIndex) {
      setActiveIndex(effectiveIndex);
    }
    
    return closestIndex;
  }, [activeIndex]);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const itemWidth = containerRef.current.offsetWidth * 0.75;
      // Start in the middle of our infinite list
      containerRef.current.scrollLeft = CENTER_OFFSET * itemWidth;
      
      // Small delay to let the layout settle before measuring
      setTimeout(() => {
        updateActiveIndex();
        setIsReady(true);
      }, 50);
    }
  }, []);

  const handleScroll = () => {
    if (!containerRef.current || !isReady) return;
    
    const currentIndex = updateActiveIndex();
    
    // Infinite loop reset logic
    const itemWidth = containerRef.current.offsetWidth * 0.75;
    const threshold = SIGNALS.length * 2;
    
    if (currentIndex !== undefined) {
      if (currentIndex < threshold) {
        containerRef.current.scrollLeft += (SIGNALS.length * itemWidth * 4);
      } else if (currentIndex > INFINITE_SIGNALS.length - threshold) {
        containerRef.current.scrollLeft -= (SIGNALS.length * itemWidth * 4);
      }
    }
  };

  const scrollByAmount = (direction: number) => {
    if (!containerRef.current) return;
    const itemWidth = containerRef.current.offsetWidth * 0.75;
    containerRef.current.scrollBy({
      left: direction * itemWidth,
      behavior: 'smooth'
    });
  };

  const handleNextSelection = () => {
    // We trust the activeIndex state because it's derived from 
    // real-time physical positioning of the cards
    onSelect(SIGNALS[activeIndex]);
  };

  return (
    <div className={`w-full flex flex-col h-full transition-opacity duration-500 relative ${isReady ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mb-12 text-center">
        <h1 className="text-2xl font-light tracking-tight opacity-90">What's the primary dynamic?</h1>
      </div>

      <div className="relative flex-1 w-full group">
        {/* Desktop Navigation Arrows */}
        <button 
          onClick={() => scrollByAmount(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 opacity-0 group-hover:opacity-40 hover:!opacity-100 transition-opacity hidden md:block"
          aria-label="Previous"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="w-full h-full overflow-x-auto no-scrollbar flex items-center snap-x snap-mandatory px-[12.5%]"
        >
          {INFINITE_SIGNALS.map((signal, idx) => {
            const isSelected = (idx % SIGNALS.length) === activeIndex;
            return (
              <div 
                key={`${signal.name}-${idx}`}
                // Fixed: Explicitly return void in the ref callback to satisfy React's Ref type requirements
                ref={el => { cardRefs.current[idx] = el; }}
                className="min-w-[75vw] flex-shrink-0 snap-center px-4 flex flex-col items-center justify-center transition-all duration-500 ease-out"
                style={{
                  transform: isSelected ? 'scale(1.05)' : 'scale(0.9)',
                  opacity: isSelected ? 1 : 0.4
                }}
              >
                <div className="w-full aspect-[4/5] bg-white rounded-3xl shadow-sm border border-black/5 flex flex-col items-center justify-center p-8 text-center space-y-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-50 border border-black/5"
                    style={{ color: THEME.accent }}
                  >
                    <div className={`w-3 h-3 rounded-full bg-current ${isSelected ? 'animate-pulse' : ''}`} />
                  </div>
                  <h2 className="text-3xl font-medium tracking-tight">{signal.name}</h2>
                  <p className="text-lg font-light leading-relaxed text-gray-500">{signal.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button 
          onClick={() => scrollByAmount(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 opacity-0 group-hover:opacity-40 hover:!opacity-100 transition-opacity hidden md:block"
          aria-label="Next"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="mt-auto pt-12 flex flex-col items-center">
        <button 
          onClick={handleNextSelection}
          className="w-full py-5 rounded-2xl text-lg font-medium transition-all active:scale-95 shadow-lg shadow-teal-900/5"
          style={{ backgroundColor: THEME.accent, color: '#FFFFFF' }}
        >
          Select {SIGNALS[activeIndex].name}
        </button>
        <div className="flex space-x-2 mt-8">
          {SIGNALS.map((_, i) => (
            <div 
              key={i} 
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{ 
                backgroundColor: i === activeIndex ? THEME.accent : '#D1D1D1',
                width: i === activeIndex ? '24px' : '6px'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignalCarousel;
