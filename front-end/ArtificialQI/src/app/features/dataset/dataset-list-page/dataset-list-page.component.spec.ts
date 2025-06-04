import { render, screen, fireEvent } from '@testing-library/angular';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { DatasetListPageComponent } from './dataset-list-page.component';
import { DatasetService } from '../../../core/services/dataset.service';
import { DatasetNameDialogComponent } from '../../../shared/components/dataset-name-dialog/dataset-name-dialog.component';

// Mock dataset per i test
const mockDatasets = [
  { id: '0', name: 'Dataset Uno', creation_date: new Date() },
  { id: '1', name: 'Dataset Due', creation_date: new Date() },
];

// Mock del servizio DatasetService
const mockDatasetService = {
  getAllDatasets: jest.fn().mockReturnValue(of(mockDatasets)),
  renameDatasetById: jest.fn().mockReturnValue(of(void 0)), // qui ritorniamo un Observable vuoto
  deleteDatasetById: jest.fn().mockReturnValue(of(void 0)),
};

describe('DatasetListPageComponent (con Jest e Angular 19)', () => {
  const mockDialog = {
    open: jest.fn().mockReturnValue({
      afterClosed: () => of(undefined),
    }),
  };

  const renderComponent = async (
    options: {
      providers?: any[];
      componentProperties?: Partial<DatasetListPageComponent>;
    } = {}
  ) => {
    return render(DatasetListPageComponent, {
      componentProviders: [
        { provide: DatasetService, useValue: mockDatasetService },
      ],
      providers: [
        HttpClient,
        HttpHandler,
        provideRouter([]),
        { provide: MatDialog, useValue: mockDialog },
        ...(options.providers || []),
      ],
      componentProperties: options.componentProperties || {},
      imports: [CommonModule],
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dovrebbe creare il componente', async () => {
    const { fixture } = await renderComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('dovrebbe visualizzare il componente di ricerca', async () => {
    const { container } = await renderComponent();
    expect(container.querySelector('app-search-bar')).toBeTruthy();
  });

  it('dovrebbe visualizzare il pulsante per creare un dataset', async () => {
    await renderComponent();

    const button = screen.getByRole('button', { name: /crea dataset/i });
    expect(button).toBeInTheDocument();
  });

  it('dovrebbe visualizzare la lista dei dataset e gli elementi corrispondenti', async () => {
    await renderComponent();

    const listView = screen.getByRole('list');
    expect(listView).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockDatasets.length);

    expect(listItems[0]).toHaveTextContent('Dataset Uno');
    expect(listItems[1]).toHaveTextContent('Dataset Due');
  });

  it('dovrebbe filtrare correttamente i dataset con handleSearchDataset', async () => {
    const { fixture } = await renderComponent();
    const instance = fixture.componentInstance;

    instance.handleSearchDataset('Uno');
    fixture.detectChanges();

    expect(instance.filteredDatasets.length).toBe(1);
    expect(instance.filteredDatasets[0].name).toBe('Dataset Uno');

    const filteredItems = screen.getAllByText(/Dataset Uno/i);
    expect(filteredItems.length).toBe(1);
    expect(filteredItems[0]).toHaveTextContent('Dataset Uno');
  });

  it('dovrebbe chiamare renameDatasetById nel servizio quando si rinomina un dataset', async () => {
    const { fixture } = await renderComponent();
    const instance = fixture.componentInstance;

    instance.renameDataset('0', 'Nome Nuovo');
    expect(mockDatasetService.renameDatasetById).toHaveBeenCalledWith(
      '0', // stringa
      'Nome Nuovo'
    );
  });

  it('dovrebbe chiamare deleteDatasetById nel servizio dopo conferma eliminazione', async () => {
    const { fixture } = await renderComponent();
    const instance = fixture.componentInstance;

    instance.datasetSelected = {
      id: '0',
      name: 'mock',
      creation_date: new Date(),
    };
    instance.onDatasetDeleteConfirmed();

    expect(mockDatasetService.deleteDatasetById).toHaveBeenCalledWith('0');
  });

  it('dovrebbe aprire il dialog quando si clicca il pulsante "Rinomina"', async () => {
    await renderComponent();

    const renameButtons = screen.getAllByText('Rinomina');
    expect(renameButtons.length).toBeGreaterThan(0);

    fireEvent.click(renameButtons[0]);

    expect(mockDialog.open).toHaveBeenCalledWith(DatasetNameDialogComponent, {
      data: { name: 'Dataset Uno', title: 'Rinomina Dataset' },
    });
  });

  it('dovrebbe mostrare conferma eliminazione quando viene richiesto', async () => {
    const { fixture } = await renderComponent({
      componentProperties: {
        filteredDatasets: mockDatasets,
      },
    });

    const instance = fixture.componentInstance;
    instance.onDatasetDeleteRequest(mockDatasets[0]);

    fixture.detectChanges();

    expect(instance.showConfirmDelete).toBe(true);
    expect(instance.datasetSelected).toEqual(mockDatasets[0]);

    const confirmDialog = fixture.nativeElement.querySelector('app-confirm');
    expect(confirmDialog).toBeTruthy();
  });
});
