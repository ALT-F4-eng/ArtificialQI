import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QADto } from '../models/qa-dto.model';
import { DatasetDto } from '../models/dataset-dto.model';
import { LlmDto } from '../models/llm-dto.model';

@Injectable({
  providedIn: 'root',
})
export class DatasetService {
  cachedDatasetCaricato: any;
  constructor(private http: HttpClient) {}
  //rinomina il dataset
  getAllDatasets(): Observable<DatasetDto[]> {
    return this.http.get<DatasetDto[]>('/dataset');
  }
  // aggiorno la lista ottenuta dal getAllDatasets() e poi faccio il funzione sottostante
  renameDataset(datasetId: number, newName: string): Observable<DatasetDto> {
    const payload = { name: newName };
    return this.http.patch<DatasetDto>(`/dataset/${datasetId}`, payload);//aggiorna i campi dati parzialmente
  }

  // aggiorno la lista ottenuta dal getAllDatasets() e poi faccio il funzione sottostante
  cloneDataset(datasetId: number): Observable<DatasetDto> {
    return this.http.post<DatasetDto>(`/dataset/${datasetId}/clone`, {});
  }

  // cancello il dataset dalla lista ottenuta dal getAllDatasets()  e poi chiamo il funzione sottostante
  deleteDataset(datasetId: number): Observable<void> {
    return this.http.delete<void>(`/dataset/${datasetId}`);
  }

  //carico dataset scelto mandato il suo id al db
  loadDataset(datasetId: number): Observable<DatasetDto> {
    return this.http.get<DatasetDto>(`/dataset/${datasetId}`);
  }

  //aggiorno la lista attuale ottenuta dal getAllDatasets() e poi salvo nel db i suoi dati
  createDatasetFromJSONFile(
    dataset: DatasetDto,
    qa_list: QADto[]
  ): Observable<any> {
    const payload = {
      dataset: dataset,
      qa_list: qa_list,
    };
    return this.http.post<any>('/dataset', payload);
  }

  //aggiorno il dataset creato dal pulsant di creazione, e poi salvo nel db
  saveDatasetFromCreate(
    dataset: DatasetDto,
    qa_list: QADto[]
  ): Observable<any> {
    // ci ritorna un datasetDto poi in base quello si puo fare una richiesta di caricamento della pagina 1
    const payload = {
      dataset: dataset,
      qa_list: qa_list,
    };
    return this.http.post<any>('/dataset', payload);
  }
  // da chiedere a Francesco
  createWorkingCopy() {}

  updateDatasetFromWorkingCopyThenDeleteWorkingCopy() {}

 modifyDatasetQA(datasetId: number, qa: QADto): Observable<QADto> {
  return this.http.patch<QADto>(`/dataset/${datasetId}/qa/${qa.id}`, qa);
}

  deleteDatasetQA(datasetId: number, qaId: number): Observable<void> {
  return this.http.delete<void>(`/dataset/${datasetId}/qa/${qaId}`);
}

  //addQA da chiedere a Francesco per precisazione
  addQA() {}

  //caso nel cui utente crea un dataset da zero senza salvarlo in db
  runTestDatasetTemporaryFromDatasetPage(
    dataset: DatasetDto,
    qa_list: QADto[],
    llmSelected: LlmDto
  ) {
    const payload = {
      dataset: dataset,
      qa_list: qa_list,
      llmSelected: llmSelected,
    };
    return this.http.post<any>('/test', payload);
  }

  //negli altri casi, (working copy oppure dataset salvato, si puo trovarlo all'interno del db) mandare le informazioni necessari per eseguire, working copy è salvato all'interno del db
  runTestDatasetSaveFromDatasetPage(dataset: DatasetDto, llmSelected: LlmDto) {
    const payload = {
      dataset: dataset,
      llmSelected: llmSelected,
    };
    return this.http.post<any>('/test', payload);
  }
  
  removeDatasetFromCache(id: number): void {

  }
  
}


