import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpService } from './../../../shared-module/services/http/http.service';
import { UserModelService } from './../user-model/user-model.service';
import { API_URLS } from './../../apiUrls';

import { IUserLoginTransportData } from './../user-model/user-model.model';


@Injectable({
  providedIn: 'root'
})
export class UserLoginHandlerService {

  constructor(
    private httpService: HttpService,
    private userModelService: UserModelService
  ) { }

  public model: any = {
    loggedInUserData: {
      token: '',
      uuid: ''
    },
    isUserLoggedIn: false
  };

  public loggedInUserData: IUserLoginTransportData = <IUserLoginTransportData>{};
  // public isUserLoggedIn = false;

  public loggedInUserDataSubject = new Subject();

  public setLoggedInUserData(data: IUserLoginTransportData): void {
    this.model.loggedInUserData = data;
  }

  public getLoggedInUserData(): IUserLoginTransportData {
    return <IUserLoginTransportData>this.model.loggedInUserData;
  }

  public loginUser(userCredentials: any): Observable<{}> {
    // const loginApiUrl = 'http://localhost:5000/api/v1/login';
    return this.httpService.post<{}>(API_URLS.login, null, null, userCredentials)
      .pipe(
        map((loginData: any) => {
          if (loginData.status === 200) {
            this.setLoggedInUserData(loginData.userData);
            this.setCookie('user', JSON.stringify(loginData.userData), 0.5);
            return loginData;
          }
        }),
        catchError((error: any) => {
          console.log('Something went wrong! Here\'s the error: ', error);
          return of();
        })
      );
  }

  public logOutUser(): Observable<{}> {
    const url = 'http://localhost:5000/api/v1/logout';
    return this.httpService.get<{}>(url, null, null, null);
  }

  public signupUser(userData: any): Observable<{}> {
    userData.isAdmin = false;
    // const loginApiUrl = 'http://localhost:5000/signup';
    return this.httpService.post<{}>(API_URLS.users, null, null, userData);
  }

  // Cookie methods TODO: Create Separate Cookie Service

  public setCookie(name, value, hours) {
    let expires = '';
    if (hours) {
      const date = new Date();
      date.setTime(date.getTime() + ( hours * 60 * 60 * 1000));
      expires = '; expires = ' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path = /';
  }

  public getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }

      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  public eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }

}

