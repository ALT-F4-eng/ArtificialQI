import { Component } from '@angular/core';

//sottocomponenti 
import { QAListViewComponent } from '../qalist-view/qalist-view.component';
@Component({
  selector: 'app-dataset-page-view',
  imports: [QAListViewComponent],
  templateUrl: './dataset-page-view.component.html',
  styleUrl: './dataset-page-view.component.css'
})

export class DatasetPageViewComponent {

}
