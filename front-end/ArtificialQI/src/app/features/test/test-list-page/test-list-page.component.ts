import { Component } from '@angular/core';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { TestListViewComponent } from '../../../features/test/test-list-view/test-list-view.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { TestService } from '../../../core/services/test.service';
import { TestDto } from '../../../core/models/test-dto.model';
import { RouterModule, Router } from '@angular/router';
import { ConfirmComponent } from '../../../core/components/confirm/confirm.component';
import { CommonModule } from '@angular/common';
import { MessageBoxComponent } from '../../../shared/error-message/message.component';

@Component({
  selector: 'app-test-list-page',
  standalone: true,
  imports: [
    SearchBarComponent,
    TestListViewComponent,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule,
    ConfirmComponent,
    CommonModule,
    MessageBoxComponent,
  ],
  templateUrl: './test-list-page.component.html',
  styleUrl: './test-list-page.component.css',
})
export class TestListPageComponent {
  deletingid?: number;
  mockTests: TestDto[] = [];
  filteredTests: TestDto[] = [];
  showMessage = true;
  resultMessage = '';
  messageType: 'success' | 'error' = 'error';

  constructor(private testService: TestService, private router: Router) {}

  ngOnInit(): void {
    this.testService.getAllTests().subscribe((tests: TestDto[]) => {
      console.log('Test ricevuti da getAllTests():', tests);
      this.mockTests = tests;
      this.filteredTests = [...this.mockTests];
    });
  }

  handleSearch(term: string) {
    const normalized = term.toLowerCase();
    this.filteredTests = this.mockTests.filter((test) =>
      test.name.toLowerCase().includes(normalized)
    );
    console.log('Risultato della ricerca:', this.filteredTests);
  }

  renameTest(index: number, newName: string) {
    const test = this.filteredTests[index];
    console.log(
      `Tentativo di rinominare test con id=${test.id} in "${newName}"`
    );

    this.testService.renameTest(test.id, newName).subscribe({
      next: () => {
        test.name = newName;
        console.log(`Test con id=${test.id} rinominato con successo`);

        // ✅ Mostra messaggio di successo
        this.resultMessage = 'Test rinominato con successo!';
        this.messageType = 'success';
        this.showMessage = true;
      },
      error: (err) => {
        console.error(
          `Errore durante la rinomina del test id=${test.id}:`,
          err
        );

        // ❌ Mostra messaggio di errore
        this.resultMessage = 'Errore durante la rinomina del test.';
        this.messageType = 'error';
        this.showMessage = true;
      },
    });
  }

  loadingTestId?: number;
  showLoadConfirm = false;
  showLoadMessage = '';

  onTestLoadRequest(test: TestDto) {
    this.loadingTestId = test.id;
    if (!this.testService.cachedTestCaricato) {
      this.showLoadMessage = `Sei sicuro di voler caricare il test "${test.name}"?`;
      console.log('Richiesta di conferma caricamento per test:', test);
      this.showLoadConfirm = true;
    } else if (this.testService.cachedTestCaricato.id != test.id) {
      this.showLoadMessage = `Sei sicuro di sovrascrivere il test caricato"${this.testService.cachedTestCaricato.name}" attualmente?`;
      console.log('Richiesta di conferma caricamento per test:', test);
      this.showLoadConfirm = true;
    } else if (this.testService.cachedTestCaricato.id == test.id) {
      // se ripreme sullo stesso bottone di carica ed è stata caricata precedentemente allora carica subito
      this.onTestLoadConfirmed();
    }
  }

  onTestLoadConfirmed() {
    if (this.loadingTestId !== undefined) {
      const test = this.mockTests.find((t) => t.id === this.loadingTestId);
      if (test) {
        console.log('Navigazione verso /test con test:', test);
        this.router.navigate(['/test', test.id], {
          state: { test: test },
        });
      }
      this.showLoadConfirm = false;
      this.loadingTestId = undefined;
      this.showLoadMessage = '';
    }
  }

  onTestLoadCanceled() {
    console.log('Caricamento test annullato');
    this.showLoadConfirm = false;
    this.loadingTestId = undefined;
    this.showLoadMessage = '';
  }

  showDeleteConfirm = false;
  showDeleteMessage = '';

  onTestDeleteRequest(id: number) {
    this.deletingid = id;
    this.showDeleteMessage = 'Sei sicuro di voler eliminare questo Test?';
    this.showDeleteConfirm = true;
    console.log('Richiesta di conferma cancellazione per id:', id);
  }

  onTestDeleteConfirmed() {
    if (this.deletingid !== undefined) {
      console.log('Conferma di eliminazione ricevuta per id:', this.deletingid);

      this.testService.deleteTest(this.deletingid).subscribe({
        next: () => {
          this.mockTests = this.mockTests.filter(
            (t) => t.id !== this.deletingid
          );
          this.filteredTests = this.filteredTests.filter(
            (t) => t.id !== this.deletingid
          );

          this.resultMessage = 'Test eliminato con successo!';
          this.messageType = 'success';
          this.showMessage = true;

          this.showDeleteConfirm = false;
          this.deletingid = undefined;
          console.log('Messaggio da mostrare:', this.resultMessage);
        },
        error: (err) => {
          console.error(
            `Errore durante l'eliminazione da conferma id=${this.deletingid}:`,
            err
          );
          this.resultMessage = "Errore durante l'eliminazione del test.";
          this.messageType = 'error';
          this.showMessage = true;
          this.showDeleteConfirm = false;
          this.deletingid = undefined;
        },
      });
    }
  }

  onTestDeleteCanceled() {
    console.log('Eliminazione test annullata');
    this.showDeleteConfirm = false;
    this.deletingid = undefined;
    this.showDeleteMessage = '';
  }

  onCloseMessage() {
    this.showMessage = false;
    this.resultMessage = '';
    this.messageType = 'error';
  }
}
