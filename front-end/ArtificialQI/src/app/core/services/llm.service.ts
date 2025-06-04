import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LlmDto } from '../models/llm-dto.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LlmService {
  private baseUrl = 'http://localhost:5000/';
  constructor(private http: HttpClient) {}

  getAllLlms(): Observable<LlmDto[]> {
    return this.http.get<LlmDto[]>(`${this.baseUrl}/llms`);
  }

  deleteLlm(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/llms/${id}`);
  }

  getLlm(id: string): Observable<LlmDto> {
    return this.http.get<LlmDto>(`${this.baseUrl}/llms/${id}`);
  }

  createLlm(llm: LlmDto): Observable<LlmDto> {
    return this.http.post<any>(`${this.baseUrl}/llms`, llm);
  }

  saveLlm(llm: LlmDto): Observable<LlmDto> {
    return this.http.post<any>(`${this.baseUrl}/llms/${llm.id}`, llm);
  }

  updateLlm(llm: LlmDto): Observable<LlmDto> {
    return this.http.put<any>(`${this.baseUrl}/llms/${llm.id}`, llm);
  }

}

