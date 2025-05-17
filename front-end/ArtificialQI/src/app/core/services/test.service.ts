import { Injectable } from '@angular/core';
import { TestDto } from '../models/test-dto.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class TestService {
    constructor(private http: HttpClient) {}

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