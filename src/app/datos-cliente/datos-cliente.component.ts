import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datos-cliente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './datos-cliente.component.html',
  styles: ``
})
export class DatosClienteComponent {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      nombre: [''],
      direccion: [''],
      telefono: [''],
      fecha: [''],
      tamano: [''],
      ingredientes: this.fb.array([]),
      cantidad: ['']
    });
  }

  get ingredientes() {
    return (this.formGroup.get('ingredientes') as FormArray);
  }

  onCheckboxChange(e: any) {
    const ingredientes = this.ingredientes;

    ingredientes.push(this.fb.control(e.target.value));
  }

  onSubmit() {
    const Datos = this.formGroup.value;
    let OrdenPizza = JSON.parse(localStorage.getItem('OrdenPizza') || '[]');

    OrdenPizza.push(Datos);
    localStorage.setItem('OrdenPizza', JSON.stringify(OrdenPizza));
    console.log('Datos guardados en localStorage:', OrdenPizza);
  }
}


