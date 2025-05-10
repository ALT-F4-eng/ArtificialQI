import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';
import { FileUploadComponent } from './features/json-file-upload/json-file-upload.component';
import { DatasetElementComponent } from './features/dataset-element/dataset-element.component';

@Component({
  selector: 'app-root',
  imports: [SearchBarComponent,FileUploadComponent,DatasetElementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ArtificialQI';
}
