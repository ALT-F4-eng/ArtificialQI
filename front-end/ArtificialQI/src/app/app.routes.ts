import { Routes } from '@angular/router';
import { LlmPageComponent } from './features/LLM/llm-page/llm-page.component'
import { LlmListPageComponent } from './features/LLM/llm-list-page/llm-list-page.component';
import { LlmFormComponent } from './features/LLM/llm-form/llm-form.component';

export const routes: Routes = [
    { path: '', component: LlmListPageComponent},
    { path: 'llm/:id', component: LlmPageComponent },
    { path: 'llm-form', component: LlmFormComponent },
    { path: 'llm-form/:id', component: LlmFormComponent }
];
