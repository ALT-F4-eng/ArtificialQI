import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {LlmDto} from '../../../core/models/llm-dto.model'
import { MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-llm-element',
  imports: [
    CommonModule,
    MatCardModule,
    DatePipe,
    MatButtonModule,
    RouterModule,
    MatCardTitle
  ],
  templateUrl: './llm-element.component.html',
  styleUrls: ['./llm-element.component.css'],
})
export class LlmElementComponent implements OnInit {
  //sarano due dati passati dal padre
  @Input() llm?: LlmDto;

  ngOnInit() {
    console.log(this.llm); // Dovresti vedere i dati passati dal padre
  }

  @Output() delete = new EventEmitter<string>();
  deleteLlm() {
    if (this.llm) {
      this.delete.emit(this.llm.id); // comunica al padre quale llm eliminare
    }
  }

  @Output() load = new EventEmitter<string>();
  loadLlm() {
    if (this.llm) {
      this.load.emit(this.llm.id);
      console.log('Llm caricato:', this.llm.name);
    }
  }
}