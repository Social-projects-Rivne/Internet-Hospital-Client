import { Component, OnInit } from '@angular/core';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/Services/notification.service';
import { PreviousRouteService } from 'src/app/Services/previous-route.service';

@Component({
  selector: 'app-illness-history',
  templateUrl: './illness-history.component.html',
  styleUrls: ['./illness-history.component.scss']
})
export class IllnessHistoryComponent implements OnInit {

  private appointmentId: number;

  constructor(private service: DoctorsService,
    private router: Router,
    private previousRouteService: PreviousRouteService,
    private notification: NotificationService,
    private activateRoute: ActivatedRoute) { }

  load = false;

  form: FormGroup = new FormGroup({
    Complaints: new FormControl('', Validators.required),
    DiseaseAnamnesis: new FormControl('', Validators.required),
    LifeAnamnesis: new FormControl(''),
    ObjectiveStatus: new FormControl('', Validators.required),
    LocalStatus: new FormControl(''),
    Diagnose: new FormControl('', Validators.required),
    SurveyPlan: new FormControl(''),
    TreatmentPlan: new FormControl('', Validators.required)
  });

  initializeFormGroup() {
    this.form.setValue({
      Complaints: '',
      DiseaseAnamnesis: '',
      LifeAnamnesis: '',
      ObjectiveStatus: '',
      LocalStatus: '',
      Diagnose: '',
      SurveyPlan: '',
      TreatmentPlan: ''
    });
  }

  ngOnInit() {
    this.appointmentId = this.activateRoute.snapshot.params['id'];
    this.initializeFormGroup();
  }

  onCancel() {
    this.router.navigate([this.previousRouteService.getPreviousUrl()]);
  }

  onSubmit() {
    this.load = true;
    this.service.fillIllness(this.form, this.appointmentId).subscribe(
      () => {
        this.notification.success('Appointment successfully finished!');
        this.load = false;
        this.router.navigate([this.previousRouteService.getPreviousUrl()]);
      },
      (error) => {
        this.notification.error(error);
        this.load = false;
        this.router.navigate([this.previousRouteService.getPreviousUrl()]);
      });
  }
}
