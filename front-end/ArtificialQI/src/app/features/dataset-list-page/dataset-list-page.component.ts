import { Component } from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { FileUploadComponent } from '../../features/json-file-upload/json-file-upload.component';
import { DatasetListViewComponent } from '../../features/dataset-list-view/dataset-list-view.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dataset-list-page',
  standalone: true,
  imports: [SearchBarComponent,FileUploadComponent,DatasetListViewComponent,MatIconModule,MatDividerModule,MatButtonModule],
  templateUrl: './dataset-list-page.component.html',
  styleUrl: './dataset-list-page.component.css'
})

export class DatasetListPageComponent {

}
