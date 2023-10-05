import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Database } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { About } from '../interfaces/About.interface';
import { EntertainmentData } from '../interfaces/Entertainment.interface';
import { diningData } from '../interfaces/dining.interface';
import { sendFeedback } from '../interfaces/feedback.interface';
import { homePhoto } from '../interfaces/home.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  databaseURL:any=""
  constructor( private database:Database , private http:HttpClient) { 
    this.databaseURL=this.database.app.options.databaseURL;
  }

  // get Home data
  getCarsoul():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/carasoul.json`)
  }
  gethomeImages():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/products.json`)
  }
  // get Dining data
  getDiningCarsoul():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/diningCarasoul.json`)
  }
  getDiningContent():Observable<diningData[]>{
    return this.http.get<diningData[]>(`${this.databaseURL}/diningContent.json`)
  }
  // get Entertainment data
  getEntertainmentCarsoul():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/EntertainmentCarasoul.json`)
  }
  getEntertainmentContent():Observable<EntertainmentData[]>{
    return this.http.get<EntertainmentData[]>(`${this.databaseURL}/EntertainmentContent.json`)
  }
  // get Services data
  getServicesCarsoul():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/ServicesCarasoul.json`)
  }
  getServicesContent():Observable<diningData[]>{
    return this.http.get<diningData[]>(`${this.databaseURL}/ServicesContent.json`)
  }
  // get Services data
  getAboutCarsoul():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/AboutCarasoul.json`)
  }
  getAboutContent():Observable<About[]>{
    return this.http.get<About[]>(`${this.databaseURL}/AboutContent.json`)
  }
  // get  Feedback
  getFeedback():Observable<sendFeedback[]>{
    return this.http.get<sendFeedback[]>(`${this.databaseURL}/feedback.json`)
  }
 // get  storeLocation
 getstoreLocation():Observable<homePhoto[]>{
  return this.http.get<homePhoto[]>(`${this.databaseURL}/storeLocation.json`)
  }
  // get clothing carasoul
  getclothingCarasoul():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/clothingCarasoul.json`)
  }
  // get  clothing
  getclothingImages():Observable<any[]>{
    return this.http.get<any[]>(`${this.databaseURL}/clothingImages.json`)
  }
  // get  perfumes Carasoul
  getperfumesCarasoul():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/perfumesCarasoul.json`)
  }
  // get  perfumes
  getperfumesImages():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/perfumesImages.json`)
  }
  // / get  accessories carasoul
  getaccessoriesCarasoul():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/accessoriesCarasoul.json`)
  }
  // get  accessories
  getaccessoriesImages():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/accessoriesImages.json`)
  }
  
  
  // create the data
  create(data:any , position:string,key:string){
    if(key=="add")
      this.http.post(`${this.databaseURL}/${position}.json`,data).subscribe();
    else
      this.http.put(`${this.databaseURL}/${position}/${key}.json`,data).subscribe();
  }
  sendFeedback(data:any){
    this.http.post(`${this.databaseURL}/feedback.json`,data).subscribe();
  }
  // delete the data
  delete(position:string,key:string){
    this.http.delete(`${this.databaseURL}/${position}/${key}.json`).subscribe();
  }
}
