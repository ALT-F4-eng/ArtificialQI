import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Data } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

//Dto che serve
import { DatasetDto } from '../../../core/models/dataset-dto.model';
import { DatasetPageDto } from '../../../core/models/datasetpage-dto.model';
import { LlmDto } from '../../../core/models/llm-dto.model';
//service che serve
import { QAService } from '../../../core/services/qa.service';
import { QADto } from '../../../core/models/qa-dto.model';
//mock dati
import { llmMockList } from '../../../test/llm-test/llm-test-data';
import { emptyDataset } from '../../../core/models/dataset-dto.model';
import { emptyDatasetPage } from '../../../core/models/datasetpage-dto.model';
// sotto componenti
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { DatasetPageViewComponent } from '../dataset-page-view/dataset-page-view.component';
import { QADialogComponent } from '../qadialog/qadialog.component';
import { LLMselectionListComponent } from '../llmselection-list/llmselection-list.component';
import { DatasetNameDialogComponent } from '../../../shared/components/dataset-name-dialog/dataset-name-dialog.component';

import { ApiService } from '../../../core/services/prova.service';
import { ConfirmComponent } from '../../../core/components/confirm/confirm.component';
import { MessageBoxComponent } from '../../../shared/error-message/message.component';
@Component({
  selector: 'app-dataset-content-page',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    SearchBarComponent,
    DatasetPageViewComponent,
    ConfirmComponent,
    MessageBoxComponent,
  ],
  templateUrl: './dataset-content-page.component.html',
  styleUrl: './dataset-content-page.component.css',
})
export class DatasetContentPageComponent implements OnInit {
  dataset!: DatasetDto;
  qa_list: QADto[] = [];

  // workingCopy?: DatasetDto;
  //datasetPage!: DatasetPageDto;
  detectWokingCopy = false; // booleano per decidere quando si fa un working copy
  // poi tutte le modifiche vengono salvate all'interno del db su workingcopy finche l'utente non decide di salvare tale dataset
  // inpute per pageNavigation della pagina

  // messaggio: string = '';

  // mode: 'create' | 'edit' = 'create';
  showConfirmDelete = false;

  idqa?: string;

