import { of } from 'rxjs';
import { TestDto } from '../../core/models/test-dto.model';
import { resultDto } from '../../core/models/result-dto.model';

export const MOCK_TEST: TestDto[] = [
  { name: 'Test Alpha', ID: 1, lastModified: new Date('2025-05-01'), Dataset: '1', LLM: 'LLM1', temp: true },
  { name: 'Test Beta', ID: 2, lastModified: new Date('2025-06-10'), Dataset: '2', LLM: 'LLM2', temp: false },
  { name: 'Test Gamma', ID: 3, lastModified: new Date('2025-07-15'), Dataset: '3', LLM: 'LLM3', temp: false },
  { name: 'Test Delta', ID: 4, lastModified: new Date('2025-08-20'), Dataset: '4', LLM: 'LLM4', temp: false },
  { name: 'Test Epsilon', ID: 5, lastModified: new Date('2025-09-25'), Dataset: '5', LLM: 'LLM5', temp: false },
  { name: 'Test Zeta', ID: 6, lastModified: new Date('2025-10-30'), Dataset: '6', LLM: 'LLM6', temp: false },
  { name: 'Test Eta', ID: 7, lastModified: new Date('2025-11-05'), Dataset: '7', LLM: 'LLM7', temp: false },
  { name: 'Test Theta', ID: 8, lastModified: new Date('2025-12-12'), Dataset: '8', LLM: 'LLM8', temp: false },
  { name: 'Test Theta2', ID: 9, lastModified: new Date('2025-12-12'), Dataset: '9', LLM: 'LLM9', temp: false }
];

export const MOCK_RESULT: resultDto[] = [
  { question: 'What is the capital of France?', given_answer: 'Paris', expected_answer: 'Paris', similarity: 0.95, correct: true },
  { question: 'What is the capital of Germany?', given_answer: 'Berlin', expected_answer: 'Berlin', similarity: 0.90, correct: true },
  { question: 'What is the capital of Spain?', given_answer: 'Madrid', expected_answer: 'Barcelona', similarity: 0.85, correct: false }
];

export class MockTestService {
  getAllTests() {
    return of(MOCK_TEST);
  }

  getTest(ID: number) {
    const test = MOCK_TEST.find((test) => test.ID === ID);
    return of(test ?? null);
  }

  saveTest(test: TestDto) {
    const existingTest = MOCK_TEST.find((t) => t.ID === test.ID);
    test.temp = false;

    if (existingTest) {
      Object.assign(existingTest, test);
    } else {
      MOCK_TEST.push(test);
    }

    return of(test);
  }

  deleteTest(ID: number) {
    const index = MOCK_TEST.findIndex((test) => test.ID === ID);
    if (index !== -1) {
      MOCK_TEST.splice(index, 1);
    }
    return of(null); // for Observable<void> compatibility
  }

  renameTest(ID: number, newName: string) {
    const test = MOCK_TEST.find((test) => test.ID === ID);
    if (test) {
      test.name = newName;
    }
    return of(test);
  }

  getAllResults(testID: number) {
    return of(MOCK_RESULT);
  }

  compareTest(test1: TestDto, test2: TestDto) {
    // To be implemented if needed
  }
}
