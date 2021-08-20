import { Component, OnInit } from '@angular/core';
import { ITicket } from 'src/app/interfaces/ticket';
import { CommService } from 'src/services/comm.service';
import { TicketService } from 'src/services/ticket.service';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss'],
})
export class TicketsListComponent implements OnInit {
  public listTickets: ITicket[] = [];
  public status: boolean = false;

  constructor(
    private ticketService: TicketService,
    private commService: CommService
  ) {}

  ngOnInit() {
    this.getTickets();
  }

  public getTickets() {
    setTimeout(() => {
      this.ticketService.getTickets().subscribe((result: ITicket[]) => {
        this.listTickets = result;
      });
    }, 200);
  }
}
