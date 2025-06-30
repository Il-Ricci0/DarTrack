import { Routes } from '@angular/router';
import { CoreComponent } from './core/core.component';
import { authRoutes } from './auth/auth.routes';
import { CreateMatch } from './create-match/create-match';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: 'game/create',
        component: CreateMatch,
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ],
  },
  ...authRoutes,
];
