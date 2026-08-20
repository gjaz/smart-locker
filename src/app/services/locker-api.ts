import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Locker } from '../lockers/locker';

@Injectable({
  providedIn: 'root'
})
export class LockerApi {

  private apiUrl = 'https://localhost:7177/api/lockers';

  constructor(private http: HttpClient) {}

  getLockers(): Observable<Locker[]> {
    return this.http.get<Locker[]>(this.apiUrl);
  }

  addLocker(locker: Locker): Observable<Locker> {
  return this.http.post<Locker>(this.apiUrl, locker);
  }

  deleteLocker(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}