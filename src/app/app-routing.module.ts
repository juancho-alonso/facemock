import { NgModule } from "@angular/core";
import { Routes, RouterModule} from '@angular/router';
import { SignUpMobileComponent } from './initial/sign-up/sign-up-mobile/sign-up-mobile.component';
import { InitialComponent } from './initial/initial.component';

const appRoutes: Routes = [
    {path: '', component: InitialComponent},
    {path: "sign-up-mobile", component: SignUpMobileComponent}
  ];  

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}