import { Injectable } from '@angular/core';
import { homePhoto } from '../interfaces/home.interface';
import { HttpClient } from '@angular/common/http';
import { Database } from '@angular/fire/database';
import { Observable } from 'rxjs';

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
  gethomeImages():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/products.json`)
  }

  
  createCarasoul(data:any){
    this.http.post(`${this.databaseURL}/carasoul.json`,data).subscribe();
  }
  createProduct(data:any){
    this.http.post(`${this.databaseURL}/products.json`,data).subscribe();
  }
}
