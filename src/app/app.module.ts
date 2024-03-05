import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import {AngularFireModule, FIREBASE_OPTIONS} from '@angular/fire/compat'// write this special code for upload img 
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideStorage,getStorage } from '@angular/fire/storage'
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AboutComponent } from './components/about/about.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MallLocationComponent } from './components/mall-location/mall-location.component';
import { StoreLocationComponent } from './components/store-location/store-location.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DiningComponent } from './components/dining/dining.component';
import { EntertainmentComponent } from './components/entertainment/entertainment.component';
import { OpeningHoursComponent } from './components/opening-hours/opening-hours.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { DashLoginComponent } from './components/dash-login/dash-login.component';
import { ClothingComponent } from './components/clothing/clothing.component';
import { AccessoriesComponent } from './components/accessories/accessories.component';
import { PerfumesComponent } from './components/perfumes/perfumes.component';
import { ErrorComponent } from './components/error/error.component';
import { AlbairaqTowerComponent } from './components/albairaq-tower/albairaq-tower.component';
import { CafesComponent } from './components/cafes/cafes.component';
import { ShoesComponent } from './components/shoes/shoes.component';
import { provideAuth,getAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DiningComponent,
    EntertainmentComponent,
    AboutComponent,
    OpeningHoursComponent,
    MallLocationComponent,
    StoreLocationComponent,
    ContactUsComponent,
    AdminComponent,
    DashLoginComponent,
    ClothingComponent,
    AccessoriesComponent,
    PerfumesComponent,
    ErrorComponent,
    CafesComponent,
    ShoesComponent,
    AlbairaqTowerComponent
  ],
  imports: [ 
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    // ToastrModule.forRoot(),
    HttpClientModule, 
    AngularFireStorageModule,
    AngularFireModule,
    AdminModule,
    AppRoutingModule, // note that we put   AppRoutingModule   after  AdminModule  to get  error-page  wrok fine 
    FontAwesomeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)), provideDatabase(() => getDatabase()), provideStorage(() => getStorage()), NgbModule, provideAuth(() => getAuth()),
  ],
  providers: [
     // write this special code for upload img 
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    {provide : LocationStrategy,useClass:HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
