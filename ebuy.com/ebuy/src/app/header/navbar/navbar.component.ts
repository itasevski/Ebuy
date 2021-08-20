import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public status: boolean = false;
  public currentUser: User;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getAccounts().subscribe((res: User[]) => {
      this.currentUser = res[0];
      this.status = this.currentUser != undefined;
    });
  }

  getAccounts() {
    return this.authService
      .getAccounts()
      .pipe(map((items) => items.filter((item) => item.isLoggedIn)));
  }

  public logout() {
    if (this.currentUser != undefined) {
      this.status = false;
      this.currentUser.isLoggedIn = false;
      this.authService.login(this.currentUser).subscribe(() => {});
    }
  }
}
