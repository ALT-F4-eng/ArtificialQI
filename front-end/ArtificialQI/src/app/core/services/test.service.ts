import { Injectable } from '@angular/core';
import { TestDto } from '../models/test-dto.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private baseUrl = 'http://localhost:5000';
  cachedTestCaricato: any;
  constructor(private http: HttpClient) {}

  saveTest(test: TestDto): Observable<TestDto> {
    return this.http.post<TestDto>('/test', test);
  }

  compareTest(test1: TestDto, test2: TestDto): Observable<any> {
    return this.http.post<any>('/test/compare', { test1, test2 });
  }

  getAllResults(testID: string): Observable<any[]> {
    return this.http.get<any[]>(`/test/${testID}/results`);
  }
  //forse va cancellata
  getAllResultsCompare(testID: number) {
    return this.http.get<any[]>(`/test/${testID}/results`);
  }

  getAllTests(): Observable<TestDto[]> {
    return this.http.get<TestDto[]>(`${this.baseUrl}/tests`);
  }

  /* forse basterebbe il run di test
  getTestByID(ID: string): Observable<TestDto> {
    return this.http.get<TestDto>(`${this.baseUrl}/tests/${ID}`);
  }
  */
  getTest(id:string): Observable<TestDto> {
    return this.http.get<TestDto>(`${this.baseUrl}/tests/${id}`);
  }

  deleteTest(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tests/${id}`);
  }

  renameTest(ID: string, newName: string): Observable<TestDto> {
    return this.http.put<TestDto>(`/testlist/${ID}`, { name: newName });
  } //aggiorna tutti campi dati
  //
}
