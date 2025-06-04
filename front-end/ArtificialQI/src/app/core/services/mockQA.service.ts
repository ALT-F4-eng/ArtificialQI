import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//Dto che serve
import { DatasetDto } from '../models/dataset-dto.model';
import { DatasetPageDto } from '../models/datasetpage-dto.model';
import { QADto } from '../models/qa-dto.model';
import { LlmDto } from '../models/llm-dto.model';

export const MOCK_DATASETPAGEQA: DatasetPageDto = {
  page_n: 1,
  qa_list: [
    {
      id: "1",
      question: "Qual è la capitale d'Italia?",
      answer: 'Roma',
    },
    {
      id: "1",
      question: "Chi ha scritto 'La Divina Commedia'?",
      answer: 'Dante Alighieri',
    },
    {
      id: "1",
      question: "Quante regioni ha l'Italia?",
      answer: '20',
    },
    {
      id: "1",
      question: "Che cos'è Angular?",
      answer:
        'Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,Un framework per applicazioni web sviluppato da Google,',
    },
    {
      id: "1",
      question: '',
      answer: '',
    },
  ],
};

export const MOCK_DATASETPAGEQA_2: DatasetPageDto = {
  page_n: 2,
  qa_list: [
    {
      id: "1",
      question: "Qual è il fiume più lungo d'Italia?",
      answer: 'Po',
    },
    {
      id: "1",
      question: "Chi ha dipinto la 'Gioconda'?",
      answer: 'Leonardo da Vinci',
    },
    {
      id: "1",
      question: 'In che anno è iniziata la Seconda Guerra Mondiale?',
      answer: '1939',
    },
    {
      id: "1",
      question: "Che cos'è React?",
      answer:
        'Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,Una libreria JavaScript per costruire interfacce utente,',
    },
    {
      id: "1",
      question: '',
      answer: '',
    },
  ],
};

@Injectable({
  //Angular, registra automaticamente questo servizio come singleton disponibile in tutta l'applicazione.
  providedIn: 'root',
})
export class MockQAService {
  cachedDatasetCaricato: any;
  constructor(private http: HttpClient) {}
  /*private datasetPage: DatasetPageDto = {
    ...MOCK_DATASETPAGEQA, //copia
    qa_list: [...MOCK_DATASETPAGEQA.qa_list],
  }; // Crea una copia mutabile del mock, ... spread operator, serve a copiare o espandere gli elementi, [...] copia o espande un array. ed necessario dichiarare allinterno delle parentesi grafe

  private datasetPage2: DatasetPageDto = {
    ...MOCK_DATASETPAGEQA_2, //copia
    qa_list: [...MOCK_DATASETPAGEQA_2.qa_list],
  };*/

  getDatasetPage(pageindex: number): Observable<DatasetPageDto> {
    // Simulazione di una "chiamata al DB"
    return of(MOCK_DATASETPAGEQA); // Restituisce come Observable, simula una chiamata HTTP
  }
  // test funzionalità pageNavigation
  getDatasetPage2mock(pageindex: number): Observable<DatasetPageDto> {
    // Simulazione di una "chiamata al DB"
    return of(MOCK_DATASETPAGEQA_2); // Restituisce come Observable, simula una chiamata HTTP
  }
  //
  getDatasetPageFiltered(term: string): Observable<QADto[]> {
    // Filtra la lista qa_list dal mock in base al termine cercato
    const filtered = MOCK_DATASETPAGEQA.qa_list.filter(
      (qa) =>
        qa.question.toLowerCase().includes(term.toLowerCase()) ||
        qa.answer.toLowerCase().includes(term.toLowerCase())
    );

    return of(filtered); // Restituisce un Observable di QADto[]
  }
  /*
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
  }*/
  modifyDatasetQA(
    qaId: string,
    question: string,
    answer: string
  ): Observable<QADto> {
    const index = MOCK_DATASETPAGEQA.qa_list.findIndex((qa) => qa.id === qaId);

    if (index !== -1) {
      MOCK_DATASETPAGEQA.qa_list[index] = {
        ...MOCK_DATASETPAGEQA.qa_list[index],
        question,
        answer,
      };

      const updatedQA = MOCK_DATASETPAGEQA.qa_list[index];
      console.log('Modificato con successo:', updatedQA);

      return of(updatedQA); // Simula una risposta HTTP di successo
    } else {
      console.warn(`QA con id ${qaId} non trovato`);
      // Simula un errore come farebbe un HTTP PATCH fallito
      throw new Error(`QA con id ${qaId} non trovato`);
    }
  }

  saveDataset(): void {
    this.saveDatasetPage();
  }
  saveDatasetPage(): void {}

  deleteDatasetQA(qaId: string): Observable<void> {
    const index = MOCK_DATASETPAGEQA.qa_list.findIndex((qa) => qa.id === qaId);

    if (index !== -1) {
      MOCK_DATASETPAGEQA.qa_list.splice(index, 1);
      console.log(`Elemento con ID ${qaId} eliminato con successo.`);
      return of(void 0); // Restituisce Observable<void>
    } else {
      console.warn(`Elemento con ID ${qaId} non trovato.`);
      return throwError(() => new Error(`QA con ID ${qaId} non trovato`));
    }
  }
  /*
  // fa un aggiornamento
  updateDatasetPage(pageIndex:number): DatasetPageDto {
    return this.datasetPage
  }
  
  addQA(question: string, answer: string){
    //verrà salvata all'interno del db poi all'interno di dataset content page farà una updateDatasetPage
  }

  createDataset(dataset: DatasetDto): Observable<{ id: number }> {
    return this.http.post<{ id: number }>('/api/dataset', dataset);
  }
  updateDataset(id: number, dataset: DatasetDto): Observable<void> {
    return this.http.put<void>(`/api/dataset/${id}`, dataset);
  }*/

  //altrimenti c'è possibilità che id vengono ripetuti
  //mock della funzionalità di generazione di id delle coppie di domande e risposte
  generateUniqueId(): void {}
}
