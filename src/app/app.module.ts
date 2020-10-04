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
import { LoginFailedComponent } from './initial/login/login-failed/login-failed.component';
import { NoUserComponent } from './initial/login/no-user/no-user.component';
import { AddFriendsComponent } from './initial/sign-up/add-friends/add-friends.component';
import { HeaderComponent } from './shared/header/header.component';
import { CreatePostComponent } from './shared/create-post/create-post.component';
import { PostTileComponent } from './shared/post-tile/post-tile.component';
import { UploadComponent } from './shared/images/upload/upload.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';


import { environment} from '../environments/environment';
import { ImagesComponent } from './shared/images/images.component'

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
    LoginFailedComponent,
    NoUserComponent,
    AddFriendsComponent,
    HeaderComponent,
    CreatePostComponent,
    PostTileComponent,
    UploadComponent,
    ImagesComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
