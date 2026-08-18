import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Locker } from './locker';

@Component({
  selector: 'app-lockers',
  imports: [ReactiveFormsModule],
  templateUrl: './lockers.html',
  styleUrl: './lockers.css',
})
export class Lockers 
{
  lockers: Locker[] = [
    {
      id: 1,
      codigo: 'L-001',
      ubicacion: 'Planta 1',
      estado: 'Disponible',
      tamano: 'Mediano'
    },
    {
      id: 2,
      codigo: 'L-002',
      ubicacion: 'Planta 1',
      estado: 'Ocupado',
      tamano: 'Grande'
    },
    {
      id: 3,
      codigo: 'L-003',
      ubicacion: 'Planta 2',
      estado: 'Disponible',
      tamano: 'Pequeño'
    }
  ];

  lockerForm = new FormGroup({
    codigo: new FormControl(''),
    ubicacion: new FormControl(''),
    estado: new FormControl('Disponible'),
    tamano: new FormControl('Mediano')
  });

  eliminarLocker(id: number) 
  {
    this.lockers = this.lockers.filter(locker => locker.id !== id);
  }

  agregarLocker() 
  {

    const nuevoLocker: Locker = {
      id: this.lockers.length + 1,
      codigo: this.lockerForm.value.codigo ?? '',
      ubicacion: this.lockerForm.value.ubicacion ?? '',
      estado: this.lockerForm.value.estado ?? 'Disponible',
      tamano: this.lockerForm.value.tamano ?? 'Mediano'
    };

    this.lockers.push(nuevoLocker);

    this.lockerForm.reset({
      codigo: '',
      ubicacion: '',
      estado: 'Disponible',
      tamano: 'Mediano'
    });
  }
}
