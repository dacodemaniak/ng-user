import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserModel } from 'src/app/shared/models/user-model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    titleService: Title,
    private translateService: TranslateService
  ) { 
    titleService.setTitle(this.translateService.instant('common.title'));
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: [
        '',
        Validators.required
      ],
      password: [
        '',
        Validators.required
      ]
    });
  }

  public login(): void {
    this.userService.authenticate(this.loginForm.value)
      .subscribe((user: UserModel) => {
        // Go Home
        this.router.navigate(['/', 'home']);
      }, (error: any) => {
        // Bad credentials... clear form, don't move
        this.loginForm.reset();
        // Better inform the user...
      })
  }

}
