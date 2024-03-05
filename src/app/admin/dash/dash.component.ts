import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Database } from '@angular/fire/database';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { homePhoto } from 'src/app/interfaces/home.interface';
import { AdminAuthService } from 'src/app/services/admin-auth.service';


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  
  // data variables
  parttext:string="";
  databaseURL:any="";
  productURL:string="";
  CarasoulURL:string="";
  datalist:any[]=[];
  // variables for control the view
  uploadingImg:string="null"; // to make an alert for uploading image
  uploadingCarasoul:string="null"; // to make an alert for uploading image
  partViewController:string=""; // to view part vill be viewed   form   or   table
  edit_control:string="";  // to view which section in the part sellected will be shown
  sectionViewController:string=""; // to control which part will be edited by  adding  ,  deleting   , updating

  // for update
  updateObject:homePhoto={
    img:"",
    id:""
  }
  // for check delete
  deletedObject: any;
  // for popup deleted item show
  showDeleteDiv:boolean=false;
  // for adding data 
  homeImg=this.fb.group({
    img:[""],
    id:[new Date().getTime()]
  })


  constructor(private route:Router,private fb:FormBuilder , private database:Database,private auth:AdminAuthService, private dataServ:DataService , private http:HttpClient, private firestorage:AngularFireStorage) { 
    if(sessionStorage.getItem("Admin")!="AdminisTrue"){
      route.navigate(["/admin/dash-login"])
    }
    this.databaseURL=this.database.app.options.databaseURL;
    // console.log(auth.userId)
  }

  ngOnInit(): void {
    this.openPart('table data','home-carsouel','')
  }


  // ------------------------------------- open part ------------------------------------------
  openPart(part:string,type:string,action:string){
    this.parttext=`the show of ${type}`
    this.partViewController=part; // to view part vill be viewed   form   or   table
    this.edit_control=type; // to view which section in the part sellected will be shown
    this.sectionViewController=action;  // to control which part will be edited by  adding  ,  deleting   , updating
    // delete texts and old data
    this.uploadingCarasoul=""
    this.uploadingImg=""
    this.showDeleteDiv=false
    if(part=="table data"){
      this.showdata(type);
    }
  }

  // ------------------------------------ show data table -------------------------------------
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

// ------------------------------------- send data to add to database -----------------------------------
  // ---- Carasoul function for home ----
  sendCarasoul(edit_control:string,sectionViewController:string){
    this.homeImg.patchValue({
      img:this.CarasoulURL,
    })
  // ---- add carasoul ----
    if(edit_control=="home-carsouel" && sectionViewController =="add")
    {
      this.dataServ.create(this.homeImg.value,"carasoul","add");
    }
  // ---- edit carasoul ----
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
  }

  // ---- send product function for home ----
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
  }

  // --------------------------------------- update part ---------------------------------------
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

  // --------------------------------------- delete part ---------------------------------------
  DeleteSure(item:any){
    this.deletedObject=item;
    this.showDeleteDiv=true;
  }
  deleteDone(){
    this.deleteItem(this.deletedObject,"delete");
    this.showDeleteDiv=false;
  }
  cancel_delete(){
    this.showDeleteDiv=false;
  }
  deleteItem(item:any,sectionViewController:string){
  //----------- delete carasoul -----------
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
  //------------- delete content -------------
    } else if(this.edit_control=='home-products' && sectionViewController=='delete') {
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
 }

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

}

