import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/models/user-model';
import { MustMatch } from 'src/app/shared/validators/must-match';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public validationMessages: any;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { 
    this.setValidationMessages();
  }

  public get c(): any {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: [
        '', // Default value
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      ],
      email: [
        '',
        Validators.compose([
          Validators.email,
          Validators.required
        ])
      ],
      confirmEmail: [
        '',
        Validators.compose([
          Validators.email,
          Validators.required
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ])
      ],
      confirmPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ])
      ]
    }, {
      validator: [
        MustMatch('email', 'confirmEmail'),
        MustMatch('password', 'confirmPassword')
      ]
    });
  }

  public register(): void {
    console.log(`${JSON.stringify(this.registerForm.value)}`)
    this.httpClient.post<any>(
      'http://localhost/api/v2/user',
      new UserModel().deserialize(this.registerForm.value)
    ).subscribe((user: UserModel) => {
      this.router.navigate(['./', 'user', 'login']).then(() => {
        // Here goes the SnackBar
        this.snackBar.open('You\'ve got registered, thanks', '', {duration: 3000, horizontalPosition: 'center'})
      })
    });
  }

  private setValidationMessages(): void {
    this.validationMessages = {
      username: [
        {type: 'required', message: 'User name is required'},
        {type: 'minlength', message: 'User name required at least 5 chars'}
      ],
      email: [
        {type: 'required', message: 'User email is required'},
        {type: 'email', message: 'Email seems not to be a valid email'}
      ],
      password: [
        {type: 'required', message: 'User password is required'},
        {type: 'email', message: 'Password must contains at least 8 chars'}
      ],
      confirmEmail: [
        {type: 'required', message: 'User email is required'},
        {type: 'email', message: 'Email seems not to be a valid email'},
        {type: 'mustMatch', message: 'Emails not matching'}
      ],
      confirmPassword: [
        {type: 'required', message: 'User password is required'},
        {type: 'email', message: 'Password must contains at least 8 chars'},
        {type: 'mustMatch', message: 'Passwords not matching'}
      ],
    }
  }
}
