import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DatasetElementComponent } from '../dataset-element/dataset-element.component';
import { DatasetDto } from '../../../core/models/dataset-dto.model';
// dataset-list-view.component.ts

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
  @Input() datasets: DatasetDto[] = [];

  @Output() rename = new EventEmitter<{ id: string; newName: string }>();
  onRename(id: string, newName: string) {
    this.rename.emit({ id, newName });
  }

  @Output() datasetCopied = new EventEmitter<string>();
  onCopy(id: string) {
    this.datasetCopied.emit(id);
  }

  @Output() datasetDeleted = new EventEmitter<DatasetDto>();
  onDelete(dataset: DatasetDto) {
    this.datasetDeleted.emit(dataset);
  }

  @Output() datasetLoaded = new EventEmitter<DatasetDto>();
  onDatasetLoaded(dataset: DatasetDto) {
    this.datasetLoaded.emit(dataset);
  }
  
}
