import { of } from 'rxjs';
import { TestDto } from '../../core/models/test-dto.model';
import { resultDto } from '../../core/models/result-dto.model';

export const MOCK_TEST: TestDto[] = [
    { name: 'Test Alpha', ID: 1, lastModified: new Date('2025-05-01'), Dataset: '1', LLM: 'LLM1', temp: false },
    { name: 'Test Beta', ID: 2, lastModified: new Date('2025-06-10'), Dataset: '2', LLM: 'LLM2', temp: false }
];

export const MOCK_RESULT: resultDto[] = [
    { question: 'What is the capital of France?', given_answer: 'Paris', expected_answer: 'Paris', similarity: 0.95, correct: true },
    { question: 'What is the capital of Germany?', given_answer: 'Berlin', expected_answer: 'Berlin', similarity: 0.90, correct: true },
    { question: 'What is the capital of Spain?', given_answer: 'Madrid', expected_answer: 'Barcelona', similarity: 0.85, correct: false }
];

export class MockTestService {
    getTest(ID: number) {
        const test = MOCK_TEST.find((test) => test.ID === ID);
        if (test) {
            return of(test);
        } else {
            return of(null);
        }
    }

    saveTest(test: TestDto) {
        const existingTest = MOCK_TEST.find((t) => t.ID === test.ID);
        if (existingTest) {
            Object.assign(existingTest, test);
        } else {
            MOCK_TEST.push(test);
        }
        return of(test);
    }

    compareTest(test1: TestDto, test2: TestDto) {
    }
}