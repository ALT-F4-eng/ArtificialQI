import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { DatasetContentPageComponent } from './dataset-content-page.component';
import { LLMselectionListComponent } from '../llmselection-list/llmselection-list.component';
import { QAListViewComponent } from '../qalist-view/qalist-view.component';

import { QAService } from '../../../core/services/qa.service';

import { DatasetPageDto } from '../../../core/models/datasetpage-dto.model';
import { DatasetDto } from '../../../core/models/dataset-dto.model';

const mockActivatedRoute = {
  snapshot: {
    params: { id: 'dataset123' },
    queryParams: { mode: 'edit' },
    data: {},
  },
  paramMap: of(convertToParamMap({ id: 'dataset123' })),
  queryParamMap: of(convertToParamMap({ mode: 'edit' })),
  queryParams: of({ mode: 'edit' }),
};

// Mock data
const MOCK_DATASET: DatasetDto = {
  id: 1,
  name: 'Test Dataset',
  last_mod: new Date(),
  creation: new Date(),
  origin_id: 0,
  tmp: true, 
  max_page: 5,
  element_n: 20,
};

const MOCK_DATASETPAGEQA: DatasetPageDto = {
  page_n: 1,
  qa_list: [
    { id: 1, question: 'Q1', answer: 'A1' },
    { id: 2, question: 'Q2', answer: 'A2' },
  ],
};

// Mock services
const mockQAService = {
  getDataset: jest.fn().mockReturnValue(MOCK_DATASET),
  getDatasetPage: jest.fn().mockReturnValue(MOCK_DATASETPAGEQA),
  getDatasetPage2mock: jest.fn().mockReturnValue({
    page_n: 2,
    qa_list: [
      { id: 3, question: 'Domanda pagina 2', answer: 'Risposta pagina 2' },
    ],
  }),
  getDatasetPageFiltered: jest.fn().mockReturnValue(MOCK_DATASETPAGEQA),
  modifyDatasetPage: jest.fn(),
  deleteQA: jest.fn(),
  createDataset: jest.fn(),
  generateUniqueId: jest.fn(),
  saveDataset:jest.fn(),
  addQA: jest.fn(),
  updateDatasetPage: jest.fn().mockReturnValue({
    page_n: 1,
    qa_list: [
      { id: 1, question: 'Esistente', answer: 'Risposta' },
      { id: 2, question: 'Nuova domanda', answer: 'Nuova risposta' },
    ],
  }),
};

const mockDialog = {
  open: jest.fn().mockReturnValue({
    afterClosed: () => of(undefined),
  }),
};

describe('DatasetContentPageComponent', () => {
  let component: DatasetContentPageComponent;
  let fixture: ComponentFixture<DatasetContentPageComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatasetContentPageComponent],
      providers: [
        provideHttpClient(),
        { provide: QAService, useValue: mockQAService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatasetContentPageComponent);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    // Imposta dati iniziali validi
    component.dataset = MOCK_DATASET as any;
    component.datasetPage = MOCK_DATASETPAGEQA as any;

    fixture.detectChanges();
  });

  it('dovrebbe visualizzare il nome del dataset', () => {
  component.dataset = MOCK_DATASET;
  fixture.detectChanges();
  const compiled = fixture.nativeElement as HTMLElement;
  expect(compiled.textContent).toContain(component.dataset.name);
});
  it('dovrebbe visualizzare l\'etichetta "Temporaneo" se il dataset è tmp', () => {
    component.dataset = { ...MOCK_DATASET, tmp: true };
    component.showTamporaryLabel = true;
    fixture.detectChanges();
    expect(nativeEl.textContent).toContain('Temporaneo');
  });

it('dovrebbe mostrare il pulsante "Esegui Test"', () => {
  fixture.detectChanges();
    expect(nativeEl.textContent).toContain('Test Dataset');
});

it('dovrebbe disabilitare il pulsante di test se il dataset è vuoto', () => {
    component.datasetPage = { page_n: 1, qa_list: [] };
    fixture.detectChanges();
    const buttons = nativeEl.querySelectorAll('button');
    const testButton = Array.from(buttons).find(btn =>
      btn.textContent?.includes('Test Dataset')
    );
    expect(testButton?.hasAttribute('disabled') || testButton?.getAttribute('disabled') !== null).toBe(true);
  });

it('dovrebbe visualizzare il pulsante "Salva"', () => {
    fixture.detectChanges();
    expect(nativeEl.textContent).toContain('Salva le modifiche');
  });

it('dovrebbe chiamare la funzione di salvataggio quando si clicca "Salva"', () => {
    const spy = jest.spyOn(component, 'saveDataset');
    fixture.detectChanges();

    const buttons = nativeEl.querySelectorAll('button');
    const saveButton = Array.from(buttons).find(btn =>
      btn.textContent?.includes('Salva le modifiche')
    );
    saveButton?.click();

    expect(spy).toHaveBeenCalled();
  });

