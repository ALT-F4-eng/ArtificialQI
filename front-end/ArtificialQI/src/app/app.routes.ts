import { Routes } from '@angular/router';
//import { datasetContentPageComponent } from './dataset-content-page/dataset-content-page.component';
// path: 'datasetContentPage', component: datasetContentPageComponent
import { StandardPageComponent } from './layout/standard-page/standard-page.component';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { MenuTestingComponent } from './menu-testing/menu-testing.component'
import { DatasetListPageComponent } from './features/dataset/dataset-list-page/dataset-list-page.component';
import { DatasetContentPageComponent } from './features/dataset/dataset-content-page/dataset-content-page.component';// per testing

export const routes: Routes = [
  {
    path: '',
    component: StandardPageComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'test', component: MenuTestingComponent },
      { path: 'llm', component: MenuTestingComponent },
      { path: 'dataset', component: DatasetListPageComponent },
      { path: 'datasetContentPage', component: DatasetContentPageComponent }
    ],
  },
];
