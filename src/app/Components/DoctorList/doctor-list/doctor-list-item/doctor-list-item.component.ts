import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from 'src/app/Models/Doctors';
import { HOST_URL } from '../../../../config';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Observable } from 'rxjs';

const DEFAULT_IMAGE = '/assets/img/default-avatar.png';

@Component({
  selector: 'app-doctor-list-item',
  templateUrl: './doctor-list-item.component.html',
  styleUrls: ['./doctor-list-item.component.scss']
})
export class DoctorListItemComponent implements OnInit {
  @Input()
  doctor: Doctor;
  urlAvatar: string;
  doctorId = 0;
  isPatient: Observable<boolean>;
  isDoctor: Observable<boolean>;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.urlAvatar = this.doctor.avatarURL ? HOST_URL + this.doctor.avatarURL : DEFAULT_IMAGE;
    this.doctorId = this.doctor.id;
    this.isPatient = this.authenticationService.isPatient();
    this.isDoctor = this.authenticationService.isDoctor();
  }

}
