import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  inviaMessaggio(nome: string): Observable<{ risposta: string }> {
    const params = new HttpParams().set('nome', nome);
    return this.http.get<{ risposta: string }>(`${this.baseUrl}/messaggio`, { params });
  }
}

@Injectable({
  providedIn: 'root'
})
export class DatasetTmpService {
  private baseUrl = 'http://localhost:5000/datasets';

  constructor(private http: HttpClient) {}

  creaDatasetTmp(): Observable<{ risposta: string }> {
  return this.http.post<{ risposta: string }>(this.baseUrl, null);
}
}