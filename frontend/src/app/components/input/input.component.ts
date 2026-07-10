import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  numeroReserva: string = '';
  reserva: any;

  constructor(private api: ApiService) {}

  @Output() reservaEncontrada = new EventEmitter<any>();

  buscarReserva() {
    this.api.getReservaPorNumero(this.numeroReserva).subscribe({
      next: (reserva: any[]) => {
        // Como a API agora dá 404 quando não acha, aqui SEMPRE virá uma reserva válida
        const reservaEncontrada = reserva[0];

        this.api.getReservaTratada(this.numeroReserva).subscribe({
          next: (tratativa: any) => {
            reservaEncontrada.tratativa = tratativa ?? null;
            this.reservaEncontrada.emit(reservaEncontrada);
          },
          error: (err) => {
            console.log('Erro ao buscar tratativa:', err);
            reservaEncontrada.tratativa = null;
            this.reservaEncontrada.emit(reservaEncontrada);
          },
        });
      },
      error: (err) => {
        console.log('Erro ao buscar reserva:', err);

        // Se o erro for 404, exibe o aviso de não encontrado
        if (err.status === 404) {
          Swal.fire({
            icon: 'warning',
            title: 'Reserva não encontrada',
            text: 'Verifique o número da reserva informado.',
            confirmButtonText: 'OK',
            position: 'top',
            confirmButtonColor: '#fc9e9e',
            background: '#FF6363',
            color: '#ffffff',
            iconColor: '#ffffff',
          });
        } else {
          // Outros erros (ex: 500 do servidor fora do ar)
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
        }
      },
    });
  }

  // Função para limpar o input e emitir evento para resetar a tela
  @Output() limparDados = new EventEmitter<void>();

  limparTela() {
    this.numeroReserva = '';
    this.limparDados.emit();
  }
}
