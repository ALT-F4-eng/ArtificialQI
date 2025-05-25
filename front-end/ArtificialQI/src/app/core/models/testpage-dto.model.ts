import { TestResultDto } from './testresult-dto.model';

export interface TestPageDto {
    page_n: number;
    result_list: TestResultDto[];
}