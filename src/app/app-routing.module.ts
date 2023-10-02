import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { EntertainmentComponent } from './components/entertainment/entertainment.component';
import { DiningComponent } from './components/dining/dining.component';
import { OpeningHoursComponent } from './components/opening-hours/opening-hours.component';
import { GettingHereComponent } from './components/getting-here/getting-here.component';
import { MallLocationComponent } from './components/mall-location/mall-location.component';
import { StoreLocationComponent } from './components/store-location/store-location.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ServicessComponent } from './components/servicess/servicess.component';
import { DashLoginComponent } from './components/dash-login/dash-login.component';

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
  {path:"admin" , component: DashLoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
