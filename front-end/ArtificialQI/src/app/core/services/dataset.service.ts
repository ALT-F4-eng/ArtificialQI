import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { QADto } from '../models/qa-dto.model';
import { DatasetDto } from '../models/dataset-dto.model';

export const MOCK_DATASETS: DatasetDto[] = [
  {
    id: '1e7b9c8a-1a2b-4c3d-8e9f-0a1b2c3d4e5f',
    name: 'Dataset Alpha',
    last_save_date: new Date('2025-05-01'),

    origin: 0,
    tmp: false,

  },
  {
    id: '2f8c0d1b-2b3c-5d4e-9f0a-1b2c3d4e5f6a',
    name: 'Dataset Beta',
    last_save_date: new Date('2025-06-10'),

    origin: 1,
    tmp: false,

  },
  {
    id: '3a9d1e2c-3c4d-6e5f-0a1b-2c3d4e5f6a7b',
    name: 'Dataset Gamma',
    last_save_date: new Date('2025-07-15'),

    origin: 2,
    tmp: false,

  },
  {
    id: '4b0e2f3d-4d5e-7f6a-1b2c-3d4e5f6a7b8c',
    name: 'Dataset Delta',
    last_save_date: new Date('2025-08-20'),

    origin: 3,
    tmp: true,

  },
  {
    id: '5c1f304e-5e6f-8a7b-2c3d-4e5f6a7b8c9d',
    name: 'Dataset Epsilon',
    last_save_date: new Date('2025-09-25'),

    origin: 0,
    tmp: false,

  },
  {
    id: '6d20315f-6f70-9b8c-3d4e-5f6a7b8c9d0e',
    name: 'Dataset Zeta',
    last_save_date: new Date('2025-10-30'),

    origin: 4,
    tmp: true,

  },
  {
    id: '7e314270-7081-ac9d-4e5f-6a7b8c9d0e1f',
    name: 'Dataset Eta',
    last_save_date: new Date('2025-11-05'),
    origin: 0,
    tmp: false,
  },
  {
    id: '8f425381-8192-bd0e-5f6a-7b8c9d0e1f20',
    name: 'Dataset Theta',
    last_save_date: new Date('2025-12-12'),
    origin: 6,
    tmp: true,
  },
  {
    id: '9a536492-92a3-ce1f-6a7b-8c9d0e1f2031',
    name: 'Dataset Theta2',
    last_save_date: new Date('2025-12-13'),
    origin: 7,
    tmp: false,
  },
  {
    id: '0b6475a3-a3b4-df20-7b8c-9d0e1f203142',
    name: 'Dataset Iota',
    last_save_date: new Date('2025-12-20'),
    origin: 1,
    tmp: false,
  },
  {
    id: '1c7586b4-b4c5-e031-8c9d-0e1f20314253',
    name: 'Dataset Kappa',
    last_save_date: new Date('2025-12-25'),
    origin: 9,
    tmp: true,
  },
  {
    id: '2d8697c5-c5d6-f142-9d0e-1f2031425364',
    name: 'Dataset Lambda',
    last_save_date: new Date('2026-01-01'),
    origin: 10,
    tmp: false,
  },
  {
    id: '3e97a8d6-d6e7-0253-0e1f-203142536475',
    name: 'Dataset Mu',
    last_save_date: new Date('2026-01-05'),
    origin: 11,
    tmp: false,
  },
  {
    id: '4fa8b9e7-e7f8-1364-1425-364758697a8b',
    name: 'Dataset Nu',
    last_save_date: new Date('2026-01-10'),
    origin: 12,
    tmp: false,
  },
  {
    id: '5ab9c0f8-f809-2475-2536-4758697a8b9c',
    name: 'Dataset Xi',
    last_save_date: new Date('2026-01-15'),
    origin: 13,
    tmp: true,
  },
];

@Injectable({
  providedIn: 'root'
})
export class DatasetTmpService {
  private baseUrl = 'http://localhost:5000/datasets';

  constructor(private http: HttpClient) {}

  creaDatasetTmp(): Observable<{ id: string, message: string }> {
  return this.http.post<{ id: string, message: string }>(this.baseUrl, null);
  }

  updateDataset(dataset: DatasetDto, file?: File): Observable<any> {
  const formData = new FormData();
  formData.append('dataset', JSON.stringify(dataset));

  if (file) {
    formData.append('file', file);
  }

  return this.http.put(`${this.baseUrl}/${dataset.id}`, formData);
}

}

@Injectable({//Angular, registra automaticamente questo servizio come singleton disponibile in tutta l'applicazione.
  providedIn: 'root',
})
export class DatasetService {
  private baseUrl = 'http://localhost:5000';
  datasets: DatasetDto[] = []; // You can also use MOCK_DATASETS if you want to initialize with mock data
  constructor(private http: HttpClient) {}
  //rinomina il dataset

  getAllDatasets(): Observable<DatasetDto[]> {
    return this.http.get<DatasetDto[]>(`${this.baseUrl}/datasets`);
  }

  deleteDataset(id: string): void {
    console.log('ID ricevuto per cancellazione:', id);

    // Trova l'indice del dataset con l'id specificato
    const index = this.datasets.findIndex((dataset) => dataset.id === String(id));

    if (index !== -1) {
      console.log('Dataset da rimuovere:', this.datasets[index]);
      this.datasets.splice(index, 1); // Rimuove l'elemento
      this.datasets = [...this.datasets]; // Forza aggiornamento (immutabilità)
    } else {
      console.warn('Nessun dataset trovato con id:', id);
    }

    console.log('Stato attuale:', this.datasets);
  }

  //carico dataset scelto mandato il suo id al db
  loadDataset(datasetId: number): Observable<DatasetDto> {
    return this.http.get<DatasetDto>(`/dataset/${datasetId}`);
  }

  //aggiorno la lista attuale ottenuta dal getAllDatasets() e poi salvo nel db i suoi dati
  createDatasetFromJSONFile(
    dataset: DatasetDto,
    qa_list: QADto[]
  ): Observable<any> {
    const payload = {
      dataset: dataset,
      qa_list: qa_list,
    };
    return this.http.post<any>('/dataset', payload);
  }

  removeDatasetFromCache(id: number): void {}
}
