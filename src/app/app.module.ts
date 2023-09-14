import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
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
import { DiningComponent } from './dining/dining.component';
import { EntertainmentComponent } from './entertainment/entertainment.component';
import { AboutComponent } from './about/about.component';
import { ServicessComponent } from './servicess/servicess.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OpeningHoursComponent } from './opening-hours/opening-hours.component';
import { GettingHereComponent } from './getting-here/getting-here.component';
import { MallLocationComponent } from './mall-location/mall-location.component';
import { StoreLocationComponent } from './store-location/store-location.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module';
import { DashLoginComponent } from './admin/dash-login/dash-login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DiningComponent,
    EntertainmentComponent,
    AboutComponent,
    ServicessComponent,
    OpeningHoursComponent,
    GettingHereComponent,
    MallLocationComponent,
    StoreLocationComponent,
    ContactUsComponent,
    AdminComponent,
    DashLoginComponent
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    // ToastrModule.forRoot(),
    HttpClientModule, 
    AngularFireStorageModule,
    AngularFireModule,
    AdminModule,
    FontAwesomeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)), provideDatabase(() => getDatabase()), provideStorage(() => getStorage()), NgbModule,
  ],
  providers: [
     // write this special code for upload img 
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    {provide : LocationStrategy,useClass:HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
