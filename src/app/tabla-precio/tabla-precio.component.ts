import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tabla-precio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tabla-precio.component.html',
  styles: ``
})
export class TablaPrecioComponent {
  ordenes: any[] = [];
  totalPrice: number = 0;
  selectedOrders: Set<number> = new Set();
  showConfirmation: boolean = false;
  orderForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.orderForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }

  mostrarOrdenes() {
    const storedOrders = localStorage.getItem('OrdenPizza');
    if (storedOrders) {
      this.ordenes = JSON.parse(storedOrders);
      console.log("Órdenes cargadas desde localStorage:", this.ordenes);
    }
    this.calcularTotal(); 
  }

  calcularTotal() {
    this.totalPrice = this.ordenes.reduce((total, orden) => total + this.calcularSubtotal(orden), 0);
  }

  calcularSubtotal(orden: any): number {
    let subtotal = 0;
    if (orden.tamano === 'Pequeño') {
      subtotal += 40;
    } else if (orden.tamano === 'Mediano') {
      subtotal += 80;
    } else if (orden.tamano === 'Grande') {
      subtotal += 120;
    }

    orden.ingredientes.forEach((ingrediente: string) => {
      if (ingrediente === 'Jamon') {
        subtotal += 10;
      } else if (ingrediente === 'Pina') {
        subtotal += 10;
      } else if (ingrediente === 'Champiñones') {
        subtotal += 15;
      }
    });

    return subtotal * orden.cantidad;
  }

  seleccionarOrden(index: number) {
    if (this.selectedOrders.has(index)) {
      this.selectedOrders.delete(index);
    } else {
      this.selectedOrders.add(index);
    }
  }

  eliminarOrdenes() {
    this.ordenes = this.ordenes.filter((orden, index) => !this.selectedOrders.has(index));
    localStorage.setItem('OrdenPizza', JSON.stringify(this.ordenes));
    this.selectedOrders.clear();
    this.calcularTotal();
  }

  mostrarConfirmacion() {
    this.showConfirmation = true;
  }

  confirmarPedido() {
    const orderData = {
      pedidos: this.ordenes.map(orden => ({
        nombre: orden.nombre,
        direccion: orden.direccion,
        telefono: orden.telefono,
        fecha: orden.fecha,
        total: this.totalPrice
      }))
    };
  
    this.http.post('http://localhost:5000/confirmar-pedido', orderData).subscribe(
      (response) => {
        alert('Pedido confirmado!');
        localStorage.removeItem('OrdenPizza');
        this.showConfirmation = false;
      },
      (error) => {
        alert('Hubo un error al confirmar el pedido.');
        console.error(error);
      }
    );
  }
  

}


