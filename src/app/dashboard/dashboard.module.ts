import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild([]),
  ],
  exports: [DashboardComponent],
  declarations: [DashboardComponent, UserProfileComponent],
})
export class DashboardModule {}
