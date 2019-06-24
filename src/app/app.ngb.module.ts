import { NgbModule, NgbActiveModal, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    NgbCollapseModule,
    NgxSpinnerModule
  ],
  declarations: [

  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    NgbActiveModal
  ],
  exports: [
    NgbModule,
    NgbCollapseModule,
    NgxSpinnerModule
  ]
})
export class AppNgbModule { }
