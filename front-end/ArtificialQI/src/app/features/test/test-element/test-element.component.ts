import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';

import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { TestDto } from '../../../core/models/test-dto.model';
import { DatasetNameDialogComponent } from '../../../shared/components/dataset-name-dialog/dataset-name-dialog.component';


@Component({
  selector: 'app-test-element',
  imports: [
    CommonModule,
    MatCardModule,
    DatePipe,
    MatButtonModule,
    MatCardTitle,
    RouterModule],
  templateUrl: './test-element.component.html',
  styleUrl: './test-element.component.css'
})
export class TestElementComponent {
  @Input() test?: TestDto;

  ngOnInit() {
    console.log(this.test); // Dovresti vedere i dati passati dal padre
  }
  @Output() rename = new EventEmitter<string>(); // Emette il nuovo nome al padre
  private dialog = inject(MatDialog);
 openRenameDialog() {
    if (!this.test) return; // Se non c'è un dataset, esci
    const dialogRef = this.dialog.open(DatasetNameDialogComponent, {
      data: { title:"Rinomina Test" , name: this.test.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Nuovo nome nel elemento:', result);
        this.rename.emit(result); // Invia il nuovo nome al padre tramite l'evento
      }
    });
  }
  @Output() testDelete = new EventEmitter<number>();
  deletetest() {
    if (this.test) {
      this.testDelete.emit(this.test.id); // Invia l'id del test al padre
      console.log('Test cancellato:', this.test.name);
    }
  }
  @Output() testLoad = new EventEmitter<TestDto>();
  loadtest() {
    if (this.test) {
      this.testLoad.emit(this.test);
      console.log('Test caricato:', this.test.name);
    }
  }
}
