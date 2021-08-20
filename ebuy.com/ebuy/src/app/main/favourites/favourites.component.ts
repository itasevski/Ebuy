import { Component, OnInit } from '@angular/core';
import { ITicket } from 'src/app/interfaces/ticket';
import { TicketService } from 'src/services/ticket.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  public listFavourites: ITicket[] = [];
  constructor(private service: TicketService) {}

  ngOnInit() {
    this.getTickets().subscribe((res) => {
      this.listFavourites = res;
    });
  }

  public getTickets() {
    return this.service
      .getTickets()
      .pipe(map((items) => items.filter((item) => item.isFavourite === true)));
  }
}
