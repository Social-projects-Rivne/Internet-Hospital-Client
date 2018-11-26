import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { CalendarEvent, CalendarView, CalendarEventAction } from 'angular-calendar';
import { Appointment } from '../Appointment';
import { DoctorplansService } from '../doctorplans.service';
import { Subject } from 'rxjs';
import { isSameMonth, isSameDay } from 'date-fns';
import { NotificationService } from 'src/app/Services/notification.service';
import { COLORS } from 'src/app/Mock-Objects/mock-colors';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DataSharingService } from '../../../Services/date-sharing.service';

@Component({
  selector: 'app-doctorplans',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './doctorplans.component.html',
  styleUrls: ['./doctorplans.component.scss']
})
export class DoctorPlansComponent implements OnInit {

  constructor(private doctorplansService: DoctorplansService,
    private notification: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    private dateSharing: DataSharingService) { }

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  Appointments: Appointment[] = [];
  events: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  activeDayIsOpen = false;
  loginForm: FormGroup;
  load = true;

  deleteAction: CalendarEventAction = {
    label: '<i></i>',
    onClick: ({ event }: { event: CalendarEvent }): void => {
      if (confirm('Are you sure ?')) {
        this.load = true;
        this.doctorplansService.deleteAppointment(event.id)
          .subscribe((data: any) => {
            this.getAppointments();
            this.notification.success(data['message']);
          },
            error => {
              this.getAppointments();
              this.notification.error(error);
            });
      }
    },
    cssClass: 'fas fa-trash-alt icon-calendar'
  };

  cancelAction: CalendarEventAction = {
    label: '<i></i>',
    onClick: ({ event }: { event: CalendarEvent }): void => {
      if (confirm('Are you sure ?')) {
        this.load = true;
        this.doctorplansService.cancelAppointment(event.id)
          .subscribe((data: any) => {
            this.getAppointments();
            this.notification.success(data['message']);
          },
            error => {
              this.getAppointments();
              this.notification.error(error);
            });
      }
    },
    cssClass: 'far fa-calendar-times fa-lg icon-calendar'
  };

  ngOnInit() {
    this.getAppointments();
    this.loginForm = this.formBuilder.group({
      start: ['', Validators.required],
      end: ['', Validators.required]
    });
  }

  getAppointments() {
    this.Appointments = [];
    this.events = [];
    this.doctorplansService.getAppointments()
      .subscribe((data: any) => {
        this.Appointments = data.appointments;
        this.Appointments = this.Appointments.sort(function(a, b) {
          return a.startTime < b.startTime ? -1 : 1;
        });
        this.Map();
        this.refresh.next();
        this.load = false;
      });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (this.activeDayIsOpen) {
        this.activeDayIsOpen = false;
      }
      this.viewDate = date;
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  private Map() {
    let color;
    let title;
    this.Appointments.forEach(element => {
      const actions: CalendarEventAction[] = [];
      if (element.status === 'Reserved') {
        title = 'Reserved by' + '<span class="subscribed-user">' +
         element.userFirstName + ' ' +  element.userSecondName + '</span>';
        actions.push(this.cancelAction);
        color = COLORS.yellow;
      } else {
        title = 'Empty';
        actions.push(this.deleteAction);
        color = COLORS.blue;
      }
      this.events.push({
        id: element.id,
        title: title,
        start: new Date(element.startTime),
        end: new Date(element.endTime),
        color: color,
        actions: actions
      });
    });
  }

  handleEvent(event: CalendarEvent): void {
    if (event.color === COLORS.blue) {
      this.notification.error('Appointment is empty');
    } else {
      this.dateSharing.changeDate(event.start);
      // todo: navigate to illness creation component
    }
  }

  onSubmit() {
    this.load = true;
    this.doctorplansService.addAppointment(this.loginForm.controls['start'].value, this.loginForm.controls['end'].value)
      .subscribe((data: any) => {
        this.getAppointments();
        this.notification.success('Appointment has been successfully created');
      },
      error => {
        this.getAppointments();
        this.notification.error(error);
      });
  }
}
