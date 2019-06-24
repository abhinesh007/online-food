import { AdminDataService } from './../../services/admin-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  model: any = {};

  constructor(
    private adminDataService: AdminDataService
  ) { }

  ngOnInit() {
    this.model = this.adminDataService.model;
    console.log('this.model.userList', this.model.userList);
  }

}
