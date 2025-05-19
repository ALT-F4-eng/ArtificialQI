import { Injectable } from '@angular/core';

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

@Injectable({
  //Angular, registra automaticamente questo servizio come singleton disponibile in tutta l'applicazione.
  providedIn: 'root',
})
export class QAService {
  constructor() {}
  private dataset: DatasetDto = { ...MOCK_DATASET };
  private datasetPage: DatasetPageDto = {
    ...MOCK_DATASETPAGEQA, //copia
    qa_list: [...MOCK_DATASETPAGEQA.qa_list],
  }; // Crea una copia mutabile del mock, ... spread operator, serve a copiare o espandere gli elementi, [...] copia o espande un array. ed necessario dichiarare allinterno delle parentesi grafe

  getDataset(): DatasetDto {
    return this.dataset;
  }

  getDatasetPage(): DatasetPageDto {
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
      console.log('modificato con successo')// si potrebbe mandare una notifica di successo
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

  //altrimenti c'è possibilità che id vengono ripetuti
  generateUniqueId(): void {}

}
