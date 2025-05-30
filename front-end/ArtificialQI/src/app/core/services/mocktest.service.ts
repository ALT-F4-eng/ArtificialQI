import { of } from 'rxjs';
import { TestDto } from '../../core/models/test-dto.model';
import { TestResultDto } from '../models/testresult-dto.model';
import { TestPageDto } from '../models/testpage-dto.model';

export const MOCK_TEST: TestDto[] = [
  {
    id: 1,
    name: 'Test Alpha',
    dataset_id: 1,
    llm_name: 'LLM1',
    tmp: true,
    max_page: 10,
    avg_similarity: 0.85,
    exec_date: new Date('2025-05-01'),
    std_dev_similarity: 0.05,
    correct_percentage: 90,
    distribution: [1, 2, 3, 4, 5],
  },
  {
    id: 2,
    name: 'Test Beta',
    dataset_id: 2,
    llm_name: 'LLM2',
    tmp: false,
    max_page: 12,
    avg_similarity: 0.78,
    exec_date: new Date('2025-06-10'),
    std_dev_similarity: 0.08,
    correct_percentage: 85,
    distribution: [2, 3, 4, 5, 6],
  },
  {
    id: 3,
    name: 'Test Gamma',
    dataset_id: 3,
    llm_name: 'LLM3',
    tmp: false,
    max_page: 8,
    avg_similarity: 0.92,
    exec_date: new Date('2025-07-15'),
    std_dev_similarity: 0.03,
    correct_percentage: 95,
    distribution: [3, 4, 5, 6, 7],
  },
  {
    id: 4,
    name: 'Test Delta',
    dataset_id: 1,
    llm_name: 'LLM4',
    tmp: false,
    max_page: 15,
    avg_similarity: 0.81,
    exec_date: new Date('2025-08-20'),
    std_dev_similarity: 0.07,
    correct_percentage: 88,
    distribution: [4, 5, 6, 7, 8],
  },
  {
    id: 5,
    name: 'Test Epsilon',
    dataset_id: 2,
    llm_name: 'LLM5',
    tmp: false,
    max_page: 9,
    avg_similarity: 0.76,
    exec_date: new Date('2025-09-25'),
    std_dev_similarity: 0.09,
    correct_percentage: 80,
    distribution: [5, 6, 7, 8, 9],
  },
  {
    id: 6,
    name: 'Test Zeta',
    dataset_id: 3,
    llm_name: 'LLM6',
    tmp: false,
    max_page: 11,
    avg_similarity: 0.88,
    exec_date: new Date('2025-10-30'),
    std_dev_similarity: 0.04,
    correct_percentage: 92,
    distribution: [6, 7, 8, 9, 10],
  },
  {
    id: 7,
    name: 'Test Eta',
    dataset_id: 1,
    llm_name: 'LLM7',
    tmp: false,
    max_page: 13,
    avg_similarity: 0.83,
    exec_date: new Date('2025-11-05'),
    std_dev_similarity: 0.06,
    correct_percentage: 87,
    distribution: [7, 8, 9, 10, 11],
  },
  {
    id: 8,
    name: 'Test Theta',
    dataset_id: 2,
    llm_name: 'LLM8',
    tmp: false,
    max_page: 14,
    avg_similarity: 0.79,
    exec_date: new Date('2025-12-12'),
    std_dev_similarity: 0.1,
    correct_percentage: 82,
    distribution: [8, 9, 10, 11, 12],
  },
  {
    id: 9,
    name: 'Test Theta2',
    dataset_id: 3,
    llm_name: 'LLM9',
    tmp: false,
    max_page: 16,
    avg_similarity: 0.91,
    exec_date: new Date('2025-12-12'),
    std_dev_similarity: 0.02,
    correct_percentage: 97,
    distribution: [9, 10, 11, 12, 13],
  },
];

