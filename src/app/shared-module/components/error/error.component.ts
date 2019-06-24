import { Component, Input, OnInit } from '@angular/core';
import { GlobalErrorHandlerService } from './../../services/global-error-handler/global-error-handler.service';

import { ICustomError } from './error.model';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  @Input() title = `Information`;

  error: ICustomError = {
    errorDescription: 'Description',
    errorHeading: 'Heading'
  };

  constructor(
    private globalErrorHandlerService: GlobalErrorHandlerService
  ) { }

  ngOnInit() {
    this.error = this.globalErrorHandlerService.getErrorModalDataFeed();
  }

}
