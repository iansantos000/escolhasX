import { FileSizePipe } from './pipes/fileSize.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { Page404Component } from './pages/page404/page404.component';
import { AuthComponent } from './pages/auth/auth.component';
import { NotificationComponent } from './shared/notification/notification.component';
import { NotificationService } from './shared/notification.service';
import { CadastrarEnsaiosComponent } from './pages/cadastrar-ensaios/cadastrar-ensaios.component';
import { MAT_DATE_LOCALE } from '@angular/material';
import { EscolhasCriarComponent } from './pages/escolhas-criar/escolhas-criar.component';
import { DropZoneDirective } from './diretives/drop-zone.directive';
import { CadPortifolioComponent } from './pages/Fotografo/cad-portifolio/cad-portifolio.component';

import { FireManagerExampleModule } from './fire-manager-example/fire-manager-example.module';
import { FirePhotoExampleModule } from './fire-photo-example/fire-photo-example.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { FireUploaderModule } from '@ngx-fire-uploader/core';
import { FirePhotoModule } from '@ngx-fire-uploader/photo';
import { FireManagerModule } from '@ngx-fire-uploader/manager';

import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap/collapse/collapse.module';
import { PortifolioPageComponent } from './pages/portifolio-page/portifolio-page.component';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SobreComponent,
    ContatoComponent,
    MainNavComponent,
    Page404Component,
    AuthComponent,
    NotificationComponent,
    CadastrarEnsaiosComponent,
    EscolhasCriarComponent,
    CadPortifolioComponent,
    DropZoneDirective,
    FileSizePipe,
    PortifolioPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FireManagerExampleModule,
    FirePhotoExampleModule,
    FireManagerModule.forRoot({
      extensions: {
        pdf: 'url("assets/pdf.svg")',
        doc: '#335599'
      }
    }),
    SimpleNotificationsModule.forRoot(),
    AngularMaterialModule, // importa todos os componentes usados de Angular Material.
    FormsModule, FormsModule, ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // importa firebase / firestore, necessário apenas para recursos do banco de dados
    AngularFireAuthModule, // importa firebase / auth, necessário apenas para recursos de autenticação,
    AngularFireStorageModule,
    NgbCollapseModule.forRoot(),
    FireUploaderModule.forRoot(),
    FirePhotoModule.forRoot(),
    DragDropModule,
  ],
  providers:  [  NotificationService,
                {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
