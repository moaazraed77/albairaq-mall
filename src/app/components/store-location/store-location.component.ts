import { Component, OnInit } from '@angular/core';
import { homePhoto } from 'src/app/interfaces/home.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-store-location',
  templateUrl: './store-location.component.html',
  styleUrls: ['./store-location.component.scss']
})
export class StoreLocationComponent implements OnInit {

  list:homePhoto[]=[]

  constructor(private dataServ:DataService) {
    if(sessionStorage.getItem("runCarsouel")!="storeReloaded"){
      sessionStorage.setItem("runCarsouel","storeReloaded")
      location.reload();
    }
    // -------   get the data -------
    this.dataServ.getstoreLocation().subscribe(data =>{
      for (const key in data) {
        this.list.push(data[key])
      }
    })
   }

  ngOnInit(): void {
  }

}
