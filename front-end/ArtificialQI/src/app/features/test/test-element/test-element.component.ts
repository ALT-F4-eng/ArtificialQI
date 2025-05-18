import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { TestDto } from '../../../core/models/test-dto.model';
import { TestNameDialogComponent } from '../../../shared/components/test-name-dialog/test-name-dialog.component';


@Component({
  selector: 'app-test-element',
  imports: [
    CommonModule,
    MatCardModule,
    DatePipe,
    MatButtonModule,
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
    if (!this.test) return; // Se non c'è un test, esci
    const dialogRef = this.dialog.open(TestNameDialogComponent, {
      data: { name: this.test.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Nuovo nome nel elemento:', result);
        this.rename.emit(result); // Invia il nuovo nome al padre tramite l'evento
      }
    });
  }
  @Output() delete = new EventEmitter<number>();
  deletetest() {
    if (this.test) {
      this.delete.emit(this.test.ID); // Invia l'ID del test al padre
      console.log('Test cancellato:', this.test.name);
    }
  }
  @Output() testLoaded = new EventEmitter<TestDto>();
  loadtest() {
    if (this.test) {
      this.testLoaded.emit(this.test);
      console.log('Test caricato:', this.test.name);
    }
  }
}
