export interface DatasetDto {
  id: number;
  name: string;
  last_mod: Date;
  creation: Date;
  origin_id: number;
  tmp: boolean;
  max_page: number;
  element_n: number;
}

export const emptyDataset: DatasetDto = {
  id: 0,
  name: 'Nuovo Dataset',
  last_mod: new Date(),
  creation: new Date(),
  origin_id: 0,
  tmp: false,
  max_page: 0,
  element_n: 0
};