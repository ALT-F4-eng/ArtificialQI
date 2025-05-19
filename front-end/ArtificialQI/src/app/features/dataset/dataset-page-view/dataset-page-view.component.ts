import { Component, Input, Output, EventEmitter } from '@angular/core';

//sottocomponenti
import { QAListViewComponent } from '../qalist-view/qalist-view.component';
import { DatasetPageDto } from '../../../core/models/datasetpage-dto.model';

import { QAService } from '../../../core/services/qa.service';

@Component({
  selector: 'app-dataset-page-view',
  imports: [QAListViewComponent],
  templateUrl: './dataset-page-view.component.html',
  styleUrl: './dataset-page-view.component.css',
})

export class DatasetPageViewComponent {
  @Input() datasetPage?: DatasetPageDto;  
  constructor(private qaService: QAService) {}
  
  modifyQA(id:number, question:string, answer:string) {
    console.log('Nuova domanda:', question, 'Nuova risposta:', answer);
    //chiama il servizio di modifica
     this.qaService.modifyDatasetPage(id, question, answer);
  }
}
