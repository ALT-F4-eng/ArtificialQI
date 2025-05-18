import { QADto } from "./qa-dto.model";
export interface DatasetPageDto{
    page_n:number;
    qa_list:QADto[];
}
export const emptyDatasetPage: DatasetPageDto = {
  page_n: 0,
  qa_list: []
};