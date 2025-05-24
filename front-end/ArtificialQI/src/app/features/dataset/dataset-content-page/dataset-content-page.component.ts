import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

//Dto che serve
import { DatasetDto } from '../../../core/models/dataset-dto.model';
import { DatasetPageDto } from '../../../core/models/datasetpage-dto.model';
import { LlmDto } from '../../../core/models/llm-dto.model';
//service che serve
import { QAService } from '../../../core/services/qa.service';
import { emptyDataset } from '../../../core/models/dataset-dto.model';
import { emptyDatasetPage } from '../../../core/models/datasetpage-dto.model';
// sotto componenti
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { DatasetPageViewComponent } from '../dataset-page-view/dataset-page-view.component';
import { QADialogComponent } from '../qadialog/qadialog.component';
import { LLMselectionListComponent } from '../llmselection-list/llmselection-list.component';
import { PageNavigationComponent } from '../../../shared/components/page-navigation/page-navigation.component';
import { DatasetNameDialogComponent } from '../../../shared/components/dataset-name-dialog/dataset-name-dialog.component';

@Component({
  selector: 'app-dataset-content-page',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    SearchBarComponent,
    DatasetPageViewComponent,
    PageNavigationComponent,
  ],
  templateUrl: './dataset-content-page.component.html',
  styleUrl: './dataset-content-page.component.css',
})
export class DatasetContentPageComponent {
  //dataset!: DatasetDto;
  //datasetQA!: DatasetPageDto;
  dataset!: DatasetDto;
  datasetPage!: DatasetPageDto;
  showTamporaryLabel = false;
  detectWokingCopy = false; // si fa una working copy solo se nel caso l'utente modifica da un dataset caricato
  // poi tutte le modifiche vengono salvate all'interno del db su workingcopy finche l'utente non decide di salvare tale dataset
  // inpute per pageNavigation della pagina
  totalItems = 0;
  pageSize = 5; // dovrebbe essere 20
  currentPage = 1; // di deafult
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
        this.dataset = emptyDataset;
        this.datasetPage = emptyDatasetPage;
        this.showTamporaryLabel = true; // dentro datasetDto ha un campo dato tmp tocca raggionarci sopra
      } else if (this.mode === 'edit') {
        // Carica dataset dall'id
        /*
        this.qaService.getDatasetById(this.dataset.id).subscribe(dataset => {
          this.dataset = dataset;
          this.datasetPage = this.qaService.getDatasetPage(this.currentPage);
          this.detectWokingCopy = true;
        });*/

        this.dataset = this.qaService.getDataset();
        this.datasetPage = this.qaService.getDatasetPage(this.currentPage);
        this.detectWokingCopy = true;
        this.totalItems = 100; // da API o metadato chiedere al back-end
      }
    });
  }

  handleSearchQA(term: string) {
    const normalized = term.toLowerCase();
    this.datasetPage = this.qaService.getDatasetPageFiltered(term);
  }

  // bisognerebbe dire a l'utente di salvare le modifiche altrimenti si perderano i dati modificati,se viene mostrato l'etichetta temporary
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPage(page);
  }

  loadPage(page: number) {
    /// page è sembre un numero compresso tra gli intervalli accettabili anche se si mette un valore fuori intervalli, assumera Max o min della paginazione
    // questo significa che dipende da gli elemnti totali e elementi da mostrare nella lista
    console.log('pagina reinidirizzata', page);
    //mock della chiamata, dovrebbe avere come paramentro page ma quasto solo faccendo una mock
    this.datasetPage = this.qaService.getDatasetPage2mock(page);
    // Simulazione: sostituisci con chiamata HTTP reale
    /*
    this.apiService.getDatasetPage(page, this.pageSize).subscribe((data: DatasetPageDto) => {
      this.datasetPage = data;
    });*/
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
          this.qaService.addQA(result.question, result.answer);
          // dovrei controllare se elementi sono < dell'elementi presenti allinterno del datasetPageDto ,se si allora si aggiorna altrimenti vuoldire che verra aggiunto in coda e non necessita un aggiornamento
          this.datasetPage = this.qaService.updateDatasetPage(
            this.datasetPage.page_n
          );
        } else {
          console.log('Hai cliccato Annulla o chiuso il dialog');
        }
      });
    // this.showTamporaryLabel = true;
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
          this.qaService.saveDataset();
          this.router.navigate(['/datasetContentPage', 88], {
            queryParams: { mode: 'edit' },
          });
        }
      });
    }
    this.showTamporaryLabel = false;
    //detectworkingcopy per dire se deve creare una working copy
    this.detectWokingCopy = true; // nel momento in cui l'utente salva il dataset diventa un dataset caricato
  }

  onChangeShowLabel() {
    //mostra etichetta e fa una copia nel working copy?
    console.log('Hai modificato', this.detectWokingCopy);
    if (this.detectWokingCopy) {
      this.showTamporaryLabel = true;
    }
  }
  
  isDatasetEmpty(): boolean {
    return !this.datasetPage || this.datasetPage.qa_list.length === 0;
  }

  openLlmDialog() {
    const mockLlmList: LlmDto[] = [
      {
        id: 1,
        name: 'GPT-4 Turbo',
        last_mod: new Date('2025-05-01'),
        url: 'https://api.openai.com',
        key_req: 'prompt',
        key_resp: 'choices[0].message.content',
        kv_body: new Array(),
        kv_header: new Array(),
      },
      {
        id: 2,
        name: 'Claude 3 Opus',
        last_mod: new Date('2025-04-20'),
        url: 'https://api.anthropic.com',
        key_req: 'input',
        key_resp: 'completion',
        kv_body: new Array(),
        kv_header: new Array(),
      },
      {
        id: 3,
        name: 'Mistral Large',
        last_mod: new Date('2025-04-15'),
        url: 'https://api.mistral.ai',
        key_req: 'prompt',
        key_resp: 'output',
        kv_body: new Array(),
        kv_header: new Array(),
      },
      {
        id: 4,
        name: 'Gemini Pro 1.5',
        last_mod: new Date('2025-03-30'),
        url: 'https://generativelanguage.googleapis.com',
        key_req: 'contents',
        key_resp: 'candidates[0].content.parts[0].text',
        kv_body: new Array(),
        kv_header: new Array(),
      },
      {
        id: 5,
        name: 'LLaMA 3',
        last_mod: new Date('2025-04-10'),
        url: 'https://api.meta.ai',
        key_req: 'prompt',
        key_resp: 'response',
        kv_body: new Array(),
        kv_header: new Array(),
      },
    ];

    const dialogRef = this.dialog.open(LLMselectionListComponent, {
      width: '95vw', // 95% della larghezza della finestra
      maxHeight: '90vh', // 90% dell'altezza della finestra
      data: { title: 'Scegli un modello LLM', list: mockLlmList },
    });

    dialogRef.afterClosed().subscribe((selected: LlmDto | undefined) => {
      if (selected) {
        console.log('Hai selezionato:', selected);
      }
    });
  }
}

/* servira nel futuro quando i dati vengono forniti dal database e api bisognerebbe utilizzare async
this.qaService.getDatasetAsync().subscribe(data => {
    this.dataset = data;
    if (this.dataset) {
      // modifica
      console.log(this.dataset.name);
    } else {
      // creazione da zero
    }*/
