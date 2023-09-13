import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-entertainment-dash',
  templateUrl: './entertainment-dash.component.html',
  styleUrls: ['./entertainment-dash.component.scss']
})
export class EntertainmentDashComponent implements OnInit {

  datalist:any[]=[];
  carsouelFormControl:string="";
  partViewController:string="";
  sectionViewController:string="";
  edit_control:string="";
  CarasoulEntertainmentURL:string="";
  productEntertainmentURL:string="";
  uploading:string="";
  updateObject:any;

  homeImg=this.fb.group({
    img:[""],
    id:[new Date().getTime()]
  })
  Entertainment=this.fb.group({
    img:[""],
    title:["",Validators.required],
    paragraph:["",Validators.required],
    id:[new Date().getTime()]
  })

  constructor( private route:Router,private fb:FormBuilder , private dataServ:DataService, private firestorage:AngularFireStorage) { }
  
  ngOnInit(): void {
    this.openPart('table data','carsouel','')
  }
  
  // -- Carasoul function for Entertainment --
  sendCarasoulEntertainment(){
    this.homeImg.patchValue({
      img:this.CarasoulEntertainmentURL
    })
    if(this.sectionViewController=='add'){
      this.dataServ.create(this.homeImg.value,"EntertainmentCarasoul","add");
    }else{
      this.dataServ.getEntertainmentCarsoul().subscribe(data=>{
        for (const key in data) {
          if(this.updateObject.id== data[key].id){
            this.homeImg.patchValue({
              id:Number(this.updateObject.id)
            })
            this.dataServ.create(this.homeImg.value,"EntertainmentCarasoul",key);
            break;
          }
        }
      })
    }
    this.uploading="null";
    setTimeout(() => { location.reload() }, 500);
  }
  sendEntertainmentData(){
    if(this.Entertainment.valid){
      this.Entertainment.patchValue({
        img:this.productEntertainmentURL
      })
      if(this.sectionViewController=='add'){
        this.dataServ.create(this.Entertainment.value,"EntertainmentContent","add")
      }else{
        this.dataServ.getEntertainmentContent().subscribe(data=>{
          for (const key in data) {
            if(this.updateObject.id== data[key].id){
              this.Entertainment.patchValue({
                id:Number(this.updateObject.id)
              })
              this.dataServ.create(this.Entertainment.value,"EntertainmentContent",key);
              break;
            }
          }
        })
      }
    }
    setTimeout(() => { location.reload() }, 500);
  }

  openPart(part:string,type:string,action:string){
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
    if(type=="carsouel"){
      this.dataServ.getEntertainmentCarsoul().subscribe(data=>{
        for (const key in data) {
          this.datalist.push(data[key])
        }
      })
    }else  if(type=="content"){
      this.dataServ.getEntertainmentContent().subscribe(data=>{
        for (const key in data) {
          this.datalist.push(data[key])
        }
      })
    }
  }
// ------------- update part -------------
update(item:any,sectionViewController:string){
  this.updateObject=item;
  if(this.edit_control=='carsouel' && sectionViewController=='edit')
    {
      this.sectionViewController=sectionViewController
    } else if(this.edit_control=='content' && sectionViewController=='edit')
    {
      this.sectionViewController=sectionViewController
    }
 }
// ------------- delete part -------------
 deleteItem(item:any,sectionViewController:string){
    if(this.edit_control=='carsouel' && sectionViewController=='delete')
    {
      this.sectionViewController=sectionViewController;
      this.dataServ.getEntertainmentCarsoul().subscribe(data=>{
        for (const key in data) {
          if(item.id==data[key].id){
            this.dataServ.delete("EntertainmentCarasoul",key);
            break;
          }
        }
      })
    } else if(this.edit_control=='content' && sectionViewController=='delete')
    {
      this.sectionViewController=sectionViewController;
      this.dataServ.getEntertainmentContent().subscribe(data=>{
        for (const key in data) {
          if(item.id==data[key].id){
            console.log(item.id)
            this.dataServ.delete("EntertainmentContent",key);
            break;
          }
        }
      })
    }
    setTimeout(() => { this.showdata(this.edit_control) }, 500);
 }


   // funcion to upload img file and get image url ---- for Entertainment Carasoul-------
   async uploadEntertainmentCarasoul(event:any){
    this.uploading="uploadingEntertainmentCarasoul";
    let date=new Date()
    const file=event.target.files[0];
    if(file){
      const path=`alBairaq/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.CarasoulEntertainmentURL=url;
    }
    this.uploading="uploadedEntertainmentCarasoul";
  }
  // funcion to upload img file and get image url ---- for Entertainment Product-------
  async uploadEntertainmentProduct(event:any){
    this.uploading="uploadingEntertainmentProduct";
    let date=new Date()
    const file=event.target.files[0];
    if(file){
      const path=`alBairaq/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.productEntertainmentURL=url;
    }
    this.uploading="uploadedEntertainmentProduct";
  }
}
