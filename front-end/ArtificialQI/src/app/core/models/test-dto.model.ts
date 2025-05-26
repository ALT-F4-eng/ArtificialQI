export interface TestDto {
  id: number;
  name: string;
  llm_name: string;
  tmp: boolean;
  max_page: number;
  avg_similarity: number;
  exec_date: Date;
  std_dev_similarity: number;
  correct_percentage: number;
  distribution: number[];
}
