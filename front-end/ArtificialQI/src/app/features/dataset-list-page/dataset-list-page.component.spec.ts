import { render } from '@testing-library/angular';
import { fireEvent } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import { DatasetListPageComponent } from './dataset-list-page.component';
import { DatasetService, Dataset } from '../dataset.service';
import { provideRouter } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DatasetNameDialogComponent } from '../../shared/dataset-name-dialog/dataset-name-dialog.component';
import { of } from 'rxjs'; // Assicurati di importare 'of'
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
  it('dovrebbe visualizzare il componente di ricerca', async () => {
    const { container } = await render(DatasetListPageComponent, {
      componentProviders: [
        { provide: DatasetService, useValue: mockDatasetService },
      ],
    });
    expect(container.querySelector('app-search-bar')).toBeTruthy();
  });

  it('dovrebbe visualizzare il pulsante per creare un dataset', async () => {
    await render(DatasetListPageComponent, {
      componentProviders: [
        { provide: DatasetService, useValue: mockDatasetService },
      ],
      providers: [provideRouter([])], // Aggiungi l'indirizzo router se necessario
    });

    // Cerca il pulsante per testo visibile
    const button = screen.getByRole('button', { name: /crea dataset/i });
    expect(button).toBeInTheDocument();
  });

  it('dovrebbe reindirizzare alla pagina di creazione dataset quando si clicca su "Crea dataset"', async () => {
    const routerMock = {
      navigate: jest.fn(),
    };

    await render(DatasetListPageComponent, {
      componentProviders: [
        { provide: DatasetService, useValue: mockDatasetService },
        { provide: Router, useValue: routerMock },
      ],
      providers: [provideRouter([])],
    });

    const button = screen.getByRole('button', { name: /crea dataset/i });
    fireEvent.click(button);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/datasetContentPage']);
  });

  it('dovrebbe visualizzare il pulsante per caricare un dataset da un file JSON', async () => {
    const { container } = await render(DatasetListPageComponent, {
      componentProviders: [
        { provide: DatasetService, useValue: mockDatasetService },
      ],
    });
    expect(container.querySelector('app-file-upload')).toBeTruthy();
  });

  it('dovrebbe visualizzare la lista dei dataset, DatasetListView ottenga correttamente la lista dei data set salvati', async () => {
    await render(DatasetListPageComponent, {
      componentProviders: [
        { provide: DatasetService, useValue: mockDatasetService },
      ],
    });

    // Verifica che il sottocomponente DatasetListView sia presente
    const listView = screen.getByRole('list');
    expect(listView).toBeInTheDocument();

    // Verifica che gli elementi siano presenti nella lista
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockDatasets.length); // Due elementi nel mock

    // Verifica che i nomi dei dataset siano visibili
    expect(listItems[0]).toHaveTextContent('Dataset Uno');
    expect(listItems[1]).toHaveTextContent('Dataset Due');
  });

  // Verifica che la funzione di ricerca (handleSearch) filtri correttamente i dati.
  it('DatasetListView dovrebbe ottenere correttamente la lista filtrata dei dataset salvati dopo un operazione di ricercaz, e lo visualizza correttamente gli elementi', async () => {
    const view = await render(DatasetListPageComponent, {
      componentProviders: [
        { provide: DatasetService, useValue: mockDatasetService },
      ],
    });

    const instance = view.fixture.componentInstance;

    instance.handleSearch('Uno');
    view.fixture.detectChanges(); // forza il re-render della view

    expect(instance.filteredDatasets.length).toBe(1);
    expect(instance.filteredDatasets[0].name).toBe('Dataset Uno');

    // Verifica che venga renderizzato 1 solo elemento (il risultato filtrato)

    const listItems = screen.getAllByText(/Dataset Uno/i);
    expect(listItems.length).toBe(1);
    expect(listItems[0]).toHaveTextContent('Dataset Uno');
  });

  //Testa che chiamando renameDataset() venga effettivamente invocato il servizio mock.
  it('DatasetElement dovrebbe ottenere correttamente i dati aggiornati del dataset salvato dopo un operazione di rinominazione', async () => {
    const view = await render(DatasetListPageComponent, {
      componentProviders: [
        { provide: DatasetService, useValue: mockDatasetService },
      ],
    });

    const instance = view.fixture.componentInstance;
    instance.renameDataset(0, 'Nome Nuovo');
    expect(mockDatasetService.renameDataset).toHaveBeenCalledWith(
      0,
      'Nome Nuovo'
    );
  });
  //Simula la chiamata a datasetCopied(index). Verifica che venga chiamato copyDataset(index) sul servizio.

  it('DatasetListView dovrebbe ottenere correttamente la lista aggiornata dei dataset salvati dopo un operazione di copia', async () => {
    const view = await render(DatasetListPageComponent, {
      componentProviders: [
        { provide: DatasetService, useValue: mockDatasetService },
      ],
    });

    const instance = view.fixture.componentInstance;
    instance.datasetCopied(1);
    expect(mockDatasetService.copyDataset).toHaveBeenCalledWith(1);
  });
  //Test simile al precedente, ma verifica l'eliminazione.
  it('DatasetListView dovrebbe ottenere correttamente la lista aggiornata dei dataset salvati dopo un operazione di eliminazione', async () => {
    const view = await render(DatasetListPageComponent, {
      componentProviders: [
        { provide: DatasetService, useValue: mockDatasetService },
      ],
    });

    const instance = view.fixture.componentInstance;
    instance.datasetDeleted(0);
    expect(mockDatasetService.deleteDataset).toHaveBeenCalledWith(0);
  });

  it("dovrebbe aprire il dialog quando l'utente clicca sul pulsante di rinominazione", async () => {
    // Creiamo un mock del MatDialog
    const mockDialog = {
      open: jest.fn().mockReturnValue({
        afterClosed: () => of(undefined), // ritorna un observable dato che la funzione afterClosed() serve ritornare un observable
      }),
    };

    // Renderizza il componente con il mock del MatDialog
    await render(DatasetListPageComponent, {
      providers: [
        { provide: MatDialog, useValue: mockDialog }, // Iniettiamo il mock
        { provide: DatasetService, useValue: mockDatasetService }, // Iniettiamo il mock del servizio
      ],
    });

    // Ottieni tutti i pulsanti "Rinomina"
    const renameButtons = screen.getAllByText('Rinomina'); // Assicurati che il testo corrisponda a quello del tuo template
    // Verifica che esista almeno un pulsante "Rinomina"
    expect(renameButtons.length).toBeGreaterThan(0);
    // Simula un click sul primo pulsante "Rinomina"
    fireEvent.click(renameButtons[0]);
    // Verifica che il dialog sia stato aperto con il componente e i dati giusti
    expect(mockDialog.open).toHaveBeenCalledWith(DatasetNameDialogComponent, {
      data: { name: 'Dataset Uno' }, // A seconda di come gestisci il dataset, puoi adattare questa parte
    });
  });

  it('should create', async () => {
    const { fixture } = await render(DatasetListPageComponent, {
      componentProviders: [
        { provide: DatasetService, useValue: mockDatasetService },
      ],
    });

    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
