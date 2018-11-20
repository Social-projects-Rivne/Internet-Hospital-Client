import { Component, OnInit, ViewChild } from '@angular/core';
import { Appointment } from '../../DoctorPlans/Appointment';
import { DoctorplansService } from '../../DoctorPlans/doctorplans.service';
import { PaginationService } from '../../../Services/pagination.service';
import { MatPaginator, PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppointmentFilter } from 'src/app/Models/AppointmentFilter';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.scss']
})
export class AppointmentsListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  id;
  appointmentFilterForm: FormGroup;

  appointmentList: Array<Appointment>;
  private filter: AppointmentFilter;

  
  constructor(private service: DoctorplansService,
              private pagService: PaginationService,
              private activateRoute: ActivatedRoute,
              private formBuilder: FormBuilder) { 
                this.filter = new AppointmentFilter;
              }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.service.getDoctorAppointments(this.id);

    this.appointmentFilterForm = this.formBuilder.group({
      start: [''],
      end: ['']
    });
  } 

  onFilterSubmit(start, end) {
    this.filter.from = start;
    this.filter.till = end;
    //if (this.filter.isWithParams === true) {
      this.service.getDoctorAppointments(this.id, this.filter.from, this.filter.till);
    //} else {
      //this.service.getDoctorAppointments(this.id);
    //}
  }

  //data => this.appointmentList = data

  pageSwitch(event: PageEvent) {
    this.pagService.change(event);
    this.service.httpOptions.params = this.service.httpOptions.params.set('page', this.pagService.pageIndex.toString());
    if (this.filter.isWithParams === true) {
      this.service.getDoctorAppointments(this.id, this.filter);
    } else {
      this.service.getDoctorAppointments(this.id);
    }
    window.scroll(0, 0);
  }
}