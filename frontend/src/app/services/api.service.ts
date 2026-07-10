import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000'; // URL base da API

  constructor(private http: HttpClient) {}

  getReservaPorNumero(numero: string) {
    return this.http.get<any[]>(`${this.apiUrl}/reservas_negadas/${numero}`);
  }

  getReservaTratada(numero: string) {
    return this.http.get<any>(`${this.apiUrl}/reservas_tratadas/${numero}`);
  }

  postReservaTratada(reserva: any) {
    return this.http.post<any>(`${this.apiUrl}/reservas_tratadas`, reserva);
  }
}
