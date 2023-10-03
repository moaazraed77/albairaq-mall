import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashComponent } from './dash/dash.component';
import { DiningDashComponent } from './dining-dash/dining-dash.component';
import { EntertainmentDashComponent } from './entertainment-dash/entertainment-dash.component';
import { ServicesDashComponent } from './services-dash/services-dash.component';
import { AboutDashComponent } from './about-dash/about-dash.component';
import { ContactusDashComponent } from './contactus-dash/contactus-dash.component';
import { StoreLocationDashComponent } from './store-location-dash/store-location-dash.component';
import { AccessoriesDashComponent } from './accessories-dash/accessories-dash.component';
import { PerfumesDashComponent } from './perfumes-dash/perfumes-dash.component';
import { ClothingDashComponent } from './clothing-dash/clothing-dash.component';

const routes: Routes = [
  {
    path:"admin",component:AdminComponent,children:[
      // {path:"",component:DashComponent},
      {path:"dash",component:DashComponent},
      {path:"dining",component:DiningDashComponent},
      {path:"entertainment",component:EntertainmentDashComponent},
      {path:"services",component:ServicesDashComponent},
      {path:"about",component:AboutDashComponent},
      {path:"contactus",component:ContactusDashComponent},
      {path:"store-location",component:StoreLocationDashComponent},
      {path:"clothing",component:ClothingDashComponent},
      {path:"accessories",component:AccessoriesDashComponent},
      {path:"perfumes",component:PerfumesDashComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
