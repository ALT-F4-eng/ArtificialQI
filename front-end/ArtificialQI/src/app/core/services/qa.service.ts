import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { QADto } from '../models/qa-dto.model';
import { LlmDto } from '../models/llm-dto.model';

import { DatasetDto } from '../models/dataset-dto.model';
import { DatasetPageDto } from '../models/datasetpage-dto.model';

@Injectable({
  providedIn: 'root',
})
export class QAService {
  private baseUrl = 'http://localhost:5000';
  cachedDatasetCaricato: any;
  constructor(private http: HttpClient) {}
  //sezione di create
  //back-end dovrebbe ritornare un oggetto dataset nuovo

  getAllqaByDatasetId(dataset_id: string): Observable<QADto[]> {
    return this.http.get<QADto[]>(`${this.baseUrl}/loadDataset/${dataset_id}`);
  }
  // addQA
  addQA(
    datasetId: number,
    question: string,
    answer: string
  ): Observable<QADto> {
    const body = { question, answer };
    return this.http.post<QADto>(`/dataset/page/${datasetId}/qa`, body);
  }

  //mnada una richiesta di salvare i dataset temporanei presenti nel db che venga salvato
  saveDataset(dataset: DatasetDto): Observable<any> {
    // ci ritorna un datasetDto poi in base quello si puo fare una richiesta di caricamento della pagina 1
    return this.http.post<any>('/dataset', dataset);
  }
  //qaID univoco per tutti gli dataset
  modifyDatasetQA(
    qaId: string,
    domanda: string,
    risposta: string
  ): Observable<QADto> {
    const body = { domanda, risposta };
    return this.http.post<QADto>(`${this.baseUrl}/modifyQA/${qaId}`, body);
  }

  deleteDatasetQA(datasetId: string, qaId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/datasets/${datasetId}/qas/${qaId}`);
  }
  

  runTest(dataset: DatasetDto, llmSelected: LlmDto) {
    const payload = {
      dataset: dataset,
      llmSelected: llmSelected,
    };
    return this.http.post<any>('/test', payload);
  }
}
