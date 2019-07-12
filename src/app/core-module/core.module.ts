import { AdminModule } from './../admin-module/admin-module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from './../shared-module/shared.module';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { NbSidebarModule, NbLayoutModule} from '@nebular/theme';
import { AppNgbModule } from '../app.ngb.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    AdminModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    AppNgbModule
  ],
  declarations: [
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    AdminLayoutComponent,
    UserLayoutComponent
  ],
  exports: [
    LoginComponent,
    NavbarComponent,
    FooterComponent
  ]
})

export class CoreModule { }
