import { of } from 'rxjs';
import { LlmDto } from "../../core/models/llm-dto.model";
import { llmMockList } from './llm-test-data';

export class MockLlmService {
  private llms: LlmDto[] = [...llmMockList]
  
  getAllLlms() {
    return of(llmMockList); // restituisce Observable<LlmDto[]>
  }

  deleteLlm(id: number) {
    const index = this.llms.findIndex(llm => llm.id === id);
    this.llms.splice(index, 1); // Rimuove dalla lista
    return of(void 0); // Restituisce un Observable<void>
  }

  getLlm(id: number) {
    return of(this.llms.find(llm => llm.id === id));
  }
}