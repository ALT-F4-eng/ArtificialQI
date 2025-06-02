import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

//sottocomponenti
import { QAListViewComponent } from '../qalist-view/qalist-view.component';
import { PageNavigationComponent } from '../../../shared/components/page-navigation/page-navigation.component';

// service
import { DatasetPageDto } from '../../../core/models/datasetpage-dto.model';
import { QAService } from '../../../core/services/qa.service';

@Component({
  selector: 'app-dataset-page-view',
  imports: [CommonModule, QAListViewComponent, PageNavigationComponent],
  templateUrl: './dataset-page-view.component.html',
  styleUrl: './dataset-page-view.component.css',
})
export class DatasetPageViewComponent {
  //per la qa list view
  @Input() datasetPage?: DatasetPageDto;

  @Output() totalItems = 200; // da chiedere al db
  @Output() pageSize = 5; // dovrebbe essere 20
  @Output() currentPage = 1; // di deafult

  @Output() modifyEventShowLabel = new EventEmitter<void>();

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

  @Output() changePageSignal_datasetPageView = new EventEmitter<number>();
  onPageChange_datasetPageView(pageIndex: number) {
    this.changePageSignal_datasetPageView.emit(pageIndex);
  }
  
}
