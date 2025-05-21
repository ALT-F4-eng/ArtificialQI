import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { resultDto } from '../../../core/models/result-dto.model';

@Component({
  selector: 'app-result-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-element.component.html',
  styleUrls: ['./result-element.component.css']
})
export class ResultElementComponent {
  @Input() result!: resultDto;
}
