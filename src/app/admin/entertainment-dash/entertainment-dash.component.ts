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

  datalist: any[] = [];
  carsouelFormControl: string = "";
  partViewController: string = "";
  sectionViewController: string = "";
  edit_control: string = "";
  CarasoulEntertainmentURL: string = "";
  productEntertainmentURL: string = "";
  uploading: string = "";
  updateObject: any;
  // for check delete
  deletedObject: any;
  // for popup deleted item show
  showDeleteDiv:boolean=false;


  homeImg = this.fb.group({
    img: [""],
    id: [new Date().getTime()]
  })
  Entertainment = this.fb.group({
    img: [""],
    title: ["", Validators.required],
    paragraph: ["", Validators.required],
    id: [new Date().getTime()]
  })

  constructor(private route: Router, private fb: FormBuilder, private dataServ: DataService, private firestorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.openPart('table data', 'carsouel', '')
  }

  // --------------------------------------- form function for Entertainment Carasoul ---------------------------------------
  sendCarasoulEntertainment() {
    this.homeImg.patchValue({
      img: this.CarasoulEntertainmentURL
    })
    if (this.sectionViewController == 'add') {
      this.dataServ.create(this.homeImg.value, "EntertainmentCarasoul", "add");
    } else {
      this.dataServ.getEntertainmentCarsoul().subscribe(data => {
        for (const key in data) {
          if (this.updateObject.id == data[key].id) {
            this.homeImg.patchValue({
              id: Number(this.updateObject.id)
            })
            this.dataServ.create(this.homeImg.value, "EntertainmentCarasoul", key);
            break;
          }
        }
      })
    }
    this.uploading = "null";
    setTimeout(() => { location.reload() }, 700);
  }

  // --------------------------------------- form function for Entertainment Data ---------------------------------------
  sendEntertainmentData() {
    if (this.Entertainment.valid) {
      this.Entertainment.patchValue({
        img: this.productEntertainmentURL
      })
      // add data
      if (this.sectionViewController == 'add') {
        this.dataServ.create(this.Entertainment.value, "EntertainmentContent", "add")
      } else {
      // edit data
        this.dataServ.getEntertainmentContent().subscribe(data => {
          for (const key in data) {
            if (this.updateObject.id == data[key].id) {
              this.Entertainment.patchValue({
                id: Number(this.updateObject.id)
              })
              //put the same img if not uploaded
              if(this.Entertainment.get("img")?.value==""){
                this.Entertainment.patchValue({
                  img:this.updateObject.img
                })
              }
              // submit updated data the data
              this.dataServ.create(this.Entertainment.value, "EntertainmentContent", key);
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
    this.Entertainment.patchValue({
      title:"",
      paragraph:""
    })
  }

  // --------------------------------------- show data list on view ---------------------------------------
  showdata(type: string) {
    this.datalist = []
    // show the carsouel data
    if (type == "carsouel") {
      this.dataServ.getEntertainmentCarsoul().subscribe(data => {
        for (const key in data) {
          this.datalist.push(data[key])
        }
      })
    // show the content data
    } else if (type == "content") {
      this.dataServ.getEntertainmentContent().subscribe(data => {
        for (const key in data) {
          this.datalist.push(data[key])
        }
      })
    }
  }

  // --------------------------------------- update part ---------------------------------------
  update(item: any, sectionViewController: string) {
    this.updateObject = item;
    if (this.edit_control == 'carsouel' && sectionViewController == 'edit') {
      this.sectionViewController = sectionViewController
    } else if (this.edit_control == 'content' && sectionViewController == 'edit') {
      this.Entertainment.patchValue({
        title:item.title,
        paragraph:item.paragraph,
        img:item.img
      })
      this.sectionViewController = sectionViewController
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
    // get item carsouel for delete 
    deleteItem(item: any, sectionViewController: string) {
    if (this.edit_control == 'carsouel' && sectionViewController == 'delete') {
      this.sectionViewController = sectionViewController;
      this.dataServ.getEntertainmentCarsoul().subscribe(data => {
        for (const key in data) {
          if (item.id == data[key].id) {
            this.dataServ.delete("EntertainmentCarasoul", key);
            break;
          }
        }
      })
    // get item content for delete 
    } else if (this.edit_control == 'content' && sectionViewController == 'delete') {
      this.sectionViewController = sectionViewController;
      this.dataServ.getEntertainmentContent().subscribe(data => {
        for (const key in data) {
          if (item.id == data[key].id) {
            console.log(item.id)
            this.dataServ.delete("EntertainmentContent", key);
            break;
          }
        }
      })
    }
    setTimeout(() => { this.showdata(this.edit_control) }, 700);
  }

  // -------------------------- funcion to upload img file and get image url ---- for Entertainment Carasoul-----------------
  async uploadEntertainmentCarasoul(event: any) {
    this.uploading = "uploadingEntertainmentCarasoul";
    let date = new Date()
    const file = event.target.files[0];
    if (file) {
      const path = `alBairaq/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path, file)
      const url = await uploadTask.ref.getDownloadURL()
      this.CarasoulEntertainmentURL = url;
    }
    this.uploading = "uploadedEntertainmentCarasoul";
  }
  // -------------------------- funcion to upload img file and get image url ---- for Entertainment Product------------------
  async uploadEntertainmentProduct(event: any) {
    this.uploading = "uploadingEntertainmentProduct";
    let date = new Date()
    const file = event.target.files[0];
    if (file) {
      const path = `alBairaq/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path, file)
      const url = await uploadTask.ref.getDownloadURL()
      this.productEntertainmentURL = url;
    }
    this.uploading = "uploadedEntertainmentProduct";
  }
}
