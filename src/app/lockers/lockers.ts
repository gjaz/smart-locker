import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Locker } from './locker';
import { LockersData } from './services/lockers-data';

@Component({
  selector: 'app-lockers',
  imports: [ReactiveFormsModule],
  templateUrl: './lockers.html',
  styleUrl: './lockers.css',
})
export class Lockers 
{
  constructor(private lockersData: LockersData) 
  {
    this.lockers = this.lockersData.obtenerLockers();
  }
  lockers: Locker[] = [];

  lockerForm = new FormGroup({
  codigo: new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]),

  ubicacion: new FormControl('', [
    Validators.required
  ]),

  estado: new FormControl('Disponible'),

  tamano: new FormControl('Mediano')
});

  eliminarLocker(id: number)
  {
       this.lockersData.eliminarLocker(id);
       this.lockers = this.lockersData.obtenerLockers();
  }

  agregarLocker() 
  {
    if (this.lockerForm.invalid) 
    {
      return;
    }

    const nuevoLocker: Locker = {
      id: this.lockers.length + 1,
      codigo: this.lockerForm.value.codigo ?? '',
      ubicacion: this.lockerForm.value.ubicacion ?? '',
      estado: this.lockerForm.value.estado ?? 'Disponible',
      tamano: this.lockerForm.value.tamano ?? 'Mediano'
    };

    this.lockersData.agregarLocker(nuevoLocker);
    this.lockers = this.lockersData.obtenerLockers();

    this.lockerForm.reset({
      codigo: '',
      ubicacion: '',
      estado: 'Disponible',
      tamano: 'Mediano'
    });
  }
}
