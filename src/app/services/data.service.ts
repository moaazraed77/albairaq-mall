import { Injectable } from '@angular/core';
import { homePhoto } from '../interfaces/home.interface';
import { HttpClient } from '@angular/common/http';
import { Database } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { diningData } from '../interfaces/dining.interface';

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

  getCarsoul():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/carasoul.json`)
  }
  getDiningCarsoul():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/diningCarasoul.json`)
  }
  gethomeImages():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/products.json`)
  }
  getDiningContent():Observable<diningData[]>{
    return this.http.get<diningData[]>(`${this.databaseURL}/diningContent.json`)
  }


  
  createCarasoul(data:any , carasoulType:string){
    if(carasoulType=="home"){
      this.http.post(`${this.databaseURL}/carasoul.json`,data).subscribe();
    }else if(carasoulType=="dining"){
      this.http.post(`${this.databaseURL}/diningCarasoul.json`,data).subscribe();
    }
  }
  createProduct(data:any){
    this.http.post(`${this.databaseURL}/products.json`,data).subscribe();
  }
  createDinigContent(data:any){
    this.http.post(`${this.databaseURL}/diningContent.json`,data).subscribe();
  }
}
