import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QAListViewComponent } from '../qalist-view/qalist-view.component';
import { PageNavigationComponent } from '../../../shared/components/page-navigation/page-navigation.component';

import { QADto } from '../../../core/models/qa-dto.model';

@Component({
  selector: 'app-dataset-page-view',
  standalone: true,
  imports: [CommonModule, QAListViewComponent, PageNavigationComponent],
  templateUrl: './dataset-page-view.component.html',
  styleUrls: ['./dataset-page-view.component.css'],
})
export class DatasetPageViewComponent implements OnChanges {
  @Input() qa_list: QADto[] = [];

  totalItems = 0;
  pageSize = 3;
  currentPage = 1;

  visibleQaList: QADto[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['qa_list'] &&
      Array.isArray(this.qa_list)
    ) {
      console.log("loading");
      this.totalItems = this.qa_list.length;
      this.loadPage(this.currentPage);
    } else {
      console.error('qa_list non è un array valido:', this.qa_list);
    }
  }
  
  loadPage(page: number) {
    if (!Array.isArray(this.qa_list)) return;
    
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.visibleQaList = this.qa_list.slice(startIndex, endIndex);
  }
  
  onPageChange_datasetPageView(page: number) {
    this.currentPage = page;
    this.loadPage(page);
  }
  
  @Output() modifyQASignal_datasetPageView = new EventEmitter<{
  id: string;
    question: string;
    answer: string;
  }>();
  modifyQA_datasetPageView(id: string, question: string, answer: string) {
    this.modifyQASignal_datasetPageView.emit({ id, question, answer });
  }
  
  @Output() deleteQASignal_datasetPageView = new EventEmitter<string>();
  deleteQA_datasetPageView(qaId: string) {
    this.deleteQASignal_datasetPageView.emit(qaId);
  }
}


