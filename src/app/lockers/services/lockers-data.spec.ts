import { TestBed } from '@angular/core/testing';

import { LockersData } from './lockers-data';

describe('LockersData', () => {
  let service: LockersData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LockersData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
