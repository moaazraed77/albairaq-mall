import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { EntertainmentComponent } from './entertainment/entertainment.component';
import { DiningComponent } from './dining/dining.component';
import { DashLoginComponent } from './admin/dash-login/dash-login.component';
import { ServicessComponent } from './servicess/servicess.component';
import { OpeningHoursComponent } from './opening-hours/opening-hours.component';
import { GettingHereComponent } from './getting-here/getting-here.component';
import { MallLocationComponent } from './mall-location/mall-location.component';
import { StoreLocationComponent } from './store-location/store-location.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [
  {path:"" , component: HomeComponent},
  {path:"home" , component: HomeComponent},
  {path:"dining" , component: DiningComponent},
  {path:"entertainment" , component: EntertainmentComponent},
  {path:"about" , component:AboutComponent},
  {path:"opening-hours" , component:OpeningHoursComponent},
  {path:"getting-here" , component:GettingHereComponent},
  {path:"mall-location" , component:MallLocationComponent},
  {path:"store-location" , component:StoreLocationComponent},
  {path:"contact-us" , component:ContactUsComponent},
  {path:"services" , component: ServicessComponent},
  {path:"dash-login" , component: DashLoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