export const MOCK_RESULT: TestResultDto[] = [
  {
    qa: { id: 1, question: 'What is the capital of France?', answer: 'Paris' },
    llm_answer: 'Paris',
    similarity: 1.0,
    correct: true,
  },
  {
    qa: {
      id: 2,
      question: 'What is the capital of Germany?',
      answer: 'Berlin',
    },
    llm_answer: 'Berlin',
    similarity: 1.0,
    correct: true,
  },
  {
    qa: {
      id: 3,
      question: 'What is the capital of Spain?',
      answer: 'Barcelona',
    },
    llm_answer: 'Madrid',
    similarity: 0.22,
    correct: false,
  },
  {
    qa: { id: 4, question: 'What is the capital of Italy?', answer: 'Rome' },
    llm_answer: 'Rome',
    similarity: 1.0,
    correct: true,
  },
  {
    qa: {
      id: 5,
      question: 'What is the capital of Portugal?',
      answer: 'Lisbon',
    },
    llm_answer: 'Lisbon',
    similarity: 1.0,
    correct: true,
  },
  {
    qa: {
      id: 6,
      question: 'What is the capital of Netherlands?',
      answer: 'Amsterdam',
    },
    llm_answer: 'Amsterdam',
    similarity: 1.0,
    correct: true,
  },
  {
    qa: {
      id: 7,
      question: 'What is the capital of Belgium?',
      answer: 'Brussels',
    },
    llm_answer: 'Brussels',
    similarity: 1.0,
    correct: true,
  },
  {
    qa: {
      id: 8,
      question: 'What is the capital of Switzerland?',
      answer: 'Bern',
    },
    llm_answer: 'Bern',
    similarity: 1.0,
    correct: true,
  },
  {
    qa: {
      id: 9,
      question: 'What is the capital of Austria?',
      answer: 'Vienna',
    },
    llm_answer: 'Vienna',
    similarity: 1.0,
    correct: true,
  },
  {
    qa: {
      id: 10,
      question: 'What is the capital of Sweden?',
      answer: 'Stockholm',
    },
    llm_answer: 'Stockholm',
    similarity: 1.0,
    correct: true,
  },
  {
    qa: { id: 11, question: 'What is the capital of Norway?', answer: 'Oslo' },
    llm_answer: 'Oslo',
    similarity: 1.0,
    correct: true,
  },
  {
    qa: {
      id: 12,
      question: 'What is the capital of Denmark?',
      answer: 'Copenhagen',
    },
    llm_answer: 'Copenhagen',
    similarity: 1.0,
    correct: true,
  },
  {
    qa: {
      id: 13,
      question: 'What is the capital of Finland?',
      answer: 'Helsinki',
    },
    llm_answer: 'Helsinki',
    similarity: 1.0,
    correct: true,
  },
  {
    qa: {
      id: 14,
      question: 'What is the capital of Iceland?',
      answer: 'Reykjavik',
    },
    llm_answer: 'Reykjavik',
    similarity: 1.0,
    correct: true,
  },
  {
    qa: {
      id: 15,
      question: 'What is the capital of Ireland?',
      answer: 'Dublin',
    },
    llm_answer: 'Dublin',
    similarity: 1.0,
    correct: true,
  },
  {
    qa: {
      id: 16,
      question: 'What is the capital of Greece?',
      answer: 'Athens',
    },
    llm_answer: 'Athens',
    similarity: 1.0,
    correct: true,
  },
  {
    qa: {
      id: 17,
      question: 'What is the capital of Hungary?',
      answer: 'Budapest',
    },
    llm_answer: 'Budapest',
    similarity: 1.0,
    correct: true,
  },
  {
    qa: {
      id: 18,
      question: 'What is the capital of Poland?',
      answer: 'Warsaw',
    },
    llm_answer: 'Warsaw',
    similarity: 1.0,
    correct: true,
  },
];


