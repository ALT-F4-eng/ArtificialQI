import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { DatasetListPageComponent } from './features/dataset-list-page/dataset-list-page.component';

@Component({
  selector: 'app-root',
  imports: [DatasetListPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ArtificialQI';
  //mockDataset =  { name: 'Chaonima', lastModified: new Date('2025-05-01') };
}
