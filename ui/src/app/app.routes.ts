import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { MainComponent } from './layout/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateComponent } from './pages/address/create/create.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'new-address',
                component: CreateComponent
            }
        ]
    }
];
