import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

//sottocomponenti
import { QAListViewComponent } from '../qalist-view/qalist-view.component';
import { DatasetPageDto } from '../../../core/models/datasetpage-dto.model';
import { ConfirmComponent } from '../../../core/components/confirm/confirm.component';
import { QAService } from '../../../core/services/qa.service';

@Component({
  selector: 'app-dataset-page-view',
  imports: [CommonModule, QAListViewComponent,ConfirmComponent],
  templateUrl: './dataset-page-view.component.html',
  styleUrl: './dataset-page-view.component.css',
})
export class DatasetPageViewComponent {
  @Input() datasetPage?: DatasetPageDto;
  showConfirmDelete = false;
  idqa?: number;
  @Output() modifyEventShowLabel = new EventEmitter<void>()
  
  constructor(private qaService: QAService) {}
  //chiama servizio di modifica
  modifyQA(id: number, question: string, answer: string) {
    console.log('Nuova domanda:', question, 'Nuova risposta:', answer);
    //chiama il servizio di modifica
    this.qaService.modifyDatasetPage(id, question, answer);
    this.modifyEventShowLabel.emit();
  }
  //chiama servizio di cancellazione
  deleteQA(id: number) {
    this.qaService.deleteQA(id);
  }

  // delete
  onQADeleteRequest(id: number) {
    this.showConfirmDelete = true;
    this.idqa = id;
    console.log('Indice ricevuto per cancellazione page:', id);
  }

  onQADeleteConfirmed() {
    if (this.idqa !== undefined) {
      this.qaService.deleteQA(this.idqa);
      this.showConfirmDelete = false;
      this.modifyEventShowLabel.emit();
      console.log('qa eliminato :', this.idqa);
      //un aggiornamento è necessario, nel caso se è presente altri elementi nella pagina successiva
      this.datasetPage = this.qaService.updateDatasetPage(this.datasetPage!.page_n);
    }
  }

  onQADeleteCanceled() {
    this.idqa = undefined;
    this.showConfirmDelete = false;
  }

}
