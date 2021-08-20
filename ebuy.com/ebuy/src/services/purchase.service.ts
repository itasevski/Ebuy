import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from 'src/app/interfaces/purchase';

const HeaderOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private apiUrl: string = 'http://localhost:3000/Purchases';

  constructor(private http: HttpClient) {}

  public create(data: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(this.apiUrl, data, HeaderOptions);
  }
}
