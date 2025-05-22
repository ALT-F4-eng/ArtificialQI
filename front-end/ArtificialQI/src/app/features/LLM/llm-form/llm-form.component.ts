import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LlmService } from '../../../core/services/llm.service';
import { LlmDto } from '../../../core/models/llm-dto.model';
import { KeyValuePairDto } from '../../../core/models/keyvalue-dto.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MessageBoxComponent } from '../../../shared/error-message/message.component';
import { Validators } from '@angular/forms';
import { onlyspaceValidator } from '../../../shared/validators/onlyspace.validators';
import { urlValidator } from '../../../shared/validators/url.validators';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-llm-form',
  templateUrl: './llm-form.component.html',
  styleUrls: ['./llm-form.component.css'],
  imports: [
    MessageBoxComponent,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIcon,
  ],
})
export class LlmFormComponent implements OnInit {
  llm?: LlmDto;
  loading = true;
  llmForm!: FormGroup;
  showMessage = false;
  resultMessage = '';
  messageType: 'success' | 'error' = 'error';

  constructor(
    private fb: FormBuilder,
    private llmService: LlmService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.llmService.getLlm(id).subscribe({
        next: (data) => {
          this.llm = data;
          this.loading = false;
          console.log('LLM ricevuto:', data);
        },
        error: (err) => {
          console.error(
            'Errore durante il caricamento delle informazioni per LLM:',
            err
          );
          this.resultMessage =
            'Errore durante il caricamento delle informazioni per LLM';
          this.messageType = 'error';
          this.showMessage = true;
          this.loading = false;
        },
      });
    }

    this.llmForm = this.fb.group({
      name: [this.llm?.name || '', [Validators.required, onlyspaceValidator]],
      url: [
        this.llm?.url || '',
        [Validators.required, onlyspaceValidator, urlValidator],
      ],
      key_req: [
        this.llm?.key_req || '',
        [Validators.required, onlyspaceValidator],
      ],
      key_resp: [
        this.llm?.key_resp || '',
        [Validators.required, onlyspaceValidator],
      ],
      kv_header: this.fb.array(
        this.initKeyValueArray(this.llm?.kv_header || [])
      ),
      kv_body: this.fb.array(this.initKeyValueArray(this.llm?.kv_body || [])),
    });
  }

  initKeyValueArray(items: KeyValuePairDto[]): FormGroup[] {
    return items.map((item) =>
      this.fb.group({
        key: [item.key],
        value: [item.value],
      })
    );
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
    if (this.llmForm.invalid) {
      this.llmForm.markAllAsTouched(); // questa riga forza la visualizzazione errori
      return;
    } else if (this.llmForm.valid) {
      const result: LlmDto = {
        ...this.llmForm.value,
        name: this.llmForm.value.name.trim(),
        url: this.llmForm.value.url.trim(),
        key_req: this.llmForm.value.key_req.trim(),
        key_resp: this.llmForm.value.key_resp.trim(),
        kv_header: this.kvHeader.value.map((v: KeyValuePairDto) => ({
          key: v.key?.trim() || '',
          value: v.value?.trim() || '',
        })),
        kv_body: this.kvBody.value.map((v: KeyValuePairDto) => ({
          key: v.key?.trim() || '',
          value: v.value?.trim() || '',
        })),
      };
      console.log('Form inviato:', result);
      // chiamare servizio per salvare modifica
      if (this.llm) {
        result.id = this.llm.id;
        this.llmService.saveLlm(result).subscribe({
          next: (data) => {
            this.router.navigate(['/llm', data.id]);
          },
          error: (err) => {
            console.error(`Errore durante la modifica dell'LLM`, err);
            this.resultMessage = `Errore durante la modifica dell'LLM`;
            this.messageType = 'error';
            this.showMessage = true;
          },
        });
      } else {
        this.llmService.createLlm(result).subscribe({
          next: (data) => {
            this.router.navigate(['/llm', data.id]);
          },
          error: (err) => {
            console.error(`Errore durante la creazione dell'LLM`, err);
            this.resultMessage = `Errore durante la creazione dell'LLM`;
            this.messageType = 'error';
            this.showMessage = true;
          },
        });
      }
    }
  }

  onCancel(): void {
    this.llmForm.reset();
  }

  onCloseMessage() {
    this.showMessage = false;
    this.resultMessage = '';
    this.messageType = 'error';
  }
}
