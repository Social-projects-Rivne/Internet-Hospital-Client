import { Component, OnInit } from '@angular/core';
import { PatientToDoctorService } from '../../../Services/patient-to-doctor.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../../Services/notification.service';
import { ImageHandlingService } from '../../../Services/image-handling.service';
import { DoctorsService } from '../../../Services/doctors.service';
import { Specialization } from 'src/app/Models/Specialization';

@Component({
  selector: 'app-update-to-doctor',
  templateUrl: './update-to-doctor.component.html',
  styleUrls: ['./update-to-doctor.component.scss']
})
export class UpdateToDoctorComponent implements OnInit {

  specializations: Specialization[];

  constructor(private service: PatientToDoctorService,
    private notification: NotificationService,
    private imageHandling: ImageHandlingService,
    private router: Router,
    private doctorService: DoctorsService) { }

  ngOnInit() {
    this.doctorService.getSpecializations()
    .subscribe((res: Specialization[]) => this.specializations = res);
  }

  onClear() {
    this.service.form.reset();
    this.imageHandling.isDiplomaUploaded = false;
    this.imageHandling.isLicenseUploaded = false;
  }

  onSubmit() {
    return this.service.updateToDoctor(this.imageHandling.diplomaToUpload, this.imageHandling.licenceToUpload)
    .subscribe(
      data => {
          this.router.navigate(['']);
          this.notification.success('Successfully updated! Waiting for moderator\'s approvement!');
          this.service.form.reset();
          this.service.initializeFormGroup();
          this.imageHandling.isDiplomaUploaded = false;
          this.imageHandling.isLicenseUploaded = false;
        },
        error => {
          this.notification.error(error);
        });
  }
}
