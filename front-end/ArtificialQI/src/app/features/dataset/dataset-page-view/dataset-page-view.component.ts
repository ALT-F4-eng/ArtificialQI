import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

//sottocomponenti
import { QAListViewComponent } from '../qalist-view/qalist-view.component';
import { PageNavigationComponent } from '../../../shared/components/page-navigation/page-navigation.component';

// service
import { DatasetPageDto } from '../../../core/models/datasetpage-dto.model';
import { ConfirmComponent } from '../../../core/components/confirm/confirm.component';
import { QAService } from '../../../core/services/qa.service';


@Component({
  selector: 'app-dataset-page-view',
  imports: [
    CommonModule,
    QAListViewComponent,
    ConfirmComponent,
    PageNavigationComponent,
  ],
  templateUrl: './dataset-page-view.component.html',
  styleUrl: './dataset-page-view.component.css',
})
export class DatasetPageViewComponent {
  @Input() datasetPage?: DatasetPageDto;
  showConfirmDelete = false;
  idqa?: number;
  @Output() modifyEventShowLabel = new EventEmitter<void>();
  
  totalItems = 200;// da chiedere al db
  pageSize = 5; // dovrebbe essere 20
  currentPage = 1; // di deafult

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
      this.datasetPage = this.qaService.updateDatasetPage(
        this.datasetPage!.page_n
      );
    }
  }

  onQADeleteCanceled() {
    this.idqa = undefined;
    this.showConfirmDelete = false;
  }

  // bisognerebbe dire a l'utente di salvare le modifiche altrimenti si perderano i dati modificati,se viene mostrato l'etichetta temporary
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPage(page);
  }

  loadPage(page: number) {
    /// page è sembre un numero compresso tra gli intervalli accettabili anche se si mette un valore fuori intervalli, assumera Max o min della paginazione
    // questo significa che dipende da gli elemnti totali e elementi da mostrare nella lista
    console.log('pagina reinidirizzata', page);
    //mock della chiamata, dovrebbe avere come paramentro page ma quasto solo faccendo una mock
    this.datasetPage = this.qaService.getDatasetPage2mock(page);
    // Simulazione: sostituisci con chiamata HTTP reale
    /*
    this.apiService.getDatasetPage(page, this.pageSize).subscribe((data: DatasetPageDto) => {
      this.datasetPage = data;
    });*/
  }
}
