import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../services/api.service';
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
  mostrarNovoValor: boolean = false;

  status: string = '';
  responsavel: string = '';
  confirmadaPor: string = '';
  observacoes: string = '';
  numeroNovaReserva: string = '';
  valorNovaReserva: string = '';

  constructor(private api: ApiService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reserva'] && !this.reserva) {
      this.limparFormulario();
      return;
    }

    if (changes['tratativa']) {
      if (this.tratativa) {
        this.status = this.tratativa.status_tratado?.toLowerCase() || '';
        this.responsavel = this.tratativa.responsavel || '';
        this.confirmadaPor = this.tratativa.confirmada_por || '';
        this.observacoes = this.tratativa.observacoes || '';
        this.numeroNovaReserva = this.tratativa.numero_nova_reserva || '';
        this.valorNovaReserva = this.tratativa.valor_recuperado || '';

        const isNovaReserva = this.status === 'nova-reserva';
        this.mostrarLocalizador = isNovaReserva;
        this.mostrarNovoValor = isNovaReserva;
      } else {
        this.limparFormulario();
      }
    }
  }

  limparFormulario() {
    this.status = '';
    this.responsavel = '';
    this.confirmadaPor = '';
    this.observacoes = '';
    this.numeroNovaReserva = '';
    this.valorNovaReserva = '';
    this.mostrarLocalizador = false;
    this.mostrarNovoValor = false;
  }

  onStatusChange(status: string) {
    this.status = status;
    const isNovaReserva = status === 'nova-reserva';

    this.mostrarLocalizador = isNovaReserva;
    this.mostrarNovoValor = isNovaReserva;

    // Limpa os campos condicionais se o status não for 'nova-reserva'
    if (!isNovaReserva) {
      this.numeroNovaReserva = '';
      this.valorNovaReserva = '';
    }
  }

  salvarReserva() {
    const statusLower = this.status.toLowerCase();
    let valorRecuperado = 0;

    // 💰 Aplicação da Regra Financeira
    if (statusLower === 'nova-reserva') {
      valorRecuperado = parseFloat(this.valorNovaReserva) || 0;
    } else if (statusLower === 'aberta' || statusLower === 'utilizada') {
      valorRecuperado = parseFloat(this.reserva?.valor_reserva) || 0;
    } else {
      valorRecuperado = 0;
    }

    const dados = {
      numero_reserva: this.reserva.numero_reserva,
      segmento: this.reserva.segmento, // 🏢 Herda o segmento (PF/PJ) da reserva negada
      status_tratado: this.status.toUpperCase(),
      responsavel: this.responsavel,
      confirmada_por: this.confirmadaPor,
      observacoes: this.observacoes,
      numero_nova_reserva:
        statusLower === 'nova-reserva' ? this.numeroNovaReserva : '',
      valor_recuperado: valorRecuperado,
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
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro interno ao salvar tratativa.',
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
