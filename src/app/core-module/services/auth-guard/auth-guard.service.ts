import { UserLoginModalService } from './../user-login-modal/user-login-modal.service';
import * as _ from 'lodash';
import { UserLoginHandlerService } from './../user-login-handler/user-login-handler.service';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { GlobalErrorHandlerService } from 'src/app/shared-module/services/global-error-handler/global-error-handler.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  private isUserLoggedIn = false;

  constructor(
    private userLoginHandlerService: UserLoginHandlerService,
    private router: Router,
    private userLoginModalService: UserLoginModalService,
    private globalErrorHandlerService: GlobalErrorHandlerService
  ) { }

  private loginRef;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let sessionUser = JSON.parse(window.localStorage.getItem('user'));
    if (sessionUser) {
      this.userLoginHandlerService.setLoggedInUserData(sessionUser);
    } 
    if (!this.userLoginHandlerService.model.isUserLoggedIn && !this.userLoginHandlerService.model.loggedInUserData.isAdmin) {
      this.router.navigate(['/']);
      this.loginRef = this.userLoginModalService.openModal('loginSignupModal');
      this.loginRef
        .then((data) => {
          if (!this.userLoginHandlerService.model.loggedInUserData.isAdmin) {
            this.router.navigate(['/checkout']);
          } else {
            this.router.navigate(['/admin-dashboard']);
          }

        });
      return false;
    }

    return true;
  }
}
