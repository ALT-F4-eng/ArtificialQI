import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './json-file-upload.component.html',
  styleUrls: ['./json-file-upload.component.css'],
})
export class FileUploadComponent {
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (!file.name.toLowerCase().endsWith('.json')) {
        alert('Errore: puoi selezionare solo file con estensione .json.');
        return; // parte del Error Message che poi vedremo come si integra
      }
      console.log('File JSON selezionato:', file.name);
      // Prosegui con la lettura del file, invio al backend, ecc.
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const fileContent = reader.result as string;
          const parsedData = JSON.parse(fileContent);
          // Controllo che sia un array
          if (!Array.isArray(parsedData)) {
            throw new Error('Il file JSON deve contenere un array di oggetti.');
          }
          // Controllo ogni oggetto dentro l'array, se ogni elemento rispecchia la struttura passa il check
          const isValid = parsedData.every(
            (item) =>
              typeof item.domanda === 'string' && // domanda sarebbe Question, il nome del item si puo cambiare
              typeof item.rispostaAttesa === 'string' // risposta attesa sarebbe Expected Answer, il nome del item si puo cambiare
          );
          if (!isValid) {
            throw new Error(
              'Ogni elemento deve avere "domanda" e "rispostaAttesa" come stringhe.'
            );
          }

          console.log('File JSON valido:', file.name);
          console.log('Contenuto:', parsedData);

          // Qui puoi proseguire con l'uso del JSON (es. invio al backend) da fare
          // poi aggiornare la lista del nome di dataset oppure l'utente viene reindirizzato subito nella pagina di datasetContentPage dipende da come lo vogliamo fare
        } catch (error) {
          console.error('Errore durante il parsing del file JSON:', error);
          alert('Errore: il file JSON è danneggiato o malformato.');
        }
      };
      reader.onerror = () => {
        console.error('Errore nella lettura del file.');
        alert('Errore: impossibile leggere il file.');
      };
      reader.readAsText(file);
    }
  }
}
