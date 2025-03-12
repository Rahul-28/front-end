import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { UserComponent } from './user/user.component';

export const dashboardRoutes: Routes = [
  { path: 'admin-dash', component: AdminComponent },
  { path: 'organizer-dash', component: OrganizerComponent },
  { path: 'user-dash', component: UserComponent },
];
