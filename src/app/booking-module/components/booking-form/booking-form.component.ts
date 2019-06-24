import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
  // @ViewChild() bookingForm: NgForm;
  defaultSelectValue = '0';

  constructor() { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
   // console.log('form submitted', this.bookingForm);
  }
}
