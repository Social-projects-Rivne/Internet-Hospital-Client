import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateDoctorService } from '../../../Services/update-doctor.service';
import { NotificationService } from '../../../Services/notification.service';
import { ImageHandlingService } from '../../../Services/image-handling.service';
import { LOCALE_PHONE } from '../../../config';
import { DoctorsService } from '../../../Services/doctors.service';
import { Specialization } from 'src/app/Models/Specialization';

@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.scss']
})
export class UpdateDoctorComponent implements OnInit {

  locale = LOCALE_PHONE;
  specializations: Specialization[];

  constructor(private service: UpdateDoctorService,
    private notification: NotificationService,
    private imageHandling: ImageHandlingService,
    private router: Router,
    private doctorService: DoctorsService
  ) { }

  ngOnInit() {
    this.service.setCurrentProfile();
    this.doctorService.getSpecializations()
      .subscribe((res: Specialization[]) => this.specializations = res);
  }

  onClear() {
    this.service.form.reset();
    this.imageHandling.isPassportUploaded = false;
    this.imageHandling.isDiplomaUploaded = false;
    this.imageHandling.isLicenseUploaded = false;
  }

  onSubmit() {
    this.service.updateDoctor(this.imageHandling.passportToUpload, this.imageHandling.diplomaToUpload, this.imageHandling.licenceToUpload)
      .subscribe(
        data => {
          this.router.navigate(['']);
          this.notification.success('Successfully updated! Waiting for moderator\'s approvement!');
          this.service.form.reset();
          this.service.initializeFormGroup();
          this.imageHandling.isPassportUploaded = false;
          this.imageHandling.isDiplomaUploaded = false;
          this.imageHandling.isLicenseUploaded = false;
        },
        error => {
          this.notification.error(error);
        });
  }
}
