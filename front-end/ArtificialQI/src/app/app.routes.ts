import { Routes } from '@angular/router';

import { LlmPageComponent } from './features/LLM/llm-page/llm-page.component'
import { LlmListPageComponent } from './features/LLM/llm-list-page/llm-list-page.component';
import { LlmFormComponent } from './features/LLM/llm-form/llm-form.component';
import { StandardPageComponent } from './layout/standard-page/standard-page.component';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { MenuTestingComponent } from './menu-testing/menu-testing.component'
import { DatasetListPageComponent } from './features/dataset/dataset-list-page/dataset-list-page.component';
import { DatasetContentPageComponent } from './features/dataset/dataset-content-page/dataset-content-page.component';// per testing
import { TestListPageComponent } from './features/test/test-list-page/test-list-page.component';


export const routes: Routes = [
  {
    path: '',
    component: StandardPageComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'testlist', component: TestListPageComponent },
      { path: 'llm', component: LlmListPageComponent },
      { path: 'dataset', component: DatasetListPageComponent },
      { path: 'datasetContentPage', component: DatasetContentPageComponent },//per create (dato che non c'è un id)
      { path: 'datasetContentPage/:id', component: DatasetContentPageComponent },//per load
      { path: 'test', component: MenuTestingComponent },
      { path: 'llm/:id', component: LlmPageComponent },
      { path: 'llm-form', component: LlmFormComponent },
      { path: 'llm-form/:id', component: LlmFormComponent }
    ],
  },
];
