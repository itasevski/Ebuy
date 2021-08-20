import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/services/auth.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public signUpForm: FormGroup;
  private allUsers: User[];

  constructor(
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.signUpForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
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

  ngOnInit() {
    this.getAccounts();
  }

  hashCode(value: string) {
    return bcrypt.hashSync(value, bcrypt.genSaltSync());
  }

  getAccounts() {
    this.authService.getAccounts().subscribe((res: User[]) => {
      this.allUsers = res;
    });
  }

  onClear() {
    this.signUpForm.reset();
  }

  onBack() {
    this.location.back();
  }

  signUp(signUpForm: FormGroup) {
    let newUser = new User();
    let flag = false;

    newUser = {
      username: signUpForm.getRawValue().name,
      email: signUpForm.getRawValue().email,
      password: this.hashCode(signUpForm.getRawValue().password),
      isLoggedIn: false,
    };
    if (this.allUsers.length) {
      this.allUsers.forEach((element) => {
        if (
          element.email === newUser.email ||
          element.username === newUser.username
        ) {
          alert('The user already exists.');
          this.onClear();
          flag = true;
        }
      });
    }
    if (!flag) {
      this.authService.signup(newUser).subscribe(() => {
        this.getAccounts();
        window.location.assign('/');
      });
    }
  }
}
