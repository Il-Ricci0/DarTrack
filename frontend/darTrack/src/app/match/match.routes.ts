import { Routes } from "@angular/router";
import { CreateMatch } from "./create-match/create-match";
import { JoinMatchComponent } from "./join-match/join-match.component";

export const matchRoutes: Routes = [
    {
        path: 'game',
        children: [
            {
                path: 'casual',
                children: [
                    {
                        path: 'create',
                        component: CreateMatch,
                    },
                    {
                        path: 'join',
                        component: JoinMatchComponent,
                    }
                ]
            },
            {
                path: 'tournament',
                children: [
                    {
                        path: 'create',
                        component: CreateMatch,
                    },
                    {
                        path: 'join',
                        component: JoinMatchComponent,
                    }
                ]
            }
        ]
    }
];