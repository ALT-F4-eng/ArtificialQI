import { render, screen, fireEvent } from '@testing-library/angular';
import { FileUploadComponent } from './json-file-upload.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('FileUploadComponent', () => {
  it('dovrebbe  mostrare la finestra quando si clicca il pulsante "Carica file JSON" e chiamare la funzione onFileSelected quando un file viene selezionato', async () => {
    const onFileSelectedSpy = jest.fn(); // Spy per la funzione onFileSelected

    // Renderizza il componente e passa la funzione onFileSelected come proprietà
    await render(FileUploadComponent, {
      imports: [MatButtonModule, MatIconModule],
      componentProperties: {
        onFileSelected: onFileSelectedSpy,
      },
    });

    // Trova il pulsante "Carica file JSON"
    const uploadButton = screen.getByText('Carica file JSON');

    // Trova l'input file nascosto tramite il data-testid
    const fileInput = screen.getByTestId('file-input') as HTMLInputElement;
    // Spia se il metodo click sul fileInput è stato eseguito
    const clickSpy = jest.spyOn(fileInput, 'click');
    // Simula il clic sul pulsante
    fireEvent.click(uploadButton);

    // Verifica che il metodo click sia stato chiamato (simulando che il fileInput sia stato "attivato")
    expect(clickSpy).toHaveBeenCalledTimes(1);
    //2° parte
    // Simula la selezione di un file
    fireEvent.change(fileInput, {
      target: {
        files: [new File(['{}'], 'test.json', { type: 'application/json' })],
      },
    });

    // Verifica che la funzione onFileSelected sia stata chiamata
    expect(onFileSelectedSpy).toHaveBeenCalledTimes(1);
  });

  it("dovrebbe avere il corretto attributo accept per l'input file", async () => {
    // Rendi il componente disponibile per il test
    await render(FileUploadComponent, {
      imports: [MatButtonModule, MatIconModule],
    });

    // Ottieni l'elemento input file
    const fileInput = screen.getByTestId('file-input'); // Assicurati che l'input file sia accessibile con l'etichetta giusta

    // Verifica che l'attributo 'accept' sia correttamente impostato a ".json"
    expect(fileInput).toHaveAttribute('accept', '.json');
  });
  
  //dato che input file è predefinito da angular, alcuni test non sono necessari basta controllare che venga creato il componente e mostrato la finestra il che è stato testato sopra
  it('dovrebbe creare correttamente il componente FileUploadComponent', async () => {
    const { fixture } = await render(FileUploadComponent, {});

    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
