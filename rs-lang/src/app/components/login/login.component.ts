import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/services/authorization.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  resoursesLoaded = true;

  constructor(private authorizationService: AuthorizationService) {}

  ngOnInit(): void {
    this.authorizationService.resoursesLoaded$.subscribe((value) => {
      this.resoursesLoaded = value;
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  signIn() {
    const emailValue = this.email?.value as string;
    const passwordValue = this.password?.value as string;
    const newUser = {
      email: emailValue,
      password: passwordValue,
    };
    this.resoursesLoaded = false;
    this.authorizationService.singIn(newUser);
  }
}
