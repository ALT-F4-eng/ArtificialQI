import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-dataset-element',
  standalone: true,
  imports: [MatCardModule, DatePipe, MatButtonModule],
  templateUrl: './dataset-element.component.html',
  styleUrls: ['./dataset-element.component.css']
})

export class DatasetElementComponent {
  //sarano due dati passati dal padre
  datasetName: string = 'Esempio Dataset';
  lastModified: Date = new Date();

  renameDataset() {
    console.log('Dataset rinominato');
  }

  copyDataset() {
    console.log('Dataset copiato');
  }

  deleteDataset() {
    console.log('Dataset eliminato');
  }

  loadDataset() {
    console.log('Dataset caricato');
  }
}
