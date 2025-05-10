import { Routes } from '@angular/router';
import { StandardPageComponent } from './layout/standard-page/standard-page.component';
import { HomePageComponent } from './home/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: StandardPageComponent,
    children: [
      { path: '', component: HomePageComponent }
    ],
  },
];