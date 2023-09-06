import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { EntertainmentComponent } from './entertainment/entertainment.component';
import { DiningComponent } from './dining/dining.component';
import { DashComponent } from './admin/dash/dash.component';
import { DashLoginComponent } from './admin/dash-login/dash-login.component';
import { ServicessComponent } from './servicess/servicess.component';

const routes: Routes = [
  {path:"" , component: HomeComponent},
  {path:"home" , component: HomeComponent},
  {path:"dining" , component: DiningComponent},
  {path:"entertainment" , component: EntertainmentComponent},
  {path:"about" , component:AboutComponent},
  {path:"services" , component: ServicessComponent},
  {path:"dashlogin" , component: DashLoginComponent},
  {path:"dash" , component: DashComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
