import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-name-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './test-name-dialog.component.html',
  styleUrls: ['./test-name-dialog.component.css']
})
export class TestNameDialogComponent {
  testName: string = '';

  constructor(public dialogRef: MatDialogRef<TestNameDialogComponent>) {}

  confirm() {
    this.dialogRef.close(this.testName);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
