import { Component } from '@angular/core';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { TestListViewComponent } from '../../../features/test/test-list-view/test-list-view.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { TestService, Test } from '../../../core/services/test.service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-test-list-page',
  imports: [
    SearchBarComponent,
    TestListViewComponent,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './test-list-page.component.html',
  styleUrl: './test-list-page.component.css'
})
export class TestListPageComponent {
  mockTests: Test[] = [];
  filteredTests: Test[] = [];
  constructor(private testService: TestService, private router: Router) {}
  ngOnInit(): void {
    this.mockTests = this.testService.getTest();
    this.filteredTests = [...this.mockTests]; // mostra tutti inizialmente
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
}
