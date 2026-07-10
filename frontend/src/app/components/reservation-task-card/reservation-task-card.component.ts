import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { ApiService } from '../../services/api.service';
import { OnChanges, SimpleChanges } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation-task-card',
  standalone: true,

  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],

  templateUrl: './reservation-task-card.component.html',
  styleUrl: './reservation-task-card.component.scss',
})
export class ReservationTaskCardComponent implements OnChanges {
  @Input() reserva: any;
  @Input() tratativa: any;

  mostrarLocalizador: boolean = false;

  status: string = '';
  responsavel: string = '';
  confirmadaPor: string = '';
  observacoes: string = '';
  numeroNovaReserva: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reserva'] && !this.reserva) {
      this.status = '';
      this.responsavel = '';
      this.confirmadaPor = '';
      this.observacoes = '';
      this.numeroNovaReserva = '';
      this.mostrarLocalizador = false;
      return;
    }

    if (changes['tratativa']) {
      if (this.tratativa) {
        this.status = this.tratativa.status_tratado;
        this.responsavel = this.tratativa.responsavel;
        this.confirmadaPor = this.tratativa.confirmada_por;
        this.observacoes = this.tratativa.observacoes;
        this.numeroNovaReserva = this.tratativa.numero_nova_reserva || '';

        this.mostrarLocalizador = !!this.tratativa.numero_nova_reserva;
      } else {
        this.status = '';
        this.responsavel = '';
        this.confirmadaPor = '';
        this.observacoes = '';
        this.numeroNovaReserva = '';
        this.mostrarLocalizador = false;
      }
    }
  }

  constructor(private api: ApiService) {}

  onStatusChange(status: string) {
    this.status = status;

    this.mostrarLocalizador = status === 'nova-reserva';

    if (!this.mostrarLocalizador) {
      this.numeroNovaReserva = '';
    }
  }

  salvarReserva() {
    const dados = {
      numero_reserva: this.reserva.numero_reserva,

      status_tratado: this.status.toUpperCase(),

      responsavel: this.responsavel,

      confirmada_por: this.confirmadaPor,

      observacoes: this.observacoes,

      numero_nova_reserva:
        this.status === 'nova-reserva' ? this.numeroNovaReserva : '',
    };

    this.api.postReservaTratada(dados).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title:
            res.acao === 'update' ? 'Reserva atualizada!' : 'Reserva salva!',
          confirmButtonText: 'Fechar',
          position: 'top',
          confirmButtonColor: '#548d1f',
          background: '#78BE35',
          color: '#ffffff',
          iconColor: '#ffffff',
        });
      },

      error: (err: any) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro interno ao buscar reserva.',
          confirmButtonText: 'Fechar',
          position: 'top',
          confirmButtonColor: '#fc9e9e',
          background: '#FF6363',
          color: '#ffffff',
          iconColor: '#ffffff',
        });
      },
    });
  }
}
