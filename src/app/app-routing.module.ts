import { NgModule } from "@angular/core";
import { Routes, RouterModule} from '@angular/router';
import { SignUpMobileComponent } from './initial/sign-up/sign-up-mobile/sign-up-mobile.component';
import { InitialComponent } from './initial/initial.component';
import { WallComponent } from './wall/wall.component';
import { LoginFailedComponent } from './initial/login/login-failed/login-failed.component';
import { SignUpComponent } from './initial/sign-up/sign-up.component';

const appRoutes: Routes = [
    {path: '', component: InitialComponent},
    {path: "sign-up-mobile", component: SignUpMobileComponent},
    {path: "wall", component: WallComponent},
    {path: "login-failed", component: LoginFailedComponent}];  

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}