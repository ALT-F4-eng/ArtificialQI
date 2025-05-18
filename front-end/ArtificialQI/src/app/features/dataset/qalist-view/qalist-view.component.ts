import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

//
import { DatasetPageDto } from '../../../core/models/datasetpage-dto.model';
//

export interface ModifyEvent {
  index: number;
  newQuestion: string;
  newAnswer: string;
}

@Component({
  selector: 'app-qalist-view',
  imports: [CommonModule, MatListModule, MatCardModule],
  templateUrl: './qalist-view.component.html',
  styleUrl: './qalist-view.component.css',
})
export class QAListViewComponent {
  @Input() qa_s?: DatasetPageDto;
  
}
