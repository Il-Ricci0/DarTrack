import { Routes } from '@angular/router';
import { CoreComponent } from './core/core.component';
import { authRoutes } from './auth/auth.routes';
import { CreateMatch } from './create-match/create-match';

export const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: 'game/create',
        component: CreateMatch,
      },
    ],
  },
  ...authRoutes,
];
