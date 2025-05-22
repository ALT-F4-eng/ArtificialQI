import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CakeDiagramComponent } from '../cake-diagram/cake-diagram.component';
import { BarDiagramComponent } from '../bar-diagram/bar-diagram.component';
import { resultDto } from '../../../core/models/result-dto.model';

@Component({
  selector: 'app-test-index',
  standalone: true,
  imports: [CommonModule, CakeDiagramComponent, BarDiagramComponent],
  templateUrl: './test-index.component.html',
  styleUrls: ['./test-index.component.css']
})
export class TestIndexComponent {
  @Input() comparedCorrectnessValue?: number;
  @Input() comparedDistribution?: number[];
  @Input() results: resultDto[] = [];

  get correctnessValue(): number {
  if (!this.results?.length) return 0;
  const correct = this.results.filter(r => r.correct).length;
  return Math.round((correct / this.results.length) * 100);
}

  get distribution(): number[] {
  const bins = [0, 0, 0, 0, 0];
  this.results.forEach(r => {
    const sim = r.similarity ?? 0;
    if (sim < 0.2) bins[0]++;
    else if (sim < 0.4) bins[1]++;
    else if (sim < 0.6) bins[2]++;
    else if (sim < 0.8) bins[3]++;
    else bins[4]++;
  });
  return bins;
}
}
