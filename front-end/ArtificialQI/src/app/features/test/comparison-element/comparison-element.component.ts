import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestResultDto } from '../../../core/models/testresult-dto.model';

@Component({
  selector: 'app-comparison-element',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './comparison-element.component.html',
  styleUrl: './comparison-element.component.css',
})
export class ComparisonElementComponent {
  @Input() resultOrigin!: TestResultDto;
  @Input() resultCompared!: TestResultDto;
  @Input() elementId?: string;
}
