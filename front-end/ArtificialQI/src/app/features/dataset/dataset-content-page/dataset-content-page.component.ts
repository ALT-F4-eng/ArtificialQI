import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-dataset-content-page',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    SearchBarComponent,
    DatasetPageViewComponent,
  ],
  templateUrl: './dataset-content-page.component.html',
  styleUrl: './dataset-content-page.component.css',
})
export class DatasetContentPageComponent {
  dataset!: DatasetDto;
  qa_listForCreate: QADto[] = [];
  workingCopy?: DatasetDto;
  datasetPage!: DatasetPageDto;
  detectWokingCopy = false; // booleano per decidere quando si fa un working copy
  // poi tutte le modifiche vengono salvate all'interno del db su workingcopy finche l'utente non decide di salvare tale dataset
  // inpute per pageNavigation della pagina

  mode: 'create' | 'edit' = 'create';

  constructor(
    private qaService: QAService,
    private route: ActivatedRoute,
    private router: Router
  ) {} //private router: Router
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.mode = params['mode'];
      if (this.mode === 'create') {
        this.dataset = emptyDataset; // richiedere db di restituire di creare un dataset
        this.datasetPage = emptyDatasetPage;
      } else if (this.mode === 'edit') {
        // Carica dataset dall'id
        /*
        this.qaService.getDatasetById(this.dataset.id).subscribe(dataset => {
          this.dataset = dataset;
          this.datasetPage = this.qaService.getDatasetPage(this.currentPage);
          this.detectWokingCopy = true;
        });*/
        this.dataset = history.state.dataset; //verrà passata dal componente dataset list page con funzione load
        //chiamata al back-end per avere la prima pagina
        this.qaService.getDatasetPage(1).subscribe({
          next: (page: DatasetPageDto) => {
            this.datasetPage = page;
          },
          error: (err) => {
            console.error(
              'Errore durante il recupero della pagina del dataset:',
              err
            );
          },
        });
        this.detectWokingCopy = true;
      }
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

          /*this.qaService.addQA(result.question, result.answer);
          // dovrei controllare se elementi sono < dell'elementi presenti allinterno del datasetPageDto ,se si allora si aggiorna altrimenti vuoldire che verra aggiunto in coda e non necessita un aggiornamento
          this.datasetPage = this.qaService.updateDatasetPage(
            this.datasetPage.page_n
          );*/
        } else {
          console.log('Hai cliccato Annulla o chiuso il dialog');
        }
      });
    // bisgona gestire cosa fa quando si chiude il dialog
  }
  //nel caso che sia create bisogna anche mostrare il dialogo per segnalare il nome e poi passare da create a edit
  private dialogName = inject(MatDialog);

  saveDataset() {
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
          this.qaService.saveDataset(this.dataset);
          this.router.navigate(['/datasetContentPage', 666], {
            state: { dataset: this.dataset },
            queryParams: { mode: 'edit' },
          });
        }
      });
    }
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
    return !this.datasetPage || this.datasetPage.qa_list.length === 0;
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
}
