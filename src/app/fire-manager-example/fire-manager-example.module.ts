import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { FireManagerModule } from '@ngx-fire-uploader/manager';

import { FireManagerExampleComponent } from './fire-manager-example/fire-manager-example.component';
import { AngularMaterialModule } from '../angular-material.module';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap/collapse/collapse.module';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    NgbCollapseModule,
    SimpleNotificationsModule,
    FireManagerModule.forRoot({
      extensions: {
        pdf: 'url("assets/pdf.svg")',
        doc: '#335599'
      }
    }),
    RouterModule.forChild([
      {
        path: '',
        component: FireManagerExampleComponent
      }
    ])
  ],
  declarations: [FireManagerExampleComponent]
})
export class FireManagerExampleModule { }
