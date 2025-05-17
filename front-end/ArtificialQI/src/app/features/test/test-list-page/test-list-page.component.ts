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
    CommonModule
  ],
  templateUrl: './test-list-page.component.html',
  styleUrl: './test-list-page.component.css'
})
export class TestListPageComponent {
  showConfirm = false;
  confirmMessage = '';
  deletingId?: number;
  mockTests: TestDto[] = [];
  filteredTests: TestDto[] = [];

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
    console.log(`Tentativo di rinominare test con ID=${test.ID} in "${newName}"`);

    this.testService.renameTest(test.ID, newName).subscribe({
      next: () => {
        test.name = newName;
        console.log(`Test con ID=${test.ID} rinominato con successo`);
      },
      error: (err) => {
        console.error(`Errore durante la rinomina del test ID=${test.ID}:`, err);
      }
    });
  }

  testDeleted(index: number) {
    const testToDelete = this.filteredTests[index];
    console.log('Tentativo di eliminare test:', testToDelete);

    this.testService.deleteTest(testToDelete.ID).subscribe({
      next: () => {
        this.mockTests = this.mockTests.filter(t => t.ID !== testToDelete.ID);
        this.filteredTests = this.filteredTests.filter(t => t.ID !== testToDelete.ID);
        console.log(`Test con ID=${testToDelete.ID} eliminato con successo`);
      },
      error: (err) => {
        console.error(`Errore durante l'eliminazione del test ID=${testToDelete.ID}:`, err);
      }
    });
  }

  onTestLoaded(test: TestDto) {
    console.log('Navigazione verso /test con test:', test);
    this.router.navigate(['/test'], {
      state: { test: test },
    });
  }

  onTestDeleteRequest(id: number) {
    this.deletingId = id;
    this.confirmMessage = 'Sei sicuro di voler eliminare questo Test?';
    this.showConfirm = true;
    console.log('Richiesta di conferma cancellazione per ID:', id);
  }

  onTestDeleteConfirmed() {
    if (this.deletingId !== undefined) {
      console.log('Conferma di eliminazione ricevuta per ID:', this.deletingId);

      this.testService.deleteTest(this.deletingId).subscribe({
        next: () => {
          this.mockTests = this.mockTests.filter(t => t.ID !== this.deletingId);
          this.filteredTests = this.filteredTests.filter(t => t.ID !== this.deletingId);
          this.showConfirm = false;
          console.log(`Test con ID ${this.deletingId} eliminato (da conferma)`);
          this.deletingId = undefined;
        },
        error: (err) => {
          console.error(`Errore durante l'eliminazione da conferma ID=${this.deletingId}:`, err);
        }
      });
    }
  }

  onTestDeleteCanceled() {
    console.log('Eliminazione test annullata');
    this.showConfirm = false;
    this.deletingId = undefined;
    this.confirmMessage = '';
  }
}
