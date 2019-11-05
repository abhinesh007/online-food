import { Component, OnInit, Inject } from '@angular/core';
import { NB_WINDOW, NbMenuService, NbSidebarService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { UserLoginHandlerService } from 'src/app/core-module/services/user-login-handler/user-login-handler.service';
import { Router } from '@angular/router';
import { IUserLoginTransportData } from 'src/app/core-module/services/user-model/user-model.model';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  items = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor (
    private sidebarService: NbSidebarService,
    private nbMenuService: NbMenuService,
    private userLoginHandlerService: UserLoginHandlerService,
    private router: Router,
    @Inject(NB_WINDOW) private window
  ) { }

  toggleSidebar() {
    this.sidebarService.toggle(true);
    // to hide completely
    // this.sidebarService.toggle(false, 'left');

    return false;
  }

  ngOnInit() {
    this.nbMenuService.onItemClick().pipe(
      filter(({ tag }) => tag === 'admin-avatar-click'),
      map(({ item: { title } }) => title),
    ).subscribe(title => {
      if (title.toLowerCase() === 'log out') {
        this.logOutUser();
      }
      else {
        this.window.alert(`${title} was clicked!`)
      }
    });

  }

  logOutUser() {
    this.userLoginHandlerService.eraseCookie('user');
    this.userLoginHandlerService.setLoggedInUserData(<IUserLoginTransportData>undefined);
    this.userLoginHandlerService.model.isUserLoggedIn = false;
    this.router.navigate(['']);
  }

}
