import { Component } from '@angular/core';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { FileUploadComponent } from '../../../features/dataset/json-file-upload/json-file-upload.component';
import { DatasetListViewComponent } from '../../../features/dataset/dataset-list-view/dataset-list-view.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DatasetService } from '../../../core/services/dataset.service';
import { DatasetDto } from '../../../core/models/dataset-dto.model';
import { RouterModule, Router } from '@angular/router';
import { ConfirmComponent } from '../../../core/components/confirm/confirm.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dataset-list-page',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    FileUploadComponent,
    DatasetListViewComponent,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule,
    ConfirmComponent,
  ],
  templateUrl: './dataset-list-page.component.html',
  styleUrl: './dataset-list-page.component.css',
})
export class DatasetListPageComponent {
  //comportamento che sicuramente si puo migliorare e cambiare
  //ad esempio ogni volta si fa una chiamata al backend per prendere i dataset e inizialmente con una chiamata '' vuota;
  mockDatasets: DatasetDto[] = [];
  filteredDatasets: DatasetDto[] = [];
  showConfirmDelete = false;
  showConfirmLoad = false;
  datasetid?: number;
  datasetSelected?: DatasetDto;

  constructor(private datasetService: DatasetService, private router: Router) {}
  ngOnInit(): void {
    this.mockDatasets = this.datasetService.getDataset();
    this.filteredDatasets = [...this.mockDatasets]; // mostra tutti inizialmente
  }
  createDataset() {
    this.router.navigate(['/datasetContentPage'], { queryParams: { mode: 'create' } });
  }

  handleSearchDataset(term: string) {
    const normalized = term.toLowerCase();
    this.filteredDatasets = this.mockDatasets.filter((dataset) =>
      dataset.name.toLowerCase().includes(normalized)
    );
  }

  renameDataset(index: number, newName: string) {
    // Rinomina il dataset chiamando il servizio
    this.datasetService.renameDataset(index, newName);
    // Aggiorna la lista dei dataset per riflettere i cambiamenti
    //this.mockDatasets = [...this.mockDatasets];
  }

  datasetCopied(index: number) {
    this.datasetService.copyDataset(index);
    this.filteredDatasets = [...this.datasetService.getDataset()];
    this.mockDatasets = [...this.datasetService.getDataset()];
    console.log('Dataset copiato page:', this.mockDatasets[index]);
  }

  // delete
  onDatasetDeleteRequest(dataset: DatasetDto) {
    this.showConfirmDelete = true;
    this.datasetid = dataset.id;
    console.log('Indice ricevuto per cancellazione page:', dataset.id);
  }

  onDatasetDeleteConfirmed() {
    if (this.datasetid !== undefined) {
      this.datasetService.deleteDataset(this.datasetid);
      this.filteredDatasets = [...this.datasetService.getDataset()];
      this.mockDatasets = [...this.datasetService.getDataset()];
      this.showConfirmDelete = false;
      console.log('Dataset eliminato page:', this.mockDatasets[this.datasetid]);
    }
  }

  onDatasetDeleteCanceled() {
    this.datasetid = undefined;
    this.showConfirmDelete = false;
  }

  // load
  onDatasetLoadRequest(dataset: DatasetDto) {
    this.showConfirmLoad = true;
    this.datasetid = dataset.id;// datasetid o datasetselected  da capire nel futuro 
    
    this.datasetSelected = dataset;
    console.log('Dataset caricato:', dataset);
  }
  onDatasetLoadConfirmed() {
    if (this.datasetSelected !== undefined) {
      // funzionalità da testare dopo la creazione del datasetcontentpage
      // da cambiare
      this.router.navigate(['/datasetContentPage'], { queryParams: { mode: 'edit' } });
     /* this.router.navigate(['/datasetContentPage'], {
        queryParams: { name: this.datasetSelected.name },
      });*/
    }
  }
  onDatasetLoadCanceled() {
    this.datasetSelected = undefined;
    this.showConfirmLoad = false;
  }
}
