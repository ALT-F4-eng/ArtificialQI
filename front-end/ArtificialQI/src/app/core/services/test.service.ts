import { Injectable } from '@angular/core';

export interface Test {
  name: string;
  lastModified: Date;
  Dataset: string;
}

const MOCK_TEST: Test[] = [
    { name: 'Test Alpha', lastModified: new Date('2025-05-01'), Dataset: '1' },
    { name: 'Test Beta', lastModified: new Date('2025-06-10'), Dataset: '2' },
    { name: 'Test Gamma', lastModified: new Date('2025-07-15'), Dataset: '3' },
    { name: 'Test Delta', lastModified: new Date('2025-08-20'), Dataset: '4' },
    { name: 'Test Epsilon', lastModified: new Date('2025-09-25'), Dataset: '5' },
    { name: 'Test Zeta', lastModified: new Date('2025-10-30'), Dataset: '6' },
    { name: 'Test Eta', lastModified: new Date('2025-11-05'), Dataset: '7' },
    { name: 'Test Theta', lastModified: new Date('2025-12-12'), Dataset: '8' },
    { name: 'Test Theta2', lastModified: new Date('2025-12-12'), Dataset: '9' },
];

@Injectable({
    providedIn: 'root',
})
export class TestService {
    constructor() {}
    private tests: Test[] = [...MOCK_TEST];
    getTest(): Test[] {
        return this.tests;
    }
    // Metodo per rinominare un test
    renameTest(index: number, newName: string): void {
        if (this.tests[index]) {
            this.tests[index].name = newName;
            this.tests[index].lastModified = new Date(); // aggiorna data di modifica
            console.log('servizio', this.tests[index]);
        }
    }
    copyTest(index: number): void {
        const original = this.tests[index];
        if (original) {
            const copiedTest = {
                name: original.name + '(copia)',
                lastModified: new Date(),
                Dataset: original.Dataset,
            };
            this.tests = [...this.tests, copiedTest];
            console.log('tutti test', this.tests);
        }
    }
    deleteTest(index: number): void {
        console.log('Indice ricevuto per cancellazione:', index);
        if (index >= 0 && index < this.tests.length) {
            console.log('splice:', this.tests.splice(index, 1)); // rimuove l'elemento all'indice
            this.tests = [...this.tests]; // ricrea array per forzare update
        }
        console.log('Stato attuale:', this.tests);
    }
}