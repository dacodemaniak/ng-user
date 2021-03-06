import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private formBuilder: FormBuilder
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
