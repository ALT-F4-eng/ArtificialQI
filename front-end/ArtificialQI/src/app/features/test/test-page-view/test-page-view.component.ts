import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { resultDto } from '../../../core/models/result-dto.model';
import { ResultListViewComponent } from '../result-list-view/result-list-view.component';
import { ScatterDiagramComponent } from '../scatter-diagram/scatter-diagram.component';

@Component({
  selector: 'app-test-page-view',
  standalone: true,
  imports: [CommonModule, ScatterDiagramComponent],
  templateUrl: './test-page-view.component.html',
  styleUrls: ['./test-page-view.component.css']
})
export class TestPageViewComponent {
  @Input() results: resultDto[] = [];

  get elementValues() {
  return this.results.map((r, index) => ({
    x: index + 1,
    y: r.similarity
  }));
}
  scrollToQuestion(index: number) {
  const element = document.getElementById(`question-${index}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    element.style.backgroundColor = '#ffffcc'; // evidenziazione temporanea
    setTimeout(() => {
      element.style.backgroundColor = 'transparent';
    }, 1000);
  }
}

}
