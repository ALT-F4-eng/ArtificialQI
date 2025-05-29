import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { DatasetDto } from '../models/dataset-dto.model';
import { DatasetPageDto } from '../models/datasetpage-dto.model';
import { QADto } from '../models/qa-dto.model';
import { LlmDto } from '../models/llm-dto.model';

@Injectable({
  providedIn: 'root',
})
export class QAService {
  cachedDatasetCaricato: any;
  constructor(private http: HttpClient) {}
  //sezione di create
  //back-end dovrebbe ritornare un oggetto dataset nuovo
  getNewDatasetTemporary(): Observable<DatasetDto> {
    return this.http.get<DatasetDto>('/dataset');
  }

  getDatasetPage(index: number): Observable<DatasetPageDto> {
    return this.http.get<DatasetPageDto>(`/dataset/page/${index}`);
  }
  
  //
  getDatasetPage2mock(index: number): Observable<DatasetPageDto> {
    return this.http.get<DatasetPageDto>(`/dataset/page/${index}`);
  }

  getDatasetPageFiltered(term: string): Observable<QADto[]> {
    return this.http.get<QADto[]>(`/dataset/page/${term}`);
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

  // chiedere al back-end di creare una copia temporanea
  createWorkingCopy(datasetId: number): Observable<DatasetDto> {
    return this.http.post<DatasetDto>('/dataset', { datasetId });
  }
  //
  getWorkingCopy(): Observable<DatasetDto> {
    return this.http.get<DatasetDto>('/dataset');
  }

  //qaID univoco per tutti gli dataset
  modifyDatasetQA(
    qaId: number,
    question: string,
    answer: string
  ): Observable<QADto> {
    const body = { qaId, question, answer };
    return this.http.patch<QADto>(`/dataset/qa/${qaId}`, body);
  }

  deleteDatasetQA(qaId: number): Observable<void> {
    return this.http.delete<void>(`/dataset/qa/${qaId}`);
  }

  runTest(dataset: DatasetDto, llmSelected: LlmDto) {
    const payload = {
      dataset: dataset,
      llmSelected: llmSelected,
    };
    return this.http.post<any>('/test', payload);
  }
}
