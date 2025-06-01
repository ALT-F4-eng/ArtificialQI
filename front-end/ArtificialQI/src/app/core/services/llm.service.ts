import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LlmDto } from '../models/llm-dto.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LlmService {
  constructor(private http: HttpClient) {}

  getAllLlms(): Observable<LlmDto[]> {
    return this.http.get<LlmDto[]>('/llms'); // URL del tuo backend
  }

  deleteLlm(id: string): Observable<any> {
    return this.http.delete(`/llms/${id}`);
  }

  getLlm(id: string): Observable<LlmDto> {
    return this.http.get<LlmDto>(`/llms/${id}`);
  }

  createLlm(llm: LlmDto): Observable<LlmDto> {
    return this.http.post<any>('/llms', llm);
  }

  saveLlm(llm: LlmDto): Observable<LlmDto> {
    return this.http.post<any>(`/llms/${llm.id}`, llm);
  }

}

