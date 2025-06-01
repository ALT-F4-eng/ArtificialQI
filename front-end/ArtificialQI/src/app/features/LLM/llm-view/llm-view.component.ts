import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import {LlmDto} from '../../../core/models/llm-dto.model';

@Component({
  selector: 'app-llm-view',
  imports: [
    MatCardModule,
    MatListModule,
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './llm-view.component.html',
  styleUrl: './llm-view.component.css',
})

export class LlmViewComponent {
  @Input() llm!: LlmDto;
  
  @Output() modifyLlm = new EventEmitter<string>();
  onModifyRequest(){
    if (this.llm) {
      this.modifyLlm.emit(this.llm.id); // comunica al padre quale llm eliminare
    }
  }
}