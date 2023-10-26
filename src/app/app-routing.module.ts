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
import { DashLoginComponent } from './components/dash-login/dash-login.component';
import { AccessoriesComponent } from './components/accessories/accessories.component';
import { PerfumesComponent } from './components/perfumes/perfumes.component';
import { ClothingComponent } from './components/clothing/clothing.component';
import { AlbairaqTowerComponent } from './components/albairaq-tower/albairaq-tower.component';
import { ShoesComponent } from './components/shoes/shoes.component';
import { CafesComponent } from './components/cafes/cafes.component';
// import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {path:"" , component: HomeComponent},
  {path:"home" , component: HomeComponent},
  {path:"clothing" , component: ClothingComponent},
  {path:"shoes" , component: ShoesComponent},
  {path:"accessories" , component: AccessoriesComponent},
  {path:"perfumes" , component: PerfumesComponent},
  {path:"dining" , component: DiningComponent},
  {path:"cafes" , component: CafesComponent},
  {path:"entertainment" , component: EntertainmentComponent},
  {path:"about" , component:AboutComponent},
  {path:"opening-hours" , component:OpeningHoursComponent},
  {path:"mall-location" , component:MallLocationComponent},
  {path:"store-location" , component:StoreLocationComponent},
  {path:"contact-us" , component:ContactUsComponent},
  {path:"abairaq-tower" , component: AlbairaqTowerComponent},
  {path:"albiraq-0-admin-0-mall" , component: DashLoginComponent},
  // {path:"**" , component: ErrorComponent}

  // {path:"" , component: }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
