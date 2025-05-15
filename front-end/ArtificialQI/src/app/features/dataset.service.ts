import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
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
  { name: 'Dataset Theta', lastModified: new Date('2025-12-12') },
  { name: 'Dataset Theta2', lastModified: new Date('2025-12-12') },
];

@Injectable({
  providedIn: 'root',
})
export class DatasetService {
  constructor() {}
  private datasets: Dataset[] = [...MOCK_DATASET]; // Crea una copia mutabile del mock

  getDataset(): Dataset[] {
    return this.datasets;
  }
  // Metodo per rinominare un dataset
  renameDataset(index: number, newName: string): void {
    if (this.datasets[index]) {
      this.datasets[index].name = newName;
      this.datasets[index].lastModified = new Date(); // aggiorna data di modifica
      console.log('servizio', this.datasets[index]);
    }
  }

  copyDataset(index: number): void {
    const original = this.datasets[index];
    if (original) {
      const copiedDataset = {
        name: original.name + '(copia)',
        lastModified: new Date(),
      };
      this.datasets = [...this.datasets, copiedDataset];
      console.log('tutti dataset', this.datasets);
    }
  }

  deleteDataset(index: number): void {
    console.log('Indice ricevuto per cancellazione:', index);
    if (index >= 0 && index < this.datasets.length) {
      console.log('splice:', this.datasets.splice(index, 1)); // rimuove l'elemento all'indice
      this.datasets = [...this.datasets]; // ricrea array per forzare update
    }
    console.log('Stato attuale:', this.datasets);
  }
}
