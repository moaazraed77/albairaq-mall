import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Database } from '@angular/fire/database';
import { FormBuilder, Validators } from '@angular/forms';
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
  showActiveLink:string="home";

  constructor(private route:Router,private fb:FormBuilder , private database:Database, private dataServ:DataService , private http:HttpClient, private firestorage:AngularFireStorage) { 
    if(sessionStorage.getItem("Admin")!="AdminisTrue"){
      route.navigate(["/dashlogin"])
    }
    this.databaseURL=this.database.app.options.databaseURL;
  }

  homeImg=this.fb.group({
    img:[""],
    // dateCreated:[new Date().toLocaleDateString()],
    // dateEdited:[new Date().toLocaleDateString()],
    id:[new Date().getTime()]
  })
  dining_or_Services=this.fb.group({
    title:["",Validators.required],
    paragraph:["",Validators.required],
    // dateCreated:[new Date().toLocaleDateString()],
    // dateEdited:[new Date().toLocaleDateString()],
    id:[new Date().getTime()]
  })
  Entertainment=this.fb.group({
    img:[""],
    title:["",Validators.required],
    paragraph:["",Validators.required],
    // dateCreated:[new Date().toLocaleDateString()],
    // dateEdited:[new Date().toLocaleDateString()],
    id:[new Date().getTime()]
  })
  About=this.fb.group({
    paragraph:["",Validators.required],
    // dateCreated:[new Date().toLocaleDateString()],
    // dateEdited:[new Date().toLocaleDateString()],
    id:[new Date().getTime()]
  })
  ngOnInit(): void {
  }

  productURL:string="";
  CarasoulURL:string="";
  CarasoulDiningURL:string="";
  CarasoulEntertainmentURL:string="";
  productEntertainmentURL:string="";
  CarasoulServicesURL:string="";
  CarasoulAboutURL:string="";
  // funcion to upload img file and get image url   ---- for home carasoul -------
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
  // funcion to upload img file and get image url ---- for dining Carasoul-------
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
  // funcion to upload img file and get image url ---- for Entertainment Carasoul-------
  async uploadEntertainmentCarasoul(event:any){
    this.uploadingCarasoul="uploadingEntertainmentCarasoul";
    let date=new Date()
    const file=event.target.files[0];
    if(file){
      const path=`alBairaq/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.CarasoulEntertainmentURL=url;
    }
    this.uploadingCarasoul="uploadedEntertainmentCarasoul";
  }
  // funcion to upload img file and get image url ---- for Entertainment Product-------
  async uploadEntertainmentProduct(event:any){
    this.uploadingCarasoul="uploadingEntertainmentProduct";
    let date=new Date()
    const file=event.target.files[0];
    if(file){
      const path=`alBairaq/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.productEntertainmentURL=url;
    }
    this.uploadingCarasoul="uploadedEntertainmentProduct";
  }
  // funcion to upload img file and get image url ---- for Services Product-------
  async uploadServicesCarasoul(event:any){
    this.uploadingCarasoul="uploadingServicesCarasoul";
    let date=new Date()
    const file=event.target.files[0];
    if(file){
      const path=`alBairaq/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.CarasoulServicesURL=url;
    }
    this.uploadingCarasoul="uploadedServicesCarasoul";
  }
  // funcion to upload img file and get image url ---- for About Product-------
   async uploadAboutCarasoul(event:any){
    this.uploadingCarasoul="uploadingAboutCarasoul";
    let date=new Date()
    const file=event.target.files[0];
    if(file){
      const path=`alBairaq/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.CarasoulAboutURL=url;
    }
    this.uploadingCarasoul="uploadedAboutCarasoul";
  }
// -------------------------------- send data to add to database --------------------------------
  // ---- Carasoul function for home ----
  sendCarasoul(){
    this.homeImg.patchValue({
      img:this.CarasoulURL
    })
    this.dataServ.create(this.homeImg.value,"carasoul");
    this.uploadingCarasoul="null";
  }
  // -- send product data --
  sendImg(){
    this.homeImg.patchValue({
      img:this.productURL
    })
    this.dataServ.create(this.homeImg.value,"products");
    this.uploadingImg="null";
  }
  // -- Carasoul function for Dining --
  sendCarasoulDining(){
    this.homeImg.patchValue({
      img:this.CarasoulDiningURL
    })
    this.dataServ.create(this.homeImg.value,"diningCarasoul");
    this.uploadingCarasoul="null";
  }
  sendDiningData(){
    if(this.dining_or_Services.valid){
      this.dataServ.create(this.dining_or_Services.value,"dinigContent")
    }
  }
  // -- Carasoul function for Entertainment --
  sendCarasoulEntertainment(){
    this.homeImg.patchValue({
      img:this.CarasoulEntertainmentURL
    })
    this.dataServ.create(this.homeImg.value,"EntertainmentCarasoul");
    this.uploadingCarasoul="null";
  }
  sendEntertainmentData(){
    if(this.Entertainment.valid){
      this.Entertainment.patchValue({
        img:this.productEntertainmentURL
      })
      this.dataServ.create(this.Entertainment.value,"EntertainmentContent")
    }
  }
  // -- Carasoul function for Services --
  sendCarasoulServices(){
    this.homeImg.patchValue({
      img:this.CarasoulServicesURL
    })
    this.dataServ.create(this.homeImg.value,"ServicesCarasoul");
    this.uploadingCarasoul="null";
  }
  sendServicesData(){
    // we use dining formBuilder becase the same structure
    if(this.dining_or_Services.valid){
      this.dataServ.create(this.dining_or_Services.value,"ServicesContent")
    }
  }
  // -- Carasoul function for About --
  sendCarasoulAbout(){
    this.homeImg.patchValue({
      img:this.CarasoulAboutURL
    })
    this.dataServ.create(this.homeImg.value,"AboutCarasoul");
    this.uploadingCarasoul="null";
  }
  sendAboutData(){
    // we use dining formBuilder becase the same structure
    if(this.About.valid){
      this.dataServ.create(this.About.value,"AboutContent")
    }
  }
//control view function
  showPart(text:string){
    this.viewController=text;
    this.showActiveLink=text;
  }

}

