import { Routes } from '@angular/router';
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
      { path: 'llm', component: MenuTestingComponent },
      { path: 'dataset', component: DatasetListPageComponent },
      { path: 'datasetContentPage', component: DatasetContentPageComponent }
      { path: 'test', component: MenuTestingComponent }
    ],
  },
];
