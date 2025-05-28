import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { QADto } from '../models/qa-dto.model';
import { DatasetDto } from '../models/dataset-dto.model';

@Injectable({
  providedIn: 'root',
})
export class DatasetService {
  constructor(private http: HttpClient) {}
  //rinomina il dataset

  getAllDatasets(): Observable<DatasetDto[]> {
    return this.http.get<DatasetDto[]>('/dataset');
  }

  // aggiorno la lista ottenuta dal getAllDatasets() e poi faccio il funzione sottostante
  renameDataset(datasetId: number, newName: string): Observable<DatasetDto> {
    const payload = { name: newName };
    return this.http.patch<DatasetDto>(`/dataset/${datasetId}`, payload); //aggiorna i campi dati parzialmente
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

  removeDatasetFromCache(id: number): void {}
}
