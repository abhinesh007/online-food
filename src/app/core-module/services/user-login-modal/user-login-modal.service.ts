
import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './../../components/login/login.component';
import { ErrorComponent } from './../../../shared-module/components/error/error.component';

import { ICustomError } from './../../../shared-module/components/error/error.model';

@Injectable({
  providedIn: 'root'
})

export class UserLoginModalService {

  private modalConfig: any = {
    loginSignupModal: {
      component: LoginComponent,
      options: {

      }
    },
    loginErrorModal: {
      component: ErrorComponent,
      options: {

      }
    }

    // mongod.exe --dbpath C:\Abhinesh\DB

  };

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal
  ) { }

  public openModal(modalName: string, modalResolves: Object = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      const config: { component: any, options: NgbModalOptions } = this.modalConfig[modalName];
      const modalRef = this.modalService.open(config.component, config.options);

      // tslint:disable-next-line:forin
      for (const key in modalResolves) {
        modalRef.componentInstance[key] = modalResolves[key];
      }

      return modalRef.result
        .then((resolveData: any) => {
          return resolve(resolveData);
        }, (rejectData: any) => {
          return reject(rejectData);
        });
    });

  }

}
