import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ventas-acumuladas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ventas-acumuladas.component.html',
  styles: ``
})

export class VentasAcumuladasComponent {
  fecha: string = '';
  ventas: any[] = [];
  error: string | null = null;
  
  constructor(private http: HttpClient) {}

  buscarVentas() {
    if (!this.fecha) {
      this.error = 'Por favor ingrese una fecha.';
      return;
    }

    this.http.get<any>(`http://localhost:5000/consultar-ventas?fecha=${this.fecha}`)
      .subscribe(
        (response) => {
          if (response.ventas) {
            this.ventas = response.ventas;
            this.error = null;
          }
        },
        (error) => {
          this.error = 'Error al obtener las ventas. Intente nuevamente.';
          this.ventas = [];
        }
      );
  }
}




