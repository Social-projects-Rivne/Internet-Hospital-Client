import { Component, OnInit, Input } from '@angular/core';
import { Appointment } from 'src/app/Components/DoctorPlans/Appointment';
import { DoctorplansService } from 'src/app/Components/DoctorPlans/doctorplans.service';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/Services/dialog.service';

@Component({
  selector: 'app-pat-appoint-item',
  templateUrl: './pat-appoint-item.component.html',
  styleUrls: ['./pat-appoint-item.component.scss']
})
export class PatAppointItemComponent implements OnInit {
  @Input()
  patAppointment: Appointment;

  constructor(private service: DoctorplansService,
              private dialogService: DialogService) { }

  ngOnInit() {
  }

  onUnsubscribeToAppointment() {
    this.dialogService.openConfirmDialog('Are you sure to unsubscribe this appointment?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.service.unsubscribeToAppointment(this.patAppointment.id).subscribe();
      }
    });
  }
}
