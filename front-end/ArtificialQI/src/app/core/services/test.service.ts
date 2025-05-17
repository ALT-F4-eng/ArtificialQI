import { Injectable } from '@angular/core';
import { TestDto } from '../models/test-dto.model';
import { Observable, BehaviorSubject } from 'rxjs';

const MOCK_TEST: TestDto[] = [
    { name: 'Test Alpha', ID: 1, lastModified: new Date('2025-05-01'), Dataset: '1' },
    { name: 'Test Beta', ID: 2, lastModified: new Date('2025-06-10'), Dataset: '2' },
    { name: 'Test Gamma', ID: 3, lastModified: new Date('2025-07-15'), Dataset: '3' },
    { name: 'Test Delta', ID: 4, lastModified: new Date('2025-08-20'), Dataset: '4' },
    { name: 'Test Epsilon', ID: 5, lastModified: new Date('2025-09-25'), Dataset: '5' },
    { name: 'Test Zeta', ID: 6, lastModified: new Date('2025-10-30'), Dataset: '6' },
    { name: 'Test Eta', ID: 7, lastModified: new Date('2025-11-05'), Dataset: '7' },
    { name: 'Test Theta', ID: 8, lastModified: new Date('2025-12-12'), Dataset: '8' },
    { name: 'Test Theta2', ID: 9, lastModified: new Date('2025-12-12'), Dataset: '9' },
];

@Injectable({
    providedIn: 'root',
})
export class TestService {
    private testsSubject = new BehaviorSubject<TestDto[]>([...MOCK_TEST]);
    tests$ = this.testsSubject.asObservable();

    constructor() {}

    getTests(): Observable<TestDto[]> {
        return this.tests$;
    }

    renameTest(index: number, newName: string): void {
        const tests = [...this.testsSubject.value];
        if (tests[index]) {
            tests[index] = {
                ...tests[index],
                name: newName,
                lastModified: new Date(),
            };
            this.testsSubject.next(tests);
        }
    }

    copyTest(index: number): void {
        const tests = [...this.testsSubject.value];
        const original = tests[index];
        if (original) {
            const copiedTest: TestDto = {
                ...original,
                name: original.name + '(copia)',
                lastModified: new Date(),
                // Optionally, assign a new ID if needed
            };
            this.testsSubject.next([...tests, copiedTest]);
        }
    }

    deleteTest(index: number): void {
        const tests = [...this.testsSubject.value];
        if (index >= 0 && index < tests.length) {
            tests.splice(index, 1);
            this.testsSubject.next(tests);
        }
    }
}