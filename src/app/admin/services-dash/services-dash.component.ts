import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-services-dash',
  templateUrl: './services-dash.component.html',
  styleUrls: ['./services-dash.component.scss']
})
export class ServicesDashComponent implements OnInit {

  // data variables
  datalist: any[] = [];
  CarasoulServicesURL:string="";
  // for controlling the view and data
  carsouelFormControl: string = "";
  partViewController: string = "";
  sectionViewController: string = "";
  edit_control: string = "";
  uploading: string = "";
  // for updating
  updateObject: any;
  // for check delete
  deletedObject: any;
  // for popup deleted item show
  showDeleteDiv:boolean=false;
  // for adding data
  homeImg = this.fb.group({
    img: [""],
    id: [new Date().getTime()]
  })
  Services=this.fb.group({
    title:["",Validators.required],
    paragraph:["",Validators.required],
    id:[new Date().getTime()]
  })

  constructor(private route: Router, private fb: FormBuilder, private dataServ: DataService, private firestorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.openPart('table data', 'carsouel', '')
  }

  // ------------- Carasoul function for Services -------------
  sendCarasoulServices(){
    this.homeImg.patchValue({
      img:this.CarasoulServicesURL
    })
    if (this.sectionViewController == 'add') {
      this.dataServ.create(this.homeImg.value,"ServicesCarasoul","add");
    } else {
      this.dataServ.getServicesCarsoul().subscribe(data => {
        for (const key in data) {
          if (this.updateObject.id == data[key].id) {
            this.homeImg.patchValue({
              id: Number(this.updateObject.id)
            })
            this.dataServ.create(this.homeImg.value, "ServicesCarasoul", key);
            break;
          }
        }
      })
    }
    this.CarasoulServicesURL="null";
    this.uploading="null";
    setTimeout(() => { location.reload() }, 700);
  }

  // ------------- data function for Services -------------
  sendServicesData(){
    if(this.Services.valid){
      if (this.sectionViewController == 'add') {
        this.dataServ.create(this.Services.value,"ServicesContent","add")
      } else {
        this.dataServ.getServicesContent().subscribe(data => {
          for (const key in data) {
            if (this.updateObject.id == data[key].id) {
              this.Services.patchValue({
                id: Number(this.updateObject.id)
              })
              this.dataServ.create(this.Services.value, "ServicesContent", key);
              break;
            }
          }
        })
      }
    }
    setTimeout(() => { location.reload() }, 700);
  }

  // --------------------------------------- open view control ---------------------------------------
  openPart(part: string, type: string, action: string) {
    this.partViewController = part;
    this.sectionViewController = action;
    this.carsouelFormControl = action;
    this.edit_control = type;
    // delete texts and old data
    this.uploading=""
    this.showDeleteDiv=false
    if (part == "table data") {
      this.showdata(type);
    }
  }
  EmptyFormInputs(){
    this.Services.patchValue({
      title:"",
      paragraph:""
    })
  }

  // --------------------------------------- show data list on view ---------------------------------------
  showdata(type: string) {
    this.datalist = []
    if (type == "carsouel") {
      this.dataServ.getServicesCarsoul().subscribe(data => {
        for (const key in data) {
          this.datalist.push(data[key])
        }
      })
    } else if (type == "content") {
      this.dataServ.getServicesContent().subscribe(data => {
        for (const key in data) {
          this.datalist.push(data[key])
        }
      })
    }
  }

  // ------------------------------------------- update part ---------------------------------------
  update(item: any, sectionViewController: string) {
    this.updateObject = item;
    if (this.edit_control == 'carsouel' && sectionViewController == 'edit') {
      this.sectionViewController = sectionViewController
    } else if (this.edit_control == 'content' && sectionViewController == 'edit') {
      this.Services.patchValue({
        title:item.title,
        paragraph:item.paragraph,
      })
      this.sectionViewController = sectionViewController
    }
  }

  // ------------------------------------------ delete part ---------------------------------------
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
  deleteItem(item: any, sectionViewController: string) {
    // delete carasouel
    if (this.edit_control == 'carsouel' && sectionViewController == 'delete') {
      this.sectionViewController = sectionViewController;
      this.dataServ.getServicesCarsoul().subscribe(data => {
        for (const key in data) {
          if (item.id == data[key].id) {
            this.dataServ.delete("ServicesCarasoul", key);
            break;
          }
        }
      })
      // delete content
    } else if (this.edit_control == 'content' && sectionViewController == 'delete') {
      this.sectionViewController = sectionViewController;
      this.dataServ.getServicesContent().subscribe(data => {
        for (const key in data) {
          if (item.id == data[key].id) {
            console.log(item.id)
            this.dataServ.delete("ServicesContent", key);
            break;
          }
        }
      })
    }
    setTimeout(() => { this.showdata(this.edit_control) }, 700);
  }


  // funcion to upload img file and get image url ---- for Services Product-------
  async uploadServicesCarasoul(event:any){
    this.uploading="uploadingServicesCarasoul";
    let date=new Date()
    const file=event.target.files[0];
    if(file){
      const path=`alBairaq/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.CarasoulServicesURL=url;
    }
    this.uploading="uploadedServicesCarasoul";
  }
}