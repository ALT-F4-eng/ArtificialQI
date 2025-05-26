import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QADialogComponent } from './qadialog.component';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('QAFormComponent (Jest)', () => {
  let fixture: ComponentFixture<QADialogComponent>;
  let component: QADialogComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QADialogComponent], // essendo standalone
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: jest.fn(),
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Test Title',
            question: 'Domanda di prova',
            answer: 'Risposta di prova',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QADialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('visualizza etichetta della domanda', () => {
    const label = fixture.debugElement.queryAll(By.css('mat-label'))[0]
      .nativeElement;
    expect(label.textContent).toContain('Domanda');
  });

  it('visualizza etichetta della risposta', () => {
    const label = fixture.debugElement.queryAll(By.css('mat-label'))[1]
      .nativeElement;
    expect(label.textContent).toContain('Risposta');
  });

  it('permette inserimento UTF-8 nella domanda', () => {
    const textareaQuestion = fixture.debugElement.queryAll(
      By.css('textarea')
    )[0].nativeElement;
    textareaQuestion.value = 'ñ é ç ü';
    textareaQuestion.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.question).toBe('ñ é ç ü');
  });

  it('permette inserimento UTF-8 nella risposta', () => {
    const textareaAnswer = fixture.debugElement.queryAll(By.css('textarea'))[1]
      .nativeElement;
    textareaAnswer.value = 'ß ô î';
    textareaAnswer.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.answer).toBe('ß ô î');
  });

  it('visualizza il campo di inserimento per la domanda (textarea)', () => {
    const textareas = fixture.debugElement.queryAll(By.css('textarea'));
    expect(textareas.length).toBeGreaterThanOrEqual(1);
  });

  it('visualizza il campo di inserimento per la risposta (textarea)', () => {
    const textareas = fixture.debugElement.queryAll(By.css('textarea'));
    expect(textareas.length).toBeGreaterThanOrEqual(2);
  });

  it('mostra pulsante "Conferma"', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const confirmButton = buttons.find(
      (btn) => btn.nativeElement.textContent.trim().toLowerCase() === 'salva'
    );
    expect(confirmButton).toBeTruthy();
    expect(confirmButton?.nativeElement.textContent).toContain('Salva');
  });

  it('visualizza correttamente il pulsante "Annulla"', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const cancelButton = buttons.find(
      (btn) => btn.nativeElement.textContent.trim().toLowerCase() === 'annulla'
    );

    expect(cancelButton).toBeTruthy();
    expect(cancelButton?.nativeElement.textContent).toContain('Annulla');
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* content page
  it('emette evento con domanda e risposta alla conferma', () => {
    const spy = jest.spyOn(component.add, 'emit');

    component.question = 'Domanda test';
    component.answer = 'Risposta test';
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(spy).toHaveBeenCalledWith({
      question: 'Domanda test',
      answer: 'Risposta test',
    });
  });*/
});
