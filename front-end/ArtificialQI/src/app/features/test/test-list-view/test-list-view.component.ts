import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TestElementComponent } from '../test-element/test-element.component';
import { TestService } from '../../../core/services/test.service';
import { TestDto } from '../../../core/models/test-dto.model';

export interface RenameEvent {
  index: number;
  newName: string;
}

@Component({
  selector: 'app-test-list-view',
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    TestElementComponent,
  ],
  templateUrl: './test-list-view.component.html',
  styleUrl: './test-list-view.component.css'
})
export class TestListViewComponent {
  @Input() tests: TestDto[] = [];

  @Output() rename = new EventEmitter<RenameEvent>();
  onRename(index: number, newName: string) {
    console.log('Nuovo nome nel list view:', newName);
    this.rename.emit({ index, newName });
  }

  @Output() testCopied = new EventEmitter<number>();
  onCopy(index: number) {
    this.testCopied.emit(index);
  }

  @Output() testDeleted = new EventEmitter<number>();
  onDelete(index: number) {
  const testToDelete = this.tests[index];
  if (testToDelete) {
    this.testDeleted.emit(testToDelete.ID); 
  }
}

  @Output() testLoaded = new EventEmitter<TestDto>();
  onTestLoaded(test: TestDto) {
    this.testLoaded.emit(test);
  }
}
