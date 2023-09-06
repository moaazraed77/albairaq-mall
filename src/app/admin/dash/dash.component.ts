import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Database } from '@angular/fire/database';
import { FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  
  viewController:string="home";
  uploadingImg:string="null";
  uploadingCarasoul:string="null";
  databaseURL:any="";

  constructor(private route:Router,private fb:FormBuilder , private database:Database, private dataServ:DataService , private http:HttpClient, private firestorage:AngularFireStorage) { 
    if(sessionStorage.getItem("Admin")!="AdminisTrue"){
      route.navigate(["/dashlogin"])
    }
    this.databaseURL=this.database.app.options.databaseURL;
  }

  homeImg=this.fb.group({
    img:[""],
    id:[new Date().getTime()]
  })
  
  dining=this.fb.group({
    title:[""],
    paragraph:[""],
    id:[new Date().getTime()]
  })

  ngOnInit(): void {
    
  }
  productURL:string="";
  CarasoulURL:string="";
  CarasoulDiningURL:string="";
  // funcion to upload img file and get image url   ---- for carasoul -------
  async uploadCarasoul(event:any){
    this.uploadingCarasoul="uploadingCarasoul";
    let date=new Date()
    const file=event.target.files[0];
    if(file){
      const path=`alBairaq/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.CarasoulURL=url;
    }
    this.uploadingCarasoul="CarasoulUploaded";
  }
  // funcion to upload img file and get image url ---- for product -------
  async uploadImg(event:any){
    this.uploadingImg="uploadingImg";
    let date=new Date()
    const file=event.target.files[0];
    if(file){
      const path=`alBairaq/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.productURL=url;
    }
    this.uploadingImg="imgUploaded";
  }
  // funcion to upload img file and get image url ---- for dining -------
  async uploadDiningCarasoul(event:any){
    this.uploadingCarasoul="uploadingDiningCarasoul";
    let date=new Date()
    const file=event.target.files[0];
    if(file){
      const path=`alBairaq/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.CarasoulDiningURL=url;
    }
    this.uploadingCarasoul="uploadedDiningCarasoul";
  }
  

  sendCarasoul(){
    this.homeImg.patchValue({
      img:this.CarasoulURL
    })
    this.dataServ.createCarasoul(this.homeImg.value,"home");
    this.uploadingCarasoul="null";
  }

  sendCarasoulDining(){
    this.homeImg.patchValue({
      img:this.CarasoulDiningURL
    })
    this.dataServ.createCarasoul(this.homeImg.value,"dining");
    this.uploadingCarasoul="null";
  }



  sendImg(){
    this.homeImg.patchValue({
      img:this.productURL
    })
    this.dataServ.createProduct(this.homeImg.value);
    this.uploadingImg="null";
  }
  sendDiningData(){
    if(this.dining.valid){
      this.dataServ.createDinigContent(this.dining.value)
    }
  }

  showPart(text:string){
    this.viewController=text
  }

}
