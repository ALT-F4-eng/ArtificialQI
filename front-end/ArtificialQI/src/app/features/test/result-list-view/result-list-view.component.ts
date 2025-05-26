import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestResultDto } from '../../../core/models/testresult-dto.model';
import { ResultElementComponent } from '../result-element/result-element.component';

@Component({
  selector: 'app-result-list-view',
  standalone: true,
  imports: [CommonModule, ResultElementComponent],
  templateUrl: './result-list-view.component.html',
  styleUrls: ['./result-list-view.component.css']
})
export class ResultListViewComponent {
  @Input() results: TestResultDto[] = [];
}
