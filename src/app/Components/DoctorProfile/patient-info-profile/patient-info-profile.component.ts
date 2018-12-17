import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-info-profile',
  templateUrl: './patient-info-profile.component.html',
  styleUrls: ['./patient-info-profile.component.scss']
})
export class PatientInfoProfileComponent implements OnInit {
  userId: number;

  constructor(private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.activateRoute.snapshot.params['id'];
  }

}
