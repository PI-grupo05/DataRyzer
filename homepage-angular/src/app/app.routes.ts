import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import path from 'path';


export const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'home', component: HomeComponent
  }
];
