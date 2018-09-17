
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MzSidenavModule,
          MzNavbarModule,
          MzButtonModule,
          MzCheckboxModule,
          MzTabModule,
          MzDropdownModule,
          MzIconModule,
          MzIconMdiModule,
          MzToastModule,
        } from 'ngx-materialize';

import { AuthGuard } from './auth/auth.guard';
import { NotificationService } from './shared/notification.service';
import { MyFireService } from './shared/my-fire.service';
import { UserService } from './shared/user.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { NotificationComponent } from './shared/notification/notification.component';
import { AppRoutingModule } from './app-routing.module';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { MyPostsComponent } from './pages/my-posts/my-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AuthComponent,
    HomeComponent,
    MyPostsComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule , // importa firebase / firestore, necessário apenas para recursos do banco de dados
    AngularFireAuthModule , // importa firebase / auth, necessário apenas para recursos de autenticação,
    AngularFireStorageModule,  // importa o Firebase / storage necessário apenas para recursos de armazenamento
    AppRoutingModule,
    BrowserAnimationsModule,
    MzSidenavModule,
    MzNavbarModule,
    MzButtonModule,
    MzCheckboxModule,
    MzTabModule,
    MzDropdownModule,
    MzIconModule,
    MzIconMdiModule,
    MzToastModule,
  ],
  providers: [AuthGuard, NotificationService, MyFireService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
