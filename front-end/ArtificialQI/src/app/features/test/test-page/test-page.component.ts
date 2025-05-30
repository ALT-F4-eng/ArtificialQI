import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TestService } from '../../../core/services/test.service';
import { TestDto } from '../../../core/models/test-dto.model';
import { TestPageDto } from '../../../core/models/testpage-dto.model';
import { MOCK_TEST_PAGE } from '../../../core/services/mocktest.service';
import { TestResultDto } from '../../../core/models/testresult-dto.model';

import { MessageBoxComponent } from '../../../shared/error-message/message.component';
import { TestIndexComponent } from '../test-index/test-index.component';
import { TestPageViewComponent } from '../test-page-view/test-page-view.component';
import { DatasetNameDialogComponent } from '../../../shared/components/dataset-name-dialog/dataset-name-dialog.component';
import { TestselectionListComponent } from '../testselection-list/testselection-list.component';


@Component({
  selector: 'app-test-page',
  standalone:true,
  imports: [
    CommonModule,
    RouterModule,
    TestIndexComponent,
    MatDialogModule,
    TestPageViewComponent,
    MessageBoxComponent,
  ],
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css'],
})
export class TestPageComponent implements OnInit, OnDestroy {
  test?: TestDto;
  testPage: TestPageDto = MOCK_TEST_PAGE;
  results: TestResultDto[] = [];
  errorMessage: string | null = null;
  resultMessage = '';
  showMessage = false;
  messageType: 'success' | 'error' = 'success';

  private destroy$ = new Subject<void>();

  constructor(
    private testService: TestService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const testFromState = history.state.test;

    if (
      this.testService.cachedTestCaricato &&
      testFromState &&
      this.testService.cachedTestCaricato !== testFromState
    ) {
      this.testService.cachedTestCaricato = testFromState;
      console.log("sovrascrivo");
    }

    if (!this.testService.cachedTestCaricato) {
      this.testService.cachedTestCaricato = testFromState;
      console.log("assegnazione");
    }

    const cachedTest = this.testService.cachedTestCaricato;

    if (cachedTest && cachedTest.id) {
      this.testService.getTest(cachedTest.id).pipe(takeUntil(this.destroy$)).subscribe({
        next: (testData) => {
          this.test = testData;
          this.loadResults();
        },
        error: () => {
          this.errorMessage = 'Errore nel caricamento del test.';
        }
      });
    } else {
      this.errorMessage = 'Nessun test disponibile.';
    }
  }

  loadResults() {
    if (!this.test) return;

    this.testService.getAllResults(this.test.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.results = data;
      },
      error: () => {
        this.errorMessage = 'Errore nel caricamento dei risultati.';
      },
    });
  }

  saveTest() {
    if (!this.test) return;

    const dialogRef = this.dialog.open(DatasetNameDialogComponent, {
      data: {
        title: 'Salva il test con un nome',
        name: this.test.name || ''
      }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((newName: string | null) => {
      if (newName && this.test) {
        this.test.name = newName;
        this.testService.saveTest(this.test).pipe(takeUntil(this.destroy$)).subscribe({
          next: () => {
            this.resultMessage = 'Test salvato con successo!';
            this.messageType = 'success';
            this.showMessage = true;
          },
          error: () => {
            this.resultMessage = 'Errore nel salvataggio del test.';
            this.messageType = 'error';
            this.showMessage = true;
          }
        });
      }
    });
  }

  compareTest() {
    if (!this.test) return;

    this.testService.getAllTests().pipe(takeUntil(this.destroy$)).subscribe({
      next: (testList) => {
        const filteredTests = testList.filter(t =>
          t.id !== this.test!.id && t.dataset_id === this.test!.dataset_id
        );

        const dialogRef = this.dialog.open(TestselectionListComponent, {
          data: {
            list: filteredTests,
            title: 'Seleziona un test dello stesso dataset'
          },
          width: '600px'
        });

        dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((selectedTest: TestDto | undefined) => {
          if (selectedTest) {
            alert(`Hai selezionato: ${selectedTest.name}`);
            // Qui puoi implementare la logica di confronto
          }
        });
      },
      error: () => {
        this.errorMessage = 'Errore nel caricamento della lista dei test.';
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
