import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { LoginComponent } from '../login/login.component';

import { UserLoginModalService } from './../../services/user-login-modal/user-login-modal.service';
import { UserLoginHandlerService } from './../../services/user-login-handler/user-login-handler.service';
import { IUserLoginTransportData } from './../../services/user-model/user-model.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
    public router: Router,
    private userLoginModalService: UserLoginModalService,
    private userLoginHandlerService: UserLoginHandlerService
  ) { }

  public isUserLoggedIn: boolean;
  public loggedInUserData: IUserLoginTransportData;


  ngOnInit() {
    this.loggedInUserData = this.userLoginHandlerService.getLoggedInUserData();
    this.userLoginHandlerService.loggedInUserDataSubject.subscribe(
      (data) => {
        this.loggedInUserData = <IUserLoginTransportData>data;
        if (!_.isEmpty(this.loggedInUserData)) {
          this.isUserLoggedIn = this.userLoginHandlerService.model.isUserLoggedIn = true;
        }
      }
    );
  }

  public openLoginModal() {
    const modalRef = this.userLoginModalService.openModal('loginSignupModal');
  }

  public logout(): void {
    this.userLoginHandlerService.logOutUser()
      .subscribe((logOutData: any) => {
        if (logOutData.message === 'Successfully loggedout') {
          this.activeModal.close('');
          // this.userLoginHandlerService.setLoggedInUserData(loginData.userData);
          // this.userLoginHandlerService.loggedInUserDataSubject.next(logOutData.message);
          this.router.navigate(['']);
          this.isUserLoggedIn = false;
        }
      }, (error: any) => {
        this.activeModal.close('');
        console.log('Something went wrong! Here\'s the error: ', error);
        this.userLoginModalService.openModal('loginErrorModal');
      });
  }

}
