import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QAListViewComponent } from './qalist-view.component';
import { QAElementComponent } from '../qaelement/qaelement.component';
import { By } from '@angular/platform-browser';
import { QADto } from '../../../core/models/qa-dto.model';

describe('QAListViewComponent', () => {
  let component: QAListViewComponent;
  let fixture: ComponentFixture<QAListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QAListViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QAListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('dovrebbe visualizzare la lista di domande e risposte', () => {
    const qaListMock: QADto[] = [
      { id: 1, question: 'Domanda 1', answer: 'Risposta 1' },
      { id: 2, question: 'Domanda 2', answer: 'Risposta 2' },
    ];

    component.qaList = qaListMock;
    fixture.detectChanges();

    // Controlla che ci siano due <app-qaelement> renderizzati
    const qaElements = fixture.debugElement.queryAll(By.css('app-qaelement'));
    expect(qaElements.length).toBe(2);

    // Puoi anche verificare che il primo elemento abbia il dato corretto in input
    const firstQAElement = qaElements[0]
      .componentInstance as QAElementComponent;
    expect(firstQAElement.qa).toEqual(qaListMock[0]);
  });

  it('dovrebbe mostrare messaggio quando qaList è vuota o assente', () => {
    component.qaList = [];
    fixture.detectChanges();

    const messageEl = fixture.nativeElement.querySelector('p.empty-message');
    expect(messageEl.textContent).toContain(
      'Nessuna coppia di domanda e risposta presente'
    );
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
