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
import { model } from '@angular/core';

@Component({
  selector: 'app-dataset-name-dialog',
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
  templateUrl: './dataset-name-dialog.component.html',
  styleUrl: './dataset-name-dialog.component.css',
})
export class DatasetNameDialogComponent {
  private dialogRef = inject(MatDialogRef<DatasetNameDialogComponent>);
  private data = inject(MAT_DIALOG_DATA) as { name: string };

  name: string = this.data.name;

  confirm() {
    this.dialogRef.close(this.name.trim());
  }
}