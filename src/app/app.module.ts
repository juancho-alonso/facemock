import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InitialComponent } from './initial/initial.component';
import { WallComponent } from './wall/wall.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './initial/login/login.component';
import { SignUpComponent } from './initial/sign-up/sign-up.component';
import { FooterComponent } from './initial/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    InitialComponent,
    WallComponent,
    ProfileComponent,
    LoginComponent,
    SignUpComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
