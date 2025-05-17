import { QADto } from "./qa-dto.model";
export interface DatasetPageDto{
    page_n:number;
    qa_list:QADto[];
}