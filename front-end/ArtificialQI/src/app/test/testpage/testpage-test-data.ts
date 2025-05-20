import { resultDto } from "../../core/models/result-dto.model";
import { TestDto } from "../../core/models/test-dto.model";

export const testMockData: TestDto[] = [
    {
        name: 'Test 1',
        ID: 1,
        lastModified: new Date('2023-10-01'),
        Dataset: 'Dataset 1',
        LLM: 'LLM 1',
        temp: true
    }
]

export const resultListMockData: resultDto[] = [
    {
        question: 'What is the capital of France?',
        given_answer: 'Paris',
        expected_answer: 'Paris',
        similarity: 0.95,
        correct: true
    },
    {
        question: 'What is the capital of Germany?',
        given_answer: 'Berlin',
        expected_answer: 'Berlin',
        similarity: 0.90,
        correct: true
    },
    {
        question: 'What is the capital of Spain?',
        given_answer: 'Madrid',
        expected_answer: 'Barcelona',
        similarity: 0.85,
        correct: false
    }
]