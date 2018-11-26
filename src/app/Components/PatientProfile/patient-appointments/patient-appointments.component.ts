import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { DoctorplansService } from '../../DoctorPlans/doctorplans.service';
import { PaginationService } from 'src/app/Services/pagination.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/Services/notification.service';
import { Appointment } from '../../DoctorPlans/Appointment';

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.scss']
})
export class PatientAppointmentsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  patientId;
  appointmentList: Appointment[] = [];
  appointmentsAmount: number;

  constructor(private service: DoctorplansService,
              private notification: NotificationService) { }

  ngOnInit() {
    this.service.getPatientAppointments().subscribe((result: any) => {
      this.appointmentList = result.appointments;
    },
    error => {
      this.notification.error(error);
    });
  }

}
