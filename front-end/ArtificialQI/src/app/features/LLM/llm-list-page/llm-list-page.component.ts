import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LlmListViewComponent } from '../../../features/LLM/llm-list-view/llm-list-view.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import {LlmDto} from '../../../core/models/llm-dto.model';
import {LlmService} from '../../../core/services/llm.service';
import { ConfirmComponent } from '../../../shared/confirm-message/confirm.component';

@Component({
  selector: 'app-llm-list-page',
  standalone: true,
  imports: [
    ConfirmComponent,
    CommonModule,
    LlmListViewComponent,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './llm-list-page.component.html',
  styleUrl: './llm-list-page.component.css',
})

export class LlmListPageComponent implements OnInit{
    llms: LlmDto[] = [];
    loading = true;
    showConfirm = false;
    confirmMessage = '';
    deletingId?: number;

    constructor(private llmService: LlmService) {}

    ngOnInit(): void {
      this.llmService.getAllLlms().subscribe({
        next: (data) => {
            this.llms = data;
            this.loading = false;
        },
      error: (err) => {
          console.error('Errore durante il caricamento LLM:', err);
          this.loading = false;
      },
      });
    }
    
    onLlmDeleteRequest(id:number){
      this.deletingId = id;
      this.confirmMessage = 'Sei sicuro di voler eliminare questo LLM?';
      this.showConfirm = true;
    }

    onLlmDeleteConfirmed(){
      if(this.deletingId !== undefined){
        console.log('Indice ricevuto per cancellazione llm:', this.deletingId);
        /* this.llmService.deleteLlm(id).subscribe({
          next: () => {
            this.llmService.getAllLlms().subscribe({
              next: (data) => this.llms = data
            });
          }
          error: (err) => {
            console.error('Errore durante la delete:', err);
          }
        }) qui sincronizzazione e richiesta degli llm ogni modifica effettuata */
        this.llmService.deleteLlm(this.deletingId).subscribe({
          next: () => {
            // Rimuovi l'elemento dalla lista
            this.llms = this.llms.filter(llm => llm.id !== this.deletingId);
            this.showConfirm = false;
            console.log(`LLM con ID ${this.deletingId} eliminato con successo.`);
            this.deletingId = undefined;
          },
          error: (err) => {
            console.error(`Errore durante l'eliminazione dell'LLM con ID ${this.deletingId}:`, err);
          }
        });
      } // viene tolto dalla lista llms in locale con filter se la delete va a buon fine 
    }

    onLlmDeleteCanceled(){
      this.showConfirm = false;
      this.deletingId = undefined;
      this.confirmMessage = '';
    }

    onLlmViewRequest(id: number){
      console.log("richiesto caricamento");
    }

    createLlm() {
      console.log("richiesta creazione");
    }
}