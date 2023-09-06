import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { homePhoto } from '../interfaces/home.interface';
import { diningData } from '../interfaces/dining.interface';

@Component({
  selector: 'app-dining',
  templateUrl: './dining.component.html',
  styleUrls: ['./dining.component.scss']
})
export class DiningComponent implements OnInit {

  carasoulImages:homePhoto[]=[]
  DiningContent:diningData[]=[]

  constructor(private dataServ:DataService) { 
    this.dataServ.getDiningCarsoul().subscribe(data =>{
      for (const key in data) {
        this.carasoulImages.push(data[key])
      }
    })
    this.dataServ.getDiningContent().subscribe(data =>{
      for (const key in data) {
        this.DiningContent.push(data[key])
      }
    })
  }

  ngOnInit(): void {
  }

}
