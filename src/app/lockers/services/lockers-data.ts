import { Service } from '@angular/core';
import { Locker } from '../locker';

@Service()
export class LockersData {

  private lockers: Locker[] = [
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

  obtenerLockers(): Locker[] {
    return this.lockers;
  }

  agregarLocker(locker: Locker): void {
    this.lockers.push(locker);
  }

  eliminarLocker(id: number): void {
    this.lockers = this.lockers.filter(l => l.id !== id);
  }
}