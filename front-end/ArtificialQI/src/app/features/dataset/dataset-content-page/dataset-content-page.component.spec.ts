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
const MOCK_DATASET = { id: 1, name: 'Test Dataset' };
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
  getDatasetPage2mock: jest.fn().mockReturnValue(MOCK_DATASETPAGEQA),
  getDatasetPageFiltered: jest.fn().mockReturnValue(MOCK_DATASETPAGEQA),
  modifyDatasetPage: jest.fn(),
  deleteQA: jest.fn(),
  createDataset: jest.fn(),
  generateUniqueId: jest.fn(),
};

const mockDialog = {
  open: jest.fn().mockReturnValue({
    afterClosed: () => of(undefined),
  }),
};

describe('DatasetContentPageComponent', () => {
  let component: DatasetContentPageComponent;
  let fixture: ComponentFixture<DatasetContentPageComponent>;

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

    // Imposta dati iniziali validi
    component.dataset = MOCK_DATASET as any;
    component.datasetPage = MOCK_DATASETPAGEQA as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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


});
