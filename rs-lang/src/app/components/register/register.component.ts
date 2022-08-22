import { ContentObserver } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { INewUser } from 'src/app/interfaces/interfaces';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { passwordMatchValidator } from 'src/app/shared/functions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  signUpForm = new FormGroup(
    {
      name: new FormControl(
        '',
        [
          Validators.required,
        ],
        [],
      ),
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.email,
        ],
        [],
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    },
    { validators: passwordMatchValidator() },
  );

  showPassword = false;

  resoursesLoaded = true;

  constructor(private authorizationService: AuthorizationService) {}

  ngOnInit(): void {
    this.authorizationService.resoursesLoaded$.subscribe((value) => {
      console.log('true');
      this.resoursesLoaded = value;
    });
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  submit(): void {
    const emailValue = this.email?.value as string;
    const passwordValue = this.password?.value as string;
    const nameValue = this.name?.value as string;
    const newUser = {
      email: emailValue,
      name: nameValue,
      password: passwordValue,
    };
    this.resoursesLoaded = false;
    this.authorizationService.register(newUser);
  }
}
