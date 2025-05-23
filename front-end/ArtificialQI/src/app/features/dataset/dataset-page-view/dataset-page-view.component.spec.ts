import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatasetPageViewComponent } from './dataset-page-view.component';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

import { QAService } from '../../../core/services/qa.service';

import { ConfirmComponent } from '../../../core/components/confirm/confirm.component';
describe('DatasetPageViewComponent', () => {
  let component: DatasetPageViewComponent;
  let fixture: ComponentFixture<DatasetPageViewComponent>;

  // Mock QAService con i metodi usati nel test
  const mockQAService = {
    deleteQA: jest.fn(),
    modifyDatasetPage: jest.fn(),

    updateDatasetPage: jest.fn().mockImplementation((page_n: number) => {
      // Simula la pagina aggiornata dopo l'eliminazione
      return {
        page_n,
        qa_list: [{ id: 2, question: 'Q2', answer: 'A2' }],
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

  it('dovrebbe modificare la QA e aggiornare la lista', () => {
    // Dataset iniziale
    component.datasetPage = {
      page_n: 1,
      qa_list: [
        { id: 1, question: 'Domanda iniziale', answer: 'Risposta iniziale' },
      ],
    };

    // Mock del servizio: modifica diretta dell'oggetto QA nel datasetPage
    mockQAService.modifyDatasetPage = jest
      .fn()
      .mockImplementation((id, question, answer) => {
        const qa = component.datasetPage!.qa_list.find((qa) => qa.id === id);
        if (qa) {
          qa.question = question;
          qa.answer = answer;
        }
      });

    // Spia sull'evento
    const spyEmit = jest.spyOn(component.modifyEventShowLabel, 'emit');

    // Azione
    component.modifyQA(1, 'Domanda modificata', 'Risposta modificata');

    // Verifica
    const updatedQA = component.datasetPage.qa_list.find((qa) => qa.id === 1);
    expect(updatedQA).toEqual({
      id: 1,
      question: 'Domanda modificata',
      answer: 'Risposta modificata',
    });

    expect(mockQAService.modifyDatasetPage).toHaveBeenCalledWith(
      1,
      'Domanda modificata',
      'Risposta modificata'
    );
    expect(spyEmit).toHaveBeenCalled();
  });


   it('dovrebbe mostrare ConfirmComponent alla richiesta di eliminazione di una QA', () => {
    // Simula evento di richiesta di eliminazione (esempio: id 1)
    component.onQADeleteRequest(1);
    fixture.detectChanges();

    // Verifica che la variabile booleana per mostrare confirm sia true
    expect(component.showConfirmDelete).toBe(true);

    // Verifica che nel DOM sia presente il ConfirmComponent
    const confirmComp = fixture.debugElement.query(
      By.directive(ConfirmComponent)
    );
    expect(confirmComp).toBeTruthy();
  });
  

});
