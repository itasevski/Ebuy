import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/services/auth.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  public signInForm: any;
  public username: string;
  public password: string;

  public status: boolean;
  private allUsers: User[];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getAccounts();
    this.onClear();
  }

  compareHash(value1: string, value2: string) {
    return bcrypt.compareSync(value1, value2);
  }

  getAccounts() {
    this.authService.getAccounts().subscribe((res: User[]) => {
      this.allUsers = res;
    });
  }

  onClear() {
    this.status = false;
    this.username = '';
    this.password = '';
  }

  onSignIn(signInForm: any) {
    let currentUser = new User();
    let flag = false;

    currentUser = {
      username: signInForm.value.username,
      email: '',
      password: signInForm.value.password,
      isLoggedIn: false,
    };

    this.allUsers.forEach((element) => {
      if (
        element.username.includes(currentUser.username) &&
        this.compareHash(currentUser.password, element.password)
      ) {
        this.authService.getAccount(element).subscribe((res: User) => {
          currentUser = res;
          flag = true;
        });
      }
    });

    setTimeout(() => {
      if (!flag) {
        alert("The username or password you've entered is incorrect.");
        this.onClear();
      } else {
        currentUser.isLoggedIn = true;
        this.authService.login(currentUser).subscribe(() => {
          window.location.assign('/');
        });
      }
    }, 500);
  }
}
