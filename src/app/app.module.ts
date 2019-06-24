import { AppNgbModule } from './app.ngb.module';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, Component } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core-module/core.module';
import { SharedModule } from './shared-module/shared.module';
import { BookingModule } from './booking-module/booking-module.module';
import { ShopFoodModule } from './shop-food-module/shop-food.module';
import { CartModule } from './cart-module/cart.module';
import { AdminModule } from './admin-module/admin-module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './core-module/components/login/login.component';
import { ErrorComponent } from './shared-module/components/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { AdminNbStyleModule } from './admin-module/admin-nb-style.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
    AppRoutingModule,
    ShopFoodModule,
    CartModule,
    BookingModule,
    SharedModule,
    AdminModule,
    AppNgbModule,
    BrowserAnimationsModule,
    AdminNbStyleModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent, ErrorComponent
  ]
})
export class AppModule { }
