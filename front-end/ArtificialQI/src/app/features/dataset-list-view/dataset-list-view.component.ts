import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DatasetElementComponent } from '../dataset-element/dataset-element.component';
import { Dataset } from '../dataset.service';

// dataset-list-view.component.ts
export interface RenameEvent {
  index: number;
  newName: string;
}

@Component({
  selector: 'app-dataset-list-view',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    DatasetElementComponent,
  ],
  templateUrl: './dataset-list-view.component.html',
  styleUrls: ['./dataset-list-view.component.css'],
})
export class DatasetListViewComponent {
  @Input() datasets: Dataset[] = [];

  @Output() rename = new EventEmitter<RenameEvent>();
  onRename(index: number, newName: string) {
    console.log('Nuovo nome nel list view:', newName);
    this.rename.emit({ index, newName });
  }

  @Output() datasetCopied = new EventEmitter<number>();
  onCopy(index: number) {
    this.datasetCopied.emit(index);
  }

  @Output() datasetDeleted = new EventEmitter<number>();
  onDelete(index: number) {
    console.log('Indice ricevuto per cancellazione list view:', index);
    this.datasetDeleted.emit(index);
  }

  @Output() datasetLoaded = new EventEmitter<Dataset>();
  onDatasetLoaded(dataset: Dataset) {
    this.datasetLoaded.emit(dataset);
  }
}
