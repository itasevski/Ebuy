import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommService {
  public observer = new Subject();

  public deliver(data: any) {
    this.observer.next(data);
  }

  public recieve() {
    return this.observer.asObservable();
  }

  constructor() {}
}
