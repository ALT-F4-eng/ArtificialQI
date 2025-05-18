import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

//
import { QADto } from '../../../core/models/qa-dto.model';
//
import { QAElementComponent } from '../qaelement/qaelement.component';
export interface ModifyEvent {
  index: number;
  newQuestion: string;
  newAnswer: string;
}

@Component({
  selector: 'app-qalist-view',
  imports: [CommonModule, MatListModule, MatCardModule, QAElementComponent],
  templateUrl: './qalist-view.component.html',
  styleUrl: './qalist-view.component.css',
})
export class QAListViewComponent {
  @Input() qaList?: QADto[] = [];
  
}
