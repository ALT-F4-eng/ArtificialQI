import { Component, inject } from '@angular/core';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
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

import { DatasetNameDialogComponent } from '../../../shared/components/dataset-name-dialog/dataset-name-dialog.component';
import { MessageBoxComponent } from '../../../shared/error-message/message.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dataset-list-page',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
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
  filteredDatasets: DatasetDto[] = []; // questo è quello che uso per mostrare nel front-end
  showConfirmDelete = false;
  showConfirmLoad = false;
  showOverride = false;

  //datasetid?: string;
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
        this.allDatasets = datasets;
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
      console.log('sovrascrivo da checkoverride');
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
          state: { dataset: datasetDto },
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

  renameDataset(datasetid: string, newName: string) {
    this.datasetService.renameDatasetById(datasetid, newName).subscribe({
      next: () => {
        this.resultMessage = 'Dataset rinominato con successo!';
        this.messageType = 'success';
        this.showMessage = true;

        // Ricarica la lista completa dei dataset dal backend
        this.datasetService.getAllDatasets().subscribe({
          next: (datasets) => {
            this.allDatasets = datasets;
            this.filteredDatasets = [...this.allDatasets];
          },
          error: (err) =>
            this.handleError(err, 'Errore durante il recupero dei dataset.'),
        });
      },
      error: (err) => {
        this.handleError('Errore durante la rinomina del dataset.', err);
      },
    });
  }

  private dialog = inject(MatDialog);

  openCreateDialog() {
    const dialogRef = this.dialog.open(DatasetNameDialogComponent, {
      data: { title: 'Crea Nuovo Dataset', name: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.datasetService.createDatasetByName(result).subscribe({
        next: (datasetDto) => {
          this.resultMessage = 'Dataset creato con successo!';
          this.messageType = 'success';
          this.showMessage = true;

          // Ricarica la lista completa dei dataset dal backend
          this.datasetService.getAllDatasets().subscribe({
            next: (datasets) => {
              this.allDatasets = datasets;
              this.filteredDatasets = [...this.allDatasets];
            },
            error: (err) =>
              this.handleError(
                err,
                'Errore durante il recupero dei dataset.'
              ),
          });

          console.log('Dataset creato:', datasetDto);
        },
        error: (err) =>
          this.handleError(err, 'Errore nella creazione del dataset.'),
      });
    });
  }

  private handleError(err: any, fallbackMessage: string = 'Errore generico.') {
    this.resultMessage = err?.error?.msg || fallbackMessage;
    this.messageType = 'error';
    this.showMessage = true;
    console.error(err);
  }

  datasetCopied(id: string): void {
    this.datasetService.cloneDatasetById(id).subscribe({
      next: (clonedDataset) => {
        if (clonedDataset && clonedDataset.id) {
          this.allDatasets.push(clonedDataset);
          this.filteredDatasets = [...this.allDatasets];
          this.resultMessage = 'Dataset copiato con successo!';
          this.messageType = 'success';
          this.showMessage = true;
          console.log('Dataset copiato:', clonedDataset);
        } else {
          this.resultMessage = 'Errore nella clonazione del dataset.';
          this.messageType = 'error';
          this.showMessage = true;
          console.error('Risposta inattesa:', clonedDataset);
        }
      },
      error: (err) => {
        this.resultMessage = 'Errore durante la copia del dataset.';
        this.messageType = 'error';
        this.showMessage = true;
        console.error('Errore nella richiesta di clonazione:', err);
      },
    });
  }

  // delete
  onDatasetDeleteRequest(dataset: DatasetDto) {
    this.showConfirmDelete = true;
    this.datasetSelected = dataset;
  }

  onDatasetDeleteConfirmed() {
    if (this.datasetSelected !== undefined) {
      this.showConfirmDelete = false;
      /*this.filteredDatasets = [...this.datasetService.getDataset()];
      this.mockDatasets = [...this.datasetService.getDataset()];*/
      this.datasetService.deleteDatasetById(this.datasetSelected.id).subscribe({
        next: () => {
          this.datasetService.getAllDatasets().subscribe({
            next: (datasets) => {
              this.allDatasets = datasets;
              this.filteredDatasets = [...this.allDatasets];
            },
            error: (err) =>
              this.handleError(
                err,
                'Errore durante il caricamento dei dataset aggiornati.'
              ),
          });

          this.showConfirmDelete = false;
          this.resultMessage = `Dataset eliminato con ID: ${
            this.datasetSelected!.id
          }`;
          this.messageType = 'success';
          this.showMessage = true;
        },
        error: (err) => this.handleError(err, 'Eliminazione fallita!'),
      });
    }
  }

  onDatasetDeleteCanceled() {
    this.datasetSelected = undefined;
    this.showConfirmDelete = false;
  }

  // load
  onDatasetLoadRequest(dataset: DatasetDto) {
    this.showConfirmLoad = true;
    this.datasetSelected = dataset; // datasetid o datasetselected  da capire nel futuro
    //console.log('Dataset caricato:', dataset);
  }

  onDatasetLoadConfirmed() {
    if (this.datasetSelected !== undefined) {
      if (this.isTempDatasetLoaded) {
        //cancella tmp e poi ne crea un working poi this.qaService.cachedDatasetCaricato = res;
        this.datasetService.deleteTemporaryDataset().subscribe({
          next: () => {
            this.createWorkingCopyTemporary();
          },
          error: (err) => {
            console.error(
              'Errore nella deleteTemporaryDataset del dataset:',
              err
            );
          },
        });
      } else {
        this.createWorkingCopyTemporary();
      }
    }
  }

  createWorkingCopyTemporary() {
    this.datasetService
      .createWorkingCopyTemporary(this.datasetSelected!.id)
      .subscribe({
        next: (res) => {
          this.qaService.cachedDatasetCaricato = res;
          this.router.navigate(['/datasetContentPage'], {
            state: { dataset: this.datasetSelected },
          });
        },
        error: (err) => {
          console.error(
            'Errore nella createWorkingCopyTemporary del dataset:',
            err
          );
        },
      });
  }

  onDatasetLoadCanceled() {
    this.datasetSelected = undefined;
    this.showConfirmLoad = false;
  }

  onDatasetOverrideRequest() {
    this.showOverride = true;
  }

  onDatasetOverrideConfirmed() {
    console.log('sovrascrivo confermato');
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

  onCloseMessage() {
    this.showMessage = false;
    this.resultMessage = '';
    this.messageType = 'error';
  }

  get isTempDatasetLoaded(): boolean {
    return !!this.qaService.cachedDatasetCaricato;
  }
}
