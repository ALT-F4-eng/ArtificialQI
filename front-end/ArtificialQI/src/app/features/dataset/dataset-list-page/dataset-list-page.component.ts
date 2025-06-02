import { Component } from '@angular/core';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { FileUploadComponent } from '../../../features/dataset/json-file-upload/json-file-upload.component';
import { DatasetListViewComponent } from '../../../features/dataset/dataset-list-view/dataset-list-view.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { DatasetService } from '../../../core/services/dataset.service';
import { DatasetDto } from '../../../core/models/dataset-dto.model';
import { QAService } from '../../../core/services/qa.service';

import { MatButtonModule } from '@angular/material/button';

import { RouterModule, Router } from '@angular/router';
import { ConfirmComponent } from '../../../core/components/confirm/confirm.component';
import { CommonModule } from '@angular/common';

import { MessageBoxComponent } from '../../../shared/error-message/message.component';

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
    MessageBoxComponent,
  ],
  templateUrl: './dataset-list-page.component.html',
  styleUrl: './dataset-list-page.component.css',
})
export class DatasetListPageComponent {
  //comportamento che sicuramente si puo migliorare e cambiare
  //ad esempio ogni volta si fa una chiamata al backend per prendere i dataset e inizialmente con una chiamata '' vuota;
  allDatasets: DatasetDto[] = [];
  filteredDatasets: DatasetDto[] = [];
  showConfirmDelete = false;
  showConfirmLoad = false;
  showOverride = false;
  datasetid?: string;
  datasetSelected?: DatasetDto;

  //per message component
  showMessage = true;
  resultMessage = '';
  messageType: 'success' | 'error' = 'error';

  constructor(
    private datasetService: DatasetService,
    private qaService: QAService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.allDatasets =
    this.datasetService.getAllDatasets().subscribe({
      next: (datasets) => {
        console.log('ciao', datasets);
        this.allDatasets = datasets.filter((d) => d.tmp === false);
        this.filteredDatasets = [...this.allDatasets]; // mostra tutti inizialmente
      },
      error: (err) => {
        console.error('Errore nel ottenimento dei dataset:', err);
      },
    });
  }

  checkOverride() {
    //caso che crea da 0 senza dataset caricato
    if (!this.qaService.cachedDatasetCaricato) {
      this.createTemoraryDataset();
    } else {
      console.log("sovrascrivo da checkoverride");
      this.onDatasetOverrideRequest();
    }
  }

  createTemoraryDataset() {
    console.log('create Dataset temporaneo');
    this.datasetService.createTemporaryDataset().subscribe({
      next: (datasetDto) => {
        console.log('Dataset creato:', datasetDto);
        this.qaService.cachedDatasetCaricato = datasetDto;
        this.router.navigate(['/datasetContentPage'], {
          state: { datasetDto: datasetDto, mode: 'create' },
        });
      },
      error: (err) => {
        console.error('Errore nella creazione del dataset:', err);
      },
    });
  }

  handleSearchDataset(term: string) {
    const normalized = term.toLowerCase();
    this.filteredDatasets = this.allDatasets.filter((dataset) =>
      dataset.name.toLowerCase().includes(normalized)
    );
  }

  renameDataset(index: number, newName: string) {
    /*
    // Rinomina il dataset chiamando il servizio
    this.datasetService.renameDataset(index, newName);
    this.resultMessage = 'Test rinominato con successo!';
    this.messageType = 'success';
    this.showMessage = true;
    // Aggiorna la lista dei dataset per riflettere i cambiamenti
    //this.allDatasets = [...this.allDatasets];
      */
  }

  datasetCopied(index: number): void {
    /*
    this.datasetService.cloneDataset(index).subscribe({
      next: (clonedDataset) => {
        //manda una richiesta al back-end

        // Aggiorna la lista locale aggiungendo il clone
        this.allDatasets.push(clonedDataset);

        // Aggiorna la lista filtrata (puoi decidere se includere o meno il clone nel filtro corrente)
        this.filteredDatasets = [...this.allDatasets];
        this.resultMessage = 'Test copiato con successo!';
        this.messageType = 'success';
        this.showMessage = true;
        console.log('Dataset copiato page:', clonedDataset);
      },
      error: (err) => {
        this.resultMessage = 'Test copiato con errore!';
        this.messageType = 'error';
        this.showMessage = true;
        console.error('Errore durante la copia del dataset:', err);
      },
    });
  */
  }

  // delete
  onDatasetDeleteRequest(dataset: DatasetDto) {
    this.showConfirmDelete = true;
    this.datasetid = dataset.id;
    console.log('Indice ricevuto per cancellazione page:', dataset.id);
  }

  onDatasetDeleteConfirmed() {
    /*
    if (this.datasetid !== undefined) {
      this.datasetService.deleteDataset(this.datasetid);
      this.filteredDatasets = [...this.datasetService.getDataset()];
      this.mockDatasets = [...this.datasetService.getDataset()];
      this.showConfirmDelete = false;
      this.datasetService.deleteDataset(this.datasetid).subscribe({
        next: () => {
          // Aggiorna la cache locale
          this.datasetService.removeDatasetFromCache(this.datasetid!);

          // Ricarica le liste aggiornate tramite Observable
          this.datasetService.getAllDatasets().subscribe((datasets) => {
            this.filteredDatasets = [...datasets];
            this.allDatasets = [...datasets];
          });

          this.showConfirmDelete = false;
          this.resultMessage = 'Test eliminato con successo!';
          this.messageType = 'success';
          this.showMessage = true;
          console.log('Dataset eliminato con ID:', this.datasetid);
        },
        error: (err) => {
          this.resultMessage = 'eliminazione fallito!';
          this.messageType = 'error';
          this.showMessage = true;
          console.error('Errore durante la cancellazione:', err);
        },
      });
    }
  */
  }

  onDatasetDeleteCanceled() {
    this.datasetid = undefined;
    this.showConfirmDelete = false;
  }

  // load
  onDatasetLoadRequest(dataset: DatasetDto) {
    this.showConfirmLoad = true;
    this.datasetid = dataset.id; // datasetid o datasetselected  da capire nel futuro
    this.datasetSelected = dataset;
    console.log('Dataset caricato:', dataset);
  }

  onDatasetLoadConfirmed() {
    if (this.datasetSelected !== undefined) {
      // funzionalità da testare dopo la creazione del datasetcontentpage
      // da cambiare
      //console.log("diocane")
      this.router.navigate(['/datasetContentPage', this.datasetid], {
        state: { dataset: this.datasetSelected },
        queryParams: { mode: 'edit' },
      });
    }
  }

  onDatasetLoadCanceled() {
    this.datasetSelected = undefined;
    this.showConfirmLoad = false;
  }

  onCloseMessage() {
    this.showMessage = false;
    this.resultMessage = '';
    this.messageType = 'error';
  }

  onDatasetOverrideRequest() {
    this.showOverride = true;
  }

  onDatasetOverrideConfirmed() {
    console.log("sovrascrivo confermato");
    // richiesta di delete working copy o dataset temporary copy
    this.qaService.cachedDatasetCaricato = null;
    this.datasetService.deleteTemporaryDataset().subscribe({
      next: (res) => {
        console.log('Dataset temporaneo eliminato con successo:', res);
        // Pulizia del dataset caricato in cache (se applicabile)
        this.createTemoraryDataset();
      },
      error: (err) => {
        console.error('Errore nella cancellazione del dataset:', err);
      },
    });

  
  }

  onDatasetOverrideCanceled() {
    this.showOverride = false;
  }
}
