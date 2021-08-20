import { Location } from '@angular/common';
import { identifierModuleUrl } from '@angular/compiler';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Purchase } from 'src/app/interfaces/purchase';
import { ITicket } from 'src/app/interfaces/ticket';
import { CommService } from 'src/services/comm.service';
import { TicketService } from 'src/services/ticket.service';
import * as bcrypt from 'bcryptjs';
import { PurchaseService } from 'src/services/purchase.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
})
export class TicketDetailsComponent implements OnInit {
  public currentTicket: ITicket;
  public name: string;
  public address: string;
  public method: string;
  public number: string;
  public expiration: string;
  public cvc: string;

  constructor(
    private router: ActivatedRoute,
    private ticketService: TicketService,
    private purchaseService: PurchaseService,
    private location: Location
  ) {}

  ngOnInit() {
    this.ticketService
      .getTicket(+this.router.snapshot.params['id'])
      .subscribe((res: ITicket) => {
        this.currentTicket = res;
      });
  }

  hashCode(value: string) {
    return bcrypt.hashSync(value, bcrypt.genSaltSync());
  }

  public onBack() {
    this.location.back();
  }

  public buyTicket(currentPurchaseForm) {
    let purchase: Purchase = {
      name: this.hashCode(currentPurchaseForm.value.name),
      address: this.hashCode(currentPurchaseForm.value.address),
      method: this.hashCode(currentPurchaseForm.value.method),
      number: this.hashCode(currentPurchaseForm.value.number),
      expiration: this.hashCode(currentPurchaseForm.value.expiration),
      cvc: this.hashCode(currentPurchaseForm.value.cvc),
    };

    if (this.currentTicket.quantity > 0) {
      this.currentTicket.quantity = +this.currentTicket.quantity - 1;
      this.ticketService.updateTicket(this.currentTicket).subscribe(() => {
        this.purchaseService.create(purchase).subscribe(() => {
          alert('Successful Purchase!');
          window.location.assign('/');
        });
      });
    }
  }
}
