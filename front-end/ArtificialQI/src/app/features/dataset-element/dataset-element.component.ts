import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Dataset } from '../dataset.service'; 
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatasetNameDialogComponent } from '../../shared/dataset-name-dialog/dataset-name-dialog.component';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-dataset-element',
  standalone: true,
  imports: [CommonModule, MatCardModule, DatePipe, MatButtonModule, RouterModule],
  templateUrl: './dataset-element.component.html',
  styleUrls: ['./dataset-element.component.css']
})

export class DatasetElementComponent implements OnInit {
  //sarano due dati passati dal padre
  @Input() dataset?: Dataset;
  
  ngOnInit() {
    console.log(this.dataset); // Dovresti vedere i dati passati dal padre
  }

  @Output() rename = new EventEmitter<string>(); // Emette il nuovo nome al padre
  private dialog = inject(MatDialog);
  openRenameDialog() {
    if (!this.dataset) return; // Se non c'è un dataset, esci
    const dialogRef = this.dialog.open(DatasetNameDialogComponent, {
      data: { name: this.dataset.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nuovo nome nel elemento:', result);
        this.rename.emit(result);  // Invia il nuovo nome al padre tramite l'evento
      }
    });
  }
  
  @Output() copyClicked = new EventEmitter<void>();
  copyDataset() {
    if (this.dataset) {
      this.copyClicked.emit();
      console.log('Dataset copiato:', this.dataset.name);
      // Puoi aggiungere logica per "salvare" il dataset copiato nel mock o un altro array
    }
  }

  @Output() delete = new EventEmitter<number>();
  deleteDataset() {
    //qua si inserisce la logica per verificare che l'utente voglia davvero eliminare il dataset, poi si fa veramente l'emit nel caso di conferma.
    if (this.dataset) {
      this.delete.emit(); // comunica al padre quale dataset eliminare
      //console.log('Dataset eliminato:', this.dataset.name);
      // Qui dovresti aggiungere la logica per eliminare il dataset dal "database" (mock o altro)
    }
  }
  
  @Output() datasetLoaded = new EventEmitter<Dataset>();
  loadDataset() {
    if (this.dataset) {
      this.datasetLoaded.emit(this.dataset);
      console.log('Dataset caricato:', this.dataset.name);
      // Puoi aggiungere logica per caricare il dataset (ad esempio, simula il download)
    }
  }
}
