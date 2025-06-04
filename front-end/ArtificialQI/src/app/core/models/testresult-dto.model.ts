import { QADto } from "./qa-dto.model";

export interface TestResultDto {
    qa: QADto;
    llm_answer: string;
    similarity: number;
    correct: boolean;
}