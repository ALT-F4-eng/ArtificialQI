import { render, screen, fireEvent } from '@testing-library/angular';
import { SearchBarComponent } from './search-bar.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchBarComponent', () => {
  const setup = async (searchSpy = jest.fn()) => {
    await render(SearchBarComponent, {
      imports: [
        FormsModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        NoopAnimationsModule,
      ],
      componentProperties: {
        search: { emit: searchSpy } as any,
      },
    });
    return searchSpy;
  };

  it('dovrebbe visualizzare il campo di inserimento dei dati della ricerca', async () => {
    await setup();
    const input = screen.getByPlaceholderText(/digita qualcosa/i);
    expect(input).toBeInTheDocument();
  });

  it("dovrebbe permettere l'inserimento di caratteri UTF-8 nella barra di ricerca", async () => {
    await setup();
    const input = screen.getByPlaceholderText(/digita qualcosa/i);

    await fireEvent.input(input, {
      target: { value: 'Test UTF-8 æøå ✓ こんにちは' },
    });
    expect(input).toHaveValue('Test UTF-8 æøå ✓ こんにちは');
  });

  it("dovrebbe visualizzare l'icona della cerca", async () => {
    await setup();
    const icon = screen.getByText('search'); // mat-icon content
    expect(icon).toBeInTheDocument();
  });

  it("dovrebbe visualizzare l'icona della cancella quando il campo non è vuoto", async () => {
    await setup();

    const input = screen.getByPlaceholderText(/digita/i);
    fireEvent.input(input, { target: { value: 'test' } });

    const icon = screen.getByText('close'); // mat-icon content
    expect(icon).toBeInTheDocument();
  });
  
  it('dovrebbe chiamare la funzione di ricerca quando viene premuto Invio', async () => {
    const searchSpy = await setup();

    const input = screen.getByPlaceholderText(/digita qualcosa/i);
    await fireEvent.input(input, { target: { value: 'Cerca UTF-8' } });
    await fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(searchSpy).toHaveBeenCalledWith('Cerca UTF-8');
  });
});
