import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestDto } from '../../../core/models/test-dto.model';
import { TestResultDto } from '../../../core/models/testresult-dto.model';
import { TestService } from '../../../core/services/test.service';
import { TestIndexComponent } from '../test-index/test-index.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TestNameDialogComponent } from '../test-name-dialog/test-name-dialog.component';
import { TestPageViewComponent } from '../test-page-view/test-page-view.component';
import { ActivatedRoute } from '@angular/router';
import { TestPageDto } from '../../../core/models/testpage-dto.model';



@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TestIndexComponent,
    MatDialogModule,
    TestPageViewComponent
  ],
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {
  @Input() test?: TestDto;

  MOCK_TEST_PAGE: TestPageDto[] = [];
  results: TestResultDto[] = [];
  errorMessage: string | null = null;

  constructor(private testService: TestService, private dialog: MatDialog, private route: ActivatedRoute) {}

  ngOnInit() {
  const idParam = this.route.snapshot.paramMap.get('id');
  const testid = idParam ? +idParam : 1;

  this.testService.getTest(testid).subscribe({
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
    this.testService.getAllResults(this.test.id).subscribe({
      next: (data) => {
        this.results = data;
      },
      error: () => {
        this.errorMessage = 'Errore nel caricamento dei risultati.';
      }
    });
  }

  saveTest() {
  const dialogRef = this.dialog.open(TestNameDialogComponent);

  dialogRef.afterClosed().subscribe((newName: string | null) => {
    if (newName && this.test) {
      this.test.name = newName;
      this.testService.saveTest(this.test).subscribe({
        next: () => {
          alert('Test salvato');
          this.test!.tmp = false;
        },
        error: () => {
          this.errorMessage = 'Errore nel salvataggio del test.';
        }
      });
    }
  });
  }

  compareTest() {
    // Da implementare con TestSelectionComparison
    alert('Funzione di confronto da implementare');
  }
}
