import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestDto } from '../../../core/models/test-dto.model';
import { TestResultDto } from '../../../core/models/testresult-dto.model';
import { TestService } from '../../../core/services/test.service';
import { TestIndexComponent } from '../test-index/test-index.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DatasetNameDialogComponent } from '../../../shared/components/dataset-name-dialog/dataset-name-dialog.component';
import { TestPageViewComponent } from '../test-page-view/test-page-view.component';
import { TestPageDto } from '../../../core/models/testpage-dto.model';
import { MOCK_TEST_PAGE } from '../../../core/services/mocktest.service';
import { TestselectionListComponent } from '../testselection-list/testselection-list.component';
import { MessageBoxComponent } from '../../../shared/error-message/message.component';

@Component({
  selector: 'app-test-page',
  standalone: true,
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
export class TestPageComponent implements OnInit {
  test?: TestDto;
  resultMessage = '';
  showMessage = false;
  messageType: 'success' | 'error' = 'success';


  testPage: TestPageDto = MOCK_TEST_PAGE;
  results: TestResultDto[] = [];
  errorMessage: string | null = null;

  constructor(private testService: TestService, private dialog: MatDialog) {}

  ngOnInit() {
    //se non esiste un test caricato lo salvo e carico, altrimenti significherebbe che avevo gia caricato basta caricarlo di nuovo, se utente vuole sovrascriverlo overro caricare un'altra test visualizzerà il messaggio di sovrascrizzione
    // e se l'utente arriva direttamente dal menu history.state.test è undefined
    if (
      this.testService.cachedTestCaricato &&
      history.state.test && // questa serve per capire se l'utente ha clicato sul menu, se si è undefined, se arriva dalla carica allora è true
      this.testService.cachedTestCaricato !== history.state.test
    ) {
      this.testService.cachedTestCaricato = history.state.test;//sovrascrizione
      console.log("sovrascrivo");
    }
    // non è presente test caricato precendemente,allora lo salvo
    if (!this.testService.cachedTestCaricato) {
      this.testService.cachedTestCaricato = history.state.test;
      console.log("assegnazione");//verrà fatta solo all'inizio 
    }
    //load
    this.test = this.testService.cachedTestCaricato;
    this.loadResults();
  }

  loadResults() {
    if (!this.test) return;
    this.testService.getAllResults(this.test.id).subscribe({
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

  dialogRef.afterClosed().subscribe((newName: string | null) => {
    if (newName && this.test) {
      this.test.name = newName;
      this.testService.saveTest(this.test).subscribe({
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

  this.testService.getAllTests().subscribe({
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

      dialogRef.afterClosed().subscribe((selectedTest: TestDto | undefined) => {
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


}
