import { Component, OnInit, ViewChild } from '@angular/core';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { PaginationService } from '../../../Services/pagination.service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { DoctorFilter } from '../../../Models/DoctorFilter';
import { Specialization } from 'src/app/Models/Specialization';
import { Doctor } from 'src/app/Models/Doctors';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit {
  constructor(private service: DoctorsService,
              private pagService: PaginationService,
              private notification: NotificationService) { }

  private filter: DoctorFilter;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  doctorsList: Doctor[];
  specializations: Specialization[];
  doctorsAmount: number;
  isLoadingResults = true;

  ngOnInit() {
    this.service.httpOptions.params = this.service.httpOptions.params.set('page', '1');
    this.filter = new DoctorFilter();
    this.service.getDoctors()
    .subscribe((result: any) => {
      this.doctorsList = result.doctors;
      this.doctorsAmount = result.totalDoctors;
      this.isLoadingResults = false;
    },
    error => {
      this.notification.error(error);
      this.isLoadingResults = false;
    });
    this.service.getSpecializations()
      .subscribe(data => this.specializations = data);
  }

  onSearch($event) {
    this.paginator.pageIndex = 1;
    this.filter = Object.assign({}, $event);
    this.paginator.firstPage();
    const event = new PageEvent();
    event.pageSize = this.pagService.pageSize;
    event.pageIndex = this.pagService.pageIndex - 1;
    event.length = this.doctorsAmount;
    this.pageSwitch(event);
  }

  pageSwitch(event: PageEvent) {
    this.pagService.change(event);
    this.service.httpOptions.params = this.service.httpOptions.params.set('page', this.pagService.pageIndex.toString());
      this.service.getDoctors(this.filter.searchKey, + this.filter.selectedSpecialization)
        .subscribe((result: any) => {
          this.doctorsList = result.doctors;
          this.doctorsAmount = result.totalDoctors;
          this.isLoadingResults = false;
        },
        error => {
          this.notification.error(error);
          this.isLoadingResults = false;
        });
    window.scroll(0, 0);
  }
}
