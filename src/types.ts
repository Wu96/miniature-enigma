export interface Country {
  id: number;
  name: string;
  code: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

export type SortField = keyof Pick<Country, 'gold' | 'silver' | 'bronze' | 'total'>;
export type SortOrder = 'asc' | 'desc';
