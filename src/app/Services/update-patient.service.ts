import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { HOST_URL } from '../config';
import { compareValidator } from '../Directives/compare-validator.directive';
import { API_PATIENT_UPDATE, PATIENT_UPDATE_AVATAR, LOCALE_PHONE, PATIENT_GET_PROFILE } from '../config';
import { MaxDateValidator } from '../Directives/date-validator.directive';
import { Patient } from '../Models/Patient';

@Injectable({
  providedIn: 'root'
})
export class UpdatePatientService {
  url = HOST_URL + API_PATIENT_UPDATE;
  avatarUpdateUrl = HOST_URL + PATIENT_UPDATE_AVATAR;
  getProfileUrl = HOST_URL + PATIENT_GET_PROFILE;
  patient: Patient;

  constructor(private http: HttpClient) { }
  form: FormGroup = new FormGroup({
  PhoneNumber: new FormControl('', Validators.pattern(/\(\d{2}\)\s\d{3}\-\d{2}\-\d{2}/)),
    FirstName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яЁёіІїЇґҐ\-\']{1,28}$/)]),
    SecondName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яЁёіІїЇґҐ\-\']{1,28}$/)]),
    ThirdName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яЁёіІїЇґҐ\-\']{1,28}$/)]),
    BirthDate: new FormControl('', MaxDateValidator),
    PassportURL: new FormControl('')
  });

  initializeFormGroup() {
    this.form.setValue({
      PhoneNumber: '',
      FirstName: '',
      SecondName: '',
      ThirdName: '',
      BirthDate: '',
      PassportURL: '',
    });
  }

  setCurrentProfile() {
    this.getProfile().subscribe((res: any) => {
      this.patient = res;
      const correctDate = this.patient.birthDate.substring(0, 10).split('.').reverse().join('-');
      this.form.setValue({
        PhoneNumber: this.patient.phoneNumber,
        FirstName: this.patient.firstName,
        SecondName: this.patient.secondName,
        ThirdName: this.patient.thirdName,
        BirthDate: correctDate,
        PassportURL: '',
      });
    });
  }

  updateAvatar(avatar: File) {
    const formData = new FormData();
    formData.append('Image', avatar);
    return this.http.put(this.avatarUpdateUrl, formData);
  }

  updatePatient(files: FileList) {
    const form = this.form.controls;
    const formData = new FormData();

    if (files != null) {
      for (let i = 0; i < files.length; i++) {
        formData.append('PassportURL', files.item(i));
      }
    }
    formData.append('PhoneNumber', `${LOCALE_PHONE} ${form.PhoneNumber.value}`);
    formData.append('FirstName', this.correctLettersCase(form.FirstName.value));
    formData.append('SecondName', this.correctLettersCase(form.SecondName.value));
    formData.append('ThirdName', this.correctLettersCase(form.ThirdName.value));
    const dateSendingToServer = new DatePipe('en-US').transform(form.BirthDate.value, 'dd.MM.yyyy');
    formData.append('BirthDate', dateSendingToServer);

    return this.http.put(this.url, formData);
  }

  getProfile() {
    return this.http.get(this.getProfileUrl);
  }

  private correctLettersCase(controlValue: any) {
    return controlValue.charAt(0).toUpperCase() + controlValue.slice(1).toLowerCase();
  }
}
