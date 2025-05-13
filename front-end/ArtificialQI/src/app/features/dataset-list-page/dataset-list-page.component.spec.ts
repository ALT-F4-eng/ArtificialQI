import { render } from '@testing-library/angular';
import { DatasetListPageComponent } from './dataset-list-page.component';
import { DatasetService, Dataset } from '../dataset.service';

// Mock dati
const mockDatasets: Dataset[] = [
  { name: 'Dataset Uno', lastModified: new Date('2023-01-01') },
  { name: 'Dataset Due', lastModified: new Date('2023-02-02') },
];

// Mock del servizio
const mockDatasetService = {
  getDataset: jest.fn(() => [...mockDatasets]),
  renameDataset: jest.fn(),
  copyDataset: jest.fn(),
  deleteDataset: jest.fn(),
};

describe('DatasetListPageComponent (Jest)', () => {
    // Verifica che getDataset() sia stato chiamato → segnale che il componente ha cercato di caricare i dati al ngOnInit.
  it('dovrebbe renderizzare e caricare i dataset', async () => {
    await render(DatasetListPageComponent, {
      componentProviders: [{ provide: DatasetService, useValue: mockDatasetService }],
    });

    expect(mockDatasetService.getDataset).toHaveBeenCalled();

    // Non verifichiamo il DOM completo, ma si potrebbe usare getByText()
  });
  // Verifica che la funzione di ricerca (handleSearch) filtri correttamente i dati.
  it('filtra i dataset correttamente', async () => {
    const view = await render(DatasetListPageComponent, {
      componentProviders: [{ provide: DatasetService, useValue: mockDatasetService }],
    });

    const instance = view.fixture.componentInstance;
    instance.handleSearch('Uno');
    expect(instance.filteredDatasets.length).toBe(1);
    expect(instance.filteredDatasets[0].name).toBe('Dataset Uno');
  });
  //Testa che chiamando renameDataset() venga effettivamente invocato il servizio mock.
  it('rinomina un dataset', async () => {
    const view = await render(DatasetListPageComponent, {
      componentProviders: [{ provide: DatasetService, useValue: mockDatasetService }],
    });

    const instance = view.fixture.componentInstance;
    instance.renameDataset(0, 'Nome Nuovo');
    expect(mockDatasetService.renameDataset).toHaveBeenCalledWith(0, 'Nome Nuovo');
  });
    //Simula la chiamata a datasetCopied(index). Verifica che venga chiamato copyDataset(index) sul servizio.


  it('clona un dataset', async () => {
    const view = await render(DatasetListPageComponent, {
      componentProviders: [{ provide: DatasetService, useValue: mockDatasetService }],
    });

    const instance = view.fixture.componentInstance;
    instance.datasetCopied(1);
    expect(mockDatasetService.copyDataset).toHaveBeenCalledWith(1);
  });
    //Test simile al precedente, ma verifica l'eliminazione.
  it('elimina un dataset', async () => {
    const view = await render(DatasetListPageComponent, {
      componentProviders: [{ provide: DatasetService, useValue: mockDatasetService }],
    });

    const instance = view.fixture.componentInstance;
    instance.datasetDeleted(0);
    expect(mockDatasetService.deleteDataset).toHaveBeenCalledWith(0);
  });
});
