import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LlmViewComponent } from '../../../features/LLM/llm-view/llm-view.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import {LlmDto} from '../../../core/models/llm-dto.model';
import {LlmService} from '../../../core/services/llm.service';
import { MessageBoxComponent } from '../../../shared/error-message/message.component';

@Component({
  selector: 'app-llm-page',
  imports: [
    MessageBoxComponent,
    LlmViewComponent,
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './llm-page.component.html',
  styleUrl: './llm-page.component.css',
})

export class LlmPageComponent implements OnInit{
    llm!: LlmDto;
    loading = true;
    showMessage = false;
    resultMessage = '';
    messageType: 'success' | 'error' = 'error';

    constructor(private llmService: LlmService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        const id = String(this.route.snapshot.paramMap.get('id'));
        
        this.llmService.getLlm(id).subscribe({
        next: (data) => {
            this.llm = data;
            this.loading = false;
            console.log("LLM ricevuto:", data);
        },
        error: (err) => {
            console.error('Errore durante il caricamento delle informazioni per LLM:', err);
            this.resultMessage = 'Errore durante il caricamento delle informazioni per LLM';
            this.messageType = 'error';
            this.showMessage = true;
            this.loading = false;
        },
      });
    }

    onModifyLlmRequest(id: string){
      this.router.navigate(['/llm-form', id]);
    }

    onCloseMessage(){
      this.showMessage = false;
      this.resultMessage = '';
      this.messageType = 'error'; 
    }
}