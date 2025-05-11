import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
//usato per il mock
export interface Dataset {
  name: string;
  lastModified: Date; // può essere anche Date
}

const MOCK_DATASET: Dataset[] = [
    { name: 'Dataset Alpha', lastModified: new Date('2025-05-01') },
    { name: 'Dataset Beta', lastModified: new Date('2025-06-10') },
    { name: 'Dataset Gamma', lastModified: new Date('2025-07-15') },
    { name: 'Dataset Delta', lastModified: new Date('2025-08-20') },
    { name: 'Dataset Epsilon', lastModified: new Date('2025-09-25') },
    { name: 'Dataset Zeta', lastModified: new Date('2025-10-30') },
    { name: 'Dataset Eta', lastModified: new Date('2025-11-05') },
    { name: 'Dataset Theta', lastModified: new Date('2025-12-12') }
];

@Injectable({
  providedIn: 'root'
})

export class DatasetService {
  constructor() {}

  getDataset(): Dataset[] {
    return MOCK_DATASET;
  }
}
