import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from "./auth/auth.guard";

const routes: Routes = [
    {path: '', redirectTo: 'user', pathMatch: 'full'},

    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },

    {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        canActivate: [authGuard]
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
