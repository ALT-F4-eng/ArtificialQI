import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { QADto } from '../../../core/models/qa-dto.model';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';


import { QADialogComponent } from '../qadialog/qadialog.component';

@Component({
  selector: 'app-qaelement',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgIf, MatDividerModule],
  templateUrl: './qaelement.component.html',
  styleUrl: './qaelement.component.css',
})
export class QAElementComponent {
  @Input() qa?: QADto;

  @Output() modifySignal = new EventEmitter<QADto>(); // Emette il nuovo nome al padre
  private dialog = inject(MatDialog);
  openModifyQADialog() {
    if (!this.qa) return; // Se non c'è un qa, esci
    const dialogRef = this.dialog.open(QADialogComponent, {
      width: '95vw', // 95% della larghezza della finestra
      maxHeight: '90vh', // 90% dell'altezza della finestra
     // panelClass: 'big-edit-dialog', // <- solo per questo
      data: { title: "Modifica QA esistente", question: this.qa.question, answer: this.qa.answer },
    });
    dialogRef.afterClosed().subscribe((result: { question: string; answer: string }) => {
      if (result) {
        console.log('Modifica ricevuta:', result);
        // Emitto evento con id e nuovi dati
        this.modifySignal.emit({
          id: this.qa!.id,
          question: result.question,
          answer: result.answer
        });
      }
    });
  }

  @Output() deleteSignal = new EventEmitter<string>();
    onDeleteSignal() {
      if (this.qa) {
        this.deleteSignal.emit(this.qa.id); // comunica al padre qa da eliminare
      }
    }


}
