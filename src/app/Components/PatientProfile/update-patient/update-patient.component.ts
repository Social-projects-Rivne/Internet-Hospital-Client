import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdatePatientService } from '../../../Services/update-patient.service';
import { NotificationService } from '../../../Services/notification.service';
import { ImageHandlingService } from '../../../Services/image-handling.service';
import { LOCALE_PHONE } from '../../../config';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.scss']
})
export class UpdatePatientComponent implements OnInit {

  locale = LOCALE_PHONE;

  constructor(private service: UpdatePatientService,
    private notification: NotificationService,
    private imageHandling: ImageHandlingService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.service.setCurrentProfile();
  }

  onClear() {
    this.service.form.reset();
    this.imageHandling.isPassportUploaded = false;
  }

  onSubmit() {
      this.service.updatePatient(this.imageHandling.passportToUpload)
        .subscribe(
            data => {
              this.router.navigate(['']);
              this.notification.success('Successfully updated! Waiting for moderator\'s approvement!');
              this.service.form.reset();
              this.service.initializeFormGroup();
              this.imageHandling.isPassportUploaded = false;
            },
            error => {
              this.notification.error(error);
            });
  }
}
