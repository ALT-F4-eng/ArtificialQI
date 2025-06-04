import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestResultDto } from '../../../core/models/testresult-dto.model';

@Component({
  selector: 'app-result-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-element.component.html',
  styleUrls: ['./result-element.component.css']
})
export class ResultElementComponent {
  @Input() result!: TestResultDto;
  @Input() elementId?: string;

}
