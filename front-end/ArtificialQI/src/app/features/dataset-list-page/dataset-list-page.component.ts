import { Component } from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { FileUploadComponent } from '../../features/json-file-upload/json-file-upload.component';
import { DatasetListViewComponent } from '../../features/dataset-list-view/dataset-list-view.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DatasetService, Dataset } from '../dataset.service';

@Component({
  selector: 'app-dataset-list-page',
  standalone: true,
  imports: [SearchBarComponent,FileUploadComponent,DatasetListViewComponent,MatIconModule,MatDividerModule,MatButtonModule],
  templateUrl: './dataset-list-page.component.html',
  styleUrl: './dataset-list-page.component.css'
})

export class DatasetListPageComponent {
  //comportamento che sicuramente si puo migliorare e cambiare
  //ad esempio ogni volta si fa una chiamata al backend per prendere i dataset e inizialmente con una chiamata '' vuota;
  mockDatasets: Dataset[] = [];
  filteredDatasets: Dataset[] = [];
  constructor(private datasetService: DatasetService) {}
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
}
