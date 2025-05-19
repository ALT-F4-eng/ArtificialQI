import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

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
  //dataset!: DatasetDto;
  //datasetQA!: DatasetPageDto;
  dataset!: DatasetDto;
  datasetPage!: DatasetPageDto;

  constructor(private qaService: QAService, private route: ActivatedRoute) {} //private router: Router
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
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
  } /*
  modifyQA(qa: QADto) {
      console.log('Nuova domanda:', qa.question, 'Nuova risposta:', qa.answer);
      this.modify.emit(qa);
    }*/
  saveDataset() {}

  private dialog = inject(MatDialog);
  addQA() {
    const dialogRef = this.dialog.open(QADialogComponent, {
      //width: '95vw', // 95% della larghezza della finestra
      //: '90vh', // 90% dell'altezza della finestra

      data: { title: 'Crea nuova QA', question: '', answer: '' },
    });
    // bisgona gestire cosa fa quando si chiude il dialog
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
        kv_body: new Set(),
        kv_header: new Set(),
      },
      {
        id: 2,
        name: 'Claude 3 Opus',
        last_mod: new Date('2025-04-20'),
        url: 'https://api.anthropic.com',
        key_req: 'input',
        key_resp: 'completion',
        kv_body: new Set(),
        kv_header: new Set(),
      },
      {
        id: 3,
        name: 'Mistral Large',
        last_mod: new Date('2025-04-15'),
        url: 'https://api.mistral.ai',
        key_req: 'prompt',
        key_resp: 'output',
        kv_body: new Set(),
        kv_header: new Set(),
      },
      {
        id: 4,
        name: 'Gemini Pro 1.5',
        last_mod: new Date('2025-03-30'),
        url: 'https://generativelanguage.googleapis.com',
        key_req: 'contents',
        key_resp: 'candidates[0].content.parts[0].text',
        kv_body: new Set(),
        kv_header: new Set(),
      },
      {
        id: 5,
        name: 'LLaMA 3',
        last_mod: new Date('2025-04-10'),
        url: 'https://api.meta.ai',
        key_req: 'prompt',
        key_resp: 'response',
        kv_body: new Set(),
        kv_header: new Set(),
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
