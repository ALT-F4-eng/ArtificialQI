import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestDto } from '../../../core/models/test-dto.model';
import { resultDto } from '../../../core/models/result-dto.model';
import { TestService } from '../../../core/services/test.service';
import { ResultListViewComponent } from '../result-list-view/result-list-view.component';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ResultListViewComponent
    // In futuro: MessageComponent, TestIndex, TestNameDialog, TestSelectionComparison, etc.
  ],
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {
  @Input() test?: TestDto;

  results: resultDto[] = [];
  errorMessage: string | null = null;

  constructor(private testService: TestService) {}

  ngOnInit() {
    const testId = this.test?.ID || 1; // fallback mock
    this.testService.getTest(testId).subscribe({
      next: (testData) => {
        this.test = testData;
        this.loadResults();
      },
      error: () => {
        this.errorMessage = 'Errore nel caricamento del test.';
      }
    });
  }

  loadResults() {
    if (!this.test) return;
    this.testService.getAllResults(this.test.ID).subscribe({
      next: (data) => {
        this.results = data;
      },
      error: () => {
        this.errorMessage = 'Errore nel caricamento dei risultati.';
      }
    });
  }

  saveTest() {
    if (!this.test) return;
    this.testService.saveTest(this.test).subscribe({
      next: () => {
        alert('Test salvato');
      },
      error: () => {
        this.errorMessage = 'Errore nel salvataggio del test.';
      }
    });
  }

  compareTest() {
    // Da implementare con TestSelectionComparison
    alert('Funzione di confronto da implementare');
  }
}
