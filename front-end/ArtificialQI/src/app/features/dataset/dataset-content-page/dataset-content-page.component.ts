import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';

//Dto che serve
import { DatasetDto } from '../../../core/models/dataset-dto.model';
import { DatasetPageDto } from '../../../core/models/datasetpage-dto.model';
//service che serve
import { QAService } from '../../../core/services/qa.service';
import { emptyDataset } from '../../../core/models/dataset-dto.model';
import { emptyDatasetPage } from '../../../core/models/datasetpage-dto.model';
// sotto componenti 
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { DatasetPageViewComponent } from '../dataset-page-view/dataset-page-view.component';

@Component({
  selector: 'app-dataset-content-page',
  imports: [CommonModule, MatIconModule, MatButtonModule, SearchBarComponent, DatasetPageViewComponent],
  templateUrl: './dataset-content-page.component.html',
  styleUrl: './dataset-content-page.component.css',
})

export class DatasetContentPageComponent {
  //dataset!: DatasetDto;
  //datasetQA!: DatasetPageDto;
  dataset!: DatasetDto;
  datasetPage!: DatasetPageDto;

  constructor(private qaService: QAService, private route: ActivatedRoute) {} //private router: Router
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    const mode = params['mode'];
    if (mode === 'create') {
      this.dataset = emptyDataset;
      this.datasetPage = emptyDatasetPage;
    } else if (mode === 'edit') {
      this.dataset = this.qaService.getDataset();
      this.datasetPage = this.qaService.getDatasetPage();
    }
  });
  }
  handleSearchQA(term: string) {
    const normalized = term.toLowerCase();
  }/*
  modifyQA(qa: QADto) {
      console.log('Nuova domanda:', qa.question, 'Nuova risposta:', qa.answer);
      this.modify.emit(qa);
    }*/
  saveDataset(){}
  testDataset(){}
  addQA(){}

}

/*
<h2>Domande e Risposte (pagina {{ dataset.page_n }})</h2>
<ul>
  <li *ngFor="let qa of dataset.qa_list">
    <strong>{{ qa.question }}</strong><br>
    Risposta: {{ qa.answer }}
  </li>
</ul>
*/
/* servira nel futuro quando i dati vengono forniti dal database e api bisognerebbe utilizzare async
this.qaService.getDatasetAsync().subscribe(data => {
    this.dataset = data;
    if (this.dataset) {
      // modifica
      console.log(this.dataset.name);
    } else {
      // creazione da zero
    }*/