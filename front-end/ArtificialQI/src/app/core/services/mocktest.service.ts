import { of } from 'rxjs';
import { TestDto } from '../models/test-dto.model';

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

export class MockTestService {
    getAllTests() {
        return of(MOCK_TEST);
    }

    deleteTest(ID: number) {
        const index = MOCK_TEST.findIndex((test) => test.ID === ID);
        if (index !== -1) {
            MOCK_TEST.splice(index, 1);
        }
    }
    renameTest(ID: number, newName: string) {
        const test = MOCK_TEST.find((test) => test.ID === ID);
        if (test) {
            test.name = newName;
        }
    }
    getTest(ID: number) {
        const test = MOCK_TEST.find((test) => test.ID === ID);
        if (test) {
            return of(test);
        } else {
            return of(null);
        }
    }
}