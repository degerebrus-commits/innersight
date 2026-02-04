
export interface Signal {
  name: string;
  description: string;
}

export interface Modulator {
  name: string;
  description: string;
}

export interface Insight {
  title: string;
  reflection: string;
  action_cue: string;
  journal_prompt: string;
}

export enum AppScreen {
  SIGNAL_SELECTION = 'SIGNAL_SELECTION',
  MODULATOR_SELECTION = 'MODULATOR_SELECTION',
  LOADING = 'LOADING',
  INSIGHT_CARD = 'INSIGHT_CARD'
}
