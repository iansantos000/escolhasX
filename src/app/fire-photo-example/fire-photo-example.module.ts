import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FireUploaderModule } from '@ngx-fire-uploader/core';
import { FirePhotoModule } from '@ngx-fire-uploader/photo';

import { FirePhotoExampleComponent } from './fire-photo-example/fire-photo-example.component';

@NgModule({
  imports: [
    CommonModule,
    FireUploaderModule.forRoot(),
    FirePhotoModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: FirePhotoExampleComponent
      }
    ])
  ],
  declarations: [FirePhotoExampleComponent]
})
export class FirePhotoExampleModule { }
