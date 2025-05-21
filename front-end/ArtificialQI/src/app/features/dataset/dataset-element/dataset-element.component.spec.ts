import { render, screen, fireEvent } from '@testing-library/angular';
import { DatasetElementComponent } from './dataset-element.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { DatasetDto } from '../../../core/models/dataset-dto.model';
const mockDataset: DatasetDto = {
  id: 1,
  name: 'Dataset Alpha',
  last_mod: new Date('2025-05-01'),
  creation: new Date('2025-04-01'),
  origin_id: 0,
  tmp: false,
  max_page: 12,
  element_n: 120,
};

describe('DatasetElementComponent', () => {
  it('dovrebbe visualizzare correttamente il nome del dataset', async () => {
    await render(DatasetElementComponent, {
      componentProperties: { dataset: mockDataset },
      imports: [MatButtonModule, MatCardModule],
    });

    const nameElement = screen.getByText('Dataset Alpha');
    expect(nameElement).toBeInTheDocument();
  });

  it("dovrebbe visualizzare correttamente la data dell'ultima modifica", async () => {
    await render(DatasetElementComponent, {
      componentProperties: { dataset: mockDataset },
      imports: [MatButtonModule, MatCardModule, DatePipe],
    });
    const datePipe = new DatePipe('en-US'); // o 'it-IT'
    const expectedDate = datePipe.transform(mockDataset.last_mod, 'short');
    const dateElement = screen.getByText(`Ultima modifica: ${expectedDate}`);
    expect(dateElement).toBeInTheDocument();
  });

  it('dovrebbe visualizzare correttamente il pulsante di rinominazione', async () => {
    await render(DatasetElementComponent, {
      componentProperties: { dataset: mockDataset },
      imports: [MatButtonModule, MatCardModule],
    });

    const renameButton = screen.getByText('Rinomina');
    expect(renameButton).toBeInTheDocument();
  });

  it('dovrebbe visualizzare correttamente il pulsante di clonazione', async () => {
    await render(DatasetElementComponent, {
      componentProperties: { dataset: mockDataset },
      imports: [MatButtonModule, MatCardModule],
    });

    const copyButton = screen.getByText('Copia');
    expect(copyButton).toBeInTheDocument();
  });

  it('dovrebbe visualizzare correttamente il pulsante di eliminazione', async () => {
    await render(DatasetElementComponent, {
      componentProperties: { dataset: mockDataset },
      imports: [MatButtonModule, MatCardModule],
    });

    const deleteButton = screen.getByText('Elimina');
    expect(deleteButton).toBeInTheDocument();
  });

  it('dovrebbe visualizzare correttamente il pulsante di caricamento', async () => {
    await render(DatasetElementComponent, {
      componentProperties: { dataset: mockDataset },
      imports: [MatButtonModule, MatCardModule],
    });

    const loadButton = screen.getByText('Carica');
    expect(loadButton).toBeInTheDocument();
  });

  it('dovrebbe emettere copyClicked quando si preme il pulsante "Copia Dataset"', async () => {
    const { fixture } = await render(DatasetElementComponent, {
      componentProperties: { dataset: mockDataset },
      imports: [MatButtonModule, MatCardModule],
    });

    const spy = jest.spyOn(fixture.componentInstance.copySignal, 'emit');

    const copyButton = screen.getByText('Copia');
    fireEvent.click(copyButton);

    expect(spy).toHaveBeenCalled();
  });

  it('dovrebbe chiamare la funzione di eliminazione quando si preme il pulsante "Elimina Dataset"', async () => {
    const { fixture } = await render(DatasetElementComponent, {
      componentProperties: { dataset: mockDataset },
      imports: [MatButtonModule, MatCardModule],
    });

    const spy = jest.spyOn(fixture.componentInstance.deleteSignal, 'emit');

    const deleteButton = screen.getByText('Elimina');
    fireEvent.click(deleteButton);

    expect(spy).toHaveBeenCalled();
  });

  it('dovrebbe creare correttamente il componente DatasetListViewComponent', async () => {
    const { fixture } = await render(DatasetElementComponent, {});

    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
