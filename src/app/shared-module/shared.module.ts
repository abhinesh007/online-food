
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ModalComponent } from './components/modal/modal.component';
import { ErrorComponent } from './components/error/error.component';
import { NotFound404Component } from './components/404/not-found-404.component';

import { HttpService } from './services/http/http.service';
import { HttpErrorHandlerService } from './services/http-error-handler/http-error-handler.service';
import { WindowService } from './services/window/window.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    ModalComponent,
    ErrorComponent,
    NotFound404Component
  ],
  exports: [
    ModalComponent,
    ErrorComponent,
    NotFound404Component
  ]
})

export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        WindowService, HttpErrorHandlerService, HttpService
      ]
    };
  }
}
