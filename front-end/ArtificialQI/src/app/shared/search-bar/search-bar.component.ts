import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule,MatIconModule,MatFormFieldModule], // Importa i moduli di Angular Material
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchTerm: string = '';

  onSearch(event?: Event) {
    if (event) {// per evitare che venga anche cliccato campo di input della ricerca
      event.stopPropagation();// Impedisce il click di "salire" all'input
      event.preventDefault();// Impedisce il comportamento predefinito del click
    }
    console.log('Cercando:', this.searchTerm);
    // Aggiungi la logica per la ricerca
  }
}
