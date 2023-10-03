import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { EntertainmentComponent } from './components/entertainment/entertainment.component';
import { DiningComponent } from './components/dining/dining.component';
import { OpeningHoursComponent } from './components/opening-hours/opening-hours.component';
import { MallLocationComponent } from './components/mall-location/mall-location.component';
import { StoreLocationComponent } from './components/store-location/store-location.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ServicessComponent } from './components/servicess/servicess.component';
import { DashLoginComponent } from './components/dash-login/dash-login.component';
import { AccessoriesComponent } from './components/accessories/accessories.component';
import { PerfumesComponent } from './components/perfumes/perfumes.component';
import { ClothingComponent } from './components/clothing/clothing.component';

const routes: Routes = [
  {path:"" , component: HomeComponent},
  {path:"home" , component: HomeComponent},
  {path:"clothing" , component: ClothingComponent},
  {path:"accessories" , component: AccessoriesComponent},
  {path:"perfumes" , component: PerfumesComponent},
  {path:"dining" , component: DiningComponent},
  {path:"entertainment" , component: EntertainmentComponent},
  {path:"about" , component:AboutComponent},
  {path:"opening-hours" , component:OpeningHoursComponent},
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
