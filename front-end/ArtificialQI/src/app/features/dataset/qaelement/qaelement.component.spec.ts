import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QAElementComponent } from './qaelement.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { QADto } from '../../../core/models/qa-dto.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';

describe('QAElementComponent', () => {
  let component: QAElementComponent;
  let fixture: ComponentFixture<QAElementComponent>;
  let mockDialog: any;

  beforeEach(async () => {
    mockDialog = {
      open: jest.fn().mockReturnValue({
        afterClosed: () => ({
          subscribe: (cb: Function) =>
            cb({ question: 'Q mod', answer: 'A mod' }),
        }),
      }),
    };

    await TestBed.configureTestingModule({
      imports: [QAElementComponent, MatDialogModule, NoopAnimationsModule],
      providers: [{ provide: MatDialog, useValue: mockDialog }],
    }).compileComponents();

    fixture = TestBed.createComponent(QAElementComponent);
    component = fixture.componentInstance;

    // Sample data
    component.qa = {
      id: 1,
      question: 'Domanda',
      answer: 'Risposta',
    };

    fixture.detectChanges();
  });

  it('visualizza correttamente la domanda', () => {
    const questionEl = fixture.debugElement.nativeElement.querySelector(
      '.info div:first-child'
    );
    expect(questionEl.textContent).toContain('Domanda');
  });

  it('visualizza correttamente la risposta', () => {
    const answerEl = fixture.debugElement.nativeElement.querySelector(
      '.info div:nth-child(3)'
    );
    expect(answerEl.textContent).toContain('Risposta');
  });

  it('mostra un messaggio di avvertimento se la domanda è vuota', () => {
    component.qa = { id: 1, question: '', answer: 'Risposta' };
    fixture.detectChanges();

    const warning = fixture.nativeElement.querySelector('span');
    expect(warning.textContent).toContain('La domanda è vuota');
  });

  it('mostra un messaggio di avvertimento se la risposta è vuota', () => {
    component.qa = { id: 1, question: 'Domanda', answer: '' };
    fixture.detectChanges();

    const warnings = fixture.nativeElement.querySelectorAll('span');
    expect(warnings[0].textContent).toContain('La risposta è vuota');
  });

  it('visualizza il pulsante Modifica', () => {
    const modifyBtn = fixture.debugElement.query(
      By.css('button:nth-of-type(1)')
    );
    expect(modifyBtn.nativeElement.textContent).toContain('Modifica');
  });

  it('chiama la funzione di modifica alla pressione del pulsante Modifica', () => {
    const spy = jest.spyOn(component.modifySignal, 'emit');
    const button = fixture.debugElement.query(By.css('button:nth-of-type(1)'));
    button.nativeElement.click();

    expect(mockDialog.open).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith({
      id: 1,
      question: 'Q mod',
      answer: 'A mod',
    });
  });

  it('visualizza il pulsante Elimina', () => {
    const deleteBtn = fixture.debugElement.query(
      By.css('button:nth-of-type(2)')
    );
    expect(deleteBtn.nativeElement.textContent).toContain('Elimina');
  });

  it('emette deleteSignal alla pressione del pulsante Elimina', () => {
    const spy = jest.spyOn(component.deleteSignal, 'emit');
    const button = fixture.debugElement.query(By.css('button:nth-of-type(2)'));
    button.nativeElement.click();

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('non emette nulla se viene chiuso il dialog di modifica senza salvare', () => {
    // Finta chiusura senza dati
    mockDialog.open = jest.fn().mockReturnValue({
      afterClosed: () => ({
        subscribe: (cb: Function) => cb(null),
      }),
    });

    const spy = jest.spyOn(component.modifySignal, 'emit');
    const button = fixture.debugElement.query(By.css('button:nth-of-type(1)'));
    button.nativeElement.click();

    expect(spy).not.toHaveBeenCalled();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
