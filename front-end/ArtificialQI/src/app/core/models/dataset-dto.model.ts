export interface DatasetDto {
  id: string;
  name: string;
  last_save_date: Date;
  origin: string;
  tmp: boolean;
}

export const emptyDataset: DatasetDto = {
  id: '00000000-0000-0000-0000-000000000000',
  name: 'Nuovo Dataset',
  last_save_date: new Date(),
  origin: '0',
  tmp: true,
};

/*
export interface DatasetDto {
  id?: string | null;           // UUID
  name?: string | null;
  last_mod?: string | null;     // ISO date string (es. "2025-06-01")
  first_save?: string | null;
  origin_id?: string | null;    // UUID
  tmp: boolean;
  max_page: number;
  element_n: number;
}


export const emptyDataset: DatasetDto = {
  id: '00000000-0000-0000-0000-000000000000',
  name: 'Nuovo Dataset',
  last_mod: new Date(),
  creation: new Date(),
  origin_id: 0,
  tmp: true,
  max_page: 0,
  element_n: 0
};*/