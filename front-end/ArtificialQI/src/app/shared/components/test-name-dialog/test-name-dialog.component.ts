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
  selector: 'app-test-name-dialog',
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
  templateUrl: './test-name-dialog.component.html',
  styleUrl: './test-name-dialog.component.css'
})
export class TestNameDialogComponent {
  private dialogRef = inject(MatDialogRef<TestNameDialogComponent>);
  private data = inject(MAT_DIALOG_DATA) as { name: string };

  name: string = this.data.name;

  confirm() {
    this.dialogRef.close(this.name.trim());
  }
}
