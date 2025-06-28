import { Routes } from "@angular/router";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";

export const authRoutes: Routes = [
    {
        path: 'auth/signin',
        component: SigninComponent,
    },
    {
        path: 'auth/signup',
        component: SignupComponent,
    }
];