import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BookingFormComponent } from './components/booking-form/booking-form.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    BookingFormComponent
  ],
  exports: [
    BookingFormComponent
  ]
})

export class BookingModule { }
