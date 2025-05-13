import { Component } from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { FileUploadComponent } from '../../features/json-file-upload/json-file-upload.component';
import { DatasetListViewComponent } from '../../features/dataset-list-view/dataset-list-view.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DatasetService, Dataset } from '../dataset.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-dataset-list-page',
  standalone: true,
  imports: [SearchBarComponent,FileUploadComponent,DatasetListViewComponent,MatIconModule,MatDividerModule,MatButtonModule,RouterModule],
  templateUrl: './dataset-list-page.component.html',
  styleUrl: './dataset-list-page.component.css'
})

export class DatasetListPageComponent {
  //comportamento che sicuramente si puo migliorare e cambiare
  //ad esempio ogni volta si fa una chiamata al backend per prendere i dataset e inizialmente con una chiamata '' vuota;
  mockDatasets: Dataset[] = [];
  filteredDatasets: Dataset[] = [];
  constructor(private datasetService: DatasetService, private router: Router) {}
  ngOnInit(): void {
    this.mockDatasets = this.datasetService.getDataset();
    this.filteredDatasets = [...this.mockDatasets]; // mostra tutti inizialmente
  }
  
  handleSearch(term: string) {
    const normalized = term.toLowerCase();
    this.filteredDatasets = this.mockDatasets.filter(dataset =>
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
  
  datasetDeleted(index: number) {
    console.log('Indice ricevuto per cancellazione page:', index);
    this.datasetService.deleteDataset(index);
    this.filteredDatasets = [...this.datasetService.getDataset()];
    this.mockDatasets = [...this.datasetService.getDataset()];
   // this.mockDatasets = [...this.mockDatasets];
    //console.log('Dataset eliminato page:', this.mockDatasets[index]);
  }
  onDatasetLoaded(dataset: Dataset) {
  // funzionalità da testare dopo la creazione del datasetcontentpage
    this.router.navigate(['/datasetContentPage'], {
      queryParams: { name: dataset.name }
    });
  }
}
