import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalErrorHandlerService } from './../../services/global-error-handler/global-error-handler.service';
import { ICustomError } from './../error/error.model';

@Component({
  selector: 'app-not-found-404',
  templateUrl: './not-found-404.component.html',
  styleUrls: ['./not-found-404.component.scss']
})
export class NotFound404Component implements OnInit {

  error: ICustomError = {
    errorDescription: 'Description',
    errorHeading: 'Heading'
  };

  constructor(
    private globalErrorHandlerService: GlobalErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.error = this.globalErrorHandlerService.getErrorModalDataFeed();
  }

}
