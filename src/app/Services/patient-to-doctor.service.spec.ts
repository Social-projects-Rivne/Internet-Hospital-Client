import { TestBed, inject } from '@angular/core/testing';

import { PatientToDoctorService } from './patient-to-doctor.service';

describe('PatientToDoctorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientToDoctorService]
    });
  });

  it('should be created', inject([PatientToDoctorService], (service: PatientToDoctorService) => {
    expect(service).toBeTruthy();
  }));
});
