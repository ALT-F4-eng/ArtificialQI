import { Injectable } from '@angular/core';
import { DatasetDto } from '../models/dataset-dto.model';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';

export const MOCK_DATASETS: DatasetDto[] = [
  {
    id: '1',
    name: 'Dataset Alpha',
    last_mod: new Date('2025-05-01'),
    creation: new Date('2025-04-01'),
    origin_id: 0,
    tmp: false,
    max_page: 12,
    element_n: 120,
  },
  {
    id: '2',
    name: 'Dataset Beta',
    last_mod: new Date('2025-06-10'),
    creation: new Date('2025-05-10'),
    origin_id: 1,
    tmp: false,
    max_page: 8,
    element_n: 80,
  },
  {
    id: '3',
    name: 'Dataset Gamma',
    last_mod: new Date('2025-07-15'),
    creation: new Date('2025-06-20'),
    origin_id: 2,
    tmp: false,
    max_page: 10,
    element_n: 100,
  },
  {
    id: '4',
    name: 'Dataset Delta',
    last_mod: new Date('2025-08-20'),
    creation: new Date('2025-07-25'),
    origin_id: 3,
    tmp: true,
    max_page: 6,
    element_n: 60,
  },
  {
    id: '5',
    name: 'Dataset Epsilon',
    last_mod: new Date('2025-09-25'),
    creation: new Date('2025-08-30'),
    origin_id: 0,
    tmp: false,
    max_page: 5,
    element_n: 55,
  },
  {
    id: '6',
    name: 'Dataset Zeta',
    last_mod: new Date('2025-10-30'),
    creation: new Date('2025-09-20'),
    origin_id: 5,
    tmp: true,
    max_page: 7,
    element_n: 77,
  },
  {
    id: '7',
    name: 'Dataset Eta',
    last_mod: new Date('2025-11-05'),
    creation: new Date('2025-10-01'),
    origin_id: 0,
    tmp: false,
    max_page: 4,
    element_n: 40,
  },
  {
    id: '8',
    name: 'Dataset Theta',
    last_mod: new Date('2025-12-12'),
    creation: new Date('2025-11-10'),
    origin_id: 7,
    tmp: true,
    max_page: 9,
    element_n: 95,
  },
  {
    id: '9',
    name: 'Dataset Theta2',
    last_mod: new Date('2025-12-13'),
    creation: new Date('2025-11-11'),
    origin_id: 8,
    tmp: false,
    max_page: 11,
    element_n: 110,
  },
  {
    id: '10',
    name: 'Dataset Iota',
    last_mod: new Date('2025-12-20'),
    creation: new Date('2025-12-01'),
    origin_id: 1,
    tmp: false,
    max_page: 13,
    element_n: 130,
  },
  {
    id: '11',
    name: 'Dataset Kappa',
    last_mod: new Date('2025-12-25'),
    creation: new Date('2025-12-10'),
    origin_id: 10,
    tmp: true,
    max_page: 3,
    element_n: 33,
  },
  {
    id: '12',
    name: 'Dataset Lambda',
    last_mod: new Date('2026-01-01'),
    creation: new Date('2025-12-15'),
    origin_id: 11,
    tmp: false,
    max_page: 6,
    element_n: 66,
  },
  {
    id: '13',
    name: 'Dataset Mu',
    last_mod: new Date('2026-01-05'),
    creation: new Date('2025-12-20'),
    origin_id: 12,
    tmp: false,
    max_page: 9,
    element_n: 90,
  },
  {
    id: '14',
    name: 'Dataset Nu',
    last_mod: new Date('2026-01-10'),
    creation: new Date('2025-12-25'),
    origin_id: 13,
    tmp: false,
    max_page: 7,
    element_n: 73,
  },
  {
    id: '15',
    name: 'Dataset Xi',
    last_mod: new Date('2026-01-15'),
    creation: new Date('2026-01-01'),
    origin_id: 14,
    tmp: true,
    max_page: 5,
    element_n: 52,
  },
];

@Injectable({
  //Angular, registra automaticamente questo servizio come singleton disponibile in tutta l'applicazione.
  providedIn: 'root',
})
export class MockDatasetService {
  constructor() {}
  private datasets: DatasetDto[] = [...MOCK_DATASETS]; // Crea una copia mutabile del mock

  getAllDatasets(): Observable<DatasetDto[]> {
    return of(this.datasets);
  }

  // Metodo per rinominare un dataset
  renameDataset(index: number, newName: string): void {
    if (this.datasets[index]) {
      this.datasets[index].name = newName;
      this.datasets[index].last_mod = new Date(); // aggiorna data di modifica
      console.log('servizio', this.datasets[index]);
    }
  }

  
  cloneDataset(index: number): Observable<any> {/*
    const original = this.datasets[index];
    if (!original) {
      return throwError(() => new Error('Dataset non trovato'));
    }

    // Copia e crea il nuovo dataset (come prima)
    const baseName = `${original.name} (copia)`;
    let newName = baseName;
    let counter = 1;
    while (this.datasets.some((ds) => ds.name === newName)) {
      newName = `${baseName} ${counter}`;
      counter++;
    }

    const copiedDataset: DatasetDto = {
      id: this.id,
      name: newName,
      last_mod: new Date(),
      creation: new Date(),
      origin_id: original.id,
      tmp: true,
      max_page: original.max_page,
      element_n: original.element_n,
    };

    this.datasets = [...this.datasets, copiedDataset];

    return of(copiedDataset); // ritorna Observable che emette il nuovo dataset
  */
 return of(void 0);
    }
  


// mock del back-end
  deleteDataset(id: string): Observable<void> {
    console.log('ID ricevuto per cancellazione:', id);

    const index = this.datasets.findIndex((dataset) => dataset.id === id);
    if (index !== -1) {
      console.log('Dataset da rimuovere:', this.datasets[index]);
      this.datasets.splice(index, 1);
      this.datasets = [...this.datasets];
    } else {
      console.warn('Nessun dataset trovato con id:', id);
    }

    console.log('Stato attuale:', this.datasets);
    return of(void 0);
  }
  
  // servirebbe per aggiornare la lista front-end
  removeDatasetFromCache(id: string): void {
    const index = this.datasets.findIndex((d) => d.id === id);
    if (index !== -1) {
      this.datasets.splice(index, 1);
      this.datasets = [...this.datasets]; // forza cambio per immutabilità
    }
    console.log('dataset cancellato', id, this.datasets);
  }

  // da implementare
  loadDataset() {}
}
