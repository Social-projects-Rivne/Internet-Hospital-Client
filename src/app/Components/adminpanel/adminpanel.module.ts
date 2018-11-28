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
import { ContentsComponent } from '../adminpanel/contents/contents.component';
import { ContentPreviewComponent } from '../adminpanel/contents/content-managing/content-preview/content-preview.component';
import { ContentEditComponent } from '../adminpanel/contents/content-managing/content-edit/content-edit.component';
import { ContentItemComponent } from '../adminpanel/contents/content-item/content-item.component';

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
        MatProgressSpinnerModule,
        MatSelectModule,
        MatExpansionModule,
        MatDatepickerModule
      } from '@angular/material';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule,
        ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ContentManagingComponent } from '../../Components/adminpanel/contents/content-managing/content-managing.component';

@NgModule({
  imports: [
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
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ImageCropperModule,
    MatSelectModule,
    MatExpansionModule,
    FroalaEditorModule,
    FroalaViewModule
  ],
  declarations: [
    AdminPanelComponent,
    SidebarComponent,
    AdminHeaderComponent,
    UserManagementComponent,
    RequestManagementComponent,
    ModeratorManagementComponent,
    ModeratorCreateComponent,
    ContentsComponent,
    ContentPreviewComponent,
    ContentEditComponent,
    ContentItemComponent,
    ContentManagingComponent
  ],
  providers: []
})
export class AdminpanelModule { }
