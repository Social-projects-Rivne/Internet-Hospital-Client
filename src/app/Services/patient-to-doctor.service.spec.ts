import { TestBed } from '@angular/core/testing';

import { PatientToDoctorService } from './patient-to-doctor.service';

describe('PatientToDoctorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientToDoctorService = TestBed.get(PatientToDoctorService);
    expect(service).toBeTruthy();
  });
});
