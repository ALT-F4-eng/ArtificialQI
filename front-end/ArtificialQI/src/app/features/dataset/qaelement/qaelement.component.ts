import { Component, Input } from '@angular/core';

import { QADto } from '../../../core/models/qa-dto.model';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-qaelement',
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './qaelement.component.html',
  styleUrl: './qaelement.component.css'
})
export class QAElementComponent {
  @Input() qa?: QADto;
}
