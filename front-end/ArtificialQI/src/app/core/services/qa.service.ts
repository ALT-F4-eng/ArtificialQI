import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//Dto che serve
import { DatasetDto } from '../models/dataset-dto.model';
import { DatasetPageDto } from '../models/datasetpage-dto.model';

export const MOCK_DATASET: DatasetDto = {
  id: 1,
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
  //Angular, registra automaticamente questo servizio come singleton disponibile in tutta l'applicazione.
  providedIn: 'root',
})
export class QAService {
  constructor(private http: HttpClient) {}
  private dataset: DatasetDto = { ...MOCK_DATASET };
  private datasetPage: DatasetPageDto = {
    ...MOCK_DATASETPAGEQA, //copia
    qa_list: [...MOCK_DATASETPAGEQA.qa_list],
  }; // Crea una copia mutabile del mock, ... spread operator, serve a copiare o espandere gli elementi, [...] copia o espande un array. ed necessario dichiarare allinterno delle parentesi grafe

  private datasetPage2: DatasetPageDto = {
    ...MOCK_DATASETPAGEQA_2, //copia
    qa_list: [...MOCK_DATASETPAGEQA_2.qa_list],
  };

  getDataset(): DatasetDto {
    return this.dataset;
  }

  getDatasetPage(pageindex: number): DatasetPageDto {
    return this.datasetPage;
    // si fa una chiamata al db con pageindex poi viene restituito il risultato
  }
  // test funzionalità pageNavigation
  getDatasetPage2mock(pageindex: number): DatasetPageDto {
    return this.datasetPage2;
  }
  
  getDatasetPageFiltered(term:string): DatasetPageDto{
    return this.datasetPage;
  }

  // Metodo per rinominare un dataset
  modifyDatasetPage(id: number, newQuestion: string, newAnswer: string): void {
    const index = this.datasetPage.qa_list.findIndex((qa) => qa.id === id);

    if (index !== -1) {
      this.datasetPage.qa_list[index] = {
        ...this.datasetPage.qa_list[index], // preserva l'id e altri campi futuri
        question: newQuestion,
        answer: newAnswer,
      };
      console.log('modificato con successo'); // si potrebbe mandare una notifica di successo
    } else {
      console.warn(`QA con id ${id} non trovato`);
    }
  }
  deleteQA(id: number): void {
    const index = this.datasetPage.qa_list.findIndex((qa) => qa.id === id);
    if (index !== -1) {
      this.datasetPage.qa_list.splice(index, 1);
      console.log(`Elemento con ID ${id} eliminato con successo.`);
    } else {
      console.warn(`Elemento con ID ${id} non trovato.`);
    }
  }
  // fa un aggiornamento
  updateDatasetPage(pageIndex:number): DatasetPageDto {
    return this.datasetPage
  }

  createDataset(dataset: DatasetDto): Observable<{ id: number }> {
    return this.http.post<{ id: number }>('/api/dataset', dataset);
  }
/*
  updateDataset(id: number, dataset: DatasetDto): Observable<void> {
    return this.http.put<void>(`/api/dataset/${id}`, dataset);
  }*/

  //altrimenti c'è possibilità che id vengono ripetuti
  //mock della funzionalità di generazione di id delle coppie di domande e risposte
  generateUniqueId(): void {}
}
