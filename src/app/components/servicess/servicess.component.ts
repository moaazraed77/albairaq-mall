import { Component, OnInit } from '@angular/core';
import { homePhoto } from '../../interfaces/home.interface';
import { diningData } from '../../interfaces/dining.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-servicess',
  templateUrl: './servicess.component.html',
  styleUrls: ['./servicess.component.scss']
})
export class ServicessComponent implements OnInit {

  carasoulImages:homePhoto[]=[]
  Content:diningData[]=[]

  constructor(private dataServ:DataService) { 
    if(sessionStorage.getItem("runCarsouel")!="servicesReloaded"){
      sessionStorage.setItem("runCarsouel","servicesReloaded")
      location.reload();
    }
    // -------   get the data -------
    this.dataServ.getServicesCarsoul().subscribe(data =>{
      for (const key in data) {
        this.carasoulImages.push(data[key])
      }
    })
    this.dataServ.getServicesContent().subscribe(data =>{
      for (const key in data) {
        this.Content.push(data[key])
      }
    })
  }

  ngOnInit(): void {

  }

}
