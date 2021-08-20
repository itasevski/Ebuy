import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';

const HeaderOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'http://localhost:3000/Accounts';

  constructor(private http: HttpClient) {}

  public getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  public getAccount(data: User): Observable<any> {
    return this.http.get(this.apiUrl + '/' + data.id);
  }

  public signup(data: User): Observable<any> {
    return this.http.post(this.apiUrl, data, HeaderOptions);
  }

  public login(data: User): Observable<any> {
    return this.http.put(this.apiUrl + '/' + data.id, data, HeaderOptions);
  }
}
