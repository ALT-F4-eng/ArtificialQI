import { Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-qadialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './qadialog.component.html',
  styleUrl: './qadialog.component.css',
})
export class QADialogComponent {
  private dialogRef = inject(MatDialogRef<QADialogComponent>);
  private data = inject(MAT_DIALOG_DATA) as {
    question: string;
    answer: string;
  };

  question: string = this.data.question;
  answer: string = this.data.answer;
  
  confirm() {
    this.dialogRef.close({
      question: this.question.trim(),
      answer: this.answer.trim(),
    });
  }

}
