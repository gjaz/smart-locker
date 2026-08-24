import { Component, OnInit, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Locker } from './locker';
import { LockerApi } from '../services/locker-api';
import { AuthService } from '../services/auth-service';


@Component({
  selector: 'app-lockers',
  imports: [ReactiveFormsModule],
  templateUrl: './lockers.html',
  styleUrl: './lockers.css',
})
export class Lockers implements OnInit
{
  constructor(
  private lockerApi: LockerApi,
  public authService: AuthService
) {}

  lockers = signal<Locker[]>([]);

  editandoLocker = signal<Locker | null>(null);

  ngOnInit(): void 
  {
    this.lockerApi.getLockers().subscribe({
      next: (lockers) => {
        console.log('Lockers recibidos desde API:', lockers);
        this.lockers.set(lockers);
        console.log('this.lockers después de asignar:', this.lockers().length);
        
      },
      error: (error) => {
        console.error('Error al obtener lockers desde API:', error);
      }
    });
  }

  editarLocker(locker: Locker): void 
  {
    this.editandoLocker.set(locker);

    this.lockerForm.patchValue({
      codigo: locker.codigo,
      ubicacion: locker.ubicacion,
      estado: locker.estado,
      tamano: locker.tamano
    });
  }

  cancelarEdicion(): void 
  {
    this.editandoLocker.set(null);

    this.lockerForm.reset({
      codigo: '',
      ubicacion: '',
      estado: 'Disponible',
      tamano: 'Mediano'
    });
  }

  actualizarLocker(): void 
  {
    if (this.lockerForm.invalid) {
      return;
    }

    const lockerActual = this.editandoLocker();

    if (!lockerActual) {
      return;
    }

    const lockerActualizado: Locker = {
      id: lockerActual.id,
      codigo: this.lockerForm.value.codigo ?? '',
      ubicacion: this.lockerForm.value.ubicacion ?? '',
      estado: this.lockerForm.value.estado ?? 'Disponible',
      tamano: this.lockerForm.value.tamano ?? 'Mediano'
    };

    this.lockerApi.updateLocker(
      lockerActual.id,
      lockerActualizado
    ).subscribe({
      next: (lockerActualizado) => {
        console.log('Locker actualizado desde API:', lockerActualizado);

        this.lockers.update(lockers =>
          lockers.map(locker =>
            locker.id === lockerActualizado.id
              ? lockerActualizado
              : locker
          )
        );

        this.cancelarEdicion();
      },
      error: (error) => {
        console.error('Error al actualizar locker:', error);
      }
    });
  }

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
    this.lockerApi.deleteLocker(id).subscribe({
      next: () => {
        console.log('Locker eliminado desde API:', id);

        this.lockers.update(lockers =>
          lockers.filter(locker => locker.id !== id)
        );
      },
      error: (error) => {
        console.error('Error al eliminar locker desde API:', error);
      }
    });
  }

  agregarLocker() 
  {
    if (this.lockerForm.invalid) 
    {
      return;
    }

    const nuevoLocker: Locker = {
      id: 0,
      codigo: this.lockerForm.value.codigo ?? '',
      ubicacion: this.lockerForm.value.ubicacion ?? '',
      estado: this.lockerForm.value.estado ?? 'Disponible',
      tamano: this.lockerForm.value.tamano ?? 'Mediano'
    };

    this.lockerApi.addLocker(nuevoLocker).subscribe({
      next: (lockerCreado) => {
        console.log('Locker creado desde API:', lockerCreado);

        this.lockers.update(lockers => [...lockers, lockerCreado]);

        this.lockerForm.reset({
          codigo: '',
          ubicacion: '',
          estado: 'Disponible',
          tamano: 'Mediano'
        });
      },
      error: (error) => {
        console.error('Error al crear locker:', error);
      }
    });
  }
}
