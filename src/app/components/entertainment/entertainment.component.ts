import { Component, OnInit } from '@angular/core';
import { homePhoto } from '../../interfaces/home.interface';
import { EntertainmentData } from '../../interfaces/Entertainment.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-entertainment',
  templateUrl: './entertainment.component.html',
  styleUrls: ['./entertainment.component.scss']
})
export class EntertainmentComponent implements OnInit {

  carasoulImages:homePhoto[]=[]
  Content:EntertainmentData[]=[]

  constructor(private dataServ:DataService) { 
    if(sessionStorage.getItem("runCarsouel")!="entertainmentReloaded"){
      sessionStorage.setItem("runCarsouel","entertainmentReloaded")
      location.reload();
    }
    // -------   get the data -------
    this.dataServ.getEntertainmentCarsoul().subscribe(data =>{
      for (const key in data) {
        this.carasoulImages.push(data[key])
      }
    })
    this.dataServ.getEntertainmentContent().subscribe(data =>{
      for (const key in data) {
        this.Content.push(data[key])
      }
    })
  }

  ngOnInit(): void {
    
  }

}
