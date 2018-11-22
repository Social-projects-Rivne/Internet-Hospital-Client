import { TestBed, inject } from '@angular/core/testing';

import { UpdateDoctorService } from './update-doctor.service';

describe('UpdateDoctorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateDoctorService]
    });
  });

  it('should be created', inject([UpdateDoctorService], (service: UpdateDoctorService) => {
    expect(service).toBeTruthy();
  }));
});
