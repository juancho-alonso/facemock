import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InitialComponent } from './initial/initial.component';
import { WallComponent } from './wall/wall.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './initial/login/login.component';
import { SignUpComponent } from './initial/sign-up/sign-up.component';
import { FooterComponent } from './initial/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpMobileComponent } from './initial/sign-up/sign-up-mobile/sign-up-mobile.component'
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    InitialComponent,
    WallComponent,
    ProfileComponent,
    LoginComponent,
    SignUpComponent,
    FooterComponent,
    SignUpMobileComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
