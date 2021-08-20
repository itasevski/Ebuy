import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ITicket } from 'src/app/interfaces/ticket';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/services/auth.service';
import { TicketService } from 'src/services/ticket.service';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss'],
})
export class TicketItemComponent implements OnInit {
  @Input() public ticket: ITicket;
  public currentTicket: ITicket;
  public currentUser: User;

  constructor(
    private ticketService: TicketService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getAccounts().subscribe((res: User[]) => {
      this.currentUser = res[0];
    });
  }

  getAccounts() {
    return this.authService
      .getAccounts()
      .pipe(map((items) => items.filter((item) => item.isLoggedIn)));
  }

  addToFaveourites(ticket: ITicket) {
    ticket.isFavourite = !this.ticket.isFavourite;
    this.ticketService.updateTicket(ticket).subscribe(() => {});
  }

  buyTicket(ticket: ITicket) {
    if (this.currentUser === undefined || !this.currentUser.isLoggedIn) {
      alert('You need to be signed in.');
      return;
    } else {
      if (this.ticket.quantity > 0) {
        ticket.quantity = +this.ticket.quantity - 1;
        this.ticketService.updateTicket(ticket).subscribe(() => {});
      }
    }
  }
}
