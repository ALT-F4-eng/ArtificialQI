import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';
import { FileUploadComponent } from './features/json-file-upload/json-file-upload.component';

@Component({
  selector: 'app-root',
  imports: [SearchBarComponent,FileUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ArtificialQI';
}
