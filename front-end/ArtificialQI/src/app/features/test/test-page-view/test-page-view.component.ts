import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScatterDiagramComponent } from '../scatter-diagram/scatter-diagram.component';
import { PageNavigationComponent } from '../../../shared/components/page-navigation/page-navigation.component';
import { TestPageDto } from '../../../core/models/testpage-dto.model';
import { ResultListViewComponent } from '../result-list-view/result-list-view.component';

@Component({
  selector: 'app-test-page-view',
  standalone: true,
  imports: [CommonModule, ScatterDiagramComponent, PageNavigationComponent, ResultListViewComponent],
  templateUrl: './test-page-view.component.html',
  styleUrls: ['./test-page-view.component.css']
})
export class TestPageViewComponent implements OnChanges, OnDestroy {
  @Input() testPage?: TestPageDto;

  pagedResults: TestPageDto['result_list'] = [];
  totalItems = 0;
  pageSize = 5;
  currentPage = 1;

  private highlightTimeoutId?: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['testPage'] && this.testPage?.result_list) {
      this.totalItems = this.testPage.result_list.length;
      this.loadPage(this.currentPage);
    }
  }

  get elementValues() {
    if (!this.testPage) return [];
    return this.testPage.result_list.map((r, index) => ({
      x: index + 1,
      y: r.similarity
    }));
  }

  loadPage(page: number) {
    if (!this.testPage?.result_list) return;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.testPage.result_list.length);
    this.pagedResults = this.testPage.result_list.slice(startIndex, endIndex);
  }

  scrollToQuestion(index: number) {
    const element = document.getElementById(`question-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.style.backgroundColor = '#ffffcc';

      // Cancella il timeout precedente se presente
      if (this.highlightTimeoutId) {
        clearTimeout(this.highlightTimeoutId);
      }

      this.highlightTimeoutId = window.setTimeout(() => {
        element.style.backgroundColor = 'transparent';
        this.highlightTimeoutId = undefined;
      }, 1000);
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPage(page);
  }

  ngOnDestroy() {
    if (this.highlightTimeoutId) {
      clearTimeout(this.highlightTimeoutId);
    }
  }
}
