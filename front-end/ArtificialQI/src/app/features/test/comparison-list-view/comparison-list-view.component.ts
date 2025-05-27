import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestResultDto } from '../../../core/models/testresult-dto.model';

@Component({
  selector: 'app-comparison-list-view',
  imports: [CommonModule],
  templateUrl: './comparison-list-view.component.html',
  styleUrl: './comparison-list-view.component.css'
})
export class ComparisonListViewComponent {
  @Input() resultsOrigin_ComparisonList: TestResultDto[] = [];
  @Input() resultsCompared_ComparisonList: TestResultDto[] = [];
  @Input() startIndex = 0;
}
