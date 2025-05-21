import { render, screen } from '@testing-library/angular';
import { DatasetListViewComponent } from './dataset-list-view.component';
import { DatasetElementComponent } from '../dataset-element/dataset-element.component';
import { DatasetDto } from '../../../core/models/dataset-dto.model';
// Mock dati
const mockDatasets: DatasetDto[] =  [
  {
    id: 1,
    name: 'Dataset Uno',
    last_mod: new Date('2025-05-01'),
    creation: new Date('2025-04-01'),
    origin_id: 0,
    tmp: false,
    max_page: 12,
    element_n: 120,
  },
  {
    id: 2,
    name: 'Dataset Due',
    last_mod: new Date('2025-06-10'),
    creation: new Date('2025-05-10'),
    origin_id: 1,
    tmp: false,
    max_page: 8,
    element_n: 80,
  },
];

describe('DatasetListViewComponent con render()', () => {
  it('mostra la lista dei dataset', async () => {
    await render(DatasetListViewComponent, {
      componentProperties: {
        datasets: mockDatasets,
      },
      declarations: [DatasetElementComponent],
    });

    // Verifica che il componente DatasetListView sia presente
    const listView = screen.getByRole('list');
    expect(listView).toBeInTheDocument();

    // Verifica che gli elementi siano presenti nella lista
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockDatasets.length); // Due elementi nel mock

    // Verifica che i nomi dei dataset siano visibili
    expect(listItems[0]).toHaveTextContent('Dataset Uno');
    expect(listItems[1]).toHaveTextContent('Dataset Due');
  });
  
  it('non mostra la lista se non ci sono dataset', async () => {
    await render(DatasetListViewComponent, {
      componentProperties: {
      datasets: [] // nessun dataset passato
    }
    });
    const noDataMessage  = screen.getByText('Nessun dataset salvato');
    expect(noDataMessage ).toBeInTheDocument();
  });
  
  it('dovrebbe creare correttamente il componente DatasetListViewComponent', async () => {
    const { fixture } = await render(DatasetListViewComponent, {});

    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
