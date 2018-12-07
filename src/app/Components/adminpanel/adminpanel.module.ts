import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelComponent } from './adminpanel.component';
import { AdminpanelRoutingModule } from './adminpanel-routing.module';

import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';

import { UserManagementComponent } from '../adminpanel/user-management/user-management.component';
import { RequestManagementComponent } from '../adminpanel/request-management/request-management.component';
import { ModeratorManagementComponent } from '../adminpanel/moderator-management/moderator-management.component';
import { ModeratorCreateComponent } from '../adminpanel/moderator-management/moderator-create/moderator-create.component';
import { ContentManagementComponent } from '../adminpanel/content-management/content-management.component';
import { ContentPreviewComponent } from '../adminpanel/content-management/content-preview/content-preview.component';
import { ContentEditComponent } from '../adminpanel/content-management/content-edit/content-edit.component';
import { ContentItemComponent } from '../adminpanel/content-management/content-item/content-item.component';


import { MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatMenuModule,
        MatProgressSpinnerModule
      } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule,
        ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { UserRequestsComponent } from '../../Components/adminpanel/request-management/user-requests/user-requests.component';
import { DataApproveComponent } from '../../Components/adminpanel/request-management/data-approve/data-approve.component';
// tslint:disable-next-line:import-spacing
import { RegistrationConfirmComponent }
        from '../../Components/adminpanel/request-management/registration-confirm/registration-confirm.component';
import { FeedbackClaimComponent } from '../../Components/adminpanel/request-management/feedback-claim/feedback-claim.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  imports: [
    MatProgressBarModule,
    MatTooltipModule,
    CommonModule,
    AdminpanelRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatCardModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSelectModule,
    MatExpansionModule,
    MatTabsModule,
  ],
  declarations: [
    AdminPanelComponent,
    SidebarComponent,
    AdminHeaderComponent,
    UserManagementComponent,
    RequestManagementComponent,
    ModeratorManagementComponent,
    ModeratorCreateComponent,
    ContentManagementComponent,
    ContentPreviewComponent,
    ContentEditComponent,
    ContentItemComponent,
    UserRequestsComponent,
    DataApproveComponent,
    RegistrationConfirmComponent,
    FeedbackClaimComponent,
  ],
  providers: []
})
export class AdminpanelModule { }
