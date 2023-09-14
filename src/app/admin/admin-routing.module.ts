import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashComponent } from './dash/dash.component';
import { DiningDashComponent } from './dining-dash/dining-dash.component';
import { EntertainmentDashComponent } from './entertainment-dash/entertainment-dash.component';
import { ServicesDashComponent } from './services-dash/services-dash.component';
import { AboutDashComponent } from './about-dash/about-dash.component';
import { ContactusDashComponent } from './contactus-dash/contactus-dash.component';

const routes: Routes = [
  {
    path:"admin",component:AdminComponent,children:[
      {path:"dash",component:DashComponent},
      {path:"dining-dash",component:DiningDashComponent},
      {path:"entertainment-dash",component:EntertainmentDashComponent},
      {path:"services-dash",component:ServicesDashComponent},
      {path:"about-dash",component:AboutDashComponent},
      {path:"contactus-dash",component:ContactusDashComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
