import { TestBed, async, inject } from '@angular/core/testing';

import { PatientGuard } from './patient.guard';

describe('PatientGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientGuard]
    });
  });

  it('should ...', inject([PatientGuard], (guard: PatientGuard) => {
    expect(guard).toBeTruthy();
  }));
});
