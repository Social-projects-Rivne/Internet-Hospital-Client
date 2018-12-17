import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Modules/material/material.module';
import { RoutingModule, ROUTING_COMPONENTS } from './Modules/routing/routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/Layout/header/header.component';
import { FooterComponent } from './Components/Layout/footer/footer.component';
import { HomeNewsComponent } from './Components/Home/home/home-news/home-news.component';
import { HomeNewsItemComponent } from './Components/Home/home/home-news/home-news-item/home-news-item.component';
import { Page404Component } from './Components/page404/page404.component';
import { DoctorListComponent } from './Components/DoctorList/doctor-list/doctor-list.component';
import { DoctorListItemComponent } from './Components/DoctorList/doctor-list/doctor-list-item/doctor-list-item.component';

import { AuthenticationService } from './Services/authentication.service';
import { InterceptorService } from './Services/interceptor.service';

import { CompareValidatorDirective } from './Directives/compare-validator.directive';

import { AuthGuard } from './Services/Guards/auth.guard';
import { PatientGuard } from './Services/Guards/patient.guard';
import { DoctorGuard } from './Services/Guards/doctor.guard';
import { ModeratorGuard } from './Services/Guards/moderator.guard';
import { AdminGuard } from './Services/Guards/admin.guard';
import { FinishAppointmentGuard } from 'src/app/Services/Guards/finish-appointment.guard';
// tslint:disable-next-line:max-line-length
import { DoctorListSearchItemComponent } from './Components/DoctorList/doctor-list/doctor-list-search-item/doctor-list-search-item.component';

import { AdminpanelModule } from './Components/adminpanel/adminpanel.module';
import { UsersProfileComponent } from './Components/PatientProfile/patient-profile/users-profile.component';

import { DoctorPageComponent } from './Components/doctor-page/doctor-page.component';
import { FeedbackItemComponent } from './Components/doctor-page/feedbacks/feedback-item/feedback-item.component';
import { GalleryComponent } from './Components/doctor-page/gallery/gallery.component';
import { ImageModalDialogComponent } from './Components/doctor-page/gallery/image-modal-dialog.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FeedbacksComponent } from './Components/doctor-page/feedbacks/feedbacks.component';

import { UpdatePatientComponent } from './Components/PatientProfile/update-patient/update-patient.component';
import { DateValidatorDirective } from './Directives/date-validator.directive';
import { NgxMaskModule } from 'ngx-mask';

import { DoctorPlansComponent } from './Components/DoctorPlans/doctorplans/doctorplans.component';
import { CalendarModule, DateAdapter, CalendarDateFormatter, CalendarEventTitleFormatter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CustomDateFormatter, CustomEventTitleFormatter } from './Components/DoctorPlans/doctorplans/dateformat';
import { DatePipe } from '@angular/common';
import { UpdateDoctorComponent } from './Components/DoctorProfile/update-doctor/update-doctor.component';
// tslint:disable-next-line:max-line-length
import { IllnessHistorySearchItemComponent } from './Components/PatientProfile/patient-profile/illness-history-search-item/illness-history-search-item.component';
import { AppointmentsListComponent } from './Components/doctor-page/appointments-list/appointments-list.component';
import { AppointmentsItemComponent } from './Components/doctor-page/appointments-list/appointments-item/appointments-item.component';
import { IllnessHistoryComponent } from './Components/illness-history/illness-history.component';
import { PatientAppointmentsComponent } from './Components/PatientProfile/patient-appointments/patient-appointments.component';
import { PatAppointItemComponent } from './Components/PatientProfile/patient-appointments/pat-appoint-item/pat-appoint-item.component';
import { MatConfirmDialogComponent } from './Components/PatientProfile/mat-confirm-dialog/mat-confirm-dialog.component';
import { LoadingComponent } from './Components/loading/loading.component';
import { DoctorProfileComponent } from './Components/DoctorProfile/doctor-profile/doctor-profile.component';


import { SlideshowModule } from 'ng-simple-slideshow';
import { HomeNewsItemVer2Component } from './Components/Home/home/home-news/home-news-item-ver2/home-news-item-ver2.component';
import { HomeNewsItemVer3Component } from './Components/Home/home/home-news/home-news-item-ver3/home-news-item-ver3.component';
import { GreetingItemComponent } from './Components/Home/home/home-news/greeting-item/greeting-item.component';


@NgModule({
  declarations: [
    AppComponent,
    ROUTING_COMPONENTS,
    HeaderComponent,
    FooterComponent,
    HomeNewsComponent,
    HomeNewsItemComponent,
    CompareValidatorDirective,
    Page404Component,
    DoctorListComponent,
    DoctorListItemComponent,
    DoctorListSearchItemComponent,
    UsersProfileComponent,
    DoctorPageComponent,
    FeedbackItemComponent,
    GalleryComponent,
    ImageModalDialogComponent,
    FeedbacksComponent,
    UpdatePatientComponent,
    DateValidatorDirective,
    DoctorPlansComponent,
    UpdateDoctorComponent,
    IllnessHistorySearchItemComponent,
    AppointmentsItemComponent,
    AppointmentsListComponent,
    IllnessHistoryComponent,
    PatientAppointmentsComponent,
    PatAppointItemComponent,
    MatConfirmDialogComponent,
    LoadingComponent,
    DoctorProfileComponent,

    HomeNewsItemVer2Component,

    HomeNewsItemVer3Component,

    GreetingItemComponent,

  ],
  entryComponents: [ ImageModalDialogComponent, MatConfirmDialogComponent ],
  imports: [

    SlideshowModule,

    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    AdminpanelModule,
    OverlayModule,
    NgxMaskModule.forRoot(),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }, {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: CustomDateFormatter
        },
        eventTitleFormatter: {
          provide: CalendarEventTitleFormatter,
          useClass: CustomEventTitleFormatter
        }
      },
    )
  ],
  exports: [MaterialModule],
  providers: [AuthenticationService, AuthGuard, PatientGuard, DoctorGuard, ModeratorGuard, AdminGuard, DatePipe, FinishAppointmentGuard,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }


