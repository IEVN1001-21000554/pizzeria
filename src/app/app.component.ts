import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TablaPrecioComponent } from './tabla-precio/tabla-precio.component';
import { VentasAcumuladasComponent } from './ventas-acumuladas/ventas-acumuladas.component';
import { DatosClienteComponent } from './datos-cliente/datos-cliente.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatosClienteComponent, TablaPrecioComponent, VentasAcumuladasComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pizzeria';
  constructor(private http: HttpClient) { }
}
