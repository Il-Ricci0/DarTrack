import { Routes } from '@angular/router';
import { CoreComponent } from './core/core.component';
import { authRoutes } from './auth/auth.routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { matchRoutes } from './match/match.routes';
import { leaderboardRoutes } from './leaderboard/leaderboard.routes';

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
      ...matchRoutes,
      ...leaderboardRoutes,
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
  },
  ...authRoutes,
];
