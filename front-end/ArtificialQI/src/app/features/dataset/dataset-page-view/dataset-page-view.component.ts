import { Component, Input, Output, EventEmitter } from '@angular/core';

//sottocomponenti 
import { QAListViewComponent } from '../qalist-view/qalist-view.component';
import { DatasetPageDto } from '../../../core/models/datasetpage-dto.model';
@Component({
  selector: 'app-dataset-page-view',
  imports: [QAListViewComponent],
  templateUrl: './dataset-page-view.component.html',
  styleUrl: './dataset-page-view.component.css'
})

export class DatasetPageViewComponent {
  @Input() datasetPage?: DatasetPageDto;
  
}
