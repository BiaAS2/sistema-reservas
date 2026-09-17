import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-details-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-details-card.component.html',
  styleUrl: './reservation-details-card.component.scss',
})
export class ReservationDetailsCardComponent {
  @Input() reserva: any;

  formatarTelefone(telefone: string): string {
    if (!telefone) return '';

    const numeros = telefone.replace(/\D/g, '');

    if (numeros.length === 11) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
    }

    if (numeros.length === 10) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
    }

    return telefone;
  }
}
