import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UserLoginHandlerService } from '../../services/user-login-handler/user-login-handler.service';
import { UserLoginModalService } from './../../services/user-login-modal/user-login-modal.service';
import { GlobalErrorHandlerService } from './../../../shared-module/services/global-error-handler/global-error-handler.service';
import { IUser, IUserLoginResponse } from './../../services/user-model/user-model.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public showSignup;

  constructor(
    public activeModal: NgbActiveModal,
    public router: Router,
    private userLoginHandlerService: UserLoginHandlerService,
    private userLoginModalService: UserLoginModalService,
    private globalErrorHandlerService: GlobalErrorHandlerService

  ) { }


  public login(loginForm: NgForm): void {
    const loginMeta = {
      password: loginForm.value.loginUserPassword,
      name: loginForm.value.loginUserEmail
    };
    this.userLoginHandlerService.loginUser(loginMeta)
      .subscribe((loginData: IUserLoginResponse) => {
        if (loginData.status === 200) {
          this.activeModal.close('Login successful');
          this.userLoginHandlerService.setLoggedInUserData(loginData.userData);
          this.userLoginHandlerService.loggedInUserDataSubject.next(loginData.userData);
        }
      }, (error: any) => {
        this.activeModal.close('Login error');
        console.log('Something went wrong! Here\'s the error: ', error);
        this.globalErrorHandlerService.setErrorModalDataFeed(error.error.message, 'Login Error');
        this.userLoginModalService.openModal('loginErrorModal', error.error);
      });
  }

  public signup(signUpForm): void {
    this.userLoginHandlerService.signupUser(signUpForm.value)
      .subscribe((loginData: any) => {
        if (loginData.status === 201 && loginData.result) {
          this.activeModal.close('Signup successful');
          this.userLoginHandlerService.setLoggedInUserData(loginData.result);
          this.userLoginHandlerService.loggedInUserDataSubject.next(loginData.result);
        }
      }, (error: any) => {
        console.log('Something went wrong! Here\'s the error: ', error);
      });
  }

  ngOnInit() {
    this.showSignup = this.userLoginHandlerService.model.showSignUp;
  }

}
