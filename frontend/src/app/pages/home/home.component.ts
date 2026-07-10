import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { InputComponent } from '../../components/input/input.component';
import { ReservationDetailsCardComponent } from '../../components/reservation-details-card/reservation-details-card.component';
import { ReservationTaskCardComponent } from '../../components/reservation-task-card/reservation-task-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    InputComponent,
    ReservationDetailsCardComponent,
    ReservationTaskCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  numeroReserva: string = '';
  reserva: any = null;
  tratativa: any = null;

  onReservaRecebida(event: any) {
    this.reserva = event;
    this.tratativa = event.tratativa;
  }

  resetarTela() {
    this.reserva = null;
    this.tratativa = null;
  }
}
