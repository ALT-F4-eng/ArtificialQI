import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LLMselectionListComponent } from './llmselection-list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';

describe('LLMselectionListComponent', () => {
  let component: LLMselectionListComponent;
  let fixture: ComponentFixture<LLMselectionListComponent>;
  let dialogRefSpy: { close: jest.Mock };
  let datePipe: DatePipe;

  const llmListMock = [
    { name: 'LLM One', last_mod: new Date('2023-01-01T01:00:00') },
    { name: 'LLM Two', last_mod: new Date('2023-02-02T02:00:00') },
  ];

  beforeEach(async () => {
    datePipe = new DatePipe('en-US');
    dialogRefSpy = { close: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [LLMselectionListComponent, MatListModule, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { list: llmListMock, title: 'Seleziona un LLM' },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LLMselectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('visualizza correttamente la lista di LLM con nome + data short', () => {
    const listItems = fixture.debugElement.queryAll(By.css('mat-list-item'));
    expect(listItems.length).toBe(llmListMock.length);

    listItems.forEach((item, index) => {
      const el = item.nativeElement;
      const llm = llmListMock[index];

      // Controlla che ci sia il nome
      expect(el.textContent).toContain(llm.name);

      // Usa DatePipe per formattare la data come nel template (date:"short")
      const formattedDate = datePipe.transform(llm.last_mod, 'short');

      // Verifica che il testo contenga la data formattata
      expect(el.textContent).toContain(formattedDate!);
    });
  });
  
  it('chiama select() e dialogRef.close() con il LLM selezionato al click', () => {
    const listItems = fixture.debugElement.queryAll(By.css('mat-list-item'));
    listItems[0].triggerEventHandler('click', null);

    expect(dialogRefSpy.close).toHaveBeenCalledWith(llmListMock[0]);
  });
});
