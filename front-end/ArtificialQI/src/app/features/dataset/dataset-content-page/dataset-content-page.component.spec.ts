import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { DatasetContentPageComponent } from './dataset-content-page.component';
import { LLMselectionListComponent } from '../llmselection-list/llmselection-list.component';

import { QAService } from '../../../core/services/qa.service';

const mockActivatedRoute = {
  snapshot: {
    params: { id: 'dataset123' },
    queryParams: {},
    data: {},
  },
  paramMap: of(convertToParamMap({ id: 'dataset123' })),
  queryParamMap: of(convertToParamMap({})),
  queryParams: of({}), // <-- Aggiungi questa riga
};

describe('DatasetContentPageComponent', () => {
  let component: DatasetContentPageComponent;
  let fixture: ComponentFixture<DatasetContentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatasetContentPageComponent],
      providers: [
        provideHttpClient(),
        QAService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatasetContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetContentPageComponent);
    component = fixture.componentInstance;

    // Inizializza con valori validi per evitare undefined nel template
    component.dataset = {
      name: 'Mock Dataset',
      // aggiungi altri campi obbligatori se ce ne sono
    } as any;

    component.datasetPage = {
      // dati mock necessari
    } as any;

    fixture.detectChanges();
  });

  it('dovrebbe aprire il dialog LLMselectionListComponent con i dati corretti', () => {
    const dialog = TestBed.inject(MatDialog);
    const openSpy = jest.spyOn(dialog, 'open').mockReturnValue({
      afterClosed: () => of(undefined),
    } as any);

    // Chiamo direttamente la funzione che apre il dialog
    component.openLlmDialog();

    expect(openSpy).toHaveBeenCalledWith(
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
