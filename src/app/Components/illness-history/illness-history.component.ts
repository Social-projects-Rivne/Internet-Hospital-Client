import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RoutesRecognized, NavigationStart } from '@angular/router';
import { NotificationService } from 'src/app/Services/notification.service';
import { PreviousRouteService } from 'src/app/Services/previous-route.service';
// import 'rxjs/add/operator/pairwise';
// import 'rxjs/add/operator/filter';

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
    private activateRoute: ActivatedRoute,
    private location: Location) { }

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
    // this.router.events
    // .filter(e => e instanceof RoutesRecognized)
    // .pairwise()
    // .subscribe((e) => {
    //   console.log(e);
    // });

    // this.router.events.filter(e => e instanceof NavigationStart )
    //   .bufferCount(1, 1).subscribe(e => console.log(e[0]['url']));


    this.appointmentId = this.activateRoute.snapshot.params['id'];
    this.initializeFormGroup();
  }

  onCancel() {
    console.log(this.previousRouteService.getPreviousUrl());
    console.log('dsadasdasdasdasd');
    // this.location.back();
    // this.router.navigate([MY_PLANS]);
  }

  onSubmit() {
    console.log(this.previousRouteService.getPreviousUrl());
    console.log('111111111111111111111111111111111111111');
    this.load = true;
    this.service.fillIllness(this.form, this.appointmentId).subscribe(
      () => {
        this.notification.success('All is fine!');
        this.load = false;
        this.location.back();
        // this.router.navigate([MY_PLANS]);
      },
      (error) => {
        this.notification.error(error);
        this.load = false;
        this.location.back();
        // this.router.navigate([MY_PLANS]);
      });
  }
}
