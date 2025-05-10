import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './json-file-upload.component.html',
  styleUrls: ['./json-file-upload.component.css']
})
export class FileUploadComponent {

  onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (!file.name.toLowerCase().endsWith('.json')) {
        alert('Errore: puoi selezionare solo file con estensione .json.');
        return;// parte del Error Message che poi vedremo come si integra
      }

      console.log('File JSON selezionato:', file.name);
      // Prosegui con la lettura del file, invio al backend, ecc.
    }
  }
}
