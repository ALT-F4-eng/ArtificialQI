import { render, screen, fireEvent } from '@testing-library/angular';
import { DatasetNameDialogComponent } from './dataset-name-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

describe('DatasetNameDialogComponent', () => {
  it('dovrebbe visualizzare correttamente l\'etichetta "Nome"', async () => {
    await render(DatasetNameDialogComponent, {
      imports: [
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
      ],
      providers: [
      { provide: MatDialogRef, useValue: { close: jest.fn() } },
      { provide: MAT_DIALOG_DATA, useValue: { title: 'Rinomina Dataset', name: 'Prova' } },
    ],
    });

    const label = screen.getByText('Rinomina Dataset');
    expect(label).toBeInTheDocument();
  });

  it('dovrebbe visualizzare correttamente il campo di inserimento del nuovo nome', async () => {
    await render(DatasetNameDialogComponent, {
      imports: [
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
      ],
       providers: [
      { provide: MatDialogRef, useValue: { close: jest.fn() } },
      { provide: MAT_DIALOG_DATA, useValue: { name: 'Prova' } },
    ],
    });

    const inputField = screen.getByPlaceholderText('Inserici un nome');
    expect(inputField).toBeInTheDocument();
  });

  it('dovrebbe essere possibile inserire caratteri UTF-8 nel campo di inserimento', async () => {
    await render(DatasetNameDialogComponent, {
      imports: [
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
      ],
       providers: [
      { provide: MatDialogRef, useValue: { close: jest.fn() } },
      { provide: MAT_DIALOG_DATA, useValue: { name: 'Prova' } },
    ],
    });

    const inputField = screen.getByPlaceholderText('Inserici un nome');

    // Simula l'inserimento di caratteri UTF-8
    fireEvent.input(inputField, {
      target: { value: 'Test Dataset こんにちは' },
    }); // chatgpt ha cucinato

    expect(inputField).toHaveValue('Test Dataset こんにちは');
  });

  it('dovrebbe visualizzare correttamente il pulsante di salvataggio', async () => {
    await render(DatasetNameDialogComponent, {
      imports: [
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
      ],
       providers: [
      { provide: MatDialogRef, useValue: { close: jest.fn() } },
      { provide: MAT_DIALOG_DATA, useValue: { name: 'Prova' } },
    ],
    });

    const saveButton = screen.getByText('Salva');
    expect(saveButton).toBeInTheDocument();
  });

  it('dovrebbe chiamare MatDialogRef.close con il nome corretto quando si clicca "Salva"', async () => {
    const closeSpy = jest.fn();

    await render(DatasetNameDialogComponent, {
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: { close: closeSpy } },
        { provide: MAT_DIALOG_DATA, useValue: { name: 'Old Name' } },
      ],
    });

    const input = screen.getByPlaceholderText('Inserici un nome');
    fireEvent.input(input, { target: { value: 'Nuovo Nome UTF-8' } });

    const salvaButton = screen.getByText('Salva');
    fireEvent.click(salvaButton);

    expect(closeSpy).toHaveBeenCalledWith('Nuovo Nome UTF-8');
  });

  it('dovrebbe visualizzare correttamente il pulsante di annullamento', async () => {
    await render(DatasetNameDialogComponent, {
      imports: [
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
      ],
       providers: [
      { provide: MatDialogRef, useValue: { close: jest.fn() } },
      { provide: MAT_DIALOG_DATA, useValue: { name: 'Prova' } },
    ],
    });

    const cancelButton = screen.getByText('Annulla');
    expect(cancelButton).toBeInTheDocument();
  });

  it('dovrebbe interrompere l\'operazione quando si preme il pulsante "Annulla"', async () => {
    const closeSpy = jest.fn();
    await render(DatasetNameDialogComponent, {
      imports: [
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
      ],
       providers: [
      { provide: MatDialogRef, useValue: { close: closeSpy } },
      { provide: MAT_DIALOG_DATA, useValue: { name: 'Prova' } },
    ],
    });
    const cancelButton = screen.getByText('Annulla');
    fireEvent.click(cancelButton);

    // L'azione di annullamento chiude il dialog senza valore di ritorno
    expect(closeSpy).toHaveBeenCalledWith(undefined);
  });
});
