import { Injectable } from '@angular/core';
import { TestDto } from '../models/test-dto.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class TestService {
    constructor(private http: HttpClient) {}



    saveTest(test: TestDto): Observable<TestDto> {
        return this.http.post<TestDto>('/test', test);
    }

    compareTest(test1: TestDto, test2: TestDto): Observable<any> {
        return this.http.post<any>('/test/compare', { test1, test2 });
    }

    getAllResults(testID: number): Observable<any[]> {
        return this.http.get<any[]>(`/test/${testID}/results`);
    }

    getAllTests(): Observable<TestDto[]> {
        return this.http.get<TestDto[]>('/testlist');
    }
    getTest(ID: number): Observable<TestDto> {
        return this.http.get<TestDto>(`/testlist/${ID}`);
    }
    deleteTest(ID: number): Observable<void> {
        return this.http.delete<void>(`/testlist/${ID}`);
    }
    renameTest(ID: number, newName: string): Observable<TestDto> {
        return this.http.put<TestDto>(`/testlist/${ID}`, { name: newName });
    }
}