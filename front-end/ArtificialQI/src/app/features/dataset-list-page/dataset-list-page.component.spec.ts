import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { DatasetListPageComponent } from './dataset-list-page.component';
import { DatasetService, Dataset } from '../dataset.service';
import { of } from 'rxjs';

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
  it('dovrebbe renderizzare e caricare i dataset', async () => {
    await render(DatasetListPageComponent, {
      componentProviders: [{ provide: DatasetService, useValue: mockDatasetService }],
    });

    expect(mockDatasetService.getDataset).toHaveBeenCalled();

    // Non verifichiamo il DOM completo, ma si potrebbe usare getByText()
  });

  it('filtra i dataset correttamente', async () => {
    const view = await render(DatasetListPageComponent, {
      componentProviders: [{ provide: DatasetService, useValue: mockDatasetService }],
    });

    const instance = view.fixture.componentInstance;
    instance.handleSearch('Uno');
    expect(instance.filteredDatasets.length).toBe(1);
    expect(instance.filteredDatasets[0].name).toBe('Dataset Uno');
  });

  it('rinomina un dataset', async () => {
    const view = await render(DatasetListPageComponent, {
      componentProviders: [{ provide: DatasetService, useValue: mockDatasetService }],
    });

    const instance = view.fixture.componentInstance;
    instance.renameDataset(0, 'Nome Nuovo');
    expect(mockDatasetService.renameDataset).toHaveBeenCalledWith(0, 'Nome Nuovo');
  });

  it('clona un dataset', async () => {
    const view = await render(DatasetListPageComponent, {
      componentProviders: [{ provide: DatasetService, useValue: mockDatasetService }],
    });

    const instance = view.fixture.componentInstance;
    instance.datasetCopied(1);
    expect(mockDatasetService.copyDataset).toHaveBeenCalledWith(1);
  });

  it('elimina un dataset', async () => {
    const view = await render(DatasetListPageComponent, {
      componentProviders: [{ provide: DatasetService, useValue: mockDatasetService }],
    });

    const instance = view.fixture.componentInstance;
    instance.datasetDeleted(0);
    expect(mockDatasetService.deleteDataset).toHaveBeenCalledWith(0);
  });
});
