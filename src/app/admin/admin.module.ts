import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashComponent } from './dash/dash.component';
import { DiningDashComponent } from './dining-dash/dining-dash.component';
import { EntertainmentDashComponent } from './entertainment-dash/entertainment-dash.component';
import { ServicesDashComponent } from './services-dash/services-dash.component';
import { AboutDashComponent } from './about-dash/about-dash.component';
import { ContactusDashComponent } from './contactus-dash/contactus-dash.component';

@NgModule({
  declarations: [
    DashComponent,
    DiningDashComponent,
    EntertainmentDashComponent,
    ServicesDashComponent,
    AboutDashComponent,
    ContactusDashComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
