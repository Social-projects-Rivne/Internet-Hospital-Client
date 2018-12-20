import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModeratorManagementComponent } from './moderator-management/moderator-management.component';
import { RequestManagementComponent } from './request-management/request-management.component';
import { ContentsComponent } from './contents/contents.component';
import { ContentManagingComponent } from './contents/content-managing/content-managing.component';
import { ModeratorCreateComponent } from './moderator-management/moderator-create/moderator-create.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminPanelComponent } from './adminpanel.component';

import { AdminGuard } from '../../Services/Guards/admin.guard';

import { CONTENTS, CONTENTS_MNG, MODERATORS_MNG, REQUESTS_MNG, USERS_MNG, MODER_CREATE} from './routesConfig';

import { ADMIN_PANEL } from '../../config';
import { ModeratorGuard } from 'src/app/Services/Guards/moderator.guard';
const routes: Routes = [
  {
    path: ADMIN_PANEL,
    component: AdminPanelComponent,
    canActivate: [ModeratorGuard],
    children: [
      {
        path: '',
        redirectTo: CONTENTS,
        pathMatch: 'full'
      },
      {
        path: MODERATORS_MNG,
        component: ModeratorManagementComponent,
        pathMatch: 'full',
        canActivate: [AdminGuard]
      },
      {
        path: USERS_MNG,
        component: UserManagementComponent,
        pathMatch: 'full'
      },
      {
        path: REQUESTS_MNG,
        component: RequestManagementComponent,
        pathMatch: 'full'
      },
      {
        path: CONTENTS,
        component: ContentsComponent,
        pathMatch: 'full'
      },
      {
        path: CONTENTS_MNG,
        component: ContentManagingComponent,
        pathMatch: 'full'
      },
      {
        path: MODER_CREATE,
        component: ModeratorCreateComponent,
        pathMatch: 'full'
      },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminpanelRoutingModule { }
