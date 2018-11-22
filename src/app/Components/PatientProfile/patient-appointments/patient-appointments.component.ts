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
    private pagService: PaginationService,
    private activateRoute: ActivatedRoute,
    private notification: NotificationService) { }

  ngOnInit() {
    // this.getDoctorId();
    // this.service.getPatientAppointments(this.patientId).subscribe((result: any) => {
    //   this.appointmentList = result.appointments;
    //   this.appointmentsAmount = result.quantity;
    // },
    // error => {
    //   this.notification.error(error);
    // });
  }

}
