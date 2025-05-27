import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestService } from '../../../core/services/test.service';
import { TestDto } from '../../../core/models/test-dto.model';
import { TestResultDto } from '../../../core/models/testresult-dto.model';
import { TestPageDto } from '../../../core/models/testpage-dto.model';
import { MOCK_TEST_PAGE } from '../../../core/services/mocktest.service';
import { MOCK_TEST_PAGE_COMPARE } from '../../../core/services/mocktest.service';
import { ComparisonIndexComponent } from '../comparison-index/comparison-index.component';
import { ComparisonPageViewComponent } from '../comparison-page-view/comparison-page-view.component';
@Component({
  selector: 'app-test-comparison-page',
  standalone: true,
  imports: [
    CommonModule,
    ComparisonIndexComponent,
    ComparisonPageViewComponent,
  ],
  templateUrl: './test-comparison-page.component.html',
  styleUrl: './test-comparison-page.component.css',
})
export class TestComparisonPageComponent implements OnInit {
  //due test che mi servono verrà passata dal test page
  testOrigin_TestComparison!: TestDto;
  testCompared_TestComparison!: TestDto;

  testPageOrigin_TestComparison: TestPageDto = MOCK_TEST_PAGE;
  testPageCompare_TestComparison: TestPageDto = MOCK_TEST_PAGE_COMPARE;

  resultsOrigin_TestComparison: TestResultDto[] = [];
  resultsCompared_TestComparison: TestResultDto[] = [];
  errorMessage: string | null = null;

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    //due dati che verano passati dalla pagina test-page.component.ts
    this.testOrigin_TestComparison = history.state.testOrigin;
    this.testCompared_TestComparison = history.state.testCompared;
    this.loadResults();
  }

  loadResults() {
    /*
    const origin = this.testOrigin_TestComparison;
    const compared = this.testCompared_TestComparison;
    */
    // id da cambiare
    this.testService.getAllResults(1).subscribe({
      next: (data) => {
        this.resultsOrigin_TestComparison = data;
        console.log(
          'resultsOrigin_TestComparison:',
          this.resultsOrigin_TestComparison
        );
        this.testService.getAllResultsCompare(2).subscribe({
          next: (data) => {
            this.resultsCompared_TestComparison = data;
            console.log(
              'resultsCompared_TestComparison:',
              this.resultsCompared_TestComparison
            );
          },
          error: () => {
            this.errorMessage =
              'Errore nel caricamento dei risultati di testCompared.';
          },
        });
      },
      error: () => {
        this.errorMessage =
          'Errore nel caricamento dei risultati di testOrigin.';
      },
    });
  }
}
