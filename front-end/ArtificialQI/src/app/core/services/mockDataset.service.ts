import { Injectable } from '@angular/core';
import { DatasetDto } from '../models/dataset-dto.model';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';

export const MOCK_DATASETS: DatasetDto[] = [
  {
    id: '1',
    name: 'Dataset Alpha',
    last_save_date: new Date('2025-05-01'),
    origin: '0',
    tmp: false,
  },
  {
    id: '2',
    name: 'Dataset Beta',
    last_save_date: new Date('2025-06-10'),
    origin: '0',
    tmp: false,
  },
  {
    id: '3',
    name: 'Dataset Gamma',
    last_save_date: new Date('2025-07-15'),
    origin: '0',
    tmp: false,
  },
  {
    id: '4',
    name: 'Dataset Delta',
    last_save_date: new Date('2025-08-20'),
    origin: '0',
    tmp: true,
  },
  {
    id: '5',
    name: 'Dataset Epsilon',
    last_save_date: new Date('2025-09-25'),
    origin: '0',
    tmp: false,
  },
  {
    id: '6',
    name: 'Dataset Zeta',
    last_save_date: new Date('2025-10-30'),
    origin: '0',
    tmp: true,
  },
  {
    id: '7',
    name: 'Dataset Eta',
    last_save_date: new Date('2025-11-05'),
    origin: '0',
    tmp: false,
  },
  {
    id: '8',
    name: 'Dataset Theta',
    last_save_date: new Date('2025-12-12'),
    origin: '0',
    tmp: true,
  },
  {
    id: '9',
    name: 'Dataset Theta2',
    last_save_date: new Date('2025-12-13'),
    origin: '0',
    tmp: false,
  },
  {
    id: '10',
    name: 'Dataset Iota',
    last_save_date: new Date('2025-12-20'),
    origin: '0',
    tmp: false,
  },
  {
    id: '11',
    name: 'Dataset Kappa',
    last_save_date: new Date('2025-12-25'),
    origin: '0',
    tmp: true,
  },
  {
    id: '12',
    name: 'Dataset Lambda',
    last_save_date: new Date('2026-01-01'),
    origin: '0',
    tmp: false,
  },
  {
    id: '13',
    name: 'Dataset Mu',
    last_save_date: new Date('2026-01-05'),
    origin: '0',
    tmp: false,
  },
  {
    id: '14',
    name: 'Dataset Nu',
    last_save_date: new Date('2026-01-10'),
    origin: '0',
    tmp: false,
  },
  {
    id: '15',
    name: 'Dataset Xi',
    last_save_date: new Date('2026-01-15'),
    origin: '0',
    tmp: true,
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
      this.datasets[index].last_save_date = new Date(); // aggiorna data di modifica
      console.log('servizio', this.datasets[index]);
    }
  }

  cloneDataset(index: number): Observable<any> {
    /*
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
      last_save_date: new Date(),
      creation: new Date(),
      origin: original.id,
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
