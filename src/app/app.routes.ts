import { Routes } from '@angular/router';
import { WordCardPage } from './word-card-page/word-card-page';
import { MainMenuPage } from './main-menu-page/main-menu-page';

export const routes: Routes = [
    {
        path:"word",
        component:WordCardPage
    },
    {
        path:"",
        component:MainMenuPage
    }
];
