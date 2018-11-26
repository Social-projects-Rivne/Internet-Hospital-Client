import { Component, OnInit } from '@angular/core';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-illness-history',
  templateUrl: './illness-history.component.html',
  styleUrls: ['./illness-history.component.scss']
})
export class IllnessHistoryComponent implements OnInit {

  constructor(private service: DoctorsService) { }

  form: FormGroup = new FormGroup({
    Complains: new FormControl('', Validators.required),
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
      Complains: '',
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
    this.initializeFormGroup();
  }

  onSubmit() {
    this.service.fillIllness(this.form).subscribe();
  }
}
