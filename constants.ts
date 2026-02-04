
import { Signal, Modulator } from './types';

export const SIGNALS: Signal[] = [
  { name: 'Clarity', description: 'A feeling of knowing the path forward.' },
  { name: 'Momentum', description: 'The sense of making tangible progress.' },
  { name: 'Confidence', description: 'A strong belief in your own ability.' },
  { name: 'Ambiguity', description: 'A lack of clarity; the path is unclear.' },
  { name: 'Tension', description: 'A feeling of friction or unresolved conflict.' }
];

export const MODULATORS: Modulator[] = [
  { name: 'Resonance', description: 'A deep, intuitive sense of alignment.' },
  { name: 'Cohesion', description: 'A feeling of unity and togetherness.' },
  { name: 'Adaptability', description: 'The capacity to be flexible and pivot.' },
  { name: 'Resistance', description: 'An internal or external force pushing back.' },
  { name: 'Curiosity', description: 'An open, inquisitive approach to the unknown.' }
];

export const THEME = {
  background: '#F8F7F4',
  text: '#333333',
  accent: '#5A9A9A', // Soft Teal
  accentLight: 'rgba(90, 154, 154, 0.1)',
};
