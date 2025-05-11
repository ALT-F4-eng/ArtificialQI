import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Dataset } from '../dataset.service'; 
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-dataset-element',
  standalone: true,
  imports: [CommonModule, MatCardModule, DatePipe, MatButtonModule],
  templateUrl: './dataset-element.component.html',
  styleUrls: ['./dataset-element.component.css']
})

export class DatasetElementComponent implements OnInit {
  //sarano due dati passati dal padre
  @Input() dataset?: Dataset;
  
  ngOnInit() {
    console.log(this.dataset); // Dovresti vedere i dati passati dal padre
  }
  
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
