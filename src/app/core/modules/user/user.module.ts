import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserRegisterComponent } from './pages/user-register/user-register.component';

import { UiModule } from './../../../shared/modules/ui/ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [UserRegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    UiModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
