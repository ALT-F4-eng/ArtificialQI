import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardTitle } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { DatasetDto } from '../../../core/models/dataset-dto.model';
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
    MatCardTitle,
  ],
  templateUrl: './dataset-element.component.html',
  styleUrls: ['./dataset-element.component.css'],
})

export class DatasetElementComponent implements OnInit {
  //sarano due dati passati dal padre
  @Input() dataset?: DatasetDto;

  ngOnInit() {
    console.log(this.dataset); // Dovresti vedere i dati passati dal padre
  }

  @Output() renameSignal = new EventEmitter<{ id: string; newName: string }>();; // Emette il nuovo nome al padre
  private dialog = inject(MatDialog);
  openRenameDialog() {
    if (!this.dataset) return; // Se non c'è un dataset, esci
    const dialogRef = this.dialog.open(DatasetNameDialogComponent, {
      data: { title:"Rinomina Dataset" , name: this.dataset.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.renameSignal.emit({ id: this.dataset!.id, newName: result }); // Invia il nuovo nome al padre tramite l'evento
    });
  }

  @Output() copySignal = new EventEmitter<string>();
  onCopySignal() {
    if (this.dataset) {
      this.copySignal.emit(this.dataset.id);
      console.log('Dataset copiato:', this.dataset.name);
      // Puoi aggiungere logica per "salvare" il dataset copiato nel mock o un altro array
    }
  }

  @Output() deleteSignal = new EventEmitter<DatasetDto>();
  onDeleteSignal() {
    if (this.dataset) {
      this.deleteSignal.emit(this.dataset); // comunica al padre quale dataset eliminare
    }
  }

  @Output() loadSignal = new EventEmitter<DatasetDto>();
  onLoadSignal() {
    if (this.dataset) {
      this.loadSignal.emit(this.dataset);
      console.log('Dataset caricato:', this.dataset.name);
      // Puoi aggiungere logica per caricare il dataset (ad esempio, simula il download)
    }
  }
}
