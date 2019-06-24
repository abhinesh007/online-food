import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { ICustomError } from './../../components/error/error.model';

@Injectable({
  providedIn: 'root'
})

export class GlobalErrorHandlerService {

  private errorModalDataFeed: ICustomError = <ICustomError>{};

  constructor(
  ) { }

  public setErrorModalDataFeed(description: string, heading: string, others?: any): void {
    this.errorModalDataFeed.errorDescription = description;
    this.errorModalDataFeed.errorHeading = heading;
  }

  public getErrorModalDataFeed(): ICustomError {
    return this.errorModalDataFeed;
  }

}
