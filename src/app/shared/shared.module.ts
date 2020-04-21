import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { IonicModule } from '@ionic/angular';
import { UploadButtonCardComponent } from './components/upload-button-card/upload-button-card.component';


@NgModule({
  declarations: [UploadButtonCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedRoutingModule
  ],
  exports:[
    UploadButtonCardComponent
  ]
  
})
export class SharedModule { }
