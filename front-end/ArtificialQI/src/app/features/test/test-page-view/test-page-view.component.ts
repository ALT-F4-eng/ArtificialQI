import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScatterDiagramComponent } from '../scatter-diagram/scatter-diagram.component';
import { PageNavigationComponent } from '../../../shared/components/page-navigation/page-navigation.component';
import { TestPageDto } from '../../../core/models/testpage-dto.model';

@Component({
  selector: 'app-test-page-view',
  standalone: true,
  imports: [CommonModule, ScatterDiagramComponent, PageNavigationComponent],
  templateUrl: './test-page-view.component.html',
  styleUrls: ['./test-page-view.component.css']
})
export class TestPageViewComponent {
  totalItems = 20;
  pageSize = 5;
  currentPage = 1;
  @Input() testPage!: TestPageDto;

get elementValues() {
  return this.testPage.result_list.map((r, index) => ({
    x: index + 1,
    y: r.similarity
  }));
}

loadPage(page: number) {
  // slice su testPage.result_list
  const startIndex = (page - 1) * this.pageSize;
  const endIndex = Math.min(startIndex + this.pageSize, this.testPage.result_list.length);
  this.testPage.result_list = this.testPage.result_list.slice(startIndex, endIndex);
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

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPage(page);
  }
}