it('dovrebbe visualizzare la barra di ricerca', () => {
    fixture.detectChanges();
    const searchBar = nativeEl.querySelector('app-search-bar');
    expect(searchBar).toBeTruthy();
  });
 it('dovrebbe visualizzare il pulsante per l\'inserimento QA', () => {
    fixture.detectChanges();
    const addButton = Array.from(nativeEl.querySelectorAll('button')).find(b =>
      b.textContent?.includes('addQA')
    );
    expect(addButton).toBeTruthy();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test di intergrazione
  it('dovrebbe aprire il dialog LLMselectionListComponent con i dati corretti', () => {
    component.openLlmDialog();

    expect(mockDialog.open).toHaveBeenCalledWith(
      LLMselectionListComponent,
      expect.objectContaining({
        width: '95vw',
        maxHeight: '90vh',
        data: expect.objectContaining({
          title: 'Scegli un modello LLM',
          list: expect.any(Array),
        }),
      })
    );
  });
  // testa la carica
  it('dovrebbe recuperare correttamente la lista delle coppie di domande e risposte salvati da QAService', () => {
    const spy = jest
      .spyOn(mockQAService, 'getDatasetPage')
      .mockReturnValue(MOCK_DATASETPAGEQA);

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith(1); // numero pagina di default
    expect(component.datasetPage).toEqual(MOCK_DATASETPAGEQA);
    expect(component.datasetPage.qa_list).toEqual([
      { id: 1, question: 'Q1', answer: 'A1' },
      { id: 2, question: 'Q2', answer: 'A2' },
    ]);
  });

  it('dovrebbe passare correttamente qa_list a QAListViewComponent', () => {
    // Dati di test
    component.datasetPage = {
      page_n: 1,
      qa_list: [
        { id: 1, question: 'Q1', answer: 'A1' },
        { id: 2, question: 'Q2', answer: 'A2' },
      ],
    };
    fixture.detectChanges();

    // Trovo il componente figlio QAListView nel DOM del test
    const qaListViewDE = fixture.debugElement.query(
      By.directive(QAListViewComponent)
    );
    expect(qaListViewDE).toBeTruthy();

    const qaListViewInstance =
      qaListViewDE.componentInstance as QAListViewComponent;
    expect(qaListViewInstance.qaList).toEqual(component.datasetPage.qa_list);
  });

  it('should call getDatasetPageFiltered on QAService and update datasetPage', () => {
    const qaService = TestBed.inject(QAService);

    // Spia sul metodo reale
    const spy = jest
      .spyOn(qaService, 'getDatasetPageFiltered')
      .mockReturnValue(MOCK_DATASETPAGEQA);

    const searchTerm = 'italia';
    component.handleSearchQA(searchTerm);

    expect(spy).toHaveBeenCalledWith(searchTerm); // verifica chiamata
    expect(component.datasetPage).toEqual(MOCK_DATASETPAGEQA); // verifica aggiornamento
  });

  it('dovrebbe chiamare addQA e poi updateDatasetPage, aggiornando qaList in QAListViewComponent', () => {
    const mockQA = { question: 'Nuova domanda', answer: 'Nuova risposta' };

    // Spie sui metodi QAService
    const addQASpy = jest.spyOn(mockQAService, 'addQA');
    const updateDatasetSpy = jest
      .spyOn(mockQAService, 'updateDatasetPage')
      .mockReturnValue({
        page_n: 1,
        qa_list: [
          { id: 1, question: 'Esistente', answer: 'Risposta' },
          { id: 2, question: 'Nuova domanda', answer: 'Nuova risposta' },
        ],
      });

    // Simula dialog che ritorna il nuovo QA
    mockDialog.open = jest.fn().mockReturnValue({
      afterClosed: () => of(mockQA),
    });

    component.addQA(); // chiamata della funzione
    fixture.detectChanges(); // trigger change detection

    // Verifica chiamate
    expect(addQASpy).toHaveBeenCalledWith(mockQA.question, mockQA.answer);
    expect(updateDatasetSpy).toHaveBeenCalledWith(1);

    // Verifica aggiornamento in QAListViewComponent
    const qaListViewDE = fixture.debugElement.query(
      By.directive(QAListViewComponent)
    );
    const qaListViewInstance =
      qaListViewDE.componentInstance as QAListViewComponent;

    expect(qaListViewInstance.qaList).toEqual([
      { id: 1, question: 'Esistente', answer: 'Risposta' },
      { id: 2, question: 'Nuova domanda', answer: 'Nuova risposta' },
    ]);
  });


  it('deve restituire i risultati filtrati sotto forma di lista quando si effettua una ricerca', () => {
    // Mock dati filtrati
    const filteredData = {
      page_n: 1,
      qa_list: [{ id: 99, question: 'Italia è un paese?', answer: 'Sì' }],
    };

    // Mock il metodo del servizio
    const qaService = TestBed.inject(QAService);
    jest
      .spyOn(qaService, 'getDatasetPageFiltered')
      .mockReturnValue(filteredData);

    // Esegui la ricerca
    component.handleSearchQA('italia');
    fixture.detectChanges();

    // Verifica datasetPage aggiornato
    expect(component.datasetPage).toEqual(filteredData);

    // Verifica che QAListView riceva il nuovo qa_list
    const qaListViewDE = fixture.debugElement.query(
      By.directive(QAListViewComponent)
    );
    const qaListInstance = qaListViewDE.componentInstance;

    expect(qaListInstance.qaList).toEqual(filteredData.qa_list);
  });
});
