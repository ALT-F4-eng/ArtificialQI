import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { QADto } from '../models/qa-dto.model';
import { DatasetDto } from '../models/dataset-dto.model';

@Injectable({
  //Angular, registra automaticamente questo servizio come singleton disponibile in tutta l'applicazione.
  providedIn: 'root',
})
export class DatasetService {
  private baseUrl = 'http://localhost:5000';

  //datasets: DatasetDto[] = []; // You can also use MOCK_DATASETS if you want to initialize with mock data
  constructor(private http: HttpClient) {}
  //rinomina il dataset

 getAllDatasets(): Observable<DatasetDto[]> {
  return this.http.get<{ datasets: any[] }>(`${this.baseUrl}/datasets`).pipe(
    map(response => response.datasets.map(dataset => ({
      ...dataset,
      creation_date: new Date(dataset.creation_date)
    })))
  );
}
  createTemporaryDataset(): Observable<DatasetDto> {
    return this.http.post<DatasetDto>(`${this.baseUrl}/create/dataset`, {});
  }

  deleteTemporaryDataset(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteDatasetTemporary`);
  }

  deleteDatasetById(dataset_id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteDataset/${dataset_id}`);
  }

  renameDatasetById(dataset_id: string, newName: string): Observable<any> {
    const body = { name: newName };
    return this.http.put(`${this.baseUrl}/renameDataset/${dataset_id}`, body);
  }
  
  cloneDatasetById(dataset_id: string): Observable<DatasetDto> {
    return this.http.post<DatasetDto>(`${this.baseUrl}/cloneDataset/${dataset_id}`, {});
  }

  createWorkingCopyTemporary(dataset_id:string):Observable<DatasetDto> {
    return this.http.post<DatasetDto>(`${this.baseUrl}/createWorkingCopyTemporary/${dataset_id}`, {});
  }

  
  

  /*
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

  removeDatasetFromCache(id: number): void {}*/
}
