import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Database } from '@angular/fire/database';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { homePhoto } from 'src/app/interfaces/home.interface';


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
      route.navigate(["/admin/dash-login"])
    }
    this.databaseURL=this.database.app.options.databaseURL;
  }

  homeImg=this.fb.group({
    img:[""],
    id:[new Date().getTime()]
  })
  
  ngOnInit(): void {
    this.openPart('table data','home-carsouel','')
  }

  productURL:string="";
  CarasoulURL:string="";
  datalist:any[]=[];
  carsouelFormControl:string="";
  partViewController:string="";
  sectionViewController:string="";
  edit_control:string="";
  parttext:string="";

  // --------------------------------------------  upload photos -----------------------------------------

  // funcion to upload img file and get image url   ---- for home carasoul -------
  async uploadCarasoul(event:any,edit_control:string){
    this.edit_control=edit_control
    this.uploadingCarasoul="uploadingCarasoul";
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
  async uploadImg(event:any,edit_control:string){
    this.edit_control=edit_control
    this.uploadingImg="uploadingImg";
    const file=event.target.files[0];
    if(file){
      const path=`alBairaq/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.productURL=url;
    }
    this.uploadingImg="imgUploaded";
  }

// ------------------------------------- send data to add to database -----------------------------------
  // ---- Carasoul function for home ----
  sendCarasoul(edit_control:string,sectionViewController:string){
    this.homeImg.patchValue({
      img:this.CarasoulURL,
    })
    if(edit_control=="home-carsouel" && sectionViewController =="add")
    {
      this.dataServ.create(this.homeImg.value,"carasoul","add");
    }
    else if(edit_control=="home-carsouel" && sectionViewController =="edit"){
      this.dataServ.getCarsoul().subscribe(data=>{
        for (const key in data) {
          if(this.updateObject.id==data[key].id){
            this.homeImg.patchValue({
              id:Number(this.updateObject.id)
            })
            this.dataServ.create(this.homeImg.value,"carasoul",key);
            break;
          }
        }
      })
    }
    this.uploadingCarasoul="null";
    setTimeout(()=> location.reload(),500)
  }
  sendProducts(edit_control:string,sectionViewController:string){
    this.homeImg.patchValue({
      img:this.productURL
    })
    if(edit_control=="home-products" && sectionViewController =="add"){
      this.dataServ.create(this.homeImg.value,"products","add");
    }
    else if(edit_control=="home-products" && sectionViewController =="edit"){
      this.dataServ.gethomeImages().subscribe(data=>{
        this.homeImg.patchValue({
          id:Number(this.updateObject.id)
        })
        for (const key in data) {
          if(this.updateObject.id==data[key].id){
            this.dataServ.create(this.homeImg.value,"products",key);
            break;
          }
        }
      })
    }
    this.uploadingImg="null";
    setTimeout(()=> location.reload(),500)
  }
  //-----------------------------------------------------------------------------------------------------

  openPart(part:string,type:string,action:string){
    this.parttext=`the show of ${type}`
    this.partViewController=part;
    this.sectionViewController=action;
    this.carsouelFormControl=action;
    this.edit_control=type;
    if(part=="table data"){
      this.showdata(type);
    }
  }

  showdata(type:string){
    this.datalist=[]
    if(type=="home-carsouel"){
      this.dataServ.getCarsoul().subscribe(data=>{
        for (const key in data) {
          this.datalist.push(data[key])
        }
      })
    }else  if(type=="home-products"){
      this.dataServ.gethomeImages().subscribe(data=>{
        for (const key in data) {
          this.datalist.push(data[key])
        }
      })
    }
  }
// ------------- update part -------------
updateObject:homePhoto={
  img:"",
  id:""
}
update(item:any,sectionViewController:string){
  this.updateObject=item;
  if(this.edit_control=='home-carsouel' && sectionViewController=='edit')
    {
      this.sectionViewController=sectionViewController
    } else if(this.edit_control=='home-products' && sectionViewController=='edit')
    {
      this.sectionViewController=sectionViewController
    }
 }
// ------------- delete part -------------
 deleteItem(item:any,sectionViewController:string){
    if(this.edit_control=='home-carsouel' && sectionViewController=='delete')
    {
      this.sectionViewController=sectionViewController;
      this.dataServ.getCarsoul().subscribe(data=>{
        for (const key in data) {
          if(item.id==data[key].id){
            this.dataServ.delete("carasoul",key);
            break;
          }
        }
      })
    } else if(this.edit_control=='home-products' && sectionViewController=='delete')
    {
      this.sectionViewController=sectionViewController;
      this.dataServ.gethomeImages().subscribe(data=>{
        for (const key in data) {
          if(item.id==data[key].id){
            console.log(item.id)
            this.dataServ.delete("products",key);
            break;
          }
        }
      })
    }
    setTimeout(() => { this.showdata(this.edit_control) }, 500);
 }


}

