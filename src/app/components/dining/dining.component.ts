import { Component, OnInit } from '@angular/core';
import { homePhoto } from '../../interfaces/home.interface';
import { diningData } from '../../interfaces/dining.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dining',
  templateUrl: './dining.component.html',
  styleUrls: ['./dining.component.scss']
})
export class DiningComponent implements OnInit {

  carasoulImages:homePhoto[]=[]
  Content:diningData[]=[]

  constructor(private dataServ:DataService) {
    if(sessionStorage.getItem("runCarsouel")!="diningReloaded"){
      sessionStorage.setItem("runCarsouel","diningReloaded")
      location.reload();
    } 
    // -------   get the data -------
    this.dataServ.getDiningCarsoul().subscribe(data =>{
      for (const key in data) {
        this.carasoulImages.push(data[key])
      }
    })
    this.dataServ.getDiningContent().subscribe(data =>{
      for (const key in data) {
        this.Content.push(data[key])
      }
    })
  }

  ngOnInit(): void {
    
  }

}
