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
    ConfirmComponent
  ],
  templateUrl: './test-list-page.component.html',
  styleUrl: './test-list-page.component.css'
})
export class TestListPageComponent implements OnInit {
  showConfirm: false;
  mockTests: TestDto[] = [];
  filteredTests: TestDto[] = [];
  constructor(private testService: TestService, private router: Router) {}
  ngOnInit(): void {
    this.testService.getTests().subscribe((tests: TestDto[]) => {
      this.mockTests = tests;
      this.filteredTests = [...this.mockTests]; // mostra tutti inizialmente
    });
  }
  handleSearch(term: string) {
    const normalized = term.toLowerCase();
    this.filteredTests = this.mockTests.filter((test) =>
      test.name.toLowerCase().includes(normalized)
    );
  }
  renameTest(index: number, newName: string) {
    // Rinomina il test chiamando il servizio
    this.testService.renameTest(index, newName);
    // Aggiorna la lista dei test per riflettere i cambiamenti
    //this.mockTests = [...this.mockTests];
  }
  testDeleted(index: number) {
    this.testService.deleteTest(index);
    this.filteredTests = [...this.testService.getTest()];
    this.mockTests = [...this.testService.getTest()];
    console.log('Test cancellato page:', this.mockTests[index]);
  }
  onTestLoaded(test: Test) {
    this.router.navigate(['/test'], {
      state: { test: test },
    });
  }
  onTestDeleteRequest(id:number){
      this.deletingId = id;
      this.confirmMessage = 'Sei sicuro di voler eliminare questo Test?';
      this.onTestDeleteConfirmed();
      this.showConfirm = true;
    }

    onTestDeleteConfirmed(){
      if(this.deletingId !== undefined){
        console.log('Indice ricevuto per cancellazione Test:', this.deletingId);
        /* this.TestService.deleteTest(id).subscribe({
          next: () => {
            this.TestService.getAllTests().subscribe({
              next: (data) => this.Tests = data
            });
          }
          error: (err) => {
            console.error('Errore durante la delete:', err);
          }
        }) qui sincronizzazione e richiesta degli Test ogni modifica effettuata */
        this.TestService.deleteTest(this.deletingId).subscribe({
          next: () => {
            // Rimuovi l'elemento dalla lista
            this.Tests = this.Tests.filter(Test => Test.id !== this.deletingId);
            this.showConfirm = false;
            console.log(Test con ID ${this.deletingId} eliminato con successo.);
            this.deletingId = undefined;
          },
          error: (err) => {
            console.error(Errore durante l'eliminazione dell'Test con ID ${this.deletingId}:, err);
          }
        });
      } // viene tolto dalla lista Tests in locale con filter se la delete va a buon fine 
    }

    onTestDeleteCanceled(){
      this.showConfirm = false;
      this.deletingId = undefined;
      this.confirmMessage = '';
    }
}
