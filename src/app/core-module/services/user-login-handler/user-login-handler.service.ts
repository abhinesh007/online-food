import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpService } from './../../../shared-module/services/http/http.service';
import { UserModelService } from './../user-model/user-model.service';

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
    const loginApiUrl = 'http://localhost:5000/api/v1/login';
    return this.httpService.post<{}>(loginApiUrl, null, null, userCredentials)
    .pipe(
      map((loginData: any) => {
        if (loginData.status === 200) {
          this.setLoggedInUserData(loginData.userData);
          window.localStorage.setItem('user', JSON.stringify(loginData.userData));
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
    const loginApiUrl = 'http://localhost:5000/signup';
    return this.httpService.post<{}>(loginApiUrl, null, null, userData);
  }

  public getDummy(): void {
    const storeapi: any = `http://dummy.restapiexample.com/api/v1/employees`;
    this.httpService.get(storeapi, null, null)
      .subscribe((x: any) => {
      }, (error: any) => console.log('Something went wrong! Here\'s the error: ', error));
  }
}
