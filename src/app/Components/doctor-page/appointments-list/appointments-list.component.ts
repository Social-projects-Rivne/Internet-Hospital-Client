import { Component, OnInit, ViewChild } from '@angular/core';
import { Appointment } from '../../DoctorPlans/Appointment';
import { DoctorplansService } from '../../DoctorPlans/doctorplans.service';
import { PaginationService } from '../../../Services/pagination.service';
import { MatPaginator, PageEvent } from '@angular/material';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.scss']
})
export class AppointmentsListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  appointments: Appointment[];
  
  constructor(private doctorplansService: DoctorplansService,
              private pagService: PaginationService) { }

  ngOnInit() {
    this.doctorplansService.getAppointments().subscribe(data => this.appointments = data);
  }


  pageSwitch(event: PageEvent) {
    this.pagService.change(event);
    //this.service.httpOptions.params = this.service.httpOptions.params.set('page', this.pagService.pageIndex.toString());
    window.scroll(0, 0);
  }
}

export const APPOINTMENTS: Appointment[] = [
  {
    id: 1,
    userId: 2,
    userFirstName: 'Ivan',
    userSecondName: 'Petrow',
    address: "",
    status: "",
    startTime: new Date(Date.now()),
    endTime: new Date(Date.now())},
    {
    id: 2,
    userId: 2,
    userFirstName: 'Andrew',
    userSecondName: 'Sidorow',
    address: "",
    status: "",
    startTime: new Date(Date.now()),
    endTime: new Date(Date.now())},
      {
    id: 3,
    userId: 2,
    userFirstName: 'Denis',
    userSecondName: 'Hopper',
    address: "",
    status: "",
    startTime: new Date(Date.now()),
    endTime: new Date(Date.now())},
        {
    id: 4,
    userId: 2,
    userFirstName: 'Oleg',
    userSecondName: 'Konoval',
    address: "",
    status: "",
    startTime: new Date(Date.now()),
    endTime: new Date(Date.now())},
          {
    id: 5,
    userId: 2,
    userFirstName: 'Semen',
    userSecondName: 'Semenow',
    address: "",
    status: "",
    startTime: new Date(Date.now()),
    endTime: new Date(Date.now())},
            {
    id: 6,
    userId: 2,
    userFirstName: 'Igor',
    userSecondName: 'Melnyk',
    address: "",
    status: "",
    startTime: new Date(Date.now()),
    endTime: new Date(Date.now())}
];