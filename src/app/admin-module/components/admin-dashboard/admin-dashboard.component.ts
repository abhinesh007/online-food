import { Component, OnInit } from '@angular/core';
import {UserLoginHandlerService} from '../../../core-module/services/user-login-handler/user-login-handler.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  public userName: string;

  constructor(private userHandlerService: UserLoginHandlerService) { }

  ngOnInit() {
    this.userName = this.userHandlerService.getLoggedInUserData().name;

  }

}
