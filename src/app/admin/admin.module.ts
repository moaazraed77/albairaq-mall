import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashComponent } from './dash/dash.component';
import { DiningDashComponent } from './dining-dash/dining-dash.component';
import { EntertainmentDashComponent } from './entertainment-dash/entertainment-dash.component';
import { AboutDashComponent } from './about-dash/about-dash.component';
import { ContactusDashComponent } from './contactus-dash/contactus-dash.component';
import { StoreLocationDashComponent } from './store-location-dash/store-location-dash.component';
import { PerfumesDashComponent } from './perfumes-dash/perfumes-dash.component';
import { AccessoriesDashComponent } from './accessories-dash/accessories-dash.component';
import { ClothingDashComponent } from './clothing-dash/clothing-dash.component';
import { AdminGuard } from './services/admin.guard';
import { OpenningHoursComponent } from './openning-hours/openning-hours.component';
import { AlbairaqTowerDashComponent } from './albairaq-tower-dash/albairaq-tower-dash.component';
import { CafesDashComponent } from './cafes-dash/cafes-dash.component';
import { ShoesDashComponent } from './shoes-dash/shoes-dash.component';
import { MallLocationComponent } from './mall-location/mall-location.component';

@NgModule({
  declarations: [
    DashComponent,
    DiningDashComponent,
    EntertainmentDashComponent,
    AboutDashComponent,
    ContactusDashComponent,
    StoreLocationDashComponent,
    PerfumesDashComponent,
    AccessoriesDashComponent,
    ClothingDashComponent,
    OpenningHoursComponent,
    AlbairaqTowerDashComponent,
    CafesDashComponent,
    ShoesDashComponent,
    MallLocationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[AdminGuard]
})
export class AdminModule { }
