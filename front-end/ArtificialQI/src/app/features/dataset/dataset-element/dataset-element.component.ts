import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { datasetDto } from '../../../core/models/dataset-dto.model';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatasetNameDialogComponent } from '../../../shared/components/dataset-name-dialog/dataset-name-dialog.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dataset-element',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    DatePipe,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './dataset-element.component.html',
  styleUrls: ['./dataset-element.component.css'],
})
export class DatasetElementComponent implements OnInit {
  //sarano due dati passati dal padre
  @Input() dataset?: datasetDto;

  ngOnInit() {
    console.log(this.dataset); // Dovresti vedere i dati passati dal padre
  }

  @Output() renameSignal = new EventEmitter<string>(); // Emette il nuovo nome al padre
  private dialog = inject(MatDialog);
  openRenameDialog() {
    if (!this.dataset) return; // Se non c'è un dataset, esci
    const dialogRef = this.dialog.open(DatasetNameDialogComponent, {
      data: { name: this.dataset.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Nuovo nome nel elemento:', result);
        this.renameSignal.emit(result); // Invia il nuovo nome al padre tramite l'evento
      }
    });
  }

  @Output() copySignal = new EventEmitter<void>();
  onCopySignal() {
    if (this.dataset) {
      this.copySignal.emit();
      console.log('Dataset copiato:', this.dataset.name);
      // Puoi aggiungere logica per "salvare" il dataset copiato nel mock o un altro array
    }
  }

  @Output() deleteSignal = new EventEmitter<datasetDto>();
  onDeleteSignal() {
    if (this.dataset) {
      this.deleteSignal.emit(this.dataset); // comunica al padre quale dataset eliminare
    }
  }

  @Output() loadSignal = new EventEmitter<datasetDto>();
  onLoadSignal() {
    if (this.dataset) {
      this.loadSignal.emit(this.dataset);
      console.log('Dataset caricato:', this.dataset.name);
      // Puoi aggiungere logica per caricare il dataset (ad esempio, simula il download)
    }
  }
}
