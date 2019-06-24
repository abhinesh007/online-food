import { Component, OnInit, Inject } from '@angular/core';
import { NB_WINDOW, NbMenuService, NbSidebarService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';

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
    ).subscribe(title => this.window.alert(`${title} was clicked!`));

  }

}