export const MOCK_RESULT_COMPARE: TestResultDto[] = [
  {
    qa: { id: 1, question: 'What is the capital of France?', answer: 'Paris' },
    llm_answer: 'Lyon',
    similarity: 0.62,
    correct: false,
  },
  {
    qa: { id: 2, question: 'What is the capital of Germany?', answer: 'Berlin' },
    llm_answer: 'Berlin',
    similarity: 1.0,
    correct: true,
  },
  {
    qa: { id: 3, question: 'What is the capital of Spain?', answer: 'Barcelona' },
    llm_answer: 'Seville',
    similarity: 0.33,
    correct: false,
  },
  {
    qa: { id: 4, question: 'What is the capital of Italy?', answer: 'Rome' },
    llm_answer: 'Naples',
    similarity: 0.52,
    correct: false,
  },
  {
    qa: { id: 5, question: 'What is the capital of Portugal?', answer: 'Lisbon' },
    llm_answer: 'Lisbon',
    similarity: 1.0,
    correct: true,
  },
  {
    qa: { id: 6, question: 'What is the capital of Netherlands?', answer: 'Amsterdam' },
    llm_answer: 'Rotterdam',
    similarity: 0.25,
    correct: false,
  },
  {
    qa: { id: 7, question: 'What is the capital of Belgium?', answer: 'Brussels' },
    llm_answer: 'Bruges',
    similarity: 0.29,
    correct: false,
  },
  {
    qa: { id: 8, question: 'What is the capital of Switzerland?', answer: 'Bern' },
    llm_answer: 'Zurich',
    similarity: 0.37,
    correct: false,
  },
  {
    qa: { id: 9, question: 'What is the capital of Austria?', answer: 'Vienna' },
    llm_answer: 'Salzburg',
    similarity: 0.46,
    correct: false,
  },
  {
    qa: { id: 10, question: 'What is the capital of Sweden?', answer: 'Stockholm' },
    llm_answer: 'Gothenburg',
    similarity: 0.12,
    correct: false,
  },
  {
    qa: { id: 11, question: 'What is the capital of Norway?', answer: 'Oslo' },
    llm_answer: 'Oslo',
    similarity: 1.0,
    correct: true,
  },
  {
    qa: { id: 12, question: 'What is the capital of Denmark?', answer: 'Copenhagen' },
    llm_answer: 'Aarhus',
    similarity: 0.3,
    correct: false,
  },
  {
    qa: { id: 13, question: 'What is the capital of Finland?', answer: 'Helsinki' },
    llm_answer: 'Espoo',
    similarity: 0.39,
    correct: false,
  },
  {
    qa: { id: 14, question: 'What is the capital of Iceland?', answer: 'Reykjavik' },
    llm_answer: 'Reykjavik',
    similarity: 1.0,
    correct: true,
  },
  {
    qa: { id: 15, question: 'What is the capital of Ireland?', answer: 'Dublin' },
    llm_answer: 'Cork',
    similarity: 0.21,
    correct: false,
  },
  {
    qa: { id: 16, question: 'What is the capital of Greece?', answer: 'Athens' },
    llm_answer: 'Thessaloniki',
    similarity: 0.48,
    correct: false,
  },
  {
    qa: { id: 17, question: 'What is the capital of Hungary?', answer: 'Budapest' },
    llm_answer: 'Budapest',
    similarity: 1.0,
    correct: true,
  },
  {
    qa: { id: 18, question: 'What is the capital of Poland?', answer: 'Warsaw' },
    llm_answer: 'Krakow',
    similarity: 0.18,
    correct: false,
  },
];

export const MOCK_TEST_PAGE: TestPageDto = {
  page_n: 4,
  result_list: MOCK_RESULT,
};

export const MOCK_TEST_PAGE_COMPARE:TestPageDto={
  page_n:4,
  result_list:MOCK_RESULT_COMPARE,
}


export class MockTestService {
  //cachedTestCaricato: any;

  getAllTests() {
    return of(MOCK_TEST);
  }

  getTest(id: number) {
    const test = MOCK_TEST.find((test) => test.id === id);
    return of(test ?? null);
  }

  saveTest(test: TestDto) {
    const existingTest = MOCK_TEST.find((t) => t.id === test.id);
    test.tmp = false;

    if (existingTest) {
      Object.assign(existingTest, test);
    } else {
      MOCK_TEST.push(test);
    }

    return of(test);
  }

  deleteTest(id: number) {
    const index = MOCK_TEST.findIndex((test) => test.id === id);
    if (index !== -1) {
      MOCK_TEST.splice(index, 1);
    }
    return of(null); // for Observable<void> compatibility
  }

  renameTest(id: number, newName: string) {
    const test = MOCK_TEST.find((test) => test.id === id);
    if (test) {
      test.name = newName;
    }
    return of(test);
  }

  getAllResults(testid: number) {
    return of(MOCK_RESULT);
  }
  getAllResultsCompare(testid: number) {
    return of(MOCK_RESULT_COMPARE);
  }

  compareTest(test1: TestDto, test2: TestDto) {
    // To be implemented if needed
  }
}
