import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserRegisterComponent } from './pages/user-register/user-register.component';

import { UiModule } from './../../../shared/modules/ui/ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UserRegisterComponent, LoginComponent, LogoutComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    UiModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class UserModule { }
