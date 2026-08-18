import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lockers } from './lockers';

describe('Lockers', () => {
  let component: Lockers;
  let fixture: ComponentFixture<Lockers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lockers],
    }).compileComponents();

    fixture = TestBed.createComponent(Lockers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
