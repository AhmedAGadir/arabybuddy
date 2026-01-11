export const DIALECTS = {
  MSA: 'MSA',
  EGYPTIAN: 'Egyptian',
  LEVANTINE: 'Levantine',
  GULF: 'Gulf',
  SUDANESE: 'Sudanese',
  DARIJA: 'Darija',
  IRAQI: 'Iraqi',
} as const;

export type Dialect = (typeof DIALECTS)[keyof typeof DIALECTS];

