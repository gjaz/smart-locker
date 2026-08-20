import { TestBed } from '@angular/core/testing';

import { LockerApi } from './locker-api';

describe('LockerApi', () => {
  let service: LockerApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LockerApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
