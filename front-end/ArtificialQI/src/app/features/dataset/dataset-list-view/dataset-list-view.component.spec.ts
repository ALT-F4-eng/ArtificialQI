import { render, screen } from '@testing-library/angular';
import { DatasetListViewComponent } from './dataset-list-view.component';
import { DatasetElementComponent } from '../dataset-element/dataset-element.component';
import { Dataset } from '../../dataset.service';

// Mock dati
const mockDatasets: Dataset[] = [
  { name: 'Dataset Uno', lastModified: new Date('2023-01-01') },
  { name: 'Dataset Due', lastModified: new Date('2023-02-02') },
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

  it('dovrebbe creare correttamente il componente DatasetListViewComponent', async () => {
    const { fixture } = await render(DatasetListViewComponent, {});

    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
