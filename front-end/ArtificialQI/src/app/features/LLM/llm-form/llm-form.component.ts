import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {LlmService} from '../../../core/services/llm.service';
import { LlmDto } from '../../../core/models/llm-dto.model';
import { KeyValuePairDto } from '../../../core/models/keyvalue-dto.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-llm-form',
  templateUrl: './llm-form.component.html',
  styleUrls: ['./llm-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class LlmFormComponent implements OnInit {
  llm?: LlmDto;
  loading = true;
  llmForm!: FormGroup;

  constructor(private fb: FormBuilder, private llmService: LlmService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
      if(id){  
        this.llmService.getLlm(id).subscribe({
        next: (data) => {
            this.llm = data;
            this.loading = false;
            console.log("LLM ricevuto:", data);
        },
        error: (err) => {
            console.error('Errore durante il caricamento delle informazioni per LLM:', err);
            this.loading = false;
        },
        });
      }

    this.llmForm = this.fb.group({
      name: [this.llm?.name || ''],
      url: [this.llm?.url || ''],
      key_req: [this.llm?.key_req || ''],
      key_resp: [this.llm?.key_resp || ''],
      kv_header: this.fb.array(this.initKeyValueArray(this.llm?.kv_header || [])),
      kv_body: this.fb.array(this.initKeyValueArray(this.llm?.kv_body || [])),
    });
  }

  initKeyValueArray(items: KeyValuePairDto[]): FormGroup[] {
    return items.map(item => this.fb.group({
      key: [item.key],
      value: [item.value],
    }));
  }

  get kvHeader(): FormArray {
    return this.llmForm.get('kv_header') as FormArray;
  }

  get kvBody(): FormArray {
    return this.llmForm.get('kv_body') as FormArray;
  }

  addHeader(): void {
    this.kvHeader.push(this.fb.group({ key: [''], value: [''] }));
  }

  addBody(): void {
    this.kvBody.push(this.fb.group({ key: [''], value: [''] }));
  }
  
  onSubmit(): void {
    if (this.llmForm.valid) {
      const result: LlmDto = this.llmForm.value;
      console.log('Form inviato:', result);
      // chiamare servizio per salvare modifica
      if(this.llm) {
        result.id = this.llm.id;
        this.llmService.saveLlm(result).subscribe({
            next: (data) => {
            this.router.navigate(['/llm', data.id])
          },
          error: (err) => {
            console.error(`Errore durante la modifica dell'LLM`, err);
          }
        });
      }
      else {
        this.llmService.createLlm(result).subscribe({
            next: (data) => {
            this.router.navigate(['/llm', data.id])
          },
          error: (err) => {
            console.error(`Errore durante la creazione dell'LLM`, err);
          }
        });
      }
    }
  }

  onCancel(): void {
    this.llmForm.reset();
  }
}
