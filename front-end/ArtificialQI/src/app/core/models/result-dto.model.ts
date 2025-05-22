export interface resultDto {
    question: string;
    given_answer: string;
    expected_answer: string;
    similarity: number;
    correct: boolean;
}