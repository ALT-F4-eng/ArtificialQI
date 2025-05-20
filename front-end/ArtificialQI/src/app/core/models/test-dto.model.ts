import { resultDto } from './result-dto.model';

export interface TestDto {
  name: string;
  ID: number;
  lastModified: Date;
  Dataset: string;
  LLM: string;
  temp: boolean;
}
