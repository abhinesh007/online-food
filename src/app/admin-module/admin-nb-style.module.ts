
import { NgModule } from '@angular/core';
import { NbMenuInternalService } from '@nebular/theme/components/menu/menu.service';
import {
  NbInputModule, NbRadioModule, NbSelectModule, NbButtonModule,
  NbCardModule,
  NbUserModule,
  NbContextMenuModule,
  NbSpinnerModule,
  NbMenuModule,
  NbMenuService,
  NbThemeModule,
  NbLayoutModule,
  NbToastrModule,
  NbListModule,
  NbStepperModule,
  NbStepperComponent
} from '@nebular/theme';

@NgModule({
  imports: [
    NbThemeModule.forRoot({ name: 'default' }),
    NbToastrModule.forRoot(),
    NbLayoutModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule, NbButtonModule,
    NbCardModule, NbUserModule, NbContextMenuModule,
    NbSpinnerModule,
    NbMenuModule,
    NbListModule,
    NbStepperModule
  ],
  declarations: [

  ],
  providers: [
    NbMenuService,
    NbMenuInternalService
  ],
  exports: [
    NbInputModule,
    NbRadioModule,
    NbSelectModule, NbButtonModule,
    NbCardModule, NbUserModule, NbContextMenuModule,
    NbSpinnerModule,
    NbMenuModule,
    NbListModule,
    NbStepperModule
  ]
})
export class AdminNbStyleModule { }
