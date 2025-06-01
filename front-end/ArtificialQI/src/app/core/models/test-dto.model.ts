export interface TestDto {
  id: string; // UUID come stringa
  name?: string | null; // campo opzionale o null
  dataset_id: string;
  llm_name: string; // probabilmente serve un id 
  exec_date: string; // ISO 8601 date string (es. "2025-06-01")
  tmp: boolean;
  max_page: number;
  avg_similarity: number;
  std_dev_similarity: number;
  correct_percentage: number;
  distribution: number[];
}

export interface ParsedTestDto extends Omit<TestDto, 'exec_date'> {
  exec_date: Date;
}

export function parseTestDto(dto: TestDto): ParsedTestDto {
  return {
    ...dto,
    exec_date: new Date(dto.exec_date)
  };
}
