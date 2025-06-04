import { render, screen, fireEvent } from '@testing-library/angular';
import { DatasetElementComponent } from './dataset-element.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { DatasetDto } from '../../../core/models/dataset-dto.model';

// Registriamo i dati di localizzazione italiana per DatePipe
registerLocaleData(localeIt);

const mockDataset: DatasetDto = {
  id: '123',
  name: 'Dataset Alpha',
  creation_date: new Date('2025-05-01'),
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

  it('dovrebbe visualizzare correttamente la data della creazione', async () => {
    await render(DatasetElementComponent, {
      componentProperties: { dataset: mockDataset },
      imports: [MatButtonModule, MatCardModule],
    });

    const datePipe = new DatePipe('it-IT');
    const expectedDate = datePipe.transform(mockDataset.creation_date, 'yyyy-MM-dd');
    const dateElement = screen.getByText(`Data di creazione: ${expectedDate}`);

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

  it('dovrebbe visualizzare correttamente il pulsante di eliminazione', async () => {
    await render(DatasetElementComponent, {
      componentProperties: { dataset: mockDataset },
      imports: [MatButtonModule, MatCardModule],
    });

    const deleteButton = screen.getByText('Elimina');
    expect(deleteButton).toBeInTheDocument();
  });

  it('dovrebbe chiamare la funzione di eliminazione quando si preme il pulsante "Elimina"', async () => {
    const { fixture } = await render(DatasetElementComponent, {
      componentProperties: { dataset: mockDataset },
      imports: [MatButtonModule, MatCardModule],
    });

    const spy = jest.spyOn(fixture.componentInstance.deleteSignal, 'emit');

    const deleteButton = screen.getByText('Elimina');
    fireEvent.click(deleteButton);

    expect(spy).toHaveBeenCalled();
  });

  it('dovrebbe creare correttamente il componente DatasetElementComponent', async () => {
    const { fixture } = await render(DatasetElementComponent, {
      componentProperties: { dataset: mockDataset },
      imports: [MatButtonModule, MatCardModule],
    });

    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
