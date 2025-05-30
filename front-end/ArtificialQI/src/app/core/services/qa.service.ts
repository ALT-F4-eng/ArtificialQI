import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { QADto } from '../models/qa-dto.model';
import { LlmDto } from '../models/llm-dto.model';

import { DatasetDto } from '../models/dataset-dto.model';
import { DatasetPageDto } from '../models/datasetpage-dto.model';

export const MOCK_DATASET: DatasetDto = {
  id: '1e7b9c8a-1a2b-4c3d-8e9f-0a1b2c3d4e5f',
  name: 'Dataset Alpha',
  last_mod: new Date('2025-05-01'),
  creation: new Date('2025-04-01'),
  origin_id: 0,
  tmp: false,
  max_page: 12,
  element_n: 120,
};

export const MOCK_DATASETPAGEQA: DatasetPageDto = {
  page_n: 1,
  qa_list: [
    {
      id: 1,
      question: "Qual è la capitale d'Italia?",
      answer: 'Roma',
    },
    {
      id: 2,
      question: "Chi ha scritto 'La Divina Commedia'?",
      answer: 'Dante Alighieri',
    },
    {
      id: 3,
      question: "Quante regioni ha l'Italia?",
      answer: '20',
    },
    {
      id: 4,
      question: "Che cos'è Angular?",
      answer:
        'Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,',
    },
    {
      id: 5,
      question: '',
      answer: '',
    },
  ],
};

export const MOCK_DATASETPAGEQA_2: DatasetPageDto = {
  page_n: 2,
  qa_list: [
    {
      id: 6,
      question: "Qual è il fiume più lungo d'Italia?",
      answer: 'Po',
    },
    {
      id: 7,
      question: "Chi ha dipinto la 'Gioconda'?",
      answer: 'Leonardo da Vinci',
    },
    {
      id: 8,
      question: 'In che anno è iniziata la Seconda Guerra Mondiale?',
      answer: '1939',
    },
    {
      id: 9,
      question: "Che cos'è React?",
      answer:
        'Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,',
    },
    {
      id: 10,
      question: '',
      answer: '',
    },
  ],
};
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
