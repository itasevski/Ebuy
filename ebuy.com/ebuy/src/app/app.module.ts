import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { FooterComponent } from './footer/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './main/tickets/tickets.component';
import { ContactComponent } from './main/contact/contact.component';
import { SignupComponent } from './main/signup/signup.component';
import { ModalComponent } from './header/modal/modal.component';
import { TicketsListComponent } from './main/tickets/tickets-list/tickets-list.component';
import { TicketItemComponent } from './main/tickets/ticket-item/ticket-item.component';
import { FavouritesComponent } from './main/favourites/favourites.component';
import { TicketDetailsComponent } from './main/tickets/ticket-details/ticket-details.component';
import { TicketService } from 'src/services/ticket.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'tickets', component: TicketsComponent },
  { path: 'tickets/:id', component: TicketDetailsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: TicketsComponent },
  { path: '*', component: TicketsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TicketsComponent,
    ContactComponent,
    SignupComponent,
    ModalComponent,
    TicketsListComponent,
    TicketItemComponent,
    FavouritesComponent,
    TicketDetailsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [TicketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
