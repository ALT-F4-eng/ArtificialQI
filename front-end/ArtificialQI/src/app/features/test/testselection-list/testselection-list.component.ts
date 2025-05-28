import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatDialogTitle } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { TestDto } from '../../../core/models/test-dto.model';

@Component({
  selector: 'app-testselection-list',
  imports: [
    CommonModule,
    MatListModule,
    MatDialogTitle,
    MatDialogContent,],
  templateUrl: './testselection-list.component.html',
  styleUrl: './testselection-list.component.css'
})
export class TestselectionListComponent {
  testList: TestDto[] = [];
  constructor(
    private dialogRef: MatDialogRef<TestselectionListComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { list: TestDto[]; title: string }
  ) {
    this.testList = data.list;
  }

  select(test: TestDto) {
    this.dialogRef.close(test);
  }
}