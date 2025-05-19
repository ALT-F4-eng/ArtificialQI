import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

//
import { QADto } from '../../../core/models/qa-dto.model';
//
import { QAElementComponent } from '../qaelement/qaelement.component';


@Component({
  selector: 'app-qalist-view',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule, QAElementComponent],
  templateUrl: './qalist-view.component.html',
  styleUrl: './qalist-view.component.css',
})

export class QAListViewComponent {
  @Input() qaList?: QADto[] = [];

  @Output() modify = new EventEmitter<QADto>();
  onModify(id:number, question:string, answer:string) {
    console.log('Nuova domanda:', question, 'Nuova risposta:', answer);
    this.modify.emit({id, question, answer});
  }
}
