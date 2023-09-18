import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Database } from '@angular/fire/database';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { homePhoto } from 'src/app/interfaces/home.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dining-dash',
  templateUrl: './dining-dash.component.html',
  styleUrls: ['./dining-dash.component.scss']
})
export class DiningDashComponent implements OnInit {

  datalist:any[]=[];
  carsouelFormControl:string="";
  partViewController:string="";
  sectionViewController:string="";
  edit_control:string="";
  CarasoulDiningURL:string="";
  uploading:string="";
  updateObject:any;
  // for check delete
  deletedObject: any;
  // for popup deleted item show
  showDeleteDiv:boolean=false;

  constructor( private route:Router,private fb:FormBuilder , private dataServ:DataService, private firestorage:AngularFireStorage) { 
    this.partViewController="table data";
    this.openPart('table data','carsouel','imgs')
  }

  homeImg=this.fb.group({
    img:[""],
    id:[new Date().getTime()]
  })
  dining=this.fb.group({
    title:["",Validators.required],
    paragraph:["",Validators.required],
    id:[new Date().getTime()]
  })

  ngOnInit(): void {
  }

// -------- Carasoul function for Dining --------
  sendCarasoulDining(){
    this.homeImg.patchValue({
      img:this.CarasoulDiningURL
    })
    if(this.edit_control=='carsouel' && this.sectionViewController=='add'){
      this.dataServ.create(this.homeImg.value,"diningCarasoul","add");
    }else{
      this.dataServ.getDiningCarsoul().subscribe(data=>{
        for (const key in data) {
          if(this.updateObject.id== data[key].id){
            this.homeImg.patchValue({
              id:Number(this.updateObject.id)
            })
            this.dataServ.create(this.homeImg.value,"diningCarasoul",key);
            break;
          }
        }
      })
    }
    this.uploading="null";
    setTimeout(() => { location.reload() }, 500);
  }
// -------- data function for Dining --------
  sendDiningData(){
    if(this.dining.valid){
      if(this.sectionViewController=='add'){
        this.dataServ.create(this.dining.value,"diningContent","add")
      }else{
        this.dataServ.getDiningContent().subscribe(data=>{
          for (const key in data) {
            if(this.updateObject.id== data[key].id){
              this.dining.patchValue({
                id:Number(this.updateObject.id)
              })
              this.dataServ.create(this.dining.value,"diningContent",key);
              break;
            }
          }
        })
      }
    }
    setTimeout(() => { location.reload() }, 500);
  }
  // view control function
  openPart(part:string,type:string,action:string){
    this.partViewController=part;
    this.sectionViewController=action;
    this.carsouelFormControl=action;
    this.edit_control=type;
    // delete texts and old data
    this.uploading=""
    this.showDeleteDiv=false
    if(part=="table data"){
      this.showdata(type);
    }
  }
  EmptyFormInputs(){
    this.dining.patchValue({
      title:"",
      paragraph:""
    })
  }
  // add data in array
  showdata(type:string){
    this.datalist=[]
    if(type=="carsouel"){
      this.dataServ.getDiningCarsoul().subscribe(data=>{
        for (const key in data) {
          this.datalist.push(data[key])
        }
      })
    }else  if(type=="texts"){
      this.dataServ.getDiningContent().subscribe(data=>{
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
      } else if(this.edit_control=='texts' && sectionViewController=='edit')
      {
        this.dining.patchValue({
          title:item.title,
          paragraph:item.paragraph,
        })
        this.sectionViewController=sectionViewController
      }
  }
  // ------------- delete part -------------
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
    if(this.edit_control=='carsouel' && sectionViewController=='delete')
    {
      this.sectionViewController=sectionViewController;
      this.dataServ.getDiningCarsoul().subscribe(data=>{
        for (const key in data) {
          if(item.id==data[key].id){
            this.dataServ.delete("diningCarasoul",key);
            break;
          }
        }
      })
    } else if(this.edit_control=='texts' && sectionViewController=='delete')
    {
      this.sectionViewController=sectionViewController;
      this.dataServ.getDiningContent().subscribe(data=>{
        for (const key in data) {
          if(item.id==data[key].id){
            console.log(item.id)
            this.dataServ.delete("diningContent",key);
            break;
          }
        }
      })
    }
    setTimeout(() => { this.showdata(this.edit_control) }, 500);
  }
  
// funcion to upload img file and get image url
  async uploadDiningCarasoul(event:any){
    this.uploading="uploadingDiningCarasoul";
    let date=new Date()
    const file=event.target.files[0];
    if(file){
      const path=`alBairaq/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.CarasoulDiningURL=url;
    }
    this.uploading="uploadedDiningCarasoul";
  }

}