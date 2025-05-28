import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatasetPageViewComponent } from './dataset-page-view.component';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { QAService } from '../../../core/services/qa.service';

import { ConfirmComponent } from '../../../core/components/confirm/confirm.component';
// Mock per app-qalist-view
@Component({
  selector: 'app-qalist-view',
  standalone: true,
  template: '<div>Mock QA List View</div>',
})
class MockQAListViewComponent {
  @Input() qaList: any;
  @Output() modify = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
}
// Mock per app-page-navigation
@Component({
  selector: 'app-page-navigation',
  template: '',
  standalone: true,
})
class MockPageNavigationComponent {
  @Input() totalItems!: number;
  @Input() pageSize!: number;
  @Input() currentPage!: number;
  @Output() pageChange = new EventEmitter<number>();
}

// Aggiungi questa funzione al mockQAService
const mockQAService = {
  deleteQA: jest.fn(),
  modifyDatasetPage: jest.fn(),
  updateDatasetPage: jest.fn().mockImplementation((page_n: number) => {
    return {
      page_n,
      qa_list: [{ id: 2, question: 'Q2', answer: 'A2' }],
    };
  }),
  getDatasetPage2mock: jest.fn().mockImplementation((page_n: number) => {
    if (page_n === 2) {
      return {
        page_n: 2,
        qa_list: [
          { id: 3, question: 'Domanda pagina 2', answer: 'Risposta pagina 2' },
        ],
      };
    }
    return null;
  }),
};

describe('DatasetPageViewComponent', () => {
  let component: DatasetPageViewComponent;
  let fixture: ComponentFixture<DatasetPageViewComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DatasetPageViewComponent,
        MockQAListViewComponent,
        MockPageNavigationComponent,
      ],
      providers: [
        provideHttpClient(),
        { provide: QAService, useValue: mockQAService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatasetPageViewComponent);
    component = fixture.componentInstance;

    // Inietto mockQAService direttamente (se non usi DI tramite provider)
    component['qaService'] = mockQAService as any;
    component.totalItems = 20;
    component.pageSize = 10;
    component.currentPage = 1;

    fixture.detectChanges();
  });
  it('dovrebbe visualizzare app-qalist-view con la lista corretta di domande e risposte', () => {
    component.datasetPage = {
      page_n: 1,
      qa_list: [
        { id: 1, question: 'Domanda 1', answer: 'Risposta 1' },
        { id: 2, question: 'Domanda 2', answer: 'Risposta 2' },
      ],
    };

    fixture.detectChanges();

    // Trovo l'elemento app-qalist-view nel DOM
    const qaListElement =
      fixture.nativeElement.querySelector('app-qalist-view');
    expect(qaListElement).toBeTruthy();
  });

  it('dovrebbe mostrare la sezione di navigazione tra le pagine', () => {
    // Assicurati che il componente sia nel DOM, indipendentemente da input e stato
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const pageNav = compiled.querySelector('app-page-navigation');

    expect(pageNav).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // test di integrazione
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

  it('dovrebbe caricare la nuova pagina e aggiornare qaList in app-qalist-view', () => {
    const spy = jest.spyOn(mockQAService, 'getDatasetPage2mock');

    // Inizializza datasetPage per evitare errori TS
    component.datasetPage = { page_n: 1, qa_list: [] };

    component.loadPage(2);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(2);
    expect(component.datasetPage?.page_n).toBe(2);
    expect(component.datasetPage?.qa_list).toEqual([
      { id: 3, question: 'Domanda pagina 2', answer: 'Risposta pagina 2' },
    ]);
  });
});
