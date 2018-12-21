import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { HOST_URL, PATIENT_UPDATE_TO_DOCTOR } from '../config';

@Injectable({
  providedIn: 'root'
})
export class PatientToDoctorService {

  url = HOST_URL + PATIENT_UPDATE_TO_DOCTOR;
  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    Address: new FormControl('', Validators.required),
    Specialization: new FormControl('', Validators.required),
    DiplomaURL: new FormControl('', Validators.required),
    LicenseURL: new FormControl('', Validators.required)
  });

  initializeFormGroup() {
    this.form.setValue({
      Specialization: '',
      DiplomaURL: '',
      LicenseURL: '',
      Address: '',
    });
  }

  updateToDoctor(diplomasPhotos: FileList, licensePhoto: FileList) {
    const form = this.form.controls;
    const formData = new FormData();

    if (diplomasPhotos !== null) {
      for (let i = 0; i < diplomasPhotos.length; i++) {
        formData.append('DiplomaURL', diplomasPhotos.item(i));
      }
    }
    if (licensePhoto !== null) {
        formData.append('LicenseURL', licensePhoto.item(0));
    }
    formData.append('Specialization', form.Specialization.value);
    formData.append('Address', form.Address.value);

    return this.http.post(this.url, formData);
  }
}
