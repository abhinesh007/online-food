import { AdminUtilService } from './../../services/admin-util.service';
import { IAdminUser } from './../../model/admin-user.model';
import { AdminDataService } from './../../services/admin-data.service';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-admin-user-form',
  templateUrl: './add-admin-user-form.component.html',
  styleUrls: ['./add-admin-user-form.component.scss']
})
export class AddAdminUserFormComponent implements OnInit {

  dynamicFormItems: FormArray;
  adminUserForm: FormGroup;
  activeUserId = this.activatedRoute.snapshot.params['id'];
  public isLoading = false;
  public editMode = false;
  userList: IAdminUser[] = [];
  activeUser: any;

  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private adminDataService: AdminDataService,
    public adminUtilService: AdminUtilService) { }

  ngOnInit() {
    this.adminUserForm = this.formBuilder.group({
      dynamicFormItems: this.formBuilder.array([this.createUserForm()])
    });
    if (this.activeUserId) {
      this.loadUserForm();
    }
  }

  getUserIndexFromId(id): number {
    return this.userList.findIndex((elem) => {
      return elem._id === id;
    });
  }

  loadUserForm() {
    this.editMode = true;
    if (this.adminDataService.model.userList) {
      this.userList = this.adminDataService.model.userList;
      const userIndex = this.getUserIndexFromId(this.activeUserId);
      this.activeUser = this.userList[userIndex];
      this.adminUserForm.get('dynamicFormItems').get([0]).patchValue(this.activeUser);
    }
  }

  createUserForm() {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      userEmail: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i)]],
      password: ['', Validators.required],
      isAdmin: [false, [Validators.required]],
      accessLevel: ['R', [Validators.required]],
      _id: ['']
    });
  }

  deleteUser() {
     const userIndex = this.getUserIndexFromId(this.activeUserId);
      this.adminDataService.deleteUser(this.activeUser)
        .subscribe((response: any) => {
          if (response) {
            this.adminUtilService.showToast('deleted',  response.result._id);
            this.userList.splice(userIndex, 1);
            this.adminUtilService.back();
            console.log('this.userlist', this.userList);
          }
        });
  }

  updateUserDetails(){
    const userIndex = this.getUserIndexFromId(this.activeUserId);
    this.userList[userIndex] = this.adminUserForm.get('dynamicFormItems').get([0]).value;
    this.adminDataService.upadteUserDetails(this.userList[userIndex])
      .subscribe((response: any) => {
        if (response) {
          this.adminUtilService.showToast('updated user', response.result._id);
          this.userList[userIndex] = response.result;
          this.adminUtilService.back();
        }
      });
  }
  onSubmitUser() {
    this.isLoading = true;
    const userReq = {
      name: this.adminUserForm.value.dynamicFormItems[0].name,
      userEmail: this.adminUserForm.value.dynamicFormItems[0].userEmail,
      isAdmin: this.adminUserForm.value.dynamicFormItems[0].isAdmin,
      accessLevel: this.adminUserForm.value.dynamicFormItems[0].accessLevel,
      password: this.adminUserForm.value.dynamicFormItems[0].password
    };
    this.adminDataService.createUser(userReq)
    .subscribe((userData: any) => {
      this.isLoading = false;
      if (userData.status === 201) {
        this.adminUtilService.showToast('created', userData.result[0]._id);
        console.log('data from create Items call', userData);
      } else {
        this.adminUtilService.showToast('error');
      }
      this.adminUtilService.back();
    }, (error: any) => {
      this.isLoading = false;
      console.log('Something went wrong! Here\'s the error: ', error);
      this.adminUtilService.showToast('error');
      this.adminUtilService.back();
    });

  }
  checkPassword(){
    
  }

}
