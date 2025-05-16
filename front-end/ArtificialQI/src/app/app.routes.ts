import { Routes } from '@angular/router';
import { LlmPageComponent } from './features/LLM/llm-page/llm-page.component'
import { LlmListPageComponent } from './features/LLM/llm-list-page/llm-list-page.component';

export const routes: Routes = [
    { path: '', component: LlmListPageComponent},
    { path: 'llm/:id', component: LlmPageComponent }
];
