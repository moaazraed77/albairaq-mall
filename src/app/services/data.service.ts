import { Injectable } from '@angular/core';
import { homePhoto } from '../interfaces/home.interface';
import { HttpClient } from '@angular/common/http';
import { Database } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { diningData } from '../interfaces/dining.interface';
import { EntertainmentData } from '../interfaces/Entertainment.interface';
import { About } from '../interfaces/About.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  carasoulImages:homePhoto[]=[
    {img:"assets/slider3.png",id:""},
    {img:"assets/slider1.png",id:""},
    {img:"assets/slider2.png",id:""},
    {img:"assets/slider3.png",id:""},
    {img:"assets/slider1.png",id:""},
    {img:"assets/slider2.png",id:""},
    {img:"assets/slider3.png",id:""},
  ]

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

  
  // create the data
  create(data:any , position:string,key:string){
    if(key=="add")
      this.http.post(`${this.databaseURL}/${position}.json`,data).subscribe();
    else
      this.http.put(`${this.databaseURL}/${position}/${key}.json`,data).subscribe();
  }
  // delete the data
  delete(position:string,key:string){
    this.http.delete(`${this.databaseURL}/${position}/${key}.json`).subscribe();
  }
}
