import { Injectable } from '@angular/core';
import { DatasetDto } from '../models/dataset-dto.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export const MOCK_DATASETS: DatasetDto[] = [
  {
    id: '1e7b9c8a-1a2b-4c3d-8e9f-0a1b2c3d4e5f',
    name: 'Dataset Alpha',
    last_mod: new Date('2025-05-01'),
    creation: new Date('2025-04-01'),
    origin_id: 0,
    tmp: false,
    max_page: 12,
    element_n: 120,
  },
  {
    id: '2f8c0d1b-2b3c-5d4e-9f0a-1b2c3d4e5f6a',
    name: 'Dataset Beta',
    last_mod: new Date('2025-06-10'),
    creation: new Date('2025-05-10'),
    origin_id: 1,
    tmp: false,
    max_page: 8,
    element_n: 80,
  },
  {
    id: '3a9d1e2c-3c4d-6e5f-0a1b-2c3d4e5f6a7b',
    name: 'Dataset Gamma',
    last_mod: new Date('2025-07-15'),
    creation: new Date('2025-06-20'),
    origin_id: 2,
    tmp: false,
    max_page: 10,
    element_n: 100,
  },
  {
    id: '4b0e2f3d-4d5e-7f6a-1b2c-3d4e5f6a7b8c',
    name: 'Dataset Delta',
    last_mod: new Date('2025-08-20'),
    creation: new Date('2025-07-25'),
    origin_id: 3,
    tmp: true,
    max_page: 6,
    element_n: 60,
  },
  {
    id: '5c1f304e-5e6f-8a7b-2c3d-4e5f6a7b8c9d',
    name: 'Dataset Epsilon',
    last_mod: new Date('2025-09-25'),
    creation: new Date('2025-08-30'),
    origin_id: 0,
    tmp: false,
    max_page: 5,
    element_n: 55,
  },
  {
    id: '6d20315f-6f70-9b8c-3d4e-5f6a7b8c9d0e',
    name: 'Dataset Zeta',
    last_mod: new Date('2025-10-30'),
    creation: new Date('2025-09-20'),
    origin_id: 4,
    tmp: true,
    max_page: 7,
    element_n: 77,
  },
  {
    id: '7e314270-7081-ac9d-4e5f-6a7b8c9d0e1f',
    name: 'Dataset Eta',
    last_mod: new Date('2025-11-05'),
    creation: new Date('2025-10-01'),
    origin_id: 0,
    tmp: false,
    max_page: 4,
    element_n: 40,
  },
  {
    id: '8f425381-8192-bd0e-5f6a-7b8c9d0e1f20',
    name: 'Dataset Theta',
    last_mod: new Date('2025-12-12'),
    creation: new Date('2025-11-10'),
    origin_id: 6,
    tmp: true,
    max_page: 9,
    element_n: 95,
  },
  {
    id: '9a536492-92a3-ce1f-6a7b-8c9d0e1f2031',
    name: 'Dataset Theta2',
    last_mod: new Date('2025-12-13'),
    creation: new Date('2025-11-11'),
    origin_id: 7,
    tmp: false,
    max_page: 11,
    element_n: 110,
  },
  {
    id: '0b6475a3-a3b4-df20-7b8c-9d0e1f203142',
    name: 'Dataset Iota',
    last_mod: new Date('2025-12-20'),
    creation: new Date('2025-12-01'),
    origin_id: 1,
    tmp: false,
    max_page: 13,
    element_n: 130,
  },
  {
    id: '1c7586b4-b4c5-e031-8c9d-0e1f20314253',
    name: 'Dataset Kappa',
    last_mod: new Date('2025-12-25'),
    creation: new Date('2025-12-10'),
    origin_id: 9,
    tmp: true,
    max_page: 3,
    element_n: 33,
  },
  {
    id: '2d8697c5-c5d6-f142-9d0e-1f2031425364',
    name: 'Dataset Lambda',
    last_mod: new Date('2026-01-01'),
    creation: new Date('2025-12-15'),
    origin_id: 10,
    tmp: false,
    max_page: 6,
    element_n: 66,
  },
  {
    id: '3e97a8d6-d6e7-0253-0e1f-203142536475',
    name: 'Dataset Mu',
    last_mod: new Date('2026-01-05'),
    creation: new Date('2025-12-20'),
    origin_id: 11,
    tmp: false,
    max_page: 9,
    element_n: 90,
  },
  {
    id: '4fa8b9e7-e7f8-1364-1425-364758697a8b',
    name: 'Dataset Nu',
    last_mod: new Date('2026-01-10'),
    creation: new Date('2025-12-25'),
    origin_id: 12,
    tmp: false,
    max_page: 7,
    element_n: 73,
  },
  {
    id: '5ab9c0f8-f809-2475-2536-4758697a8b9c',
    name: 'Dataset Xi',
    last_mod: new Date('2026-01-15'),
    creation: new Date('2026-01-01'),
    origin_id: 13,
    tmp: true,
    max_page: 5,
    element_n: 52,
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
  constructor() {}
  private datasets: DatasetDto[] = [...MOCK_DATASETS]; // Crea una copia mutabile del mock

  getDataset(): DatasetDto[] {
    return this.datasets;
  }
  // Metodo per rinominare un dataset
  renameDataset(index: number, newName: string): void {
    if (this.datasets[index]) {
      this.datasets[index].name = newName;
      this.datasets[index].last_mod = new Date(); // aggiorna data di modifica
      console.log('servizio', this.datasets[index]);
    }
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
  // da implementare
  loadDataset() {}
}
