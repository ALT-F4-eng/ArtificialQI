import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatDialogTitle } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { LlmDto } from '../../../core/models/llm-dto.model';

@Component({
  selector: 'app-llmselection-list',
  imports: [
    CommonModule,
    MatListModule,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './llmselection-list.component.html',
  styleUrl: './llmselection-list.component.css',
})
export class LLMselectionListComponent {
  llmList: LlmDto[] = [];
  constructor(
    private dialogRef: MatDialogRef<LLMselectionListComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { list: LlmDto[]; title: string }
  ) {
    this.llmList = data.list;
  }

  select(llm: LlmDto) {
    this.dialogRef.close(llm);
  }
}
