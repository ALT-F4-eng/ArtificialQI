import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TestPageDto } from '../../../core/models/testpage-dto.model';
import { PageNavigationComponent } from '../../../shared/components/page-navigation/page-navigation.component';
import { ComparisonListViewComponent } from '../comparison-list-view/comparison-list-view.component';

@Component({
  selector: 'app-comparison-page-view',
  imports: [PageNavigationComponent,ComparisonListViewComponent],
  templateUrl: './comparison-page-view.component.html',
  styleUrl: './comparison-page-view.component.css',
})
export class ComparisonPageViewComponent implements OnChanges {
  @Input() testPageOrigin_ComparisonPageView?: TestPageDto;
  @Input() testPageCompared_ComparisonPageView?: TestPageDto;

  pagedResultsOrigin_testPageOrigin_ComparisonPageView: TestPageDto['result_list'] =
    [];
  pagedResultsCompared_testPageOrigin_ComparisonPageView: TestPageDto['result_list'] =
    [];

  totalItems = 0;
  pageSize = 5;
  currentPage = 1;

  ngOnChanges(changes: SimpleChanges) {
    const originChanged = changes['testPageOrigin_ComparisonPageView'];
    const comparedChanged = changes['testPageCompared_ComparisonPageView'];

    // Se uno dei due è cambiato e hanno entrambe le liste
    if (
      (originChanged || comparedChanged) &&
      this.testPageOrigin_ComparisonPageView?.result_list &&
      this.testPageCompared_ComparisonPageView?.result_list
    ) {
      this.totalItems =
        this.testPageOrigin_ComparisonPageView.result_list.length;
      this.loadPage(this.currentPage);
    }
  }
  /*
  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }*/

  loadPage(page: number) {
    if (
      !this.testPageOrigin_ComparisonPageView?.result_list ||
      !this.testPageCompared_ComparisonPageView?.result_list
    )
      return;

    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(
      startIndex + this.pageSize,
      this.testPageOrigin_ComparisonPageView.result_list.length
    );

    this.pagedResultsOrigin_testPageOrigin_ComparisonPageView =
      this.testPageOrigin_ComparisonPageView.result_list.slice(
        startIndex,
        endIndex
      );

    this.pagedResultsCompared_testPageOrigin_ComparisonPageView =
      this.testPageCompared_ComparisonPageView.result_list.slice(
        startIndex,
        endIndex
      );
  }

  scrollToQuestion(index: number) {
    const element = document.getElementById(`question-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.style.backgroundColor = '#ffffcc';
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
