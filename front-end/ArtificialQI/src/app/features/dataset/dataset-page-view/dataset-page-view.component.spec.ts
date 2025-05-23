import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatasetPageViewComponent } from './dataset-page-view.component';
import { provideHttpClient } from '@angular/common/http';

import { QAService } from '../../../core/services/qa.service';
describe('DatasetPageViewComponent', () => {
  let component: DatasetPageViewComponent;
  let fixture: ComponentFixture<DatasetPageViewComponent>;

  // Mock QAService con i metodi usati nel test
  const mockQAService = {
    deleteQA: jest.fn(),
    updateDatasetPage: jest.fn().mockImplementation((page_n: number) => {
      // Simula la pagina aggiornata dopo l'eliminazione
      return {
        page_n,
        qa_list: [
          { id: 2, question: 'Q2', answer: 'A2' },
        ],
      };
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatasetPageViewComponent],
      providers: [
        provideHttpClient(),
        { provide: QAService, useValue: mockQAService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatasetPageViewComponent);
    component = fixture.componentInstance;

    // Inietta il mock direttamente (se non usi dependency injection tramite provider)
    component['qaService'] = mockQAService as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dovrebbe eliminare il QA selezionato e aggiornare datasetPage', () => {
    component.datasetPage = {
      page_n: 1,
      qa_list: [
        { id: 1, question: 'Q1', answer: 'A1' },
        { id: 2, question: 'Q2', answer: 'A2' },
      ],
    };
    component.idqa = 1;

    component.onQADeleteConfirmed();

    expect(mockQAService.deleteQA).toHaveBeenCalledWith(1);
    expect(mockQAService.updateDatasetPage).toHaveBeenCalledWith(1);

    expect(component.datasetPage.qa_list).toEqual([
      { id: 2, question: 'Q2', answer: 'A2' },
    ]);
  });
});
