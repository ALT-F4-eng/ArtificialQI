import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LlmElementComponent } from '../llm-element/llm-element.component';
import {LlmDto} from '../../../core/models/llm-dto.model'

@Component({
  selector: 'app-llm-list-view',
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    LlmElementComponent,
  ],
  templateUrl: './llm-list-view.component.html',
  styleUrls: ['./llm-list-view.component.css'],
})


export class LlmListViewComponent {
  @Input() llms: LlmDto[] = [];

  @Output() deleteLlm = new EventEmitter<string>();
  onDeleteLlm(id: string) {
    this.deleteLlm.emit(id);
  }

  @Output() viewLlm = new EventEmitter<string>();
  onLoadLlm(id: string) {
    this.viewLlm.emit(id);
  }
}