import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
   private ngxSpinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.ngxSpinnerService.show();

    setTimeout(() => {
      /** ngxSpinnerService ends after 5 seconds */
      this.ngxSpinnerService.hide();
    }, 500);
  }

}
