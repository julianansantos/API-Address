import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { MainComponent } from './layout/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateComponent } from './pages/address/create/create.component';
import { EditComponent } from './pages/address/edit/edit.component';
import { CreateComponent as RegisterComponent } from './pages/auth/create/create.component';
import { TopCommunitiesComponent } from './pages/top-communities/top-communities.component';
import { CreateComponent as CommunityComponent } from './pages/community/create/create.component';
import { IndexComponent } from './pages/community/index/index.component';
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
        path: 'register',
        component: RegisterComponent
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
                path: 'address/new',
                component: CreateComponent
            },
            {
                path: 'address/edit/:id',
                component: EditComponent
            },
            {
                path: 'community',
                component: TopCommunitiesComponent
            },
            {
                path: 'community/create/new',
                component: CommunityComponent

            },
            {
                path: 'community/index',
                component: IndexComponent

            }
        ]
    }
];
