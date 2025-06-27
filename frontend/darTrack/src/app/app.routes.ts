import { Routes } from '@angular/router';
import { CoreComponent } from './core/core.component';
import { authRoutes } from './auth/auth.routes';

export const routes: Routes = [
    {
        path: '',
        component: CoreComponent,
    },
    ...authRoutes
];
