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

export class AdminAuthGuard implements CanActivate {

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

    const sessionUser = JSON.parse(this.userLoginHandlerService.getCookie('user'));
    if (sessionUser) {
      this.userLoginHandlerService.setLoggedInUserData(sessionUser);
    }

    if (!this.userLoginHandlerService.model.isUserLoggedIn) {
      this.loginRef = this.userLoginModalService.openModal('loginSignupModal');
      this.loginRef
        .then((data) => {
            this.router.navigate(['/admin-dashboard']);
        });
    } else if (this.userLoginHandlerService.model.loggedInUserData.isAdmin) {
        return true;
    } else {
        alert('Unauthorised Login!');
        this.router.navigate(['/']);
        return false;
    }

  }
}
