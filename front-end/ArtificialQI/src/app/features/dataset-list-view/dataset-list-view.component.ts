import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DatasetElementComponent } from '../dataset-element/dataset-element.component';
import { Dataset } from '../dataset.service';

@Component({
  selector: 'app-dataset-list-view',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule, MatButtonModule, DatasetElementComponent],
  templateUrl: './dataset-list-view.component.html',
  styleUrls: ['./dataset-list-view.component.css']
})

export class DatasetListViewComponent {
  @Input() datasets: Dataset[] = [];
}
