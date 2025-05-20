import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-page-navigation',
  imports: [MatPaginatorModule, FormsModule],
  templateUrl: './page-navigation.component.html',
  styleUrl: './page-navigation.component.css',
})
export class PageNavigationComponent implements AfterViewInit {
  // verrà passata dal padre i dati necessari
  totalItems = 100; // esempio: 100 elementi totali
  pageSize = 20; // elementi per pagina
  currentPage = 0; // pagina attuale
  pageInput = 1;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // puoi accedere al paginator qui
  }

  get totalPages(): number {
    return 10;
    //return Math.ceil(this.allItems.length / this.pageSize);
  }

  /*get pagedItems(): string[] {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.allItems.slice(start, end);
  }*/

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.pageInput = this.currentPage + 1;
    // Carica i nuovi dati qui
    console.log('Pagina cambiata', event);
    // qua si fa la chiamata col back-end
  }

  /*goToPage() {
    const newPage = this.pageInput - 1;
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.paginator.pageIndex = newPage;
      this.paginator._changePageSize(this.pageSize); // forza l’aggiornamento
    }
  }*/
}
//Se carichi i dati da un'API, usa i valori di event.pageIndex e event.pageSize per fare le chiamate corrette.

//Personalizza l’etichetta con MatPaginatorIntl se vuoi localizzare le stringhe (es. "Elementi per pagina", "di").
