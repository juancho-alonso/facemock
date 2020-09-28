import { NgModule } from "@angular/core";
import { Routes, RouterModule} from '@angular/router';
import { SignUpMobileComponent } from './initial/sign-up/sign-up-mobile/sign-up-mobile.component';
import { InitialComponent } from './initial/initial.component';
import { WallComponent } from './wall/wall.component';
import { LoginFailedComponent } from './initial/login/login-failed/login-failed.component';
import { SignUpComponent } from './initial/sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { NoUserComponent } from './initial/login/no-user/no-user.component';
import { AddFriendsComponent } from './initial/sign-up/add-friends/add-friends.component';

const appRoutes: Routes = [
    {path: '', component: InitialComponent},
    {path: "sign-up-mobile", component: SignUpMobileComponent},
    {path: "wall", component: WallComponent},
    {path: "login-failed", component: LoginFailedComponent},
    {path: "profile", component: ProfileComponent},
    {path:"user-not-found", component: NoUserComponent},
    {path:"add-friends", component: AddFriendsComponent}];  

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}