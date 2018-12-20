import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { HOST_URL } from '../config';
import { compareValidator } from '../Directives/compare-validator.directive';
import { API_DOCTOR_UPDATE, DOCTOR_GET_PROFILE, LOCALE_PHONE } from '../config';
import { MaxDateValidator } from '../Directives/date-validator.directive';

@Injectable({
  providedIn: 'root'
})
export class UpdateDoctorService {
  url = HOST_URL + API_DOCTOR_UPDATE;
  getProfileUrl = HOST_URL + DOCTOR_GET_PROFILE;
  birthday = '';

  constructor(private http: HttpClient) { }
  form: FormGroup = new FormGroup({
    PhoneNumber: new FormControl('', Validators.pattern(/\(\d{2}\)\s\d{3}\-\d{2}\-\d{2}/)),
    FirstName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яЁёіІїЇґҐ\-\']{1,28}$/)]),
    SecondName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яЁёіІїЇґҐ\-\']{1,28}$/)]),
    ThirdName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яЁёіІїЇґҐ\-\']{1,28}$/)]),
    BirthDate: new FormControl('', MaxDateValidator),
    Address: new FormControl('', MaxDateValidator),
    Specialization: new FormControl('', Validators.required),
    PassportURL: new FormControl(''),
    DiplomaURL: new FormControl(''),
    LicenseURL: new FormControl('')
  });

  initializeFormGroup() {
    this.form.setValue({
      PhoneNumber: '',
      FirstName: '',
      SecondName: '',
      ThirdName: '',
      BirthDate: '',
      Specialization: '',
      PassportURL: '',
      DiplomaURL: '',
      LicenseURL: '',
      Address: '',
    });
  }

   setCurrentProfile() {
    this.getProfile().subscribe((res: any) => {
      const doctor = res;

      if (doctor.birthDate != null) {
        this.birthday = doctor.birthDate.substring(0, 10).split('.').reverse().join('-');
      }
      this.form.setValue({
        PhoneNumber: doctor.phoneNumber,
        FirstName: doctor.firstName,
        SecondName: doctor.secondName,
        ThirdName: doctor.thirdName,
        BirthDate: this.birthday,
        Address: doctor.address,
        Specialization: doctor.specialization,
        PassportURL: '',
        DiplomaURL: '',
        LicenseURL: ''
      });
    });
   }

  updateDoctor(passportPhotos: FileList, diplomasPhotos: FileList, licensePhoto: FileList) {
    const form = this.form.controls;
      const formData = new FormData();

      if (passportPhotos !== null) {
        for (let i = 0; i < passportPhotos.length; i++) {
          formData.append('PassportURL', passportPhotos.item(i));
        }
      }
      if (diplomasPhotos !== null) {
        for (let i = 0; i < diplomasPhotos.length; i++) {
          formData.append('DiplomaURL', diplomasPhotos.item(i));
        }
      }
      if (licensePhoto !== null) {
          formData.append('LicenseURL', licensePhoto.item(0));
      }
      formData.append('PhoneNumber', `${LOCALE_PHONE} ${form.PhoneNumber.value}`);
      formData.append('FirstName', this.correctLettersCase(form.FirstName.value));
      formData.append('SecondName', this.correctLettersCase(form.SecondName.value));
      formData.append('ThirdName', this.correctLettersCase(form.ThirdName.value));
      const dateSendingToServer = new DatePipe('en-US').transform(form.BirthDate.value, 'dd.MM.yyyy');
      formData.append('BirthDate', dateSendingToServer);
      formData.append('Specialization', form.Specialization.value);
      formData.append('Address', form.Address.value);

      return this.http.put(this.url, formData);
  }

  getProfile() {
    return this.http.get(this.getProfileUrl);
  }

  private correctLettersCase(controlValue: any) {
    return controlValue.charAt(0).toUpperCase() + controlValue.slice(1).toLowerCase();
  }
}
