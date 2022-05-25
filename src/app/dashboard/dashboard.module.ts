import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { DashboardComponent } from './dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
    BsDatepickerModule.forRoot(),
    CommonModule,
    RouterModule.forChild([]),
  ],
  exports: [DashboardComponent],
  declarations: [DashboardComponent, UserProfileComponent],
})
export class DashboardModule {}