  //per message component
  showMessage = true;
  resultMessage = '';
  messageType: 'success' | 'error' = 'error';
  constructor(
    public qaService: QAService,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {} //private router: Router
  
  ngOnInit(): void {
    if (this.qaService.cachedDatasetCaricato) {
      this.resultMessage = 'Il dataset caricato!';
      this.messageType = 'success';
      this.showMessage = true;
      this.loadResults();
    } else {
      this.resultMessage = 'non è stato caricato nessun dataset per il momento';
      this.messageType = 'error';
      this.showMessage = true;
      console.log('showMessage:', this.showMessage);
    }
  }

  loadResults() {
    this.detectWokingCopy = true;
    this.qaService
      .getAllqaByDatasetId(this.qaService.cachedDatasetCaricato.id)
      .subscribe({
        next: (results) => {
          // Qui puoi assegnare i risultati a una variabile o aggiornarli nella UI
          this.qa_list = results; // <-- esempio
          console.log('Risultati QA caricati con successo:', this.qa_list);
        },
        error: (err) => {
          console.error('Errore nel caricamento dei risultati QA:', err);
          // eventualmente mostra errore all’utente
        },
        complete: () => {
          console.log('Caricamento QA completato.');
          // Puoi anche settare un flag tipo this.loading = false;
        },
      });
  }

  handleSearchQA(term: string) {
    const normalized = term.toLowerCase();
    this.qaService.getDatasetPageFiltered(term).subscribe({
      next: (filteredData: QADto[]) => {
        // this.filteredPage = filteredData;
      },
      error: (err) => {
        console.error(
          'Errore durante il filtraggio della pagina del dataset:',
          err
        );
      },
    });
  }

  private dialog = inject(MatDialog);
  addQA() {
    const dialogRef = this.dialog.open(QADialogComponent, {
      width: '95vw', // 95% della larghezza della finestra
      maxHeight: '90vh', // 90% dell'altezza della finestra
      data: { title: 'Crea nuova QA', question: '', answer: '' },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: { question: string; answer: string } | undefined) => {
        if (result) {
          this.onChangeShowLabel();
          console.log('Hai cliccato Salva con:', result);
          //verra chiamata servizio di salvataggio
          this.dataset.tmp = true;
          this.resultMessage = 'La coppia è stata aggiunta correttamente!';
          this.messageType = 'success';
          this.showMessage = true;
          /*this.qaService.addQA(result.question, result.answer);
          // dovrei controllare se elementi sono < dell'elementi presenti allinterno del datasetPageDto ,se si allora si aggiorna altrimenti vuoldire che verra aggiunto in coda e non necessita un aggiornamento
          this.datasetPage = this.qaService.updateDatasetPage(
            this.datasetPage.page_n
          );*/
        } else {
          this.resultMessage = 'La coppia non è stata aggiunta correttamente!';
          this.messageType = 'error';
          this.showMessage = true;
          console.log('Hai cliccato Annulla o chiuso il dialog');
        }
      });
    // bisgona gestire cosa fa quando si chiude il dialog
  }
  //nel caso che sia create bisogna anche mostrare il dialogo per segnalare il nome e poi passare da create a edit
  private dialogName = inject(MatDialog);

  saveDataset() {
    /*
    if (this.mode === 'create') {
      const dialogRef = this.dialogName.open(DatasetNameDialogComponent, {
        data: { title: 'Nuovo Nome' },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          //manda l'oggetto nel db e prende questo oggetto reinirizzarlo nella stessa pagina con modalità edit
          this.dataset.name = result;
          this.dataset.tmp = false;

          console.log('Nuovo nome nel elemento:', result);

          this.resultMessage = 'il dataset è stata salvata correttamente!';
          this.messageType = 'success';
          this.showMessage = true;
          // dthis.renameSignal.emit(result); // Invia il nuovo nome al padre tramite l'evento
          //this.qaService.createDataset(this.dataset).subscribe((response) => {
          /*const newId = response.id; // <-- restituito dal back-end*/
    /*const newId = 888;
            // Passa alla modalità 'edit' con id nel path
            this.router.navigate(['/datasetContentPage', newId], {
              queryParams: { mode: 'edit' },
            });
            // Aggiorna lo stato locale
            this.mode = 'edit';
          });*/
    //la logica è salvare tutto e reindirizzare l'utente
    // chiama la funzione di salvataggio
    /*this.datasetTmpService.updateDataset(this.dataset).subscribe({
            next: (res) => {
              console.log('Dataset aggiornato:', res);
              this.router.navigate(['/datasetContentPage', this.dataset.id], {
                queryParams: { mode: 'edit' },
              });
            },
            error: (err) => {
              console.error("Errore durante l'aggiornamento:", err);
            },
          });
        }
      });
    }*/
    //detectworkingcopy per dire se deve creare una working copy
    this.detectWokingCopy = true; // nel momento in cui l'utente salva il dataset diventa un dataset caricato
  }

  onChangeShowLabel() {
    //mostra etichetta e fa una copia nel working copy?
    console.log('Hai modificato', this.detectWokingCopy);
    if (this.detectWokingCopy) {
      this.dataset.tmp = true;
    }
  }

  isDatasetEmpty(): boolean {
    return !this.qa_list.length;
  }

  openLlmDialog() {
    const dialogRef = this.dialog.open(LLMselectionListComponent, {
      width: '95vw', // 95% della larghezza della finestra
      maxHeight: '90vh', // 90% dell'altezza della finestra
      data: { title: 'Scegli un modello LLM', list: llmMockList },
    });

    dialogRef.afterClosed().subscribe((selected: LlmDto | undefined) => {
      if (selected) {
      }
    });
  }

  modifyQA(id: string, question: string, answer: string) {
    console.log('Nuova domanda:', question, 'Nuova risposta:', answer);

    this.qaService.modifyDatasetQA(id, question, answer).subscribe({
      next: (updatedQA) => {
        console.log('QA modificato con successo:', updatedQA);
        this.onChangeShowLabel();
        this.resultMessage = 'la coppia è stata modificata correttamente!';
        this.messageType = 'success';
        this.showMessage = true;
        // this.modifyEventShowLabel.emit(); // se vuoi attivare un evento personalizzato
      },
      error: (err) => {
        this.resultMessage = 'la coppia è stata modificata correttamente!';
        this.messageType = 'error';
        this.showMessage = true;
        console.error('Errore durante la modifica del QA:', err);
      },
    });
  }

  onQADeleteRequest(id: string) {
    this.showConfirmDelete = true;
    this.idqa = id;
    console.log('Indice ricevuto per cancellazione page:', id);
  }

  onQADeleteConfirmed() {
    if (this.idqa !== undefined) {
      this.qaService.deleteDatasetQA(this.idqa).subscribe({
        next: () => {
          console.log('QA eliminato:', this.idqa);
          this.showConfirmDelete = false;
          this.onChangeShowLabel();
          this.resultMessage = 'la coppia è stata eliminata correttamente!';
          this.messageType = 'success';
          this.showMessage = true;
          // Esempio opzionale: aggiorna i dati dopo la cancellazione
          /*
        this.qaService.getDatasetPage(this.datasetPage!.page_n).subscribe(data => {
          this.datasetPage = data;
        });
        */
        },
        error: (err) => {
          this.resultMessage = 'la coppia non è stata eliminata correttamente!';
          this.messageType = 'error';
          this.showMessage = true;
          console.error("Errore durante l'eliminazione del QA:", err);
        },
      });
    }
  }

  onQADeleteCanceled() {
    this.idqa = undefined;
    this.showConfirmDelete = false;
  }
  /*
  loadPage(page: number) {
    /// page è sembre un numero compresso tra gli intervalli accettabili anche se si mette un valore fuori intervalli, assumera Max o min della paginazione
    // questo significa che dipende da gli elemnti totali e elementi da mostrare nella lista
    console.log('pagina reinidirizzata', page);
    //mock della chiamata, dovrebbe avere come paramentro page ma quasto solo faccendo una mock
    this.qaService.getDatasetPage2mock(page).subscribe({
      next: (data) => {
        this.datasetPage = data;
        this.resultMessage = 'la pagina è stata caricata correttamente!';
        this.messageType = 'success';
        this.showMessage = true;
      },
      error: (err) => {
        this.resultMessage = 'la pagina non è stata caricata correttamente!';
        this.messageType = 'error';
        this.showMessage = true;
        console.error('Errore nel caricamento della pagina dataset:', err);
      },
    });
  }
  */
  onCloseMessage() {
    this.showMessage = false;
    this.resultMessage = '';
    this.messageType = 'error';
  }
}
